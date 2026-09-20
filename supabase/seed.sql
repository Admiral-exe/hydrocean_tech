-- supabase/seed.sql
-- Seed data for Hydrocean Tech RO Purifier Platform

INSERT INTO public.categories (id, name, slug, description, icon_name, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Home RO', 'home-ro', 'Advanced multi-stage purifiers designed for residential homes', 'Home', 1),
('c1000000-0000-0000-0000-000000000002', 'Commercial RO', 'commercial-ro', 'High capacity 50-250 LPH purifiers for cafes, offices, and factories', 'Building2', 2),
('c1000000-0000-0000-0000-000000000003', 'Alkaline & Copper', 'alkaline-copper', 'Mineral-rich alkaline and active copper infused drinking water systems', 'Sparkles', 3),
('c1000000-0000-0000-0000-000000000004', 'Spares & Filters', 'spares-filters', 'OEM genuine filter kits, replacement membranes, and maintenance spares', 'Wrench', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (
    id, category_id, name, slug, short_description, full_description, 
    price, compare_at_price, images, badge_text, tag_badge, rating, review_count, 
    purification_tech, storage_capacity, capacity_variants, specifications, features, filtration_stages, 
    is_featured, is_in_stock, is_published
) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'HydroPure 7-Stage RO+UV+UF Purifier',
    'hydropure-7-stage-ro-uv-uf',
    'TDS Controller • Mineral Infuser • Free Installation included',
    'The HydroPure 7-Stage represents the pinnacle of residential water purification. Engineered for high-TDS municipal and borewell sources up to 2500 PPM, featuring real-time TDS monitoring and dual alkaline-copper infusion.',
    12999.00,
    18999.00,
    ARRAY[
        '/images/products/hydropure-main.webp',
        '/images/products/hydropure-angle.webp',
        '/images/products/hydropure-kitchen.webp'
    ],
    'BEST SELLER',
    'RO+UV',
    4.9,
    128,
    'RO + UV + UF',
    '10L',
    '[
        {"capacity": "10 Litres", "price_diff": 0, "label": "Recommended Standard", "is_default": true},
        {"capacity": "12 Litres", "price_diff": 1500, "label": "+₹1,500 High Demand", "is_default": false}
    ]'::jsonb,
    '{
        "purification_stages": "7 Stages PureMolecular Cascade",
        "tank_capacity": "10L Food-Grade Detachable",
        "purification_capacity": "Up to 15 LPH",
        "tds_reduction": "Up to 95% TDS reduction",
        "water_source": "Borewell, Tanker, Municipal",
        "warranty": "1-Year Comprehensive On-site Warranty"
    }'::jsonb,
    ARRAY[
        'PureMolecular 7-Stage Cascade engineered for TDS up to 2500 PPM',
        'Real-time Digital TDS Display with filter health alert',
        'Detachable 10L food-grade antibacterial storage tank',
        'Alkaline and active copper ions infusion (pH 7.8 - 8.5)'
    ],
    '[
        {"stage": 1, "title": "Pre-Sediment Spun Filter (5 Micron)", "description": "Removes rust, sand, silt, and heavy suspended mud particles."},
        {"stage": 2, "title": "Activated Carbon Block", "description": "High-iodine coconut-shell carbon absorbs harmful chlorine, volatile organic compounds, and foul odors."},
        {"stage": 3, "title": "RO Membrane (0.0001 Micron)", "description": "High-efficiency 80 GPD sheet removes dissolved solids, lead, fluoride, and heavy metals with 95% reduction."},
        {"stage": 4, "title": "Germicidal UV-C Chamber", "description": "High-frequency 11W stainless-steel UV sterilizes water against 99.99% pathogenic microbes and viruses."},
        {"stage": 5, "title": "Ultra-Filtration (UF) Hollow Fiber", "description": "Secondary physical barrier that locks in pure taste without water wastage."},
        {"stage": 6, "title": "Alkaline + Copper Infuser", "description": "Restores essential calcium, magnesium, and active copper ions, balancing pH to 7.8 - 8.5."},
        {"stage": 7, "title": "Post-Carbon Polisher", "description": "Polishes water for a crisp, mountain-fresh natural drinking finish."}
    ]'::jsonb,
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000003',
    'HydroShield Alkaline Copper',
    'hydroshield-alkaline-copper',
    '8L Tank • pH 8.5+ • Active Mineral Enhancement',
    'Infused with 99.9% pure copper and essential alkaline minerals, balancing cellular hydration and boosting immunity.',
    15499.00,
    21999.00,
    ARRAY['/images/products/hydroshield-copper.webp'],
    'PREMIUM',
    'ALKALINE',
    4.8,
    94,
    'Alkaline + Copper',
    '7L - 8L',
    '[
        {"capacity": "8 Litres", "price_diff": 0, "label": "Standard Countertop", "is_default": true}
    ]'::jsonb,
    '{"tank_capacity": "8L", "ph_level": "8.5+", "copper_infusion": "Active Electrolytic"}'::jsonb,
    ARRAY['99.9% Copper Infusion', 'Alkaline pH 8.5+', 'Bio-silver anti-bacterial protection'],
    '[]'::jsonb,
    true,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000001',
    'HydroCompact Under-sink RO',
    'hydrocompact-under-sink-ro',
    'Hidden under-counter design with brushed steel swan faucet',
    'Space-saving under-sink installation designed for modern modular kitchens with pressure tank and dedicated faucet.',
    9999.00,
    14500.00,
    ARRAY['/images/products/hydrocompact-undersink.webp'],
    'POPULAR',
    'UNDER-SINK',
    4.7,
    72,
    'Under-sink Compact',
    '7L - 8L',
    '[
        {"capacity": "7 Litres", "price_diff": 0, "label": "Hydrostatic Tank", "is_default": true}
    ]'::jsonb,
    '{"installation": "Under Sink", "faucet": "Brushed SUS304 Faucet", "tank": "7L Hydrostatic"}'::jsonb,
    ARRAY['Zero counter clutter', 'High pressure flow', 'Easy filter swap'],
    '[]'::jsonb,
    false,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000002',
    'HydroFlow Commercial RO',
    'hydroflow-commercial-ro',
    '50 LPH Flow • Commercial grade stainless-steel skid',
    'Heavy-duty dual membrane commercial RO unit designed for cafes, corporate cafeterias, clinics, and offices.',
    24999.00,
    32000.00,
    ARRAY['/images/products/hydroflow-commercial.webp'],
    'COMMERCIAL',
    '50 LPH',
    5.0,
    41,
    'RO + UV + UF',
    '50L+',
    '[
        {"capacity": "50 LPH", "price_diff": 0, "label": "Standard Dual Membrane", "is_default": true},
        {"capacity": "100 LPH", "price_diff": 8000, "label": "Heavy Duty Quad Membrane", "is_default": false}
    ]'::jsonb,
    '{"flow_rate": "50-100 LPH", "chassis": "SS304 Stainless Steel", "membranes": "Dual 100 GPD"}'::jsonb,
    ARRAY['Continuous 50 LPH flow', 'Pressure gauges & auto-flush', 'Low maintenance design'],
    '[]'::jsonb,
    false,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000004',
    'RO Service Filter Kit',
    'ro-service-filter-kit',
    'Sediment + Carbon Spares Set • Genuine Spare',
    'Complete annual replacement cartridge kit containing sediment spun filter, pre-carbon block, and post-carbon polisher.',
    1499.00,
    2200.00,
    ARRAY['/images/products/ro-filter-kit.webp'],
    'GENUINE SPARE',
    'OEM FILTER',
    4.9,
    310,
    'Gravity / Non-Electric',
    'Universal Fit',
    '[
        {"capacity": "1 Full Kit", "price_diff": 0, "label": "3-Stage Replacement Set", "is_default": true}
    ]'::jsonb,
    '{"compatibility": "Fits all 10-inch standard RO units", "certified": "NSF Food Grade"}'::jsonb,
    ARRAY['100% Virgin Food-Grade Polypropylene', '900+ IV Iodine Carbon', 'Universal 10-inch fit'],
    '[]'::jsonb,
    false,
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000004',
    'Active Copper Alkaline Filter',
    'active-copper-alkaline-filter',
    'Universal Fit mineral enrichment cartridge',
    'Easy in-line mineralizer cartridge to upgrade any standard RO purifier to active copper alkaline water.',
    999.00,
    1500.00,
    ARRAY['/images/products/copper-alkaline-inline.webp'],
    'UNIVERSAL FIT',
    'CARTRIDGE',
    4.8,
    185,
    'Alkaline + Copper',
    'Universal Fit',
    '[
        {"capacity": "Standard In-line", "price_diff": 0, "label": "Push-fit Quick Connect", "is_default": true}
    ]'::jsonb,
    '{"connector": "1/4 inch Quick Connect", "lifespan": "3,000 Litres"}'::jsonb,
    ARRAY['Active Copper balls', 'Bio-ceramic balls', 'Raises pH to 8.0+'],
    '[]'::jsonb,
    false,
    true,
    true
)
ON CONFLICT (id) DO NOTHING;
