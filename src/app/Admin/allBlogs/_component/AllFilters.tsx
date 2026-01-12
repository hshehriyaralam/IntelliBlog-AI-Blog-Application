'use client'
import { ContextTheme } from "../../../../Context/DarkTheme"
//Components
import SearchInput from "../../../../components/common/SearchINput"
import FilterToogle from "../../../../components/common/FilterToggle"
import AuthorsFilter from "../../../../components/common/AuthorsFilter"
import DateFilter from "../../../../components/common/DateFilter"
import Tags from "../../../../components/common/TagsFilter"
import FilterActions from "../../../../components/common/FilterActions"
import React, {  useCallback, useMemo,  } from "react";
import type {DraftFilters} from "../../../../../types/Blog"


const  AllFiltersBlogs = React.memo(({
    data,
    setDraftFilters,
    setAppliedFilters,
    setSearchQuery,
    draftFilters,
    searchQuery,
    setShowFilters,
    showFilters,
    themeValue,
     light,
      dark

}:any) =>  {
    const blogsCreateDates: string[] = useMemo(() => {
        const list =
        data?.data
            ?.map((blog: any) =>
            blog?.createdAt ? new Date(blog.createdAt).toDateString() : ""
            )
            .filter(Boolean) || [];
        return Array.from(new Set(list));
    }, [data]);

     const handleApply = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
  },[ draftFilters, setAppliedFilters]);


    const handleClear = useCallback(() => {
    const empty: DraftFilters = { authorId: "", title: "", date: "", tag: "" };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setSearchQuery("");
  }, []);

const SeacrhInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value)
}, [setSearchQuery]);


const handleFilterToggle = useCallback(()=>{
    setShowFilters((s:boolean)=>!s)
}, [setShowFilters]);


const AuthorsFilterOnChange = useCallback((val: string)=>{
    setDraftFilters((s:any) => ({ ...s, authorId: val }))
}, [setDraftFilters]);


const DateFilterOnChange = useCallback((val: string)=>{
    setDraftFilters((s:any) => ({ ...s, date: val }))
}, [setDraftFilters]);


const tagsFilterOnChange = useCallback((val: string)=>{   
    setDraftFilters((s:any) => ({ ...s, tag: val }))
}, [setDraftFilters]);



  console.log("All Filters");


    return(
        <div className={`mb-6 rounded-2xl shadow-lg border ${
                  themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
                } p-4`}>
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <SearchInput
                      themeValue={themeValue}
                      light={light}
                      dark={dark}
                      value={searchQuery}
                      onChange={SeacrhInputOnChange}
                    />
                    <FilterToogle
                      onClick={handleFilterToggle}
                      showFilters={showFilters}
                    />
                  </div>
        
                  {showFilters && (
                    <div className={`mt-6 pt-6 border-t ${
                      themeValue ? 'border-gray-200' : 'border-gray-700'
                    }`}>
                      <div className="flex flex-wrap gap-6">
                        <AuthorsFilter
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          value={draftFilters.authorId}
                          onChange={AuthorsFilterOnChange}
                        />
                        <DateFilter
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          BlogsDate={blogsCreateDates}
                          value={draftFilters.date}
                          onChange={DateFilterOnChange}
                        />
                        <Tags
                          themeValue={themeValue}
                          light={light}
                          dark={dark}
                          value={draftFilters.tag}
                          onChange={tagsFilterOnChange}
                        />
                      </div>
        
                      <FilterActions
                        themeValue={themeValue}
                        light={light}
                        dark={dark}
                        onApply={handleApply}
                        onClear={handleClear}
                      />
                    </div>
                  )}
                </div>
    )
})


export default AllFiltersBlogs