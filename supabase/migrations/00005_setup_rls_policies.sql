-- 00005_setup_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- CATEGORIES RLS
CREATE POLICY "Allow public read access to categories"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow admin full write access to categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- PRODUCTS RLS: Only published products visible to public, admins see all
CREATE POLICY "Allow public read access to published products"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (is_published = true OR public.is_admin());

CREATE POLICY "Allow admin full write access to products"
    ON public.products FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- DEMO BOOKINGS / LEADS RLS
CREATE POLICY "Allow public visitors to insert demo bookings"
    ON public.demo_bookings FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow admin full access to demo bookings"
    ON public.demo_bookings FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ADMIN PROFILES RLS
CREATE POLICY "Allow admin to read profiles"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (public.is_admin());
