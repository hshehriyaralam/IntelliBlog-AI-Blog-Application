'use client'
import { useFetchBlogQuery } from "../../Redux/Services/blogApi"; 
import { ContextTheme } from '../../Context/DarkTheme'
import { useCallback, useContext, useMemo, useState, useDeferredValue } from 'react';
import type { DraftFilters } from "../../../types/Blog"
import dynamic from "next/dynamic";
import SearchInput from "../../components/common/SearchINput";
import FilterToogle from "../../components/common/FilterToggle";
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { PlusCircle } from "@/components/ui/stickers";
import LoadingPage from "../../components/layout/LoadingPage";







const AuthorsFilter = dynamic(() => import('../../components/common/AuthorsFilter'), { ssr: false });
const DateFilter = dynamic(() => import('../../components/common/DateFilter'), { ssr: false });
const Tags = dynamic(() => import('../../components/common/TagsFilter'), { ssr: false });
const FilterActions = dynamic(() => import('../../components/common/FilterActions'), { ssr: false });
const BlogCard = dynamic(() => import("../../components/common/BLogCard"));
const PaginationItems = dynamic(() => import("../../components/common/paginationItems") , { ssr: false });


export default function AllBlogs() {
  const { data, isLoading } = useFetchBlogQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [currentItems, setCurrentItems] = useState<any[]>([]);



  




  // 1) unique dates for dropdown
  const blogsCreateDates: string[] = useMemo(() => {
    const list = data?.blogs?.map((blog: any) =>
      blog?.createdAt ? new Date(blog.createdAt).toDateString() : ""
    ).filter(Boolean) || [];
    return Array.from(new Set(list));
  }, [data]);

  // 2) draft vs applied filters
  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    authorId: "",
    title: "",
    date: "",
    tag: ""
  });
  const [appliedFilters, setAppliedFilters] = useState<DraftFilters>(draftFilters);



  const handleApply = useCallback(() => {
    setAppliedFilters({ ...draftFilters });
  }, [draftFilters]);

  const handleClear = useCallback(() => {
    const empty: DraftFilters = { authorId: "", title: "", date: "", tag: "" };
    setDraftFilters(empty);
    setAppliedFilters(empty);
    setSearchQuery("");
  }, []);

  const searchInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const AuthorsFilterOnChange = useCallback((val: string) => {
    setDraftFilters((s) => ({ ...s, authorId: val }));
  } , []);


  const DateFilterOnChange = useCallback((val: string) => {
    setDraftFilters((s) => ({ ...s, date: val }));
  } , []);  


  const TagsFilterOnChange = useCallback((val: string) => {
    setDraftFilters((s) => ({ ...s, tag: val }));
  } , []);


  const handlePageChange = useCallback((items:any[]) => {
  setCurrentItems(items);
}, []);


  // 3) filtering (search + applied filters)
  const filteredBlogs = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();

    return (data?.blogs || []).filter((blog: any) => {
      let ok = true;

      // 🔍 search across title/content/author
      if (q) {
        const title = blog?.blogTitle?.toLowerCase() || "";
        const content = blog?.blogContent?.toLowerCase() || "";
        const authorName = blog?.userId?.name?.toLowerCase?.() || "";
        ok = ok && (title.includes(q) || content.includes(q) || authorName.includes(q));
      }

      if (appliedFilters.authorId) {
        const blogAuthorId = typeof blog?.userId === "object"
          ? blog?.userId?._id
          : blog?.userId;
        ok = ok && String(blogAuthorId || "") === String(appliedFilters.authorId);
      }


      // 📅 Date filter
      if (appliedFilters.date) {
        const d = blog?.createdAt ? new Date(blog.createdAt).toDateString() : "";
        ok = ok && d === appliedFilters.date;
      }

      // 🏷️ Tags filter
      if (appliedFilters.tag) {
        const tags: string[] =
          blog?.blogTags?.map((t: string) => t.toLowerCase()) || [];
        ok = ok && tags.includes(appliedFilters.tag.toLowerCase());
      }

      return ok;
    });
  }, [data, deferredQuery, appliedFilters]);









  return (
    <PageFrame className="min-h-0 gap-8 py-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Fresh ideas, useful notes" className="mx-auto">
            Discover Amazing Content
          </SectionHeading>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Explore our collection of insightful articles, tutorials, and stories
            from talented writers around the world.
          </p>
        </div>

        {/* Filters + Search */}
        <div
          className="mb-8 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-5 shadow-[var(--sh-card)]"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchInput
              themeValue={themeValue}
              light={light}
              dark={dark}
              value={searchQuery}
              onChange={searchInputOnChange}
            />

            <FilterToogle
              onClick={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </div>

          {showFilters && (
           <div className="mt-5 border-t-2 border-dashed border-[var(--ink)] pt-5">
  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
      onChange={TagsFilterOnChange}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full">
              <LoadingPage />
            </div>
          ) : currentItems.length === 0 ? (
            <div className="col-span-full py-10">
              <EmptyState title="No blogs found" description="Try a different search or clear your filters.">
                <PlusCircle className="mx-auto mb-4 w-16" />
                <button type="button" onClick={handleClear} className="mt-5 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] px-5 py-2 font-extrabold shadow-[var(--sh-btn)]">Clear filters</button>
              </EmptyState>
            </div>
          ) : (
            currentItems?.map((blog: any, index: number) => {
              const isFeatured = index % 6 === 0;
              return (
                <div
                  key={blog._id}
                  className={`min-w-0 ${isFeatured ? "lg:col-span-2" : ""}`}
                >
                  <BlogCard
                    blog={blog}
                    isFeatured={isFeatured}
                    themeValue={themeValue}
                    lightText={lightText}
                    DarkText={DarkText}
                    isLoading={isLoading}
                    accentIndex={index}
                  />
                </div>
              );
            })
          )}
        </div>


        <PaginationItems
         ItemsPerPage={10}
        filteredItems={filteredBlogs}
        onPageChange={handlePageChange}
        themeValue={themeValue}
        />
      </div>
    </PageFrame>
  );
}
