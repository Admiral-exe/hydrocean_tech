-- 00006_setup_storage_bucket.sql

-- 1. Create or update the product-images storage bucket with public access
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- 2. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Access: Public visitors (anon & authenticated) can view images
CREATE POLICY "Public Read Access for Product Images"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'product-images');

-- 4. Admin Insert Access: Only authenticated admins can upload images
CREATE POLICY "Admin Upload Access for Product Images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'product-images' AND
        public.is_admin()
    );

-- 5. Admin Update Access: Only authenticated admins can update images
CREATE POLICY "Admin Update Access for Product Images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'product-images' AND public.is_admin())
    WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

-- 6. Admin Delete Access: Only authenticated admins can delete images
CREATE POLICY "Admin Delete Access for Product Images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'product-images' AND public.is_admin());
