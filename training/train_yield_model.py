import pandas as pd
import numpy as np
import pickle
import json
import os
import sys

from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

df = pd.read_csv("datasets/tn_agriculture_data.csv")
print(f"Loaded {len(df)} records")

le_crop = LabelEncoder()
le_district = LabelEncoder()
df["crop_enc"] = le_crop.fit_transform(df["crop"])
df["district_enc"] = le_district.fit_transform(df["district"])

features = ["crop_enc", "district_enc", "soil_enc", "zone_enc",
            "rainfall_mm", "temperature_c", "soil_ph",
            "nitrogen_kg_ha", "phosphorus_kg_ha", "potassium_kg_ha", "area_hectares"]

X = df[features]
y = df["yield_per_ha"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

models = {
    "RandomForest": RandomForestRegressor(n_estimators=200, random_state=42, n_jobs=-1),
    "GradientBoosting": GradientBoostingRegressor(n_estimators=200, random_state=42),
}

results = {}
best_model = None
best_r2 = -999

for name, model in models.items():
    model.fit(X_train_s, y_train)
    preds = model.predict(X_test_s)
    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    results[name] = {"MAE": round(mae, 4), "R2": round(r2, 4)}
    print(f"{name} → MAE: {mae:.4f} | R²: {r2:.4f}")
    if r2 > best_r2:
        best_r2 = r2
        best_model = model
        best_name = name

os.makedirs("models", exist_ok=True)
pickle.dump(best_model, open("models/yield_model.pkl", "wb"))
pickle.dump(scaler, open("models/yield_scaler.pkl", "wb"))
pickle.dump(le_crop, open("models/crop_encoder.pkl", "wb"))
pickle.dump(le_district, open("models/district_encoder.pkl", "wb"))
json.dump(results, open("models/yield_metrics.json", "w"), indent=2)

print(f"\nChampion: {best_name} with R²={best_r2:.4f}")
print("Models saved to models/")
