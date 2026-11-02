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
         aria-label="Share blog"
         className="flex size-11 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--mint)] transition-transform shadow-[3px_3px_0_var(--ink)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none">
          <Share2 className="size-5 text-[var(--ink)]" />
        </button>
    )
})


export default ShareButton;