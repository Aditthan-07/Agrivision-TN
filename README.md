# 🌾 AgriVision TN

### Smart Crop & Farmer Advisory System for Tamil Nadu

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)

> AI-powered crop yield prediction, disease detection, and personalized farming advisory — covering all **38 districts** of Tamil Nadu.

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Districts Covered](#-districts-covered)
- [Troubleshooting](#-troubleshooting)

---

## 🌱 About

**AgriVision TN** is a full-stack AI web application built to empower Tamil Nadu farmers with intelligent, data-driven farming decisions. It combines machine learning models trained on Tamil Nadu-specific agricultural data with a clean, modern web interface — giving farmers access to yield forecasts, disease diagnosis, month-wise advisory, and government scheme information, all in one place.

> Built for the soil, the season, and the 38 districts of தமிழ்நாடு.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌾 **Yield Prediction** | Input your district, crop, area & soil data → ML model predicts yield in tonnes + estimated revenue in ₹ |
| 🔬 **Disease Detection** | Upload a crop leaf photo → CNN model identifies disease and recommends treatment (Tamil & English) |
| 📋 **Farming Advisory** | Month-wise, district-specific advice on irrigation, fertilizers, and sowing |
| 🏛️ **Government Schemes** | PM-KISAN, PMFBY, KCC and TN state schemes with direct apply links |
| 📊 **District Dashboard** | Charts for zones, soil types, rainfall distribution across all 38 districts |

---

## 🛠️ Tech Stack

**Frontend**

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualization & charts |
| Axios | HTTP client for API calls |

**Backend**

| Technology | Purpose |
|---|---|
| FastAPI | High-performance Python API framework |
| scikit-learn | Random Forest / Gradient Boosting for yield prediction |
| TensorFlow + Keras | MobileNetV2 CNN for disease image classification |
| Pandas / NumPy | Data processing |

---

## 📁 Project Structure

```
agrivision-tn/
│
├── api/                        # FastAPI backend
│   ├── main.py
│   └── routers/
│       ├── yield_router.py
│       ├── disease_router.py
│       ├── advisory_router.py
│       ├── schemes_router.py
│       └── stats_router.py
│
├── training/                   # ML model training scripts
│   ├── generate_data.py
│   ├── train_yield_model.py
│   └── train_disease_model.py
│
├── datasets/
│   └── tn_districts.py         # All 38 districts data
│
├── models/                     # Auto-generated after training
│   ├── yield_model.pkl
│   ├── disease_model.keras
│   └── disease_classes.json
│
├── frontend/                   # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── page.js
│       │   ├── yield/page.js
│       │   ├── disease/page.js
│       │   ├── advisory/page.js
│       │   ├── schemes/page.js
│       │   └── dashboard/page.js
│       ├── components/
│       │   └── Navbar.js
│       └── lib/
│           └── api.js
│
├── run_backend.bat
└── run_frontend.bat
```

---

## 🚀 Getting Started

> ⚠️ You need **two terminals open at the same time** — one for backend, one for frontend.

### Prerequisites

| Tool | Version |
|---|---|
| Python | 3.11+ |
| Node.js | 18+ |
| npm | comes with Node.js |

Verify:
```bash
python --version
node --version
npm --version
```

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Aditthan-07/agrivision-tn.git
cd agrivision-tn
```

---

### Step 2 — Backend Setup

In **Terminal 1**, install Python dependencies:

```bash
pip install -r api/requirements.txt
```

---

### Step 3 — Train the ML Models

> ⏱️ Only needs to be done once. Takes 2–5 minutes.

```bash
python training/generate_data.py
python training/train_yield_model.py
python training/train_disease_model.py
```

Expected output:
```
✅ Generated 5000 records → datasets/tn_agriculture_data.csv
✅ Champion: GradientBoosting with R²=0.97
✅ Disease model saved → val_accuracy: 0.58
```

---

### Step 4 — Start the Backend Server

```bash
python -m uvicorn api.main:app --reload --port 8000
```

Visit `http://127.0.0.1:8000/docs` to explore the API.

---

### Step 5 — Frontend Setup

Open **Terminal 2**:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. The app is live! 🎉

---

## 🪟 Windows Quick Start

Double-click these batch scripts in order:

| Script | What it does |
|---|---|
| `run_backend.bat` | Installs dependencies, trains models, starts API |
| `run_frontend.bat` | Installs packages and starts Next.js |

---

## 📡 API Reference

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/api/yield/predict` | Predict crop yield & revenue |
| GET | `/api/yield/districts` | List all 38 districts |
| POST | `/api/disease/detect` | Upload leaf image → detect disease |
| POST | `/api/advisory/get` | Get month-wise advisory |
| GET | `/api/schemes/all` | List government schemes |
| GET | `/api/stats/overview` | Dashboard statistics |

---

## 🗺️ Districts Covered

| Zone | Districts |
|---|---|
| 🌊 Delta | Thanjavur, Tiruvarur, Nagapattinam, Mayiladuthurai |
| 🏔️ Western | Coimbatore, Erode, Tiruppur, Nilgiris |
| 🌿 Central | Salem, Namakkal, Karur, Tiruchirappalli, Perambalur, Ariyalur, Pudukkottai |
| ☀️ South | Madurai, Dindigul, Theni, Tirunelveli, Thoothukudi, Kanyakumari, Sivaganga, Ramanathapuram, Virudhunagar, Tenkasi |
| 🏙️ North | Vellore, Tiruvannamalai, Villupuram, Cuddalore, Dharmapuri, Krishnagiri, Kancheepuram, Chengalpattu, Tiruvallur, Chennai, Ranipet, Tirupathur, Kallakurichi |

---

## 🐛 Troubleshooting

<details>
<summary><b>Module not found: Can't resolve '@/components/Navbar'</b></summary>

Create `jsconfig.json` inside `frontend/`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": { "@/*": ["./*"] },
    "ignoreDeprecations": "5.0"
  }
}
```
</details>

<details>
<summary><b>Failed to load SWC binary</b></summary>

```bash
cd frontend
rm -rf node_modules
npm install
```
</details>

<details>
<summary><b>Predict Yield button not responding</b></summary>

Make sure the backend is running on port 8000. Check Terminal 1 for `Application startup complete`.
</details>

<details>
<summary><b>Models not found error</b></summary>

Run all three training scripts in Step 3 before starting the server.
</details>

---

<div align="center">
Made with 🌾 for the farmers of Tamil Nadu
</div>
