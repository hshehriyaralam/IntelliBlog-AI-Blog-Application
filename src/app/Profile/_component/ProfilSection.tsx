'use client'
import { User, Trash2,  Mail, Calendar, Eye, FileText, LogOut, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import ButtonLoader from '../../../components/common/BtnLoader'
import { useRouter } from "next/navigation";

export default function ProfileSection({
 themeValue,
 light,
 dark,
 user,
 joinedDate,
 lastSeen,
 handleGoogleLogin,
 setShowDeleteConfirm,
 handleDeleteAccount,
 showDeleteConfirm,
 Googleloading,
 DeleteProfileLoader,
 totalLikes,
 hasImage,
 setImgError,
 LikedBlogs,
 bookmarks,
}:any){

  const router = useRouter();
  const GoAdminPage = () => {
    if(user.role === 'admin'){
      router.push('/Admin')
    }
  }
    return(
         <div className={`rounded-2xl border ${
            themeValue ? `${light} shadow-lg border-gray-200` : `${dark} shadow-xl border-gray-700`
        } overflow-hidden mb-8`}>
            <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-center">
                <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-1.5">
                    <div className="w-full h-full rounded-full bg-white  flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                        <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setImgError(true)}
                        />
                    ) : (
                        <User className="w-12 h-12 text-indigo-600 " />
                    )}
                    </div>
                </div>
                </div>
                      
                      <div className="mt-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800  "
                            : "bg-indigo-100 text-indigo-800  "
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                    </div>
        
                    {/* Profile Info */}
                    <div className="md:w-2/3 p-8 border-l border-gray-200 ">
                      <h1 className={`text-3xl font-bold mb-4 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                        {user.name}
                      </h1>
        
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-indigo-500" />
                          <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                            {user.email}
                          </span>
                        </div>
        
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                            Joined {joinedDate}
                          </span>
                        </div>
        
                        <div className="flex items-center gap-3">
                          <Eye className="w-5 h-5 text-purple-500" />
                          <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                            Last seen {lastSeen}
                          </span>
                        </div>
        
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-500" />
                          <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                            {user.blogCount} articles published
                          </span>
                        </div>
                      </div>
        
        
                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className={`p-3 rounded-xl text-center ${
                          themeValue ? 'bg-pink-100' : 'bg-pink-900/30'
                        }`}>
                          <div className="text-2xl font-bold text-pink-600 ">{user.blogCount}</div>
                          <div className="text-xs text-pink-600 ">Articles</div>
                        </div>
                        <div className={`p-3 rounded-xl text-center ${
                          themeValue ? 'bg-blue-100' : 'bg-blue-900/30'
                        }`}>
                          <div className="text-2xl font-bold text-blue-600 ">{bookmarks}</div>
                          <div className="text-xs text-blue-600 ">Bookmarks</div>
                        </div>
                        <div className={`p-3 rounded-xl text-center ${
                          themeValue ? 'bg-purple-100' : 'bg-purple-900/30'
                        }`}>
                          <div className="text-2xl font-bold text-purple-600">{totalLikes}</div>
                          <div className="text-xs text-purple-600 ">Likes</div>
                        </div>
                        <div className={`p-3 rounded-xl text-center ${
                          themeValue ? 'bg-green-100' : 'bg-green-900/30'
                        }`}>
                          <div className="text-2xl font-bold text-green-600 ">{LikedBlogs}</div>
                          <div className="text-xs text-green-600 ">Liked Blogs</div>
                        </div>
                      </div>
        
                      {/* Account Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={handleGoogleLogin}
                          className={`flex items-center gap-2    cursor-pointer  bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md `}
                        >
                        {Googleloading ? (
                          <ButtonLoader />
                        ) : (
                          <>
                            <LogOut className="w-4 h-4 mr-2" />
                            Switch Account
                          </>
                        )}    
                        </Button>
                        <Button 
                          onClick={() => setShowDeleteConfirm(true)}
                          variant="destructive"
                          className="flex items-center gap-2  cursor-pointer   bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </Button>
                        {user.role === 'admin'  &&  (<Button
                        onClick={GoAdminPage}
                        variant="destructive"
                        className={`flex items-center cursor-pointer   bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 shadow-md`}>
                          <ArrowRight className="w-5 h-5" />
                          Go To Admin Page
                        </Button>) }
                        
                      </div>
        
                      {/* Delete Confirmation */}
                      {showDeleteConfirm && (
                        <div className={`p-4 rounded-xl mt-4 ${
                          themeValue ? 'bg-red-500 border border-red-200' : 'bg-red-900/20 border border-red-800'
                        }`}>
                          <h4 className="font-semibold text-red-800  mb-2">
                            Confirm Account Deletion
                          </h4>
                          <p className="text-red-200  text-sm mb-4">
                            This action cannot be undone. All your data will be permanently deleted.
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={handleDeleteAccount}
                              className="border border-red-600 cursor-pointer"
                            >
                              {DeleteProfileLoader ? <ButtonLoader /> : "Confirm Delete" }
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowDeleteConfirm(false)}
                              className="border border-amber-500 text-gray-100 cursor-pointer"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
    )
}
