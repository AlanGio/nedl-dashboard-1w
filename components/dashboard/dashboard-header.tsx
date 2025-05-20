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
    <header className="fixed top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="max-w-[1680px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={handleLogoClick} className="flex items-center focus:outline-none">
              <NedlLogo className="p-3" />
            </button>
          </div>
          <nav className="flex items-center space-x-2 font-title">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 no-shadow",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                    : "text-gray-700 hover:bg-white hover:shadow-sm",
                )}
              >
                <item.icon className={cn("h-4 w-4", activeTab === item.id ? "text-white" : "text-gray-500")} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-gradient-to-r from-[#449CFB] to-[#E85DF9] p-2 no-shadow">
              <span className="sr-only">User menu</span>
              <div className="h-8 w-8 rounded-full bg-white/90 no-shadow" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
