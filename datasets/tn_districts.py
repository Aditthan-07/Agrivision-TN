TN_DISTRICTS = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
    "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
    "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
    "Vellore", "Villupuram", "Virudhunagar"
]

DISTRICT_PROFILES = {
    "Thanjavur":      {"soil": "Alluvial", "avg_rainfall_mm": 1050, "primary_crops": ["Paddy", "Banana", "Sugarcane"], "zone": "Delta"},
    "Tiruvarur":      {"soil": "Alluvial", "avg_rainfall_mm": 1100, "primary_crops": ["Paddy", "Banana"], "zone": "Delta"},
    "Nagapattinam":   {"soil": "Alluvial", "avg_rainfall_mm": 1200, "primary_crops": ["Paddy", "Coconut"], "zone": "Delta"},
    "Mayiladuthurai": {"soil": "Alluvial", "avg_rainfall_mm": 1000, "primary_crops": ["Paddy", "Sugarcane"], "zone": "Delta"},
    "Coimbatore":     {"soil": "Red Loam", "avg_rainfall_mm": 690,  "primary_crops": ["Maize", "Cotton", "Turmeric"], "zone": "Western"},
    "Erode":          {"soil": "Red Sandy", "avg_rainfall_mm": 720,  "primary_crops": ["Turmeric", "Coconut", "Banana"], "zone": "Western"},
    "Tiruppur":       {"soil": "Red Sandy", "avg_rainfall_mm": 680,  "primary_crops": ["Cotton", "Maize"], "zone": "Western"},
    "Salem":          {"soil": "Red Loam", "avg_rainfall_mm": 900,  "primary_crops": ["Mango", "Maize", "Tapioca"], "zone": "Central"},
    "Namakkal":       {"soil": "Red Sandy", "avg_rainfall_mm": 820,  "primary_crops": ["Maize", "Poultry Feed Crops"], "zone": "Central"},
    "Karur":          {"soil": "Black Cotton", "avg_rainfall_mm": 840, "primary_crops": ["Cotton", "Paddy"], "zone": "Central"},
    "Tiruchirappalli":{"soil": "Black Cotton", "avg_rainfall_mm": 860, "primary_crops": ["Paddy", "Groundnut", "Pulses"], "zone": "Central"},
    "Madurai":        {"soil": "Black Cotton", "avg_rainfall_mm": 840, "primary_crops": ["Paddy", "Jasmine", "Banana"], "zone": "South"},
    "Dindigul":       {"soil": "Red Loam", "avg_rainfall_mm": 900,  "primary_crops": ["Banana", "Paddy", "Groundnut"], "zone": "South"},
    "Theni":          {"soil": "Red Loam", "avg_rainfall_mm": 1100, "primary_crops": ["Banana", "Cardamom", "Turmeric"], "zone": "South"},
    "Tirunelveli":    {"soil": "Red Sandy", "avg_rainfall_mm": 740,  "primary_crops": ["Paddy", "Banana", "Pulses"], "zone": "South"},
    "Thoothukudi":    {"soil": "Sandy Loam", "avg_rainfall_mm": 630,  "primary_crops": ["Cotton", "Groundnut", "Paddy"], "zone": "South"},
    "Kanyakumari":    {"soil": "Laterite", "avg_rainfall_mm": 1700, "primary_crops": ["Coconut", "Banana", "Tapioca"], "zone": "South"},
    "Vellore":        {"soil": "Red Sandy", "avg_rainfall_mm": 1000, "primary_crops": ["Mango", "Groundnut", "Paddy"], "zone": "North"},
    "Tiruvannamalai": {"soil": "Red Loam", "avg_rainfall_mm": 1100, "primary_crops": ["Paddy", "Groundnut"], "zone": "North"},
    "Villupuram":     {"soil": "Red Sandy", "avg_rainfall_mm": 1150, "primary_crops": ["Paddy", "Sugarcane", "Groundnut"], "zone": "North"},
    "Cuddalore":      {"soil": "Alluvial", "avg_rainfall_mm": 1200, "primary_crops": ["Paddy", "Sugarcane", "Coconut"], "zone": "North"},
    "Dharmapuri":     {"soil": "Red Sandy", "avg_rainfall_mm": 870,  "primary_crops": ["Mango", "Maize", "Groundnut"], "zone": "North"},
    "Krishnagiri":    {"soil": "Red Loam", "avg_rainfall_mm": 900,  "primary_crops": ["Mango", "Tomato", "Groundnut"], "zone": "North"},
    "Nilgiris":       {"soil": "Laterite", "avg_rainfall_mm": 2500, "primary_crops": ["Tea", "Coffee", "Vegetables"], "zone": "Western"},
    "Perambalur":     {"soil": "Red Loam", "avg_rainfall_mm": 830,  "primary_crops": ["Paddy", "Groundnut", "Pulses"], "zone": "Central"},
    "Ariyalur":       {"soil": "Black Cotton", "avg_rainfall_mm": 950, "primary_crops": ["Paddy", "Sugarcane"], "zone": "Central"},
    "Pudukkottai":    {"soil": "Red Sandy", "avg_rainfall_mm": 900,  "primary_crops": ["Paddy", "Groundnut", "Cotton"], "zone": "Central"},
    "Sivaganga":      {"soil": "Black Cotton", "avg_rainfall_mm": 820,  "primary_crops": ["Paddy", "Groundnut", "Pulses"], "zone": "South"},
    "Ramanathapuram": {"soil": "Sandy Loam", "avg_rainfall_mm": 600,  "primary_crops": ["Paddy", "Groundnut", "Seaweed"], "zone": "South"},
    "Virudhunagar":   {"soil": "Red Sandy", "avg_rainfall_mm": 720,  "primary_crops": ["Chilli", "Cotton", "Groundnut"], "zone": "South"},
    "Tenkasi":        {"soil": "Red Loam", "avg_rainfall_mm": 1300, "primary_crops": ["Paddy", "Banana", "Coconut"], "zone": "South"},
    "Kancheepuram":   {"soil": "Alluvial", "avg_rainfall_mm": 1300, "primary_crops": ["Paddy", "Sugarcane"], "zone": "North"},
    "Chengalpattu":   {"soil": "Red Sandy", "avg_rainfall_mm": 1250, "primary_crops": ["Paddy", "Groundnut"], "zone": "North"},
    "Tiruvallur":     {"soil": "Alluvial", "avg_rainfall_mm": 1200, "primary_crops": ["Paddy", "Sugarcane", "Groundnut"], "zone": "North"},
    "Chennai":        {"soil": "Sandy Loam", "avg_rainfall_mm": 1400, "primary_crops": ["Vegetables", "Flowers"], "zone": "North"},
    "Ranipet":        {"soil": "Red Sandy", "avg_rainfall_mm": 1000, "primary_crops": ["Groundnut", "Paddy", "Sugarcane"], "zone": "North"},
    "Tirupathur":     {"soil": "Red Loam", "avg_rainfall_mm": 950,  "primary_crops": ["Mango", "Groundnut", "Maize"], "zone": "North"},
    "Kallakurichi":   {"soil": "Red Sandy", "avg_rainfall_mm": 1050, "primary_crops": ["Paddy", "Sugarcane", "Groundnut"], "zone": "North"},
}

CROP_INFO = {
    "Paddy":      {"season": "Kharif/Rabi", "duration_days": 120, "water_req": "High",   "min_temp": 20, "max_temp": 35},
    "Banana":     {"season": "Annual",       "duration_days": 365, "water_req": "High",   "min_temp": 15, "max_temp": 38},
    "Sugarcane":  {"season": "Annual",       "duration_days": 365, "water_req": "High",   "min_temp": 20, "max_temp": 40},
    "Maize":      {"season": "Kharif",       "duration_days": 90,  "water_req": "Medium", "min_temp": 18, "max_temp": 35},
    "Cotton":     {"season": "Kharif",       "duration_days": 180, "water_req": "Medium", "min_temp": 20, "max_temp": 40},
    "Groundnut":  {"season": "Kharif/Rabi",  "duration_days": 120, "water_req": "Low",    "min_temp": 20, "max_temp": 35},
    "Turmeric":   {"season": "Kharif",       "duration_days": 270, "water_req": "Medium", "min_temp": 20, "max_temp": 35},
    "Coconut":    {"season": "Annual",       "duration_days": 365, "water_req": "Medium", "min_temp": 20, "max_temp": 38},
    "Mango":      {"season": "Annual",       "duration_days": 365, "water_req": "Low",    "min_temp": 24, "max_temp": 40},
    "Tapioca":    {"season": "Annual",       "duration_days": 270, "water_req": "Low",    "min_temp": 20, "max_temp": 38},
    "Pulses":     {"season": "Rabi",         "duration_days": 90,  "water_req": "Low",    "min_temp": 15, "max_temp": 35},
    "Chilli":     {"season": "Kharif/Rabi",  "duration_days": 150, "water_req": "Medium", "min_temp": 20, "max_temp": 35},
    "Tomato":     {"season": "Annual",       "duration_days": 120, "water_req": "Medium", "min_temp": 15, "max_temp": 30},
    "Tea":        {"season": "Annual",       "duration_days": 365, "water_req": "High",   "min_temp": 10, "max_temp": 28},
    "Coffee":     {"season": "Annual",       "duration_days": 365, "water_req": "High",   "min_temp": 15, "max_temp": 28},
    "Vegetables": {"season": "Annual",       "duration_days": 60,  "water_req": "Medium", "min_temp": 15, "max_temp": 32},
    "Flowers":    {"season": "Annual",       "duration_days": 90,  "water_req": "Medium", "min_temp": 15, "max_temp": 35},
    "Jasmine":    {"season": "Annual",       "duration_days": 365, "water_req": "Medium", "min_temp": 20, "max_temp": 38},
    "Cardamom":   {"season": "Annual",       "duration_days": 365, "water_req": "High",   "min_temp": 10, "max_temp": 28},
}

GOVT_SCHEMES = [
    {
        "name": "PM-KISAN",
        "description": "Direct income support of ₹6,000/year to farmer families",
        "eligibility": "All small and marginal farmers",
        "link": "https://pmkisan.gov.in"
    },
    {
        "name": "Tamil Nadu Farmer Assistance Scheme",
        "description": "State government assistance for crop loss due to natural calamities",
        "eligibility": "Farmers with crop loss > 33%",
        "link": "https://www.tn.gov.in"
    },
    {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "description": "Crop insurance at nominal premium rates",
        "eligibility": "All farmers growing notified crops",
        "link": "https://pmfby.gov.in"
    },
    {
        "name": "Kisan Credit Card (KCC)",
        "description": "Credit facility up to ₹3 lakh at 4% interest for crop cultivation",
        "eligibility": "All farmers with land ownership",
        "link": "https://www.nabard.org"
    },
    {
        "name": "TNAU Free Training Scheme",
        "description": "Free agricultural training and technology transfer by Tamil Nadu Agricultural University",
        "eligibility": "All Tamil Nadu farmers",
        "link": "https://www.tnau.ac.in"
    },
    {
        "name": "Soil Health Card Scheme",
        "description": "Free soil testing and nutrient recommendations for every farmer",
        "eligibility": "All farmers in Tamil Nadu",
        "link": "https://soilhealth.dac.gov.in"
    },
]
