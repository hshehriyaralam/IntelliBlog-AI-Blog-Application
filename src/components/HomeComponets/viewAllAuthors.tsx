import { ContextTheme } from "@/Context/DarkTheme";
import { useAuthNavigate } from "@/hooks/useAuthNavigate";
import { ExternalLink } from "lucide-react";
import { useCallback, useContext } from "react";



export default function ViewAllAuthors({navigate}: {navigate: string}) {
  const { themeValue } = useContext(ContextTheme);
    const { authNavigate, isAuthenticating } = useAuthNavigate();
    

      const handleNavigate = useCallback(() => {
        authNavigate(navigate)
      }, [authNavigate]);


    return (        
        <div className="mt-2 pt-2 border-t border-gray-700/50 mx-ato flex justify-center mt-4">
                  <button
                    onClick={handleNavigate}
                    disabled={isAuthenticating}
                    className={`rounded-lg flex items-center gap-x-1 text-sm transition-all duration-200 px-10 py-1.5 cursor-pointer group/btn relative overflow-hidden ${
                      themeValue
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-indigo-500/30"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-indigo-500/30"
                    }`}
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