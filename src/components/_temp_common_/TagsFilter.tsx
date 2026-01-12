'use client'
import { Tag } from 'lucide-react'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';
import {liveRefetchOptions} from "../../hooks/rtkOptions"


export default function TagsFilter({ themeValue, light, dark, value, onChange }: any) {
  const { data } = useFetchBlogQuery(undefined, liveRefetchOptions)

const allTags = data?.blogs?.map((b: { blogTags: string[] }) => b.blogTags).flat() || [];

// Count frequency of each tag
const freqMap: Record<string, number> = {};
allTags.forEach((tag:any) => {
  const key = tag.toLowerCase().trim();
  freqMap[key] = (freqMap[key] || 0) + 1;
});

// Sort by frequency (desc) & keep top 15
const sortedTags = Object.entries(freqMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)   // 👈 yahan limit set karo (10–15)
  .map(([tag]) => tag);

// Map back to original casing
const finalTags = sortedTags.map(tag =>
  allTags.find((original: string) => original.toLowerCase().trim() === tag) || tag
);




  return (
    <div>
      <label
        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
          themeValue ? "text-gray-700" : "text-gray-300"
        }`}
      >
        <Tag size={16} />
        Tags
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
