import { useAuthNavigate } from "@/hooks/useAuthNavigate";
import { ExternalLink } from "lucide-react";
import { useCallback } from "react";



export default function ViewAllAuthors({navigate}: {navigate: string}) {
    const { authNavigate, isAuthenticating } = useAuthNavigate();
    

      const handleNavigate = useCallback(() => {
        authNavigate(navigate)
      }, [authNavigate]);


    return (        
        <div className="mt-2 pt-2 border-t border-gray-700/50 mx-ato flex justify-center mt-4">
                  <button
                    onClick={handleNavigate}
                    disabled={isAuthenticating}
                    className="relative flex min-h-11 items-center gap-x-1 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-6 py-2 text-sm font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    {/* Button Corner Effects */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 rounded-tl-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 rounded-br-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        
                    <ExternalLink size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                    <span>View All</span>
                  </button>
                </div>
    )
}