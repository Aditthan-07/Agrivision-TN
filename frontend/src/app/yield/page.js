"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import { Leaf, TrendingUp, IndianRupee, Droplets, Calendar } from "lucide-react"
import axios from "axios"

const API = "http://localhost:8000"

const DISTRICTS = ["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Villupuram","Virudhunagar"]
const CROPS = ["Paddy","Banana","Sugarcane","Maize","Cotton","Groundnut","Turmeric","Coconut","Mango","Tapioca","Pulses","Chilli","Tomato","Tea","Coffee","Vegetables","Flowers","Jasmine","Cardamom"]

export default function YieldPage() {
  const [form, setForm] = useState({ district: "Thanjavur", crop: "Paddy", area_hectares: 2, rainfall_mm: "", temperature_c: 28, soil_ph: 6.5, nitrogen_kg_ha: 200, phosphorus_kg_ha: 60, potassium_kg_ha: 150 })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const predict = async () => {
    setLoading(true); setError(""); setResult(null)
    try {
      const { data } = await axios.post(`${API}/api/yield/predict`, {
        ...form,
        area_hectares: parseFloat(form.area_hectares),
        rainfall_mm: form.rainfall_mm ? parseFloat(form.rainfall_mm) : null,
        temperature_c: parseFloat(form.temperature_c),
        soil_ph: parseFloat(form.soil_ph),
        nitrogen_kg_ha: parseFloat(form.nitrogen_kg_ha),
        phosphorus_kg_ha: parseFloat(form.phosphorus_kg_ha),
        potassium_kg_ha: parseFloat(form.potassium_kg_ha),
      })
      setResult(data)
    } catch (e) {
      setError("Could not connect to API. Make sure the backend is running.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-700" />
            </div>
            <h1 className="section-title">Crop Yield Prediction</h1>
          </div>
          <p className="section-subtitle ml-10">Enter your field details to predict yield and estimated revenue</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">Field Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">District</label>
                  <select name="district" value={form.district} onChange={handleChange} className="input-field">
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Crop</label>
                  <select name="crop" value={form.crop} onChange={handleChange} className="input-field">
                    {CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Area (hectares)</label>
                  <input type="number" name="area_hectares" value={form.area_hectares} onChange={handleChange} step="0.1" className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Rainfall (mm) – optional</label>
                  <input type="number" name="rainfall_mm" value={form.rainfall_mm} onChange={handleChange} placeholder="Auto from district" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Temperature (°C)</label>
                  <input type="number" name="temperature_c" value={form.temperature_c} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Soil pH</label>
                  <input type="number" name="soil_ph" value={form.soil_ph} onChange={handleChange} step="0.1" className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Nitrogen (kg/ha)</label>
                  <input type="number" name="nitrogen_kg_ha" value={form.nitrogen_kg_ha} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Phosphorus</label>
                  <input type="number" name="phosphorus_kg_ha" value={form.phosphorus_kg_ha} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Potassium</label>
                  <input type="number" name="potassium_kg_ha" value={form.potassium_kg_ha} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <button onClick={predict} disabled={loading} className="btn-primary w-full mt-2">
                {loading ? "Predicting..." : "Predict Yield"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Predicted Yield</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-green-700">{result.predicted_total_yield_tonnes}</span>
                    <span className="text-gray-500 mb-1">tonnes</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{result.predicted_yield_per_ha_tonnes} t/ha × {form.area_hectares} ha</p>
                </div>
                <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Estimated Revenue</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-6 h-6 text-amber-600" />
                    <span className="text-4xl font-extrabold text-amber-700">{result.estimated_revenue_inr?.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 mb-3">Crop Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["District", result.district],
                      ["Soil Type", result.soil_type],
                      ["Zone", result.zone],
                      ["Season", result.crop_season],
                      ["Duration", `${result.crop_duration_days} days`],
                      ["Water Need", result.water_requirement],
                      ["Rainfall Used", `${result.rainfall_used_mm} mm`],
                      ["Model", result.model_used],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-400">{k}</p>
                        <p className="font-medium text-gray-800">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16">
                <TrendingUp className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm">Fill in the details and click<br /><strong>Predict Yield</strong> to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
