import pandas as pd
import numpy as np
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from datasets.tn_districts import DISTRICT_PROFILES, CROP_INFO

np.random.seed(42)
records = []

for _ in range(5000):
    district = np.random.choice(list(DISTRICT_PROFILES.keys()))
    profile = DISTRICT_PROFILES[district]
    crop = np.random.choice(profile["primary_crops"])
    crop_data = CROP_INFO.get(crop, CROP_INFO["Paddy"])

    rainfall = profile["avg_rainfall_mm"] + np.random.normal(0, 150)
    rainfall = max(200, rainfall)

    temperature = np.random.uniform(crop_data["min_temp"], crop_data["max_temp"])
    soil_ph = np.random.uniform(5.5, 8.0)
    nitrogen = np.random.uniform(100, 400)
    phosphorus = np.random.uniform(20, 120)
    potassium = np.random.uniform(80, 300)
    area_hectares = np.random.uniform(0.5, 10.0)

    water_req_map = {"Low": 1, "Medium": 2, "High": 3}
    water_score = water_req_map[crop_data["water_req"]]

    rainfall_score = min(rainfall / profile["avg_rainfall_mm"], 1.5)
    temp_score = 1.0 - abs(temperature - (crop_data["min_temp"] + crop_data["max_temp"]) / 2) / 20
    soil_score = 1.0 - abs(soil_ph - 6.5) / 2
    nutrient_score = (nitrogen / 300 + phosphorus / 80 + potassium / 200) / 3

    base_yields = {
        "Paddy": 4.5, "Banana": 35, "Sugarcane": 80, "Maize": 5,
        "Cotton": 1.8, "Groundnut": 2.5, "Turmeric": 6, "Coconut": 12,
        "Mango": 8, "Tapioca": 25, "Pulses": 1.2, "Chilli": 2,
        "Tomato": 20, "Tea": 3, "Coffee": 1.5, "Vegetables": 15,
        "Flowers": 8, "Jasmine": 4, "Cardamom": 0.3,
    }
    base_yield = base_yields.get(crop, 4.0)
    yield_per_ha = base_yield * (0.4 * rainfall_score + 0.2 * temp_score + 0.2 * soil_score + 0.2 * nutrient_score)
    yield_per_ha = max(0.1, yield_per_ha + np.random.normal(0, base_yield * 0.1))

    soil_enc = {"Alluvial": 0, "Red Loam": 1, "Red Sandy": 2, "Black Cotton": 3, "Laterite": 4, "Sandy Loam": 5}
    zone_enc = {"Delta": 0, "Western": 1, "Central": 2, "South": 3, "North": 4}

    records.append({
        "district": district,
        "crop": crop,
        "soil_type": profile["soil"],
        "zone": profile["zone"],
        "rainfall_mm": round(rainfall, 1),
        "temperature_c": round(temperature, 1),
        "soil_ph": round(soil_ph, 2),
        "nitrogen_kg_ha": round(nitrogen, 1),
        "phosphorus_kg_ha": round(phosphorus, 1),
        "potassium_kg_ha": round(potassium, 1),
        "area_hectares": round(area_hectares, 2),
        "soil_enc": soil_enc.get(profile["soil"], 0),
        "zone_enc": zone_enc.get(profile["zone"], 0),
        "yield_per_ha": round(yield_per_ha, 2),
    })

df = pd.DataFrame(records)
os.makedirs("datasets", exist_ok=True)
df.to_csv("datasets/tn_agriculture_data.csv", index=False)
print(f"Generated {len(df)} records → datasets/tn_agriculture_data.csv")
print(df.head())
