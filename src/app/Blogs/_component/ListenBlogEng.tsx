'use client';
import { useSingleBlogQuery } from "@/Redux/Services/blogApi";
import { Volume2 } from "lucide-react";
import React, { useRef } from "react";

const ListeBlogEng = React.memo(  ({
  isPlaying,
  blogId,
  setCurrentIndex,
  setIsPlaying,
}: any)  => {
  const fallbackInterval = useRef<any>(null);
  const { data } = useSingleBlogQuery(blogId);
  const  blogContent = data?.blog.blogContent;
  const blogSummary = data?.blog.blogSummary;
  const handleListenEng = () => {
    if (!isPlaying) { 
      if (!("speechSynthesis" in window)) {
        alert("Your browser does not support speech synthesis.");
        return;
      }

      // Cancel previous queue
      window.speechSynthesis.cancel();
      if (fallbackInterval.current) clearInterval(fallbackInterval.current);

      const sections = [{ section: "content", text: blogContent || "" }];
      if (blogSummary) sections.push({ section: "summary", text: blogSummary });

      let allWords: any[] = [];
      sections.forEach(sec =>
        sec.text.split(/\s+/).forEach((w: any, idx: any) =>
          allWords.push({ section: sec.section, word: w, localIndex: idx })
        )
      );
      // ek variable ko initialize kiya and secton jisme content and summary dono store hain isme loop chalaya ... sec ke all text ko get kiya and split laga kr isko array me convert kiya  Regex se extra space line break ye sab ko eliminate kiya ab array ke form me  with element all text aa gaye then  us text me bh loop chalaya and iske secton name, word and local index ko allwords variable me push kar diya 

        const fullText = sections.map(s => s.text).join(" ");
        const utter = new SpeechSynthesisUtterance(fullText);
        utter.lang = "en-US";
        utter.rate = 1;
        utter.pitch = 1;

        // pehle all text me map chala kr just text ko extract kiya and fir us text ko join method se ek hi array me convert kar diya ... phir SpeechSynthesisUtterance se speech object banaya jisme full text ko pass kar diya hai language and accent select kiya speed 1 rakhin normal and voice tone picth karne ke lye bh pitch 1 rakhin normal

      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      // isme user ki device detect kar rahe hain wo mobile hai ya destop .userAgent me Mobi ya Android hai to mobile hoga 

      /** ------------------------------
       *   DESKTOP HIGHLIGHT — PERFECT
       * ------------------------------ */
      if (!isMobile) {
        utter.onboundary = (event: any) => {
          if (event.charIndex !== undefined) {
            const currentChar = event.charIndex;
            let cumulative = 0;

            for (let i = 0; i < allWords.length; i++) {
              cumulative += allWords[i].word.length + 1;
              if (currentChar < cumulative) {
                setCurrentIndex({
                  section: allWords[i].section,
                  index: allWords[i].localIndex,
                });
                break;
              }
            }
          }
        };
      }

      /** ------------------------------
       *    MOBILE HIGHLIGHT — FIXED
       * ------------------------------ */
      if (isMobile) {
        utter.onstart = () => {
          let i = 0;
          const avg = 260; // Faster + More accurate
          fallbackInterval.current = setInterval(() => {
            if (i < allWords.length) {
              setCurrentIndex({
                section: allWords[i].section,
                index: allWords[i].localIndex,
              });
              i++;
            } else {
              clearInterval(fallbackInterval.current);
            }
          }, avg);
        };
      }

      /** ------------------------------
       *     END CLEANUP
       * ------------------------------ */
      utter.onend = () => {
        if (fallbackInterval.current) clearInterval(fallbackInterval.current);
        setCurrentIndex({ section: "", index: null });
        setIsPlaying(false);
      };

      /** ------------------------------
       *   MOBILE INSTANT START FIX 🚀
       * ------------------------------ */
      setTimeout(() => {
        window.speechSynthesis.speak(utter);
      }, isMobile ? 20 : 0); // mobile me lag prevent

      setIsPlaying(true);
    } else {
      // STOP
      window.speechSynthesis.cancel();
      if (fallbackInterval.current) clearInterval(fallbackInterval.current);
      setCurrentIndex({ section: "", index: null });
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleListenEng}
      className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full 
        bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium 
        hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
    >
      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
      {isPlaying ? "Stop" : "Listen"}
    </button>
  );
}
)


export default ListeBlogEng;  