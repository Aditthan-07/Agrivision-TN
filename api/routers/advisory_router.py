from fastapi import APIRouter
from pydantic import BaseModel
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from datasets.tn_districts import DISTRICT_PROFILES, CROP_INFO, GOVT_SCHEMES

router = APIRouter()

class AdvisoryRequest(BaseModel):
    district: str
    crop: str
    month: int
    soil_ph: float = 6.5

MONTHLY_ADVICE = {
    1:  "January: Good time for Rabi crop harvesting. Prepare land for summer crops. Apply organic manure.",
    2:  "February: Ideal for sowing groundnut and vegetables. Monitor for aphid attacks.",
    3:  "March: Summer begins. Ensure proper irrigation. Good time for mango flowering.",
    4:  "April: Peak summer – increase irrigation frequency. Protect crops from heat stress.",
    5:  "May: Pre-monsoon sowing of Kharif crops. Prepare fields. Apply basal fertilizers.",
    6:  "June: Southwest monsoon arrives. Plant paddy seedlings. Apply nitrogen in split doses.",
    7:  "July: Active monsoon. Ensure proper drainage. Watch for blast and blight diseases.",
    8:  "August: Paddy tillering stage. Apply potassium. Scout for stem borer.",
    9:  "September: Northeast monsoon preparation. Harvest early Kharif crops.",
    10: "October: Northeast monsoon active. Excellent for paddy second crop. Drain waterlogged fields.",
    11: "November: Good for planting banana and sugarcane. Apply phosphorus fertilizer.",
    12: "December: Winter – ideal for vegetables and pulses. Minimal irrigation needed.",
}

@router.post("/get")
def get_advisory(req: AdvisoryRequest):
    profile = DISTRICT_PROFILES.get(req.district)
    if not profile:
        return {"error": f"District '{req.district}' not found"}

    crop_data = CROP_INFO.get(req.crop, {})
    advice_lines = []

    monthly = MONTHLY_ADVICE.get(req.month, "")
    advice_lines.append(monthly)

    if req.soil_ph < 5.5:
        advice_lines.append("⚠️ Soil is too acidic. Apply lime @ 500kg/ha to raise pH.")
    elif req.soil_ph > 7.5:
        advice_lines.append("⚠️ Soil is alkaline. Apply gypsum @ 400kg/ha to lower pH.")
    else:
        advice_lines.append("✅ Soil pH is optimal for most crops.")

    water_req = crop_data.get("water_req", "Medium")
    if water_req == "High":
        advice_lines.append(f"💧 {req.crop} requires high water. Ensure 5–7 irrigations during growth stages.")
    elif water_req == "Medium":
        advice_lines.append(f"💧 {req.crop} requires moderate water. Irrigate every 7–10 days.")
    else:
        advice_lines.append(f"💧 {req.crop} is drought-tolerant. Irrigate only at critical stages.")

    if req.crop in profile["primary_crops"]:
        advice_lines.append(f"✅ {req.crop} is well-suited for {req.district} district's {profile['soil']} soil.")
    else:
        advice_lines.append(f"⚠️ {req.crop} is not a primary crop in {req.district}. Consider: {', '.join(profile['primary_crops'][:3])}.")

    return {
        "district": req.district,
        "crop": req.crop,
        "month": req.month,
        "zone": profile["zone"],
        "soil_type": profile["soil"],
        "advisory": advice_lines,
        "recommended_crops": profile["primary_crops"],
        "avg_rainfall_mm": profile["avg_rainfall_mm"],
    }
