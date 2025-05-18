"use client"

import { FileBarChart, Users, BookOpen, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { NedlLogo } from "@/components/ui/nedl-logo"

const navItems = [
  { id: "overview", label: "Overview", icon: FileBarChart },
  { id: "payer-analysis", label: "Payer Analysis", icon: Users, linkedView: "bookmarked" },
  { id: "policy-explorer", label: "Policy Explorer", icon: BookOpen, linkedView: "all-policies" },
  { id: "code-coverage", label: "Code Coverage", icon: FileCheck, linkedView: "code-coverage" },
]

interface DashboardHeaderProps {
  onNavigate: (view: string | null) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardHeader({ onNavigate, activeTab, setActiveTab }: DashboardHeaderProps) {
  const handleTabClick = (tabId: string) => {
    // Set the active tab
    setActiveTab(tabId)

    // Find the clicked item
    const clickedItem = navItems.find((item) => item.id === tabId)

    if (tabId === "overview") {
      // Navigate to the main dashboard
      onNavigate(null)
    } else if (clickedItem?.linkedView) {
      // Navigate to the linked view if it exists
      onNavigate(clickedItem.linkedView)
    }
  }

  const handleLogoClick = () => {
    // Navigate to the main dashboard
    onNavigate(null)
    setActiveTab("overview")
  }

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-white shadow-sm">
      <div className="max-w-[1680px] mx-auto px-4">
        <div className="flex h-16 items-left justify-between">
          <div className="flex items-start gap-2">
            <button onClick={handleLogoClick} className="flex items-center focus:outline-none">
              <NedlLogo className="p-3" />
            </button>
          </div>
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-gradient-to-r from-primary-400 via-blue-500 to-purple-500 p-2">
              <span className="sr-only">User menu</span>
              <div className="h-8 w-8 rounded-full bg-white/90" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
