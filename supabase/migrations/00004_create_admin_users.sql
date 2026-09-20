-- 00004_create_admin_users.sql
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Defense against privilege escalation: Revoke direct modifications by public clients
REVOKE INSERT, UPDATE, DELETE ON public.admin_profiles FROM anon, authenticated;
