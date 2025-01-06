'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import Layout from '../components/Layout'
import { getDataForTimeRange } from '../utils/localStorage'

export default function MonthlyOverview() {
  const [monthData, setMonthData] = useState([])

  useEffect(() => {
    const dailyData = getDataForTimeRange(30)
    const weeklyData = dailyData.reduce((acc, day, index) => {
      const weekIndex = Math.floor(index / 7)
      if (!acc[weekIndex]) {
        acc[weekIndex] = { week: `Week ${weekIndex + 1}`, hours: 0 }
      }
      acc[weekIndex].hours += day.total / 3600
      return acc
    }, [])
    setMonthData(weeklyData)
  }, [])

  const totalHours = monthData.reduce((sum, week) => sum + week.hours, 0).toFixed(2)

  return (
    <Layout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>Your meditation progress for the past month</CardDescription>
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
              <BarChart data={monthData}>
                <XAxis dataKey="week" />
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

