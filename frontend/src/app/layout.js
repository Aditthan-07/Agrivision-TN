import "./globals.css"

export const metadata = {
  title: "AgriVision TN – Smart Farmer Advisory",
  description: "AI-powered crop advisory system for Tamil Nadu's 38 districts",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 font-sans">{children}</body>
    </html>
  )
}
