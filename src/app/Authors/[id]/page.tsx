"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSingleUserQuery } from "../../../Redux/Services/userApi";
import { liveRefetchOptions } from "../../../hooks/rtkOptions";
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext } from "react";
import { BookOpen } from "lucide-react";
import LoadingPage from "../../../components/layout/LoadingPage";
import AuthorsProfileSection from "../_component/ProfileSection";
import dynamic from "next/dynamic";

const ErrorPage = dynamic(
  () => import("../../../components/common/ErrorPage"),
  {
    loading: () => <LoadingPage />,
    ssr: false,
  }
);

const AuthorsBlogs = dynamic(() => import("../_component/AuthorsBlogs"), {
  loading: () => <LoadingPage />,
});

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const {
    data: SingleUser,
    isLoading,
    error,
  } = useSingleUserQuery(id, liveRefetchOptions);

  const { themeValue, light, dark } = useContext(ContextTheme);
  const user = SingleUser?.data?.user || [];
  const blogs = SingleUser?.data?.blogs || [];

  if (isLoading) return <LoadingPage />;
  if (error)
    return <ErrorPage themeValue={themeValue} light={light} dark={dark} />;

  if (!user)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          themeValue ? `${light}` : `${dark}`
        }`}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Author not found
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The author you're looking for doesn't exist
          </p>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen ${themeValue ? `${light}` : `${dark}`} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <AuthorsProfileSection
          themeValue={themeValue}
          light={light}
          dark={dark}
          user={user}
          blogs={blogs}
        />

        {/* Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold  bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent`}
            >
              Articles by {user.name}
            </h2>
            <span
              className={`text-sm ${
                themeValue ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {blogs.length} articles published
            </span>
          </div>

          {blogs.length === 0 ? (
            <div
              className={`text-center py-12 rounded-2xl ${
                themeValue
                  ? `${light} shadow-lg`
                  : `${dark} shadow-xl border border-gray-700`
              }`}
            >
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3
                className={`text-lg font-semibold mb-2 ${
                  themeValue ? "text-gray-800" : "text-white"
                }`}
              >
                No articles yet
              </h3>
              <p
                className={`text-gray-600 lg:max-w-[400px]   max-w-[280px]  text-center mx-auto     `}
              >
                {user.name} hasn't published any articles yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs?.map((blog: any, index: number) => {
                return (
                  <Link key={blog._id} href={`/Blogs/${blog._id}`}>
                    <AuthorsBlogs
                      blog={blog}
                      themeValue={themeValue}
                      light={light}
                      dark={dark}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
