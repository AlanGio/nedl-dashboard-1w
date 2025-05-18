"use client"

import type React from "react"
import { FileBarChart, BookOpen, Users, FileCheck, Plus, GitCompare, FileSearch } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationItem {
  id: string | null
  icon: React.ElementType
  label: string
  count?: number
  color?: string
}

interface SidebarNavigationProps {
  className?: string
  onNavigate: (id: string | null) => void
  activeItem?: string | null
}

export function SidebarNavigation({ className, onNavigate, activeItem }: SidebarNavigationProps) {
  const quickNavItems: NavigationItem[] = [
    {
      id: null,
      icon: FileBarChart,
      label: "Overview",
      color: "text-gray-700",
    },
    {
      id: "bookmarked",
      icon: Users,
      label: "Payer Analysis",
      color: "text-purple-500",
    },
    {
      id: "all-policies",
      icon: BookOpen,
      label: "Policy Explorer",
      color: "text-primary-500",
    },
    {
      id: "code-coverage",
      icon: FileCheck,
      label: "Code Coverage",
      color: "text-blue-600",
    },
    {
      id: "recent-updates",
      icon: GitCompare,
      label: "Service Comparison",
      color: "text-blue-500",
    },
    {
      id: "needs-review",
      icon: FileSearch,
      label: "Search Policies",
      count: 18,
      color: "text-secondary-500",
    },
  ]

  return (
    <div className={cn("fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white z-10", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-slate-500">QUICK NAVIGATION</h2>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-2 space-y-1">
          {quickNavItems.map((item) => (
            <button
              key={item.id || "overview"}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-xs font-medium text-left",
                activeItem === item.id || (activeItem === null && item.id === null)
                  ? "bg-blue-50"
                  : "hover:bg-slate-50",
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", item.color)} />
              <span className="flex-1">{item.label}</span>
              {item.count && <span className="ml-2 rounded-full text-xs text-slate-500">({item.count})</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
