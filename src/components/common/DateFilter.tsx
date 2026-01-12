'use client'
import { Calendar } from "lucide-react"

export default function DateFilter({ themeValue, light, dark, BlogsDate = [], value, onChange }: any) {
  return (
    <div>
      <label
        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
          themeValue ? "text-gray-700" : "text-gray-300"
        }`}
      >
        <Calendar size={16} />
        Date
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-[28%] min-w-[230px] px-3 py-2 rounded-lg border text-sm
          ${
            themeValue
              ? `${light} border-gray-300 text-gray-800`
              : `${dark} border-gray-600 text-white`
          }`}
      >
        <option value="">All dates</option>
        {BlogsDate.map((date: string, index: number) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  )
}
