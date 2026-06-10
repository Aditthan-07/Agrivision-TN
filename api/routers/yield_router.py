from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import numpy as np
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from datasets.tn_districts import DISTRICT_PROFILES, CROP_INFO

router = APIRouter()

def load_models():
    try:
        model = pickle.load(open("models/yield_model.pkl", "rb"))
        scaler = pickle.load(open("models/yield_scaler.pkl", "rb"))
        le_crop = pickle.load(open("models/crop_encoder.pkl", "rb"))
        le_district = pickle.load(open("models/district_encoder.pkl", "rb"))
        return model, scaler, le_crop, le_district
    except:
        return None, None, None, None

class YieldRequest(BaseModel):
    district: str
    crop: str
    area_hectares: float
    rainfall_mm: float = None
    temperature_c: float = 28.0
    soil_ph: float = 6.5
    nitrogen_kg_ha: float = 200.0
    phosphorus_kg_ha: float = 60.0
    potassium_kg_ha: float = 150.0

@router.post("/predict")
def predict_yield(req: YieldRequest):
    profile = DISTRICT_PROFILES.get(req.district)
    if not profile:
        return {"error": f"District '{req.district}' not found"}

    rainfall = req.rainfall_mm if req.rainfall_mm else profile["avg_rainfall_mm"]

    model, scaler, le_crop, le_district = load_models()

    soil_enc = {"Alluvial": 0, "Red Loam": 1, "Red Sandy": 2, "Black Cotton": 3, "Laterite": 4, "Sandy Loam": 5}
    zone_enc = {"Delta": 0, "Western": 1, "Central": 2, "South": 3, "North": 4}

    if model and le_crop and le_district:
        try:
            crop_e = le_crop.transform([req.crop])[0]
            dist_e = le_district.transform([req.district])[0]
            features = np.array([[
                crop_e, dist_e,
                soil_enc.get(profile["soil"], 0),
                zone_enc.get(profile["zone"], 0),
                rainfall, req.temperature_c, req.soil_ph,
                req.nitrogen_kg_ha, req.phosphorus_kg_ha,
                req.potassium_kg_ha, req.area_hectares
            ]])
            features_s = scaler.transform(features)
            yield_per_ha = float(model.predict(features_s)[0])
        except Exception as e:
            yield_per_ha = _rule_based_yield(req.crop, rainfall, profile)
    else:
        yield_per_ha = _rule_based_yield(req.crop, rainfall, profile)

    total_yield = yield_per_ha * req.area_hectares
    crop_data = CROP_INFO.get(req.crop, {})

    market_prices = {
        "Paddy": 2183, "Banana": 1500, "Sugarcane": 340,
        "Maize": 1962, "Cotton": 6620, "Groundnut": 5850,
        "Turmeric": 7400, "Coconut": 3200, "Mango": 3000,
        "Tapioca": 900, "Pulses": 6600, "Chilli": 8000,
        "Tomato": 1200, "Tea": 1800, "Coffee": 9200,
        "Vegetables": 2000, "Flowers": 2500, "Jasmine": 5000,
        "Cardamom": 90000,
    }
    price_per_qt = market_prices.get(req.crop, 2000)
    est_revenue = (total_yield * price_per_qt * 10)

    return {
        "district": req.district,
        "crop": req.crop,
        "area_hectares": req.area_hectares,
        "predicted_yield_per_ha_tonnes": round(yield_per_ha, 2),
        "predicted_total_yield_tonnes": round(total_yield, 2),
        "estimated_revenue_inr": round(est_revenue, 0),
        "rainfall_used_mm": round(rainfall, 1),
        "soil_type": profile["soil"],
        "zone": profile["zone"],
        "crop_season": crop_data.get("season", "N/A"),
        "crop_duration_days": crop_data.get("duration_days", "N/A"),
        "water_requirement": crop_data.get("water_req", "N/A"),
        "model_used": "ML Model" if model else "Rule-based fallback",
    }

def _rule_based_yield(crop, rainfall, profile):
    base_yields = {
        "Paddy": 4.5, "Banana": 35, "Sugarcane": 80, "Maize": 5,
        "Cotton": 1.8, "Groundnut": 2.5, "Turmeric": 6, "Coconut": 12,
        "Mango": 8, "Tapioca": 25, "Pulses": 1.2, "Chilli": 2,
        "Tomato": 20, "Tea": 3, "Coffee": 1.5, "Vegetables": 15,
        "Flowers": 8, "Jasmine": 4, "Cardamom": 0.3,
    }
    base = base_yields.get(crop, 4.0)
    rain_factor = min(rainfall / profile["avg_rainfall_mm"], 1.3)
    return base * rain_factor

@router.get("/crops")
def get_crops():
    return {"crops": list(CROP_INFO.keys())}

@router.get("/districts")
def get_districts():
    return {
        "districts": [
            {"name": d, "soil": p["soil"], "zone": p["zone"], "primary_crops": p["primary_crops"]}
            for d, p in DISTRICT_PROFILES.items()
        ]
    }
