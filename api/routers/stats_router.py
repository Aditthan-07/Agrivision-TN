from fastapi import APIRouter
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from datasets.tn_districts import DISTRICT_PROFILES

router = APIRouter()

@router.get("/overview")
def get_overview():
    zones = {}
    soils = {}
    all_crops = {}

    for d, p in DISTRICT_PROFILES.items():
        zones[p["zone"]] = zones.get(p["zone"], 0) + 1
        soils[p["soil"]] = soils.get(p["soil"], 0) + 1
        for crop in p["primary_crops"]:
            all_crops[crop] = all_crops.get(crop, 0) + 1

    top_crops = sorted(all_crops.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "total_districts": len(DISTRICT_PROFILES),
        "zones": zones,
        "soil_types": soils,
        "top_crops": [{"crop": c, "districts": n} for c, n in top_crops],
        "avg_rainfall_by_zone": {
            zone: round(sum(p["avg_rainfall_mm"] for p in DISTRICT_PROFILES.values() if p["zone"] == zone) /
                        max(1, sum(1 for p in DISTRICT_PROFILES.values() if p["zone"] == zone)), 0)
            for zone in set(p["zone"] for p in DISTRICT_PROFILES.values())
        }
    }

@router.get("/district/{district_name}")
def get_district_stats(district_name: str):
    profile = DISTRICT_PROFILES.get(district_name)
    if not profile:
        return {"error": "District not found"}
    return {
        "district": district_name,
        **profile,
        "crop_count": len(profile["primary_crops"]),
    }

@router.get("/all-districts")
def get_all_districts():
    return {
        "districts": [
            {"name": name, **profile}
            for name, profile in DISTRICT_PROFILES.items()
        ]
    }
