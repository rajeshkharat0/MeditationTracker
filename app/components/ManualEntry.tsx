'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function ManualEntry({ onSubmit }: { onSubmit: (seconds: number) => void }) {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
    if (totalSeconds < 60) {
      toast({
        title: "Invalid duration",
        description: "Meditation sessions should be at least 1 minute long.",
        variant: "destructive",
      })
      return
    }
    if (totalSeconds > 24 * 3600) {
      toast({
        title: "Invalid duration",
        description: "Meditation sessions cannot be longer than 24 hours.",
        variant: "destructive",
      })
      return
    }
    onSubmit(totalSeconds)
    setHours('')
    setMinutes('')
    setSeconds('')
    toast({
      title: "Meditation session added",
      description: `Added a session of ${formatTime(totalSeconds)}.`,
    })
  }

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h}h ${m}m ${s}s`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="HH"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="0"
          max="23"
        />
        <Input
          type="number"
          placeholder="MM"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="0"
          max="59"
        />
        <Input
          type="number"
          placeholder="SS"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          min="0"
          max="59"
        />
      </div>
      <Button type="submit" className="w-full">Add Manually</Button>
    </form>
  )
}

