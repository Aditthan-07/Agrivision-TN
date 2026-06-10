"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import { MessageSquare, CloudRain, Sprout, CheckCircle, AlertTriangle } from "lucide-react"
import axios from "axios"

const API = "http://localhost:8000"
const DISTRICTS = ["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Villupuram","Virudhunagar"]
const CROPS = ["Paddy","Banana","Sugarcane","Maize","Cotton","Groundnut","Turmeric","Coconut","Mango","Tapioca","Pulses","Chilli","Tomato","Tea","Coffee","Vegetables","Flowers","Jasmine","Cardamom"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

export default function AdvisoryPage() {
  const [form, setForm] = useState({ district: "Thanjavur", crop: "Paddy", month: new Date().getMonth() + 1, soil_ph: 6.5 })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getAdvisory = async () => {
    setLoading(true); setError("")
    try {
      const { data } = await axios.post(`${API}/api/advisory/get`, { ...form, month: parseInt(form.month), soil_ph: parseFloat(form.soil_ph) })
      setResult(data)
    } catch { setError("Could not connect to API.") }
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-700" />
            </div>
            <h1 className="section-title">Farming Advisory</h1>
          </div>
          <p className="section-subtitle ml-10">District-specific, month-wise personalized farming guidance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">District</label>
                <select className="input-field" value={form.district} onChange={e => setForm({...form, district: e.target.value})}>
                  {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Crop</label>
                <select className="input-field" value={form.crop} onChange={e => setForm({...form, crop: e.target.value})}>
                  {CROPS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Month</label>
                <select className="input-field" value={form.month} onChange={e => setForm({...form, month: e.target.value})}>
                  {MONTHS.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Soil pH</label>
                <input type="number" step="0.1" min="4" max="9" className="input-field" value={form.soil_ph}
                  onChange={e => setForm({...form, soil_ph: e.target.value})} />
              </div>
              <button onClick={getAdvisory} disabled={loading} className="btn-primary w-full">
                {loading ? "Getting Advisory..." : "Get Advisory"}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <div className="card bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-blue-900">{result.district} · {MONTHS[result.month - 1]}</h3>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">{result.zone} Zone</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div><p className="text-blue-400 text-xs">Soil</p><p className="font-medium text-blue-800">{result.soil_type}</p></div>
                    <div><p className="text-blue-400 text-xs">Avg Rainfall</p><p className="font-medium text-blue-800">{result.avg_rainfall_mm} mm</p></div>
                  </div>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 mb-3">Advisory Points</h3>
                  <div className="space-y-2">
                    {result.advisory.map((line, i) => (
                      <div key={i} className={`flex gap-2 text-sm p-3 rounded-lg ${line.startsWith("✅") ? "bg-green-50 text-green-800" : line.startsWith("⚠️") ? "bg-amber-50 text-amber-800" : line.startsWith("💧") ? "bg-blue-50 text-blue-800" : "bg-gray-50 text-gray-700"}`}>
                        <p>{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 mb-2">Recommended Crops for {result.district}</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.recommended_crops.map(c => (
                      <span key={c} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16">
                <Sprout className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm">Select your district, crop, and month<br />to get personalized advice</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
