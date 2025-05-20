"use client"

import React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"

interface HeatmapChartProps {
  data: Record<string, number>
  title: string
  maxValue: number
}

export function HeatmapChart({ data, title, maxValue }: HeatmapChartProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  // Generate days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Generate weeks (last 5 weeks)
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

  // Get color intensity based on value
  const getColorIntensity = (value: number) => {
    const normalizedValue = Math.min(value / maxValue, 1)
    return `rgba(68, 156, 251, ${normalizedValue})`
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-custom">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        <div className="flex items-center rounded-md border bg-slate-50 px-3 py-1 text-xs shadow-custom">
          <Calendar className="mr-2 h-4 w-4 text-slate-500 no-shadow" />
          <span>Last 5 Weeks</span>
        </div>
      </div>

      <div className="h-60 flex flex-col justify-center h-auto">
        <div className="mb-2 grid grid-cols-8 gap-1">
          {/* Empty cell for top-left corner */}
          <div className="text-center"></div>

          {/* Day headers */}
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[9px] font-medium text-slate-500">
              {day}
            </div>
          ))}

          {/* Week rows with data cells */}
          {weeks.map((week) => (
            <React.Fragment key={week}>
              {/* Week label */}
              <div className="text-right pr-1 text-[9px] font-medium text-slate-500 flex items-center justify-end">
                {week}
              </div>

              {/* Data cells for each day */}
              {daysOfWeek.map((day) => {
                const cellKey = `${week}-${day}`
                const value = data[cellKey] || 0

                return (
                  <div
                    key={cellKey}
                    className="relative aspect-square rounded-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105 no-shadow"
                    style={{
                      backgroundColor: getColorIntensity(value),
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={() => setHoveredCell(cellKey)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {hoveredCell === cellKey && (
                      <div className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2 bg-black bg-opacity-75 text-white text-[9px] p-1 rounded z-10 whitespace-nowrap shadow-custom">
                        {value} events on {day}
                      </div>
                    )}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-between items-center px-6">
          <div className="text-[9px] text-slate-500">Less</div>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-sm no-shadow"
                style={{
                  backgroundColor: `rgba(68, 156, 251, ${intensity})`,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              ></div>
            ))}
          </div>
          <div className="text-[9px] text-slate-500">More</div>
        </div>
      </div>
    </div>
  )
}
