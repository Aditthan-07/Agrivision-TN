<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=200&text=AgriVision%20TN&fontSize=65&color=0:16a34a,100:4ade80&fontColor=ffffff&stroke=16a34a&strokeWidth=2&animation=fadeIn" width="100%"/>

<br/>

### 🌾 Smart Crop & Farmer Advisory System for Tamil Nadu

<br/>

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)

<br/>

> *AI-powered crop yield prediction, disease detection, and personalized farming advisory — covering all **38 districts** of Tamil Nadu.*

<br/>

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Step 1 — Clone the Repository](#step-1--clone-the-repository)
  - [Step 2 — Backend Setup](#step-2--backend-setup)
  - [Step 3 — Train the ML Models](#step-3--train-the-ml-models)
  - [Step 4 — Start the Backend Server](#step-4--start-the-backend-server)
  - [Step 5 — Frontend Setup](#step-5--frontend-setup)
- [Windows Quick Start](#-windows-quick-start)
- [API Reference](#-api-reference)
- [Districts Covered](#-districts-covered)
- [Troubleshooting](#-troubleshooting)

---

## 🌱 About the Project

**AgriVision TN** is a full-stack AI web application built to empower Tamil Nadu farmers with intelligent, data-driven farming decisions. It combines machine learning models trained on Tamil Nadu–specific agricultural data with a clean, modern web interface — giving farmers access to yield forecasts, disease diagnosis, month-wise advisory, and government scheme information, all in one place.

> Built for the soil, the season, and the 38 districts of தமிழ்நாடு.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌾 **Yield Prediction** | Input your district, crop, area & soil data → ML model predicts yield in tonnes + estimated revenue in ₹ |
| 🔬 **Disease Detection** | Upload a crop leaf photo → CNN model identifies disease and recommends treatment (in Tamil & English) |
| 📋 **Farming Advisory** | Month-wise, district-specific advice on irrigation, fertilizers, and sowing |
| 🏛️ **Government Schemes** | PM-KISAN, PMFBY, KCC and TN state schemes with direct apply links |
| 📊 **District Dashboard** | Charts for zones, soil types, rainfall distribution and crop coverage across all 38 districts |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualization & charts |
| Lucide React | Icon library |
| Axios | HTTP client for API calls |

### Backend

| Technology | Purpose |
|---|---|
| FastAPI | High-performance Python API framework |
| Uvicorn | ASGI server |
| Pydantic | Data validation |
| scikit-learn | Random Forest / Gradient Boosting for yield prediction |
| TensorFlow + Keras | MobileNetV2 CNN for disease image classification |
| Pandas / NumPy | Data processing |
| Pillow | Image preprocessing |

---

## 📁 Project Structure

```
agrivision-tn/
│
├── 📂 api/                          # FastAPI backend
│   ├── main.py                      # App entry point & CORS config
│   └── routers/
│       ├── yield_router.py          # POST /api/yield/predict
│       ├── disease_router.py        # POST /api/disease/detect
│       ├── advisory_router.py       # POST /api/advisory/get
│       ├── schemes_router.py        # GET  /api/schemes/all
│       └── stats_router.py          # GET  /api/stats/overview
│
├── 📂 training/                     # ML model training scripts
│   ├── generate_data.py             # Generates 5000-record TN agriculture dataset
│   ├── train_yield_model.py         # Trains Random Forest / Gradient Boosting model
│   └── train_disease_model.py       # Trains MobileNetV2 disease classifier
│
├── 📂 datasets/
│   └── tn_districts.py              # All 38 districts — soil, rainfall, crops, schemes
│
├── 📂 models/                       # Auto-generated after training
│   ├── yield_model.pkl
│   ├── yield_scaler.pkl
│   ├── crop_encoder.pkl
│   ├── district_encoder.pkl
│   ├── disease_model.keras
│   └── disease_classes.json
│
├── 📂 frontend/                     # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── page.js              # Homepage
│       │   ├── yield/page.js        # Yield prediction page
│       │   ├── disease/page.js      # Disease detection page
│       │   ├── advisory/page.js     # Farming advisory page
│       │   ├── schemes/page.js      # Government schemes page
│       │   └── dashboard/page.js    # Analytics dashboard
│       ├── components/
│       │   └── Navbar.js            # Navigation bar
│       └── lib/
│           └── api.js               # API helper functions
│
├── run_backend.bat                  # Windows: one-click backend start
├── run_frontend.bat                 # Windows: one-click frontend start
└── docs/GUIDE.md                    # Quick start guide
```

---

## 🚀 Getting Started

> ⚠️ **Important:** You need **two terminals open simultaneously** — one for the backend, one for the frontend. Both must stay running while you use the app.

---

### ✅ Prerequisites

Make sure the following are installed on your system before proceeding:

| Tool | Minimum Version | Download |
|---|---|---|
| Python | 3.11+ | [python.org](https://www.python.org/downloads/) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | comes with Node.js | — |

Verify your setup by running these commands in your terminal:

```bash
python --version   # Expected: Python 3.11.x or higher
node --version     # Expected: v18.x.x or higher
npm --version
```

---

### Step 1 — Clone the Repository

Open **VS Code**, then open the integrated terminal (`Ctrl + \``) and run:

```bash
git clone https://github.com/your-username/agrivision-tn.git
cd agrivision-tn
```

> If you downloaded the ZIP instead, extract it and open the folder in VS Code, then open the terminal.

---

### Step 2 — Backend Setup

In **Terminal 1**, install all Python dependencies:

```bash
pip install -r api/requirements.txt
```

---

### Step 3 — Train the ML Models

> ⏱️ This step only needs to be done **once**. It takes approximately 2–5 minutes.

Run the three training scripts in order:

```bash
# 1. Generate the Tamil Nadu agriculture dataset (5000 records)
python training/generate_data.py

# 2. Train the crop yield prediction model
python training/train_yield_model.py

# 3. Train the plant disease detection CNN model
python training/train_disease_model.py
```

Expected terminal output after all three scripts complete:

```
✅ Generated 5000 records → datasets/tn_agriculture_data.csv
✅ Champion: GradientBoosting with R²=0.97
✅ Disease model saved → val_accuracy: 0.58
```

> The trained model files will be saved automatically inside the `models/` folder.

---

### Step 4 — Start the Backend Server

Still in **Terminal 1**, start the FastAPI server:

```bash
python -m uvicorn api.main:app --reload --port 8000
```

You should see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

> 💡 To explore the API interactively, visit: [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs)

**Keep this terminal running.** Do not close it.

---

### Step 5 — Frontend Setup

Open a **second terminal** in VS Code (`Ctrl + Shift + \``) and run:

```bash
cd frontend
npm install
npm run dev
```

You should see:

```
▲ Next.js 14.2.3
✓ Ready in 4s
- Local: http://localhost:3000
```

> 🌐 Open [http://localhost:3000](http://localhost:3000) in your browser. The app is live!

---

## 🪟 Windows Quick Start

On Windows, you can skip the manual steps above. Just double-click these batch scripts in order:

| Script | What it does |
|---|---|
| `run_backend.bat` | Installs dependencies, trains all models, starts the API server |
| `run_frontend.bat` | Installs npm packages and starts the Next.js dev server |

> Run `run_backend.bat` first and wait for it to fully complete before running `run_frontend.bat`.

---

## 📡 API Reference

**Base URL:** `http://localhost:8000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check & service info |
| `POST` | `/api/yield/predict` | Predict crop yield & estimated revenue |
| `GET` | `/api/yield/districts` | List all 38 districts with soil & crop info |
| `GET` | `/api/yield/crops` | List all supported crops |
| `POST` | `/api/disease/detect` | Upload leaf image → detect disease + treatment |
| `GET` | `/api/disease/diseases` | List all detectable diseases |
| `POST` | `/api/advisory/get` | Get month-wise farming advisory |
| `GET` | `/api/schemes/all` | List all government schemes |
| `GET` | `/api/stats/overview` | Dashboard statistics |
| `GET` | `/api/stats/all-districts` | Full profiles for all 38 districts |

> 📘 Full interactive docs with request/response examples available at: **`http://localhost:8000/docs`**

---

## 🗺️ Districts Covered

All **38 Tamil Nadu districts** with real soil type, average rainfall, primary crops, and agricultural zone data:

| Zone | Districts |
|---|---|
| 🌊 **Delta** | Thanjavur, Tiruvarur, Nagapattinam, Mayiladuthurai |
| 🏔️ **Western** | Coimbatore, Erode, Tiruppur, Nilgiris |
| 🌿 **Central** | Salem, Namakkal, Karur, Tiruchirappalli, Perambalur, Ariyalur, Pudukkottai |
| ☀️ **South** | Madurai, Dindigul, Theni, Tirunelveli, Thoothukudi, Kanyakumari, Sivaganga, Ramanathapuram, Virudhunagar, Tenkasi |
| 🏙️ **North** | Vellore, Tiruvannamalai, Villupuram, Cuddalore, Dharmapuri, Krishnagiri, Kancheepuram, Chengalpattu, Tiruvallur, Chennai, Ranipet, Tirupathur, Kallakurichi |

---

## 🐛 Troubleshooting

<details>
<summary><strong>Module not found: Can't resolve '@/components/Navbar'</strong></summary>

Create a `jsconfig.json` file inside the `frontend/` folder:

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
<summary><strong>Failed to load SWC binary</strong></summary>

Delete `node_modules` and reinstall:

```bash
cd frontend
rm -rf node_modules
npm install
```

</details>

<details>
<summary><strong>Predict Yield button not responding</strong></summary>

Make sure the backend is running on port `8000`. Check Terminal 1 for `Application startup complete`. If it's not running, go back to [Step 4](#step-4--start-the-backend-server).

</details>

<details>
<summary><strong>Models not found error on startup</strong></summary>

You haven't trained the models yet. Run all three scripts in [Step 3](#step-3--train-the-ml-models) before starting the server.

</details>

---

<div align="center">

<br/>

Made with 🌾 for the farmers of Tamil Nadu

<br/>

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=your-username.agrivision-tn)

</div>
#   a g r i v i s i o n - t n  
 