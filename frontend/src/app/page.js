import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Leaf, BarChart3, Bug, MessageSquare, BookOpen, ArrowRight, MapPin } from "lucide-react"

const features = [
  { href: "/yield",    icon: Leaf,          color: "bg-green-100 text-green-700",  title: "Yield Prediction",    desc: "Predict crop yield for any of TN's 38 districts using ML trained on local soil, rainfall, and crop data." },
  { href: "/disease",  icon: Bug,           color: "bg-red-100 text-red-700",      title: "Disease Detection",   desc: "Upload a leaf photo and instantly detect diseases like leaf blight, blast, or nutrient deficiency." },
  { href: "/advisory", icon: MessageSquare, color: "bg-blue-100 text-blue-700",    title: "Farming Advisory",    desc: "Get month-wise, district-specific farming advice tailored to your soil type and chosen crop." },
  { href: "/schemes",  icon: BookOpen,      color: "bg-amber-100 text-amber-700",  title: "Govt Schemes",        desc: "Discover PM-KISAN, PMFBY, KCC and other government schemes you're eligible for." },
  { href: "/dashboard",icon: BarChart3,     color: "bg-purple-100 text-purple-700",title: "District Dashboard",  desc: "Visualize agriculture statistics across Tamil Nadu's zones, soil types, and top crops." },
]

const stats = [
  { value: "38", label: "Districts Covered" },
  { value: "19", label: "Crop Varieties" },
  { value: "5",  label: "ML Models" },
  { value: "6",  label: "Govt Schemes" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" /> Tamil Nadu Agriculture Intelligence Platform
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Smart Farming for <br />
            <span className="text-yellow-300">Tamil Nadu</span>
          </h1>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            AI-powered crop yield prediction, disease detection, and personalized farming advisory for all 38 districts of Tamil Nadu.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/yield" className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition flex items-center gap-2">
              Predict Yield <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="bg-white/20 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-green-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Everything a Tamil Nadu Farmer Needs</h2>
        <p className="text-center text-gray-500 mb-10">From sowing to selling — all in one platform</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <Link key={f.href} href={f.href}
              className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© 2024 AgriVision TN — Built for Tamil Nadu Farmers</p>
        <p className="mt-1">Powered by FastAPI · Next.js · scikit-learn · TensorFlow</p>
      </footer>
    </div>
  )
}
