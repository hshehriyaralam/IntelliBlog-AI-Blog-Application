"use client";
import { ContextTheme } from "../../Context/DarkTheme"
import { useGetBookmarksQuery } from "../../Redux/Services/bookmarkApi";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useCallback, useContext, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import LoadingPage from "../../components/layout/LoadingPage"
import dynamic from "next/dynamic";

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
    <div className={`min-h-screen ${themeValue ? `${light}` :  `${dark}`} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Discover Your Saved Collections
            </h1>
          <p className={`lg:text-lg  text-md   ${themeValue ? "text-gray-600" : "text-gray-400"} 
            lg:max-w-[450px]  max-w-[300px]   mx-auto  my-2 `}>
            A curated space where all your saved articles, ideas, and inspirations live together.
          </p>
        </div>

        {currentItems?.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl ${themeValue ? `${light} shadow-lg` :  `${dark}bg-gray-800 shadow-xl`}`}>
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className={`text-xl font-semibold mb-2 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
              No collections yet
            </h2>
            <p className={`mb-6 ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              Start saving articles to see them here
            </p>
            <Link   href={`/Blogs`}>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white  cursor-pointer"  >
              Explore Articles
            </Button>
            </Link>
          </div>
        ) : (
          <>

            {/* Bookmarks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems?.map((bookmark: any) => {

                return (
                  <div
                    key={bookmark.blogId._id}
                    className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      themeValue ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
                    }`}
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
    </div>
  );
}