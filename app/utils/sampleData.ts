export function generateSampleData(days: number) {
  const data = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      hours: Math.random() * 3 + 0.5, // Random hours between 0.5 and 3.5
    })
  }
  return data
}

