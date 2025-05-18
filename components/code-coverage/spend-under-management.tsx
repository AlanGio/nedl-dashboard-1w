"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SpendUnderManagementProps {
  data: Array<{
    name: string
    value: number
    highlighted?: boolean
  }>
}

export function SpendUnderManagement({ data }: SpendUnderManagementProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-medium">Spend Under Management ($PMPM)</h3>
        <p className="text-sm text-slate-500">Total $PMPM being managed today by a given payer's policies</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value} PMPM`, "Spend"]} labelFormatter={(name) => `Payer ${name}`} />
            <Bar dataKey="value" fill={(entry) => (entry.highlighted ? "#F087FB" : "#e2e8f0")} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <text
                  key={`label-${index}`}
                  x={index * (100 / data.length) + 50 / data.length}
                  y={entry.value < 100 ? 200 - entry.value - 15 : 200 - entry.value + 15}
                  fill={entry.value < 100 ? "#8A287F" : "#fff"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={12}
                >
                  {entry.value}
                </text>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
