'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Layout from '../components/Layout'
import { MeditationSession, getMeditationSessions, saveMeditationSession } from '../utils/localStorage'
import { toast } from '@/components/ui/use-toast'

export default function EditEntries() {
  const [sessions, setSessions] = useState<MeditationSession[]>([])

  useEffect(() => {
    setSessions(getMeditationSessions())
  }, [])

  const handleUpdateSession = (index: number, updatedSession: MeditationSession) => {
    const newSessions = [...sessions]
    newSessions[index] = updatedSession
    setSessions(newSessions)
    saveMeditationSession(updatedSession)
    toast({
      title: "Session updated",
      description: "Your meditation session has been updated successfully.",
    })
  }

  const handleDeleteSession = (index: number) => {
    const newSessions = sessions.filter((_, i) => i !== index)
    setSessions(newSessions)
    localStorage.setItem('meditationSessions', JSON.stringify(newSessions))
    toast({
      title: "Session deleted",
      description: "Your meditation session has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Meditation Entries</h1>
      {sessions.map((session, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>Session on {new Date(session.date).toLocaleDateString()}</CardTitle>
            <CardDescription>Duration: {Math.floor(session.duration / 60)} minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`date-${index}`}>Date</Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={session.date}
                  onChange={(e) => handleUpdateSession(index, { ...session, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`duration-${index}`}>Duration (minutes)</Label>
                <Input
                  id={`duration-${index}`}
                  type="number"
                  value={Math.floor(session.duration / 60)}
                  onChange={(e) => handleUpdateSession(index, { ...session, duration: parseInt(e.target.value) * 60 })}
                />
              </div>
              <Button variant="destructive" onClick={() => handleDeleteSession(index)}>Delete Session</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </Layout>
  )
}

