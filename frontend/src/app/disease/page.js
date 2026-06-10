"use client"
import { useState, useRef } from "react"
import Navbar from "@/components/Navbar"
import { Bug, Upload, AlertTriangle, CheckCircle, X } from "lucide-react"
import axios from "axios"

const API = "http://localhost:8000"

const severityConfig = {
  None:     { color: "text-green-700 bg-green-50 border-green-200",  icon: CheckCircle },
  Low:      { color: "text-blue-700 bg-blue-50 border-blue-200",     icon: AlertTriangle },
  Moderate: { color: "text-amber-700 bg-amber-50 border-amber-200",  icon: AlertTriangle },
  Severe:   { color: "text-red-700 bg-red-50 border-red-200",        icon: X },
}

export default function DiseasePage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleFile = f => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null); setError("")
  }

  const detect = async () => {
    if (!file) return
    setLoading(true); setError("")
    const fd = new FormData()
    fd.append("file", file)
    try {
      const { data } = await axios.post(`${API}/api/disease/detect`, fd)
      setResult(data)
    } catch {
      setError("Could not connect to API. Make sure the backend is running.")
    }
    setLoading(false)
  }

  const sev = result ? severityConfig[result.severity] || severityConfig["Low"] : null

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Bug className="w-4 h-4 text-red-700" />
            </div>
            <h1 className="section-title">Crop Disease Detection</h1>
          </div>
          <p className="section-subtitle ml-10">Upload a leaf photo to detect diseases and get treatment advice</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition mb-4 ${dragging ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-gray-50"}`}
              onClick={() => inputRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
              ) : (
                <div>
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Drop a leaf photo here or click to browse</p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP supported</p>
                </div>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            {file && <p className="text-xs text-gray-400 mb-3 truncate">📎 {file.name}</p>}
            <button onClick={detect} disabled={!file || loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Analyzing..." : "Detect Disease"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                <div className={`card border ${sev.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide">Detection Result</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sev.color}`}>
                      {result.severity === "None" ? "Healthy" : result.severity}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">{result.disease.replace("_", " ")}</h2>
                  <p className="text-sm text-gray-500">{result.tamil_name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${result.confidence}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{result.confidence}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Confidence</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{result.description}</p>
                </div>
                <div className="card bg-amber-50 border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">Treatment Recommendation</h3>
                  <p className="text-sm text-amber-700">{result.treatment}</p>
                </div>
              </div>
            ) : (
              <div className="card h-full flex flex-col items-center justify-center text-center py-16">
                <Bug className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-gray-400 text-sm">Upload a leaf photo and click<br /><strong>Detect Disease</strong></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
