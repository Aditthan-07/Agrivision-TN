"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { BarChart3, MapPin } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import axios from "axios"

const API = "http://localhost:8000"
const PIE_COLORS = ["#22c55e","#16a34a","#f59e0b","#3b82f6","#8b5cf6","#ef4444"]

export default function DashboardPage() {
  const [overview, setOverview] = useState(null)
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/api/stats/overview`),
      axios.get(`${API}/api/stats/all-districts`),
    ]).then(([ov, dists]) => {
      setOverview(ov.data)
      setDistricts(dists.data.districts)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen"><Navbar /><div className="text-center py-20 text-gray-400">Loading dashboard...</div></div>

  const zoneData = overview ? Object.entries(overview.zones).map(([k, v]) => ({ name: k, value: v })) : []
  const soilData = overview ? Object.entries(overview.soil_types).map(([k, v]) => ({ name: k, districts: v })) : []
  const rainfallData = overview ? Object.entries(overview.avg_rainfall_by_zone).map(([k, v]) => ({ zone: k, rainfall: v })) : []

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-purple-700" />
            </div>
            <h1 className="section-title">District Agriculture Dashboard</h1>
          </div>
          <p className="section-subtitle ml-10">Tamil Nadu's 38 districts — agriculture statistics at a glance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Districts", value: overview?.total_districts || 38 },
            { label: "Agricultural Zones", value: Object.keys(overview?.zones || {}).length },
            { label: "Soil Types", value: Object.keys(overview?.soil_types || {}).length },
            { label: "Top Crop", value: overview?.top_crops?.[0]?.crop || "Paddy" },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <div className="text-3xl font-extrabold text-green-600">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-4">Districts by Zone</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={zoneData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name, value}) => `${name}: ${value}`}>
                  {zoneData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="font-bold text-gray-800 mb-4">Avg Rainfall by Zone (mm)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={rainfallData}>
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="rainfall" fill="#22c55e" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Top 10 Crops by District Coverage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={overview?.top_crops || []} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="crop" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip />
              <Bar dataKey="districts" fill="#16a34a" radius={[0,6,6,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4">All 38 Districts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 rounded-lg">
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">District</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Zone</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Soil Type</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Rainfall (mm)</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Primary Crops</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((d, i) => (
                  <tr key={d.name} className={`border-t border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="px-3 py-2 font-medium text-gray-900 flex items-center gap-1"><MapPin className="w-3 h-3 text-green-500" />{d.name}</td>
                    <td className="px-3 py-2"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{d.zone}</span></td>
                    <td className="px-3 py-2 text-gray-600">{d.soil}</td>
                    <td className="px-3 py-2 text-gray-600">{d.avg_rainfall_mm}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{d.primary_crops?.slice(0,3).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
