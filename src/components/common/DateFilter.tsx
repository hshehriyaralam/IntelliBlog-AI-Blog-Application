'use client'
import { Calendar } from "lucide-react"
import React from "react";


const DateFilter = React.memo(({ themeValue, light, dark, BlogsDate = [], value, onChange }: any) => {
  return (
    <div>
      <label
        className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]"
      >
        <Calendar size={16} />
        Date
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full min-w-[230px] rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 text-base text-[var(--ink)] outline-none focus:shadow-[4px_4px_0_var(--purple)] sm:w-[28%]"
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
})

export default DateFilter;
