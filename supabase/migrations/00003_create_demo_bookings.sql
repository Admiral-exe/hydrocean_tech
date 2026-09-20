-- 00003_create_demo_bookings.sql
CREATE TABLE IF NOT EXISTS public.demo_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    water_source VARCHAR(50) DEFAULT 'Borewell', -- 'Borewell', 'Municipal / Tanker', 'Mixed'
    preferred_date DATE,
    preferred_time_slot VARCHAR(50) DEFAULT 'Morning (9 AM - 12 PM)',
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
