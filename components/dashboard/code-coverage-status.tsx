"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

interface CodeCoverageStatusProps {
  coverage: {
    details: {
      covered: number
      priorAuth: number
      notCovered: number
    }
  }
  filters: string[]
}

// Update the COLORS array to use our expanded palette
const COLORS = ["#449CFB", "#F087FB", "#0071EA"]

export function CodeCoverageStatus({ coverage, filters }: CodeCoverageStatusProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0])

  const data = [
    { name: "Covered", value: coverage.details.covered },
    { name: "Prior Auth", value: coverage.details.priorAuth },
    { name: "Not Covered", value: coverage.details.notCovered },
  ]

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">CPT/HCPCS Coverage Status</h3>
        <div className="flex rounded-md border p-0.5 text-xs">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-md px-3 py-1 transition-colors",
                activeFilter === filter ? "bg-primary-100 text-primary-700" : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        {coverage.details.covered}% Covered, {coverage.details.priorAuth}% Prior Auth, {coverage.details.notCovered}%
        Not Covered
      </p>
    </div>
  )
}
