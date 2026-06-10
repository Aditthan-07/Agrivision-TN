# 🌾 AgriVision TN – Smart Crop & Farmer Advisory System

> AI-powered crop yield prediction, disease detection, and personalized farming advisory for all 38 districts of Tamil Nadu.

---

## 🚀 Quick Start (Step by Step)

### Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed

---

### Backend Setup

Open a terminal in the project root folder and run:

```bash
# 1. Install Python dependencies
pip install -r api/requirements.txt

# 2. Generate training dataset
python training/generate_data.py

# 3. Train yield prediction model
python training/train_yield_model.py

# 4. Train disease detection model
python training/train_disease_model.py

# 5. Start the API server
python -m uvicorn api.main:app --reload --port 8000
```

API will be live at: http://localhost:8000
Swagger docs at: http://localhost:8000/docs

---

### Frontend Setup

Open a **second terminal** in the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be live at: http://localhost:3000

---

### OR — Use the batch scripts (Windows)

Double-click `run_backend.bat` → starts and trains the backend  
Double-click `run_frontend.bat` → starts the frontend

---

## 📁 Project Structure

```
agrivision-tn/
├── api/
│   ├── main.py                  # FastAPI app entry point
│   └── routers/
│       ├── yield_router.py      # Crop yield prediction
│       ├── disease_router.py    # Disease detection
│       ├── advisory_router.py   # Farming advisory
│       ├── schemes_router.py    # Government schemes
│       └── stats_router.py      # Dashboard stats
├── training/
│   ├── generate_data.py         # Generates TN agriculture dataset
│   ├── train_yield_model.py     # Trains Random Forest yield model
│   └── train_disease_model.py   # Trains MobileNetV2 disease model
├── datasets/
│   └── tn_districts.py          # All 38 districts data, crops, schemes
├── models/                      # Saved ML models (generated after training)
├── frontend/
│   └── src/app/
│       ├── page.js              # Homepage
│       ├── yield/page.js        # Yield prediction
│       ├── disease/page.js      # Disease detection
│       ├── advisory/page.js     # Farming advisory
│       ├── schemes/page.js      # Government schemes
│       └── dashboard/page.js    # Analytics dashboard
├── run_backend.bat              # Windows: start backend
├── run_frontend.bat             # Windows: start frontend
└── docs/GUIDE.md                # This file
```

---

## 🌟 Features

| Feature | Description |
|---|---|
| Yield Prediction | ML-based yield prediction using soil, rainfall, temperature, and fertilizer data |
| Disease Detection | Upload leaf photo → CNN detects disease and recommends treatment |
| Farming Advisory | Month-wise, district-specific advice for any crop |
| Govt Schemes | PM-KISAN, PMFBY, KCC and TN state schemes with apply links |
| District Dashboard | Charts for zones, soil types, rainfall, and crop coverage |

---

## 🗺️ Districts Covered

All 38 Tamil Nadu districts including Thanjavur, Coimbatore, Madurai, Salem, Tirunelveli, Nilgiris, and more — each with real soil type, average rainfall, primary crops, and agricultural zone data.

---

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 14, Tailwind CSS, Recharts
- **ML Models**: scikit-learn Random Forest + TensorFlow MobileNetV2
- **Data**: Tamil Nadu district-level agriculture data

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/yield/predict | Predict crop yield |
| GET  | /api/yield/districts | All 38 districts |
| GET  | /api/yield/crops | All supported crops |
| POST | /api/disease/detect | Upload image, detect disease |
| POST | /api/advisory/get | Get farming advisory |
| GET  | /api/schemes/all | All government schemes |
| GET  | /api/stats/overview | Dashboard statistics |
| GET  | /api/stats/all-districts | All district profiles |
