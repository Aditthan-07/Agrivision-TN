from fastapi import APIRouter
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
from datasets.tn_districts import DISTRICT_PROFILES, GOVT_SCHEMES

router = APIRouter()

@router.get("/all")
def get_all_schemes():
    return {"schemes": GOVT_SCHEMES, "total": len(GOVT_SCHEMES)}

@router.get("/for/{crop}")
def get_schemes_for_crop(crop: str):
    relevant = GOVT_SCHEMES
    return {"crop": crop, "schemes": relevant, "total": len(relevant)}
