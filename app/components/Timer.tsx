'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

export default function Timer({ onComplete }: { onComplete: (seconds: number) => void }) {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const toggleTimer = () => {
    if (isRunning) {
      if (time < 60) { // Less than 1 minute
        toast({
          title: "Meditation too short",
          description: "Meditation sessions should be at least 1 minute long.",
          variant: "destructive",
        })
        return
      }
      onComplete(time)
      setTime(0)
    }
    setIsRunning(!isRunning)
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-center">
      <div className="text-6xl font-mono mb-4">{formatTime(time)}</div>
      <Button onClick={toggleTimer} className="px-8 py-4 text-lg">
        {isRunning ? 'Stop' : 'Record'}
      </Button>
    </div>
  )
}

