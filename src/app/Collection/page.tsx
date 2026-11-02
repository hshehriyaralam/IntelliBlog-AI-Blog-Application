"use client";
import { ContextTheme } from "../../Context/DarkTheme"
import { useGetBookmarksQuery } from "../../Redux/Services/bookmarkApi";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useCallback, useContext, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import LoadingPage from "../../components/layout/LoadingPage"
import dynamic from "next/dynamic";
import { PageFrame } from "@/components/ui/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";

const ErrorPage = dynamic(() => import('./_component/errorPage'), {
  ssr: false,
});

const CollectionsBlogCard = dynamic(() => import('./_component/BlogCard'), {
  loading: () => <LoadingPage />
}); 

const PaginationItems  = dynamic(() => import('@/components/common/paginationItems'), {
  ssr: false,
});



export default function Collection() {
  const { data, isLoading, isError } = useGetBookmarksQuery(undefined);
  const { themeValue, light, dark, } = useContext(ContextTheme);
  const bookmarks =  useMemo(() => data?.bookmarks || [], [data]);
  const [currentItems, setCurrentItems] = useState<any[]>([]);


    const handlePageChange = useCallback((items:any[]) => {
    setCurrentItems(items);
  }, []);



  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage themeValue={themeValue} light={light} dark={dark} />

  
  return (
    <PageFrame className="min-h-0 gap-10 py-10 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
            <SectionHeading eyebrow="Saved for later">Discover Your Saved Collections</SectionHeading>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            A curated space where all your saved articles, ideas, and inspirations live together.
          </p>
        </div>

        {currentItems?.length === 0 ? (
          <EmptyState className="py-16" title="No collections yet" description="Start saving articles to see them here">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <Link   href={`/Blogs`}>
            <Button variant="secondary" className="cursor-pointer">
              Explore Articles
            </Button>
            </Link>
          </EmptyState>
        ) : (
          <>

            {/* Bookmarks Grid */}
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {currentItems?.map((bookmark: any) => {

                return (
                  <div
                    key={bookmark.blogId._id}
                    className="min-w-0"
                  >
                    <CollectionsBlogCard 
                    bookmark={bookmark}
                    themeValue={themeValue}
                    light={light}
                    dark={dark}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      
          <PaginationItems 
      ItemsPerPage={6}
      filteredItems={bookmarks || []}
      themeValue={themeValue} 
      onPageChange={handlePageChange}
      />
    </PageFrame>
  );
}