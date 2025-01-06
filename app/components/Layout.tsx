import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getMeditationSessions } from '../utils/localStorage'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleExport = () => {
    const sessions = getMeditationSessions()
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Duration (seconds)\n"
      + sessions.map(s => `${s.date},${s.duration}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "meditation_sessions.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Meditation Tracker</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75 transition-opacity">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="mt-8">
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/weekly-summary" className="text-gray-600 hover:text-gray-900">
                    Weekly Summary
                  </Link>
                </li>
                <li>
                  <Link href="/monthly-overview" className="text-gray-600 hover:text-gray-900">
                    Monthly Overview
                  </Link>
                </li>
                <li>
                  <Link href="/yearly-analysis" className="text-gray-600 hover:text-gray-900">
                    Yearly Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/goals" className="text-gray-600 hover:text-gray-900">
                    Custom Goals
                  </Link>
                </li>
                <li>
                  <Link href="/edit-entries" className="text-gray-600 hover:text-gray-900">
                    Edit Entries
                  </Link>
                </li>
                <li>
                  <Button onClick={handleExport} className="w-full flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Export Data
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

