from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from api.routers import yield_router, disease_router, advisory_router, schemes_router, stats_router

app = FastAPI(
    title="AgriVision TN API",
    description="Smart Crop & Farmer Advisory System for Tamil Nadu",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(yield_router.router, prefix="/api/yield", tags=["Yield Prediction"])
app.include_router(disease_router.router, prefix="/api/disease", tags=["Disease Detection"])
app.include_router(advisory_router.router, prefix="/api/advisory", tags=["Farming Advisory"])
app.include_router(schemes_router.router, prefix="/api/schemes", tags=["Government Schemes"])
app.include_router(stats_router.router, prefix="/api/stats", tags=["District Stats"])

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "AgriVision TN – Smart Farmer Advisory System",
        "version": "1.0.0",
        "districts_covered": 38,
    }
