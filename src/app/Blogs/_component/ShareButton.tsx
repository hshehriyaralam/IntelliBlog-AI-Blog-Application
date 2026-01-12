'use client'
import { Share2  } from "lucide-react";
import { useState } from "react";
import React from "react";

const ShareButton = React.memo(({ blogId }: any) =>  {
//   const router = useRouter();
  const [copied, setCopied] = useState(false);

    const handleShare = async () => {
    const url = `${window.location.origin}/Blogs/${blogId}`;

    try {
      if (navigator.share) {
        // 📱 Mobile / modern browsers
        await navigator.share({
          title: "Check out this blog!",
          text: "Amazing blog I found, check it here:",
          url: url, // 👈 yahan URL clickable link banega
        });
      } else {
        // 💻 Fallback for desktop → clipboard
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };




    return(
         <button  onClick={handleShare}
         className="p-2 sm:p-2.5 rounded-full bg-emerald-100  
          hover:bg-emerald-200  transition-all shadow-md hover:scale-110 cursor-pointer ">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 " />
        </button>
    )
})


export default ShareButton;