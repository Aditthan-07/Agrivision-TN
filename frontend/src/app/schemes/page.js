"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { BookOpen, ExternalLink } from "lucide-react"
import axios from "axios"

const API = "http://localhost:8000"

const colors = ["bg-green-100 text-green-700","bg-blue-100 text-blue-700","bg-amber-100 text-amber-700","bg-purple-100 text-purple-700","bg-red-100 text-red-700","bg-teal-100 text-teal-700"]

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/schemes/all`)
      .then(({ data }) => setSchemes(data.schemes))
      .catch(() => setSchemes([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-700" />
            </div>
            <h1 className="section-title">Government Schemes</h1>
          </div>
          <p className="section-subtitle ml-10">Central and Tamil Nadu government schemes for farmers</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading schemes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemes.map((s, i) => (
              <div key={s.name} className="card hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors[i % colors.length]}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                    <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-1.5 mb-3">
                      <p className="text-xs text-green-700"><span className="font-semibold">Eligibility:</span> {s.eligibility}</p>
                    </div>
                    <a href={s.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      Apply / Learn More <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
