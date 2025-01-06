'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import Layout from '../components/Layout'
import { getDataForTimeRange } from '../utils/localStorage'

export default function WeeklySummary() {
  const [weekData, setWeekData] = useState([])

  useEffect(() => {
    const data = getDataForTimeRange(7).map(day => ({
      date: day.date,
      hours: day.total / 3600
    }))
    setWeekData(data)
  }, [])

  const totalHours = weekData.reduce((sum, day) => sum + day.hours, 0).toFixed(2)

  return (
    <Layout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
          <CardDescription>Your meditation progress for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">Total: {totalHours} hours</p>
          <ChartContainer
            config={{
              hours: {
                label: "Hours",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </Layout>
  )
}

