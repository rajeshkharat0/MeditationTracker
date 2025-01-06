'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import Layout from '../components/Layout'
import { getDataForTimeRange } from '../utils/localStorage'

export default function YearlyAnalysis() {
  const [yearData, setYearData] = useState([])

  useEffect(() => {
    const dailyData = getDataForTimeRange(365)
    const monthlyData = dailyData.reduce((acc, day) => {
      const month = new Date(day.date).getMonth()
      if (!acc[month]) {
        acc[month] = { month: new Date(day.date).toLocaleString('default', { month: 'long' }), hours: 0 }
      }
      acc[month].hours += day.total / 3600
      return acc
    }, [])
    setYearData(Object.values(monthlyData))
  }, [])

  const totalHours = yearData.reduce((sum, month) => sum + month.hours, 0).toFixed(2)

  return (
    <Layout>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Yearly Analysis</CardTitle>
          <CardDescription>Your meditation progress for the past year</CardDescription>
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
              <BarChart data={yearData}>
                <XAxis dataKey="month" />
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

