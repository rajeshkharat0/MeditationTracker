'use client'

import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Timer from './components/Timer'
import ManualEntry from './components/ManualEntry'
import { getTodayTotal, saveMeditationSession } from './utils/localStorage'

export default function Home() {
  const [todayTotal, setTodayTotal] = useState(0)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    setTodayTotal(getTodayTotal())
  }, [])

  const addMeditationTime = (seconds: number) => {
    const now = new Date()
    saveMeditationSession({
      date: now.toISOString().split('T')[0],
      duration: seconds
    })
    setTodayTotal(getTodayTotal())
  }

  return (
    <Layout>
      <div className="space-y-12 py-8"> {/* Increased vertical spacing */}
        <div className="text-center bg-white rounded-lg shadow-md p-8"> {/* Added padding and styling */}
          <p className="text-xl font-semibold text-gray-600 mb-2">{currentDate}</p>
          <p className="text-3xl font-bold text-gray-900">
            Today's Total: {Math.floor(todayTotal / 3600)}h {Math.floor((todayTotal % 3600) / 60)}m {todayTotal % 60}s
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8"> {/* Added padding and styling */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Timer</h2>
          <Timer onComplete={addMeditationTime} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8"> {/* Added padding and styling */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Manual Entry</h2>
          <ManualEntry onSubmit={addMeditationTime} />
        </div>
      </div>
    </Layout>
  )
}

