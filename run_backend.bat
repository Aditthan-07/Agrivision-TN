@echo off
echo ========================================
echo   AgriVision TN - Starting Backend API
echo ========================================

cd /d "%~dp0"

echo.
echo Step 1: Installing Python dependencies...
pip install -r api/requirements.txt

echo.
echo Step 2: Generating training data...
python training/generate_data.py

echo.
echo Step 3: Training yield prediction model...
python training/train_yield_model.py

echo.
echo Step 4: Training disease detection model...
python training/train_disease_model.py

echo.
echo Step 5: Starting FastAPI server on http://localhost:8000
echo Press Ctrl+C to stop.
echo.
python -m uvicorn api.main:app --reload --port 8000
