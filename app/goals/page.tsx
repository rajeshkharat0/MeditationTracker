'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Layout from '../components/Layout'
import { Goal, saveGoal, getGoals, updateGoal, deleteGoal, getGoalProgress } from '../utils/localStorage'

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({})

  useEffect(() => {
    setGoals(getGoals())
  }, [])

  const handleAddGoal = () => {
    if (newGoal.description && newGoal.targetHours && newGoal.startDate && newGoal.endDate) {
      const goal: Goal = {
        id: uuidv4(),
        description: newGoal.description,
        targetHours: Number(newGoal.targetHours),
        startDate: newGoal.startDate,
        endDate: newGoal.endDate
      }
      saveGoal(goal)
      setGoals([...goals, goal])
      setNewGoal({})
    }
  }

  const handleDeleteGoal = (id: string) => {
    deleteGoal(id)
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <Layout>
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Set a New Goal</CardTitle>
          <CardDescription>Create a new meditation goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Goal Description</Label>
              <Input
                id="description"
                value={newGoal.description || ''}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                placeholder="Meditate every day"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetHours">Target Hours</Label>
              <Input
                id="targetHours"
                type="number"
                value={newGoal.targetHours || ''}
                onChange={(e) => setNewGoal({...newGoal, targetHours: e.target.value})}
                placeholder="50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newGoal.startDate || ''}
                onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newGoal.endDate || ''}
                onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
              />
            </div>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
        </CardContent>
      </Card>

      {goals.map(goal => (
        <Card key={goal.id} className="w-full mb-4">
          <CardHeader>
            <CardTitle>{goal.description}</CardTitle>
            <CardDescription>
              Target: {goal.targetHours} hours | {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={getGoalProgress(goal.id) * 100} className="w-full" />
            <div className="mt-2 flex justify-between items-center">
              <span>{Math.round(getGoalProgress(goal.id) * 100)}% Complete</span>
              <Button variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>Delete Goal</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </Layout>
  )
}

