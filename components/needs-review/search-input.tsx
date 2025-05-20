"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  suggestions?: string[]
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  onClear,
  suggestions = [],
  placeholder = "Search...",
}: SearchInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 shadow-custom"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 no-shadow" />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 no-shadow"
          >
            <X className="h-4 w-4 text-slate-400 no-shadow" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white py-1 shadow-custom"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex w-full px-4 py-2 text-left hover:bg-primary-50 no-shadow"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
