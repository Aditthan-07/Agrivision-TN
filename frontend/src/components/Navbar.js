"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, BarChart3, Bug, MessageSquare, BookOpen, Home } from "lucide-react"

const links = [
  { href: "/",          label: "Home",     icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/yield",     label: "Yield",    icon: Leaf },
  { href: "/disease",   label: "Disease",  icon: Bug },
  { href: "/advisory",  label: "Advisory", icon: MessageSquare },
  { href: "/schemes",   label: "Schemes",  icon: BookOpen },
]

export default function Navbar() {
  const path = usePathname()
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">AgriVision <span className="text-green-600">TN</span></span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${path === href ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
