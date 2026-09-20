-- 00002_create_products.sql
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price >= price),
    discount_percent INT GENERATED ALWAYS AS (
        CASE WHEN compare_at_price > price 
             THEN ROUND(((compare_at_price - price) / compare_at_price) * 100)
             ELSE 0 
        END
    ) STORED,
    images TEXT[] NOT NULL DEFAULT '{}',
    badge_text VARCHAR(100) DEFAULT 'BEST SELLER',
    tag_badge VARCHAR(100) DEFAULT 'RO+UV', -- 'RO+UV', 'OEM FILTER', etc.
    rating NUMERIC(2, 1) DEFAULT 4.9,
    review_count INT DEFAULT 128,
    purification_tech VARCHAR(100) DEFAULT 'RO + UV + UF', -- 'RO + UV + UF', 'Alkaline + Copper', 'Under-sink Compact', 'Gravity / Non-Electric'
    storage_capacity VARCHAR(50) DEFAULT '10L',            -- '7L - 8L', '10L', '12L+', '50L+', 'Universal Fit'
    capacity_variants JSONB NOT NULL DEFAULT '[
        {"capacity": "10 Litres", "price_diff": 0, "label": "Recommended Standard", "is_default": true},
        {"capacity": "12 Litres", "price_diff": 1500, "label": "+₹1,500 High Demand", "is_default": false}
    ]'::jsonb,
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    features TEXT[] NOT NULL DEFAULT '{}',
    filtration_stages JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_in_stock BOOLEAN NOT NULL DEFAULT true,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
