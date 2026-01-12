"use client";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";
import { useGetProfileQuery, useDeleteProfileMutation } from "../../Redux/Services/userApi";
import { useDeleteBlogMutation } from "../../Redux/Services/blogApi";
import { Button } from "../../components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useState, useContext, useCallback, useMemo } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import { useAlert } from '../../Context/AlertContext';
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import Link from "next/link";
import LoadingPage from "../../components/layout/LoadingPage";
import ProfileSection from './_component/ProfilSection'
import dynamic from "next/dynamic";



const UserNotFoundPage = dynamic(() => import('./_component/userPage'), {
  loading: () => <LoadingPage />,
  ssr: false,
});

const ProfileBlogsSections = dynamic(() => import('./_component/BlogsSection'), {
  loading: () => <LoadingPage />,
  ssr: false
});





export default function Profile() {
  const { showAlert } = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const Googleloading = useSelector((state: RootState) => state.auth.loading);
  const { themeValue, light, dark } = useContext(ContextTheme);
  // fetch Profile
  const { data: Profile, isLoading } = useGetProfileQuery(undefined,{
      pollingInterval: 1000,
       refetchOnMountOrArgChange: true,
       refetchOnFocus: true,
       refetchOnReconnect: true,
  });
  // Delete Profile & Blog Mutations
  const [deleteProfile , { isLoading: DeleteProfileLoader}] = useDeleteProfileMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const user =  useMemo(() => Profile?.user, [Profile]);
  const blogs = useMemo(() => Profile?.blogs || [], [Profile]);



  const handleDeleteBlog =  useCallback(async (id: string) => {
    try {
      setDeletingId(id)
      await deleteBlog(id).unwrap();
      showAlert('success', 'Blog erased successfully ✨');
      window.location.reload()
    } catch {
      showAlert('error', 'Blog deletion failed. Please try again.');
    }finally{
      setDeletingId(null)
    }
  }, [])
  
  const handleDeleteAccount =   useCallback(async () => {
    try {
      await deleteProfile().unwrap();
      showAlert('success', 'Goodbye! Your account is gone.');
      window.location.replace('/')
    } catch {
     showAlert('error', 'Account deletion failed ❌');
    }
  }, [])

const handleGoogleLogin =  useCallback(() => {
  dispatch(googleLoginThunk())
  
}, []);

  if (isLoading) return <LoadingPage />;
  if (!user) return (
  <UserNotFoundPage
   themeValue={themeValue}
    light={light} 
    dark={dark} 
    handleGoogleLogin={handleGoogleLogin}/>)



  return (
    <div className={`min-h-screen ${themeValue ? light : dark} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <ProfileSection
        themeValue={themeValue}
        light={light}
        dark={dark}
        user={user}
        blogs={blogs}
        handleGoogleLogin={handleGoogleLogin}
        setShowDeleteConfirm={setShowDeleteConfirm}
        handleDeleteAccount={handleDeleteAccount}
        showDeleteConfirm={showDeleteConfirm}
        Googleloading={Googleloading}
        DeleteProfileLoader={DeleteProfileLoader} />


        {/* Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${themeValue ? 'text-gray-800' : 'text-white'}`}>
              Your Articles
            </h2>
            <span className={`text-sm ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              {blogs.length} articles published
            </span>
          </div>

          {blogs.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${
              themeValue ? `${light} shadow-lg` : `${dark} shadow-xl`
            }`}>
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                No articles yet
              </h3>
              <p className={`text-gray-600 lg:max-w-[400px]   max-w-[280px]  text-center mx-auto     `}>
                Start writing your first article to share with the world!
              </p>
              <Link  href='/Create'>
              <Button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600   cursor-pointer"  >
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog: any) => (
                <Link key={blog._id} href={`/Blogs/${blog._id}`}>
                  <ProfileBlogsSections 
                  themeValue={themeValue}
                  dark={dark}
                  blog={blog}
                  light={light}
                  handleDeleteBlog={handleDeleteBlog}
                  deletingId={deletingId} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}