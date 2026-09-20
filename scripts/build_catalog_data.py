import json

products_raw = [
    # PURIFIERS
    {
        "id": "p1000000-0000-0000-0000-000000000001",
        "name": "Lexcru Lexzon",
        "slug": "lexcru-lexzon",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 6800,
        "compare_at_price": 11000,
        "image": "/images/products/lexcru-lexzon.jpg",
        "tag_badge": "RO+UV",
        "badge_text": "BEST VALUE",
        "rating": 4.8,
        "review_count": 94,
        "purification_tech": "RO + UV + UF",
        "storage_capacity": "10L",
        "short_desc": "Multi-stage RO+UV with transparent 10L tank • Free doorstep installation",
        "full_desc": "Lexcru Lexzon delivers multi-stage RO+UV+UF water purification designed specifically for residential kitchens and high-TDS municipal or borewell sources. Features a crystal-clear 10-liter food-grade storage chamber, automatic tank-full shutoff, and long-life high-rejection RO membrane.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Carbon Polish",
            "Storage Capacity": "10 Litres Food-Grade Tank",
            "Flow Rate": "12 to 15 LPH Output",
            "TDS Range": "Handles up to 2000 PPM TDS",
            "Mounting": "Wall Mount / Countertop",
            "Warranty": "1-Year Doorstep Comprehensive Service"
        },
        "features": [
            "Advanced multi-stage RO+UV+UF filtration cascade",
            "10L transparent food-grade antibacterial storage reservoir",
            "Automatic flushing valve to enhance membrane lifespan",
            "High-efficiency booster pump with whisper-quiet operation",
            "Includes complete installation kit and certified technician visit"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000002",
        "name": "Water mark PURIFIER",
        "slug": "water-mark-purifier",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 7200,
        "compare_at_price": 11000,
        "image": "/images/products/water-mark-purifier.jpg",
        "tag_badge": "TDS CONTROL",
        "badge_text": "HIGH DEMAND",
        "rating": 4.9,
        "review_count": 82,
        "purification_tech": "RO + UV + TDS Control",
        "storage_capacity": "10L",
        "short_desc": "Smart TDS controller with LED purity indicators • 100% genuine filters",
        "full_desc": "The Water Mark Purifier combines micro-filtration precision with an active TDS control valve to preserve essential minerals in your drinking water. Engineered with heavy-duty ABS body and food-grade components suitable for borewell, tanker, and municipal water.",
        "specs": {
            "Purification Stages": "RO + UV + Micro-TDS Controller",
            "Storage Capacity": "10 Litres Clear Tank",
            "Flow Rate": "15 LPH Continuous Purify",
            "TDS Range": "Up to 2200 PPM TDS",
            "Cabinet": "Scratch-Resistant ABS Shell",
            "Warranty": "1-Year Hydrocean Certified Warranty"
        },
        "features": [
            "Micro-TDS manual controller for optimal taste customization",
            "Dual-color LED power and purification indicator panel",
            "Food-grade non-toxic storage chamber with dust seal",
            "NSF certified high-absorption activated carbon block",
            "Quick-connect push fittings for leak-proof performance"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000003",
        "name": "AQUA MARS",
        "slug": "aqua-mars",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 6500,
        "compare_at_price": 11000,
        "image": "/images/products/aqua-mars.jpg",
        "tag_badge": "ALKALINE",
        "badge_text": "POPULAR",
        "rating": 4.7,
        "review_count": 115,
        "purification_tech": "RO + UV + UF + Alkaline",
        "storage_capacity": "12L",
        "short_desc": "12L high-capacity storage with alkaline pH booster • Rapid flow tap",
        "full_desc": "Aqua Mars is engineered for medium to large families, featuring an expansive 12-liter tank and alkaline post-filter that maintains a healthy pH level of 7.5 to 8.5. Efficiently strips out toxic heavy metals, arsenic, fluorides, and microbes.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Mineral Alkaline Cartridge",
            "Storage Capacity": "12 Litres Large Reservoir",
            "Flow Rate": "Up to 15 Litres Per Hour",
            "TDS Range": "Borewell & Municipal up to 2500 PPM",
            "Body Finish": "Curved Aesthetic Gloss Cyan/White",
            "Warranty": "1-Year On-Site Service"
        },
        "features": [
            "12-liter high-capacity storage chamber for uninterrupted water",
            "Alkaline pH infusion enhances hydration and antioxidant properties",
            "Stainless steel 11W germicidal UV disinfection chamber",
            "Auto-cut off sensor prevents water tank overflow",
            "Low maintenance cost with standard universal filter dimensions"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000004",
        "name": "All filters",
        "slug": "all-filters",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 750,
        "compare_at_price": 1500,
        "image": "/images/products/all-filters.jpg",
        "tag_badge": "FILTER KIT",
        "badge_text": "OEM SPARES",
        "rating": 4.9,
        "review_count": 210,
        "purification_tech": "Universal RO Replacement Cartridges",
        "storage_capacity": "Universal Spares",
        "short_desc": "Complete replacement filter kit: Sediment, Carbon Block, Inline Post Carbon & Spun Candle",
        "full_desc": "Universal annual maintenance filter set compatible with all domestic RO water purifier models. Includes 1x high-density 5-micron spun polypropylene sediment filter, 1x pre-carbon block cartridge, 1x inline sediment cartridge, and 1x post-carbon taste polishing cartridge plus push-fit elbow fittings.",
        "specs": {
            "Kit Components": "Pre-Filter Spun + Inline Sediment + Carbon Block + Post Carbon",
            "Micron Rating": "5 Micron Sediment Filtration",
            "Compatibility": "Universal (Fits Lexcru, Aqua, Kent, Dolphin, etc.)",
            "Lifespan": "6 to 12 Months (based on raw water TDS)",
            "Media": "100% Virgin Polypropylene & Coconut Shell Carbon",
            "Warranty": "Guaranteed 100% Genuine NSF Grade Media"
        },
        "features": [
            "Complete 4-piece replacement filter set for comprehensive servicing",
            "Removes chlorine, silt, suspended particles, sand, and organic odors",
            "High-iodine 1100 IV active carbon restores natural spring taste",
            "Standard 1/4-inch push-fit elbow connectors included in box",
            "Cost-effective DIY maintenance or book certified doorstep install"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000005",
        "name": "AQUA GLANCE",
        "slug": "aqua-glance",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 6500,
        "compare_at_price": 11000,
        "image": "/images/products/aqua-glance.jpg",
        "tag_badge": "RO+UV+UF",
        "badge_text": "TRANSPARENT TANK",
        "rating": 4.8,
        "review_count": 76,
        "purification_tech": "RO + UV + UF",
        "storage_capacity": "10L",
        "short_desc": "Transparent viewing window reveals inline filtration stages • Fast flow tap",
        "full_desc": "Aqua Glance features a transparent modular cabinet showcasing its multi-stage inline filter cylinders and pure water reservoir. Backed by an 80 GPD high-flow RO membrane and high-intensity UV sterilizer to eliminate bacterial contamination.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Taste Enhancer",
            "Storage Capacity": "10 Litres Split Transparent Chamber",
            "Flow Rate": "12 to 14 LPH",
            "TDS Range": "Up to 2000 PPM",
            "Mounting": "Wall Mount Ready",
            "Warranty": "1-Year Doorstep Warranty"
        },
        "features": [
            "Full crystal-clear transparent front panel with stage indicators",
            "Multi-stage inline purification with heavy-duty booster pump",
            "High recovery rate with efficient membrane architecture",
            "Detachable drip tray and ergonomic push dispensing tap",
            "Food-grade BPA-free materials ensuring zero secondary contamination"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000006",
        "name": "AQUA C3",
        "slug": "aqua-c3",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 7500,
        "compare_at_price": 11000,
        "image": "/images/products/aqua-c3.jpg",
        "tag_badge": "COMPACT",
        "badge_text": "UNDER-SINK UTC",
        "rating": 4.9,
        "review_count": 89,
        "purification_tech": "Under-sink / UTC RO",
        "storage_capacity": "8L",
        "short_desc": "Space-saving under-the-counter system with hydrostatic tank & chrome faucet",
        "full_desc": "Aqua C3 is the ultimate space-saving under-sink (Under-the-Counter UTC) water purification system. Conceals all filtration components neatly beneath your kitchen sink, dispensing purified RO water via a designer chrome gooseneck countertop faucet.",
        "specs": {
            "System Type": "Under-the-Counter (UTC) Under-Sink",
            "Storage Tank": "8 Litre Pressurized Hydrostatic Steel/Polymer Tank",
            "Dispenser": "Chrome Gooseneck Designer Faucet Included",
            "Purification Stages": "RO + UV + UF + Mineral Cartridge",
            "TDS Handling": "Up to 2200 PPM TDS",
            "Warranty": "1-Year Complete On-Site Warranty"
        },
        "features": [
            "Frees up 100% of kitchen countertop and wall space",
            "Pressurized hydrostatic tank delivers high-velocity water flow",
            "Designer stainless steel / chrome countertop faucet included",
            "Leak-detector sensor with automatic shutoff valve",
            "Concealed vibration dampeners for ultra-silent operation"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000007",
        "name": "Dolphin Aqua",
        "slug": "dolphin-aqua",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 6000,
        "compare_at_price": 9000,
        "image": "/images/products/dolphin-aqua.jpg",
        "tag_badge": "CLASSIC RO",
        "badge_text": "DOLPHIN SERIES",
        "rating": 4.7,
        "review_count": 142,
        "purification_tech": "RO + UV",
        "storage_capacity": "9L",
        "short_desc": "Classic curved dolphin body with float ball water level indicator",
        "full_desc": "The iconic Dolphin Aqua is a proven residential workhorse recognized for its curved ergonomic cabinet and dependable performance. Equipped with dual-tone ABS body, high-pressure pump, and reliable RO+UV technology suitable for city and apartment pipelines.",
        "specs": {
            "Purification Stages": "RO + UV + Pre/Post Filtration",
            "Storage Capacity": "9 Litres Food-Grade Tank",
            "Flow Rate": "10 to 12 LPH Flow",
            "TDS Range": "Up to 1800 PPM TDS",
            "Indicator": "Floating Red/White Water Level Indicator Ball",
            "Warranty": "1-Year Doorstep Warranty"
        },
        "features": [
            "Ergonomic dolphin-style contoured cabinet with wall brackets",
            "Visual float-ball level indicator for instant water volume checks",
            "Proven heavy-duty booster pump with thermal overload protection",
            "Universal filter element architecture for low annual maintenance",
            "100% food-grade plastic components with antimicrobial tank"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000008",
        "name": "AQUA JADE",
        "slug": "aqua-jade",
        "category_id": "c1000000-0000-0000-0000-000000000001",
        "category_name": "PURIFIERS",
        "price": 6500,
        "compare_at_price": 12000,
        "image": "/images/products/aqua-jade.jpg",
        "tag_badge": "ACTIVE COPPER",
        "badge_text": "EMERALD FINISH",
        "rating": 4.8,
        "review_count": 68,
        "purification_tech": "RO + UV + Alkaline Copper",
        "storage_capacity": "10L",
        "short_desc": "Glossy emerald jade trim with digital display & active copper infusion",
        "full_desc": "Aqua Jade introduces a luxury aesthetic to kitchen purification with its deep emerald green accents and digital status interface. Integrates an active copper and alkaline cartridge that enriches water with essential trace minerals and balanced alkalinity.",
        "specs": {
            "Purification Stages": "RO + UV + Active Copper + Alkaline pH",
            "Storage Capacity": "10 Litres Detachable Tank",
            "Flow Rate": "14 LPH",
            "TDS Range": "Up to 2400 PPM TDS",
            "Finish": "Gloss Emerald Jade Green with Pearl White",
            "Warranty": "1-Year Comprehensive Warranty"
        },
        "features": [
            "Active copper cartridge infuses natural antibacterial copper ions",
            "Digital smart display monitors TDS levels and purification status",
            "High-retention thin-film composite RO membrane",
            "Detachable water tank for effortless periodic cleaning",
            "Energy-efficient auto-flush mechanism saves water"
        ]
    },

    # RO CATEGORY
    {
        "id": "p1000000-0000-0000-0000-000000000009",
        "name": "COMMERCIAL 30 to 50 LPH RO",
        "slug": "commercial-30-to-50-lph-ro",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 22000,
        "compare_at_price": 38000,
        "image": "/images/products/commercial-30-to-50-lph-ro.jpg",
        "tag_badge": "30-50 LPH",
        "badge_text": "COMMERCIAL PLANT",
        "rating": 4.9,
        "review_count": 53,
        "purification_tech": "Commercial Skid RO (30-50 LPH)",
        "storage_capacity": "Continuous 50 LPH",
        "short_desc": "Heavy-duty SS304 skid frame with dual membrane vessels & pressure gauges",
        "full_desc": "Commercial skid-mounted 30 to 50 LPH RO water plant built on a robust stainless steel structure. Equipped with dual 20-inch jumbo pre-filter housings, dual commercial RO membranes, high-pressure brass vane pump, and dual analog pressure gauges for cafes, schools, and small offices.",
        "specs": {
            "Capacity": "30 to 50 Litres Per Hour Continuous Flow",
            "Skid Construction": "Heavy-Duty Food Grade SS304 Stainless Steel",
            "Pre-Filtration": "Dual 20-Inch Jumbo Blue Housings (Sediment + Carbon)",
            "Membranes": "Dual Commercial High-Rejection TFC Elements",
            "Pump": "High-Pressure Commercial Rotary Pump with Pressure Gauges",
            "Warranty": "1-Year Commercial Site Warranty + Service Support"
        },
        "features": [
            "Delivers 30 to 50 liters/hour high-volume drinking water",
            "Sturdy stainless steel floor-standing skid with anti-vibration mounts",
            "Dual glycerin-filled pressure gauges for real-time monitoring",
            "High recovery system with adjustable reject-water control valve",
            "Ideal for offices with 30-100 staff, cafes, clinics, and restaurants"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000010",
        "name": "COMMERCIAL RO",
        "slug": "commercial-ro",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 14000,
        "compare_at_price": 21000,
        "image": "/images/products/commercial-ro.jpg",
        "tag_badge": "HEAVY DUTY",
        "badge_text": "OFFICE & CAFE",
        "rating": 4.8,
        "review_count": 61,
        "purification_tech": "Commercial Bracket RO 25-35 LPH",
        "storage_capacity": "High Output",
        "short_desc": "Triple 20-inch pre-filter bracket with dual commercial booster pumps",
        "full_desc": "Heavy-duty wall bracket commercial RO unit engineered for corporate cafeterias, bakeries, and gym centers. Features triple 20-inch pre-filtration stages to safeguard the dual RO membranes against high sediment loads.",
        "specs": {
            "Capacity": "25 to 35 Litres Per Hour",
            "Mounting": "Heavy-Duty Epoxy Powder-Coated Wall Bracket",
            "Housings": "Triple 20-Inch Tall Filter Canisters",
            "Pumps": "Dual Commercial High-Flow Booster Pumps",
            "Inlet TDS": "Handles harsh borewell water up to 3000 PPM",
            "Warranty": "1-Year On-Site Service Warranty"
        },
        "features": [
            "Triple-stage pre-filtration eliminates heavy dirt and sediment",
            "Dual parallel booster pumps guarantee constant operating pressure",
            "Compact wall-hung design preserves floor space in commercial kitchens",
            "Standard 20-inch filter elements available everywhere at low cost",
            "Includes commercial brass ball valves and high-pressure tubing"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000011",
        "name": "LX TWO",
        "slug": "lx-two",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 10000,
        "compare_at_price": 15000,
        "image": "/images/products/lx-two.jpg",
        "tag_badge": "PREMIUM",
        "badge_text": "LEXCRU SERIES",
        "rating": 4.9,
        "review_count": 73,
        "purification_tech": "RO + UV + Copper",
        "storage_capacity": "10L",
        "short_desc": "Lexcru LX-2 series with matte navy cabinet, LED indicators & copper infuser",
        "full_desc": "Lexcru LX-2 (LX TWO) represents next-generation domestic purification with its matte white and navy blue finish, LED system indicators, and active copper mineralizer. Engineered for demanding water quality conditions.",
        "specs": {
            "Purification Stages": "7-Stage RO + UV + UF + Active Copper",
            "Storage Capacity": "10 Litres Transparent Reservoir",
            "Flow Rate": "15 LPH Purification Speed",
            "TDS Range": "Up to 2500 PPM",
            "Design": "Architectural Matte Finish Wall Unit",
            "Warranty": "1-Year Doorstep Comprehensive Service"
        },
        "features": [
            "Contemporary architectural matte navy and white body",
            "Active copper mineralizer replenishes healthy micronutrients",
            "Multi-color LED status indicators for power, tank full, and service",
            "High-rejection 80 GPD membrane with 95%+ salt reduction",
            "Full installation kit and complimentary TDS water test included"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000012",
        "name": "All Types Of membranes",
        "slug": "all-types-of-membranes",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 800,
        "compare_at_price": 1800,
        "image": "/images/products/all-types-of-membranes.jpg",
        "tag_badge": "MEMBRANE ROLL",
        "badge_text": "HIGH REJECTION",
        "rating": 5.0,
        "review_count": 189,
        "purification_tech": "TFC RO Membrane Roll Elements (75/80/100 GPD)",
        "storage_capacity": "Replacement Element",
        "short_desc": "Spiral-wound thin film composite (TFC) RO membrane rolls • 97% salt rejection",
        "full_desc": "Authentic spiral-wound Thin Film Composite (TFC) Reverse Osmosis membrane filter rolls available in 75 GPD, 80 GPD, and 100 GPD capacities. Features precision 0.0001 micron filtration that rejects dissolved solids, arsenic, fluorides, lead, and viruses with up to 97% efficiency.",
        "specs": {
            "Membrane Type": "Spiral-Wound Thin-Film Composite (TFC) Roll",
            "Available Capacities": "75 GPD / 80 GPD / 100 GPD",
            "Pore Size": "0.0001 Micron (Molecular Filtration)",
            "Salt Rejection": "95% - 98% TDS Reduction Rate",
            "Compatibility": "Fits all standard 1812 domestic RO membrane housings",
            "Operating Pressure": "50 to 125 PSI"
        },
        "features": [
            "Authentic high-surface area spiral-wound membrane sheet construction",
            "Removes dissolved chemical salts, heavy metals, cysts, and pesticides",
            "Standard size 1812 fits virtually all residential RO membrane housings",
            "Equipped with central permeate collector pipe and rubber chevron seal",
            "Available in multiple GPD ratings to match your home's water pressure"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000013",
        "name": "AQUA NEEO",
        "slug": "aqua-neeo",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 9500,
        "compare_at_price": 14500,
        "image": "/images/products/aqua-neeo.jpg",
        "tag_badge": "12L TANK",
        "badge_text": "GEOMETRIC DESIGN",
        "rating": 4.8,
        "review_count": 78,
        "purification_tech": "RO + UV + Mineral Cartridge",
        "storage_capacity": "12L",
        "short_desc": "Angular geometric cabinet with cyan LED ribbon & 12-liter storage",
        "full_desc": "Aqua Neeo stands out with its angular geometric front architecture and integrated cyan glow status ribbon. Boasts a massive 12-liter storage capacity and comprehensive multi-stage filtration to convert hard borewell water into crisp drinking water.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Active Bio-Minerals",
            "Storage Capacity": "12 Litres Large Food-Grade Tank",
            "Flow Rate": "15 LPH Rapid Purification",
            "TDS Range": "Handles up to 2200 PPM TDS",
            "Finish": "Pearl White with Cyan Geometric Accents",
            "Warranty": "1-Year Complete Warranty"
        },
        "features": [
            "Distinctive faceted geometric cabinet design with cyan glow line",
            "Generous 12-liter storage tank handles peak household demand",
            "UV sterilizer kills 99.99% of pathogenic viruses and bacteria",
            "Active mineral cartridge balances mineral composition and taste",
            "Smooth dispensing faucet with high flow rate"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000014",
        "name": "AQUA ALIVE",
        "slug": "aqua-alive",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 9000,
        "compare_at_price": 14000,
        "image": "/images/products/aqua-alive.jpg",
        "tag_badge": "RO+UV+UF",
        "badge_text": "ACTIVE MINERALS",
        "rating": 4.8,
        "review_count": 64,
        "purification_tech": "RO + UV + UF + Active Minerals",
        "storage_capacity": "10L",
        "short_desc": "Restores living natural minerals with multi-stage cascade • 10L capacity",
        "full_desc": "Aqua Alive focuses on living water health by reinjecting essential calcium and magnesium ions after reverse osmosis filtration. Featuring an antibacterial 10-liter tank, high-pressure pump, and modern kitchen styling.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Mineral Cartridge",
            "Storage Capacity": "10 Litres Clear Tank",
            "Flow Rate": "14 LPH",
            "TDS Range": "Up to 2000 PPM",
            "Finish": "Deep Aqua Blue and White",
            "Warranty": "1-Year On-Site Warranty"
        },
        "features": [
            "Mineral restoration cartridge infuses optimal calcium & magnesium",
            "High-capacity 10-liter antibacterial storage chamber",
            "Dual LED indicators for purification and tank full notifications",
            "Universal filter element compatibility for easy long-term maintenance",
            "Certified technician doorstep delivery and installation included"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000015",
        "name": "RO WITH COOLER",
        "slug": "ro-with-cooler",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 35000,
        "compare_at_price": 45000,
        "image": "/images/products/ro-with-cooler.jpg",
        "tag_badge": "COLD & AMBIENT",
        "badge_text": "RO + CHILLER",
        "rating": 5.0,
        "review_count": 41,
        "purification_tech": "Commercial RO + Water Cooler Chiller",
        "storage_capacity": "40L Cold Storage",
        "short_desc": "Commercial stainless steel water cooler with in-built RO plant • Dual push taps",
        "full_desc": "All-in-one commercial drinking water solution combining a heavy-duty food-grade SS304 stainless steel refrigerated water chiller with an integrated high-output multi-stage RO filtration plant. Features dual push taps (chilled water & ambient pure RO water) and a 40-liter refrigerated storage tank for schools, offices, factories, and community halls.",
        "specs": {
            "Unit Type": "Integrated Commercial Water Cooler with In-Built RO Plant",
            "Tank Capacity": "40 Litres SS304 Refrigerated Cooling Tank",
            "Cooling Rate": "20 to 40 Litres Per Hour Chilling Capacity",
            "Dispensing Taps": "2 Brass Chrome Push Taps (Chilled + Ambient Pure RO)",
            "Body Construction": "Heavy-Duty Corrosion-Resistant SS304 Stainless Steel",
            "Refrigerant": "Eco-Friendly R134a Compressor Cooling System",
            "Purification Stages": "Sediment + Pre-Carbon + RO Membrane 100 GPD + Post Carbon",
            "Warranty": "1-Year Comprehensive Commercial On-Site Warranty"
        },
        "features": [
            "Eliminates need for separate cooler and purifier—all in one footprint",
            "Dual taps dispense crisp chilled RO water or room-temperature pure water",
            "Heavy-duty SS304 stainless steel construction inside and out",
            "Eco-friendly, energy-efficient high-capacity cooling compressor",
            "Ideal for high-footfall institutions, corporate offices, gyms, and colleges"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000016",
        "name": "AQUA 9090",
        "slug": "aqua-9090",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 10000,
        "compare_at_price": 18000,
        "image": "/images/products/aqua-9090.jpg",
        "tag_badge": "MTDS",
        "badge_text": "DIAMOND FACET",
        "rating": 4.9,
        "review_count": 79,
        "purification_tech": "RO + UV + MTDS",
        "storage_capacity": "11L",
        "short_desc": "Geometric diamond textured panel with manual MTDS controller • 11L tank",
        "full_desc": "Aqua 9090 combines high-end aesthetic appeal with versatile purification. Featuring an architectural diamond-patterned front fascia, MTDS manual mineral control, and an 11-liter food-grade storage tank.",
        "specs": {
            "Purification Stages": "RO + UV + MTDS + Carbon Polish",
            "Storage Capacity": "11 Litres Antibacterial Chamber",
            "Flow Rate": "15 LPH Flow",
            "TDS Range": "Handles up to 2500 PPM",
            "Finish": "Diamond Texture Gloss Black & Chrome",
            "Warranty": "1-Year Hydrocean Certified Warranty"
        },
        "features": [
            "Designer diamond-faceted front panel elevates modern kitchen aesthetics",
            "Manual TDS controller adjusts mineral content for ideal drinking taste",
            "11-liter high-capacity tank ensures ample backup water during power cuts",
            "Automatic tank full shut-off and dry-run pump protection",
            "NSF certified filter cartridges for peak contaminant removal"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000017",
        "name": "Aqua NINE",
        "slug": "aqua-nine",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 8500,
        "compare_at_price": 14000,
        "image": "/images/products/aqua-nine.jpg",
        "tag_badge": "10L TANK",
        "badge_text": "COMPACT SMART",
        "rating": 4.7,
        "review_count": 58,
        "purification_tech": "RO + UV + UF",
        "storage_capacity": "10L",
        "short_desc": "Smart compact casing with high recovery membrane and 10L clean tank",
        "full_desc": "Aqua Nine is crafted for compact residential apartments, delivering uncompromising 7-stage RO+UV+UF purification in a streamlined, wall-mounted footprint.",
        "specs": {
            "Purification Stages": "RO + UV + UF + Taste Conditioner",
            "Storage Capacity": "10 Litres Food-Grade Tank",
            "Flow Rate": "12 to 14 LPH",
            "TDS Range": "Up to 2000 PPM TDS",
            "Finish": "Clean White with Deep Blue Trim",
            "Warranty": "1-Year On-Site Warranty"
        },
        "features": [
            "Space-saving wall-mount profile fits easily above kitchen counters",
            "Multi-stage filtration handles both ground borewell and piped water",
            "Food-grade non-toxic storage chamber keeps water fresh for days",
            "Energy-saving automatic flush and cut-off sensors",
            "Low operating and filter replacement maintenance costs"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000018",
        "name": "Aqua ZURIC",
        "slug": "aqua-zuric",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 7800,
        "compare_at_price": 13000,
        "image": "/images/products/aqua-zuric.jpg",
        "tag_badge": "ALKALINE",
        "badge_text": "SWISS DESIGN",
        "rating": 4.8,
        "review_count": 71,
        "purification_tech": "RO + UV + Alkaline",
        "storage_capacity": "10L",
        "short_desc": "Swiss-inspired minimalist purifier with alkaline mineral balancing • 10L",
        "full_desc": "Aqua Zuric embodies Swiss minimalist engineering with its sleek charcoal accents and advanced alkaline water rebalancing. Effectively lowers high hardness while maintaining healthy mineral equilibrium.",
        "specs": {
            "Purification Stages": "RO + UV + Alkaline Mineral Cartridge",
            "Storage Capacity": "10 Litres Transparent Reservoir",
            "Flow Rate": "14 LPH",
            "TDS Range": "Up to 2200 PPM TDS",
            "Design": "Swiss-Inspired Minimalist Cabinet",
            "Warranty": "1-Year Comprehensive Warranty"
        },
        "features": [
            "Alkaline re-mineralization cartridge balances water pH to 8.0+",
            "Minimalist charcoal-trim aesthetic harmonizes with modern kitchens",
            "High-pressure booster pump operates quietly and efficiently",
            "10L transparent food-grade tank allows visual volume checking",
            "Includes doorstep delivery, unboxing, and certified installation"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000019",
        "name": "Aqua 2090",
        "slug": "aqua-2090",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 9500,
        "compare_at_price": 15000,
        "image": "/images/products/aqua-2090.jpg",
        "tag_badge": "12L TANK",
        "badge_text": "COPPER & ZINC",
        "rating": 4.9,
        "review_count": 92,
        "purification_tech": "RO + UV + Copper + Zinc",
        "storage_capacity": "12L",
        "short_desc": "Dual copper and zinc infusion with 12L capacity and LED status indicators",
        "full_desc": "Aqua 2090 blends contemporary dark styling with dual active copper and zinc immunity booster cartridges. Equipped with a large 12-liter storage tank to comfortably support large households.",
        "specs": {
            "Purification Stages": "RO + UV + Copper + Zinc + Carbon",
            "Storage Capacity": "12 Litres Large Tank",
            "Flow Rate": "15 LPH",
            "TDS Range": "Up to 2500 PPM",
            "Finish": "Metallic Grey and Copper Trim",
            "Warranty": "1-Year Doorstep Warranty"
        },
        "features": [
            "Infuses both copper and zinc for daily holistic wellness and immunity",
            "Large 12-liter water chamber handles large family drinking needs",
            "UV-C germicidal disinfection chamber kills bacteria and protozoa",
            "Sleek push faucet with continuous dispense lock mechanism",
            "Low-pressure cut-off prevents pump damage during water interruptions"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000020",
        "name": "Aqua innovica",
        "slug": "aqua-innovica",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 12000,
        "compare_at_price": 19000,
        "image": "/images/products/aqua-innovica.jpg",
        "tag_badge": "SMART RO",
        "badge_text": "TOUCHSCREEN TDS",
        "rating": 5.0,
        "review_count": 104,
        "purification_tech": "Smart RO + UV + Touchscreen TDS",
        "storage_capacity": "10L",
        "short_desc": "Smart touchscreen interface with digital live TDS display & filter health tracking",
        "full_desc": "Aqua Innovica represents the pinnacle of intelligent kitchen purification. Features a glowing touchscreen front panel displaying live input/output TDS measurements, filter cartridge life status, and automatic self-cleaning flush cycles.",
        "specs": {
            "Purification Stages": "Smart 7-Stage RO + UV + UF + Digital MTDS",
            "Interface": "Real-Time Digital Touchscreen with Live TDS Display",
            "Storage Capacity": "10 Litres Antibacterial Tank",
            "Flow Rate": "16 LPH High Speed",
            "TDS Handling": "Handles up to 3000 PPM Extreme Hard Water",
            "Warranty": "1-Year Comprehensive On-Site Warranty"
        },
        "features": [
            "Real-time digital touchscreen monitors inlet and purified TDS levels",
            "Smart filter life tracker alerts before filter replacement is due",
            "Automated high-frequency flush cycles extend membrane life by 2x",
            "Piano black mirror-finish front panel with chrome water faucet",
            "Premium food-grade detachable tank with anti-bacterial lining"
        ]
    },
    {
        "id": "p1000000-0000-0000-0000-000000000021",
        "name": "Aqua v5",
        "slug": "aqua-v5",
        "category_id": "c1000000-0000-0000-0000-000000000002",
        "category_name": "RO",
        "price": 10000,
        "compare_at_price": 17000,
        "image": "/images/products/aqua-v5.jpg",
        "tag_badge": "7-STAGE",
        "badge_text": "SILENT PUMP",
        "rating": 4.8,
        "review_count": 87,
        "purification_tech": "RO + UV + UF + Silent Booster",
        "storage_capacity": "10L",
        "short_desc": "Vertical ribbed cabinet with silent booster pump & 7-stage cascade • 10L",
        "full_desc": "Aqua V5 is engineered for quiet domestic efficiency, combining a noise-dampened booster pump with a rigorous 7-stage purification cascade. Its transparent reservoir and vertical fluted body add refined styling to any kitchen counter.",
        "specs": {
            "Purification Stages": "7-Stage RO + UV + UF + Carbon Polish",
            "Storage Capacity": "10 Litres Clear Tank",
            "Flow Rate": "14 LPH",
            "TDS Range": "Up to 2200 PPM",
            "Motor": "Silent Dampened High-Torque Booster Pump",
            "Warranty": "1-Year Complete Doorstep Warranty"
        },
        "features": [
            "Acoustic noise-dampened booster pump operates with zero vibration",
            "Complete 7-stage cascade eliminates dissolved chemicals and heavy metals",
            "10L food-grade transparent tank allows effortless water level checking",
            "Auto-cut off sensor prevents water leakage and electrical surge issues",
            "Free doorstep technician installation and test kit included"
        ]
    }
]

# Generate src/lib/mock-data.ts
mock_categories = [
    {
        "id": "c1000000-0000-0000-0000-000000000001",
        "name": "Purifiers",
        "slug": "purifiers",
        "description": "Multi-stage domestic RO, UV, UF purifiers and filter kits",
        "icon_name": "Droplets",
        "sort_order": 1,
    },
    {
        "id": "c1000000-0000-0000-0000-000000000002",
        "name": "RO",
        "slug": "ro",
        "description": "High capacity commercial RO systems, coolers, and membranes",
        "icon_name": "ShieldCheck",
        "sort_order": 2,
    }
]

# Build TS file
lines = []
lines.append('import { Product } from "@/types/product.types";')
lines.append('import { Category } from "@/types/category.types";\n')

lines.append("export const MOCK_CATEGORIES: Category[] = [")
for cat in mock_categories:
    lines.append("  {")
    lines.append(f'    id: "{cat["id"]}",')
    lines.append(f'    name: "{cat["name"]}",')
    lines.append(f'    slug: "{cat["slug"]}",')
    lines.append(f'    description: "{cat["description"]}",')
    lines.append(f'    icon_name: "{cat["icon_name"]}",')
    lines.append(f'    sort_order: {cat["sort_order"]},')
    lines.append('    created_at: new Date().toISOString(),')
    lines.append('    updated_at: new Date().toISOString(),')
    lines.append("  },")
lines.append("];\n")

lines.append("export const MOCK_PRODUCTS: Product[] = [")
for p in products_raw:
    discount = round(((p["compare_at_price"] - p["price"]) / p["compare_at_price"]) * 100)
    lines.append("  {")
    lines.append(f'    id: "{p["id"]}",')
    lines.append(f'    category_id: "{p["category_id"]}",')
    lines.append(f'    name: {json.dumps(p["name"])},')
    lines.append(f'    slug: "{p["slug"]}",')
    lines.append(f'    short_description: {json.dumps(p["short_desc"])},')
    lines.append(f'    full_description: {json.dumps(p["full_desc"])},')
    lines.append(f'    price: {p["price"]},')
    lines.append(f'    compare_at_price: {p["compare_at_price"]},')
    lines.append(f'    discount_percent: {discount},')
    lines.append(f'    images: [{json.dumps(p["image"])}],')
    lines.append(f'    badge_text: {json.dumps(p["badge_text"])},')
    lines.append(f'    tag_badge: {json.dumps(p["tag_badge"])},')
    lines.append(f'    rating: {p["rating"]},')
    lines.append(f'    review_count: {p["review_count"]},')
    lines.append(f'    purification_tech: {json.dumps(p["purification_tech"])},')
    lines.append(f'    storage_capacity: {json.dumps(p["storage_capacity"])},')
    
    # Capacity variants
    lines.append("    capacity_variants: [")
    lines.append("      {")
    lines.append(f'        capacity: {json.dumps(p["storage_capacity"])},')
    lines.append("        price_diff: 0,")
    lines.append('        label: "Standard Model",')
    lines.append("        is_default: true,")
    lines.append("      },")
    if p["storage_capacity"] not in ["Universal Spares", "Replacement Element", "High Output", "Continuous 50 LPH", "40L Cold Storage"]:
        lines.append("      {")
        lines.append('        capacity: "High Capacity Variant",')
        lines.append("        price_diff: 1200,")
        lines.append('        label: "+₹1,200 Extended Capacity",')
        lines.append("        is_default: false,")
        lines.append("      },")
    lines.append("    ],")

    # Specifications
    lines.append(f'    specifications: {json.dumps(p["specs"], indent=6).replace(chr(10), chr(10) + "    ")},')

    # Features
    lines.append(f'    features: {json.dumps(p["features"], indent=6).replace(chr(10), chr(10) + "    ")},')

    # Filtration stages
    lines.append("    filtration_stages: [")
    lines.append("      { stage: 1, title: 'Pre-Sediment Spun Filter', description: 'Removes sand, mud, and coarse physical dirt.' },")
    lines.append("      { stage: 2, title: 'Activated Carbon Block', description: 'Adsorbs harmful chlorine, bad taste, and foul odors.' },")
    lines.append("      { stage: 3, title: 'Reverse Osmosis Membrane', description: 'Pore size 0.0001 micron strips heavy metals and dissolved salts.' },")
    lines.append("      { stage: 4, title: 'Germicidal UV Disinfection', description: 'Instant sterilizer eliminates microbial pathogens and viruses.' },")
    lines.append("      { stage: 5, title: 'Post-Carbon Mineralizer', description: 'Restores essential minerals and balances natural taste.' },")
    lines.append("    ],")

    lines.append("    is_featured: True,".replace("True", "true"))
    lines.append("    is_in_stock: True,".replace("True", "true"))
    lines.append("    is_published: True,".replace("True", "true"))
    lines.append('    created_at: new Date().toISOString(),')
    lines.append('    updated_at: new Date().toISOString(),')
    lines.append("  },")

lines.append("];\n")

with open(r"D:\temp\ro_purifier\hydrocean\src\lib\mock-data.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Written {len(products_raw)} products to src/lib/mock-data.ts")

# Generate SQL seed file
sql_lines = []
sql_lines.append("-- Seed data for 21 Hydrocean Tech products & 2 categories")
sql_lines.append("DELETE FROM public.products;")
sql_lines.append("DELETE FROM public.categories;\n")

for cat in mock_categories:
    sql_lines.append(f"INSERT INTO public.categories (id, name, slug, description, icon_name, sort_order) VALUES ('{cat['id']}', '{cat['name']}', '{cat['slug']}', '{cat['description']}', '{cat['icon_name']}', {cat['sort_order']});")

sql_lines.append("\n")

for p in products_raw:
    discount = round(((p["compare_at_price"] - p["price"]) / p["compare_at_price"]) * 100)
    images_json = json.dumps([p["image"]]).replace("'", "''")
    specs_json = json.dumps(p["specs"]).replace("'", "''")
    features_json = json.dumps(p["features"]).replace("'", "''")
    
    variants = [
        {"capacity": p["storage_capacity"], "price_diff": 0, "label": "Standard Model", "is_default": True}
    ]
    variants_json = json.dumps(variants).replace("'", "''")

    stages = [
        {"stage": 1, "title": "Pre-Sediment Spun Filter", "description": "Removes sand, mud, and coarse physical dirt."},
        {"stage": 2, "title": "Activated Carbon Block", "description": "Adsorbs harmful chlorine, bad taste, and foul odors."},
        {"stage": 3, "title": "Reverse Osmosis Membrane", "description": "Pore size 0.0001 micron strips heavy metals and dissolved salts."},
        {"stage": 4, "title": "Germicidal UV Disinfection", "description": "Instant sterilizer eliminates microbial pathogens and viruses."},
        {"stage": 5, "title": "Post-Carbon Mineralizer", "description": "Restores essential minerals and balances natural taste."}
    ]
    stages_json = json.dumps(stages).replace("'", "''")

    name_escaped = p["name"].replace("'", "''")
    short_escaped = p["short_desc"].replace("'", "''")
    full_escaped = p["full_desc"].replace("'", "''")
    badge_escaped = p["badge_text"].replace("'", "''")
    tag_escaped = p["tag_badge"].replace("'", "''")
    tech_escaped = p["purification_tech"].replace("'", "''")
    cap_escaped = p["storage_capacity"].replace("'", "''")

    sql = f"""INSERT INTO public.products (
  id, category_id, name, slug, short_description, full_description, price, compare_at_price, discount_percent, images, badge_text, tag_badge, rating, review_count, purification_tech, storage_capacity, capacity_variants, specifications, features, filtration_stages, is_featured, is_in_stock, is_published
) VALUES (
  '{p["id"]}', '{p["category_id"]}', '{name_escaped}', '{p["slug"]}', '{short_escaped}', '{full_escaped}', {p["price"]}, {p["compare_at_price"]}, {discount}, '{images_json}'::jsonb, '{badge_escaped}', '{tag_escaped}', {p["rating"]}, {p["review_count"]}, '{tech_escaped}', '{cap_escaped}', '{variants_json}'::jsonb, '{specs_json}'::jsonb, '{features_json}'::jsonb, '{stages_json}'::jsonb, true, true, true
);"""
    sql_lines.append(sql)

with open(r"D:\temp\ro_purifier\hydrocean\supabase\migrations\seed.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print("Written seed.sql successfully!")
