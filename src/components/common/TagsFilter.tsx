'use client'
import { Tag } from 'lucide-react'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';
import {liveRefetchOptions} from "../../hooks/rtkOptions"
import React, { useMemo } from "react";


const TagsFilter = React.memo(({ themeValue, light, dark, value, onChange }: any) => {

  const { data } = useFetchBlogQuery(undefined, liveRefetchOptions)

const allTags =  useMemo(() => data?.blogs?.map((b: { blogTags: string[] }) => b.blogTags).flat() || [], [data])  ;

// Count frequency of each tag
const freqMap: Record<string, number> = {};
allTags.forEach((tag:any) => {
  const key = tag.toLowerCase().trim();
  freqMap[key] = (freqMap[key] || 0) + 1;
});

// Sort by frequency (desc) & keep top 15
const sortedTags =  useMemo(() => Object.entries(freqMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)   // 👈 yahan limit set karo (10–15)
  .map(([tag]) => tag), []);

// Map back to original casing
const finalTags =   useMemo(() => sortedTags.map(tag =>
  allTags.find((original: string) => original.toLowerCase().trim() === tag) || tag
), [sortedTags]);

  return (
    <div>
      <label
        className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[var(--ink)]"
      >
        <Tag size={16} />
        Tags
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full min-w-[230px] rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--white)] px-3 py-2 text-base text-[var(--ink)] outline-none focus:shadow-[4px_4px_0_var(--purple)] sm:w-[28%]"
      >
        <option value="">All tags</option>
        {finalTags.map((tag:any, index:number) => (
          <option key={index} value={String(tag)}>
            {String(tag)}
          </option>
        ))}
      </select>
    </div>
  )
}
)

export default TagsFilter;