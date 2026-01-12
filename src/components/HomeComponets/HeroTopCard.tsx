import Image from "next/image";
import React from "react";
import HeroTopButtons from "./heroTopButtons";

function HeroTopCard(){
    return(
      <div className="relative w-full lg:w-[74%] h-[500px] md:h-[600px] rounded-xl overflow-hidden  shadow-lg group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
            src={"/Blog_Banner.webp"}
            alt="IntelliBlog Background"
            width={1200}  
            height={600}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-indigo-600/20 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/30">
              <span className="text-indigo-300 text-sm font-medium">AI-Powered Blogging</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome to</span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-2">IntelliBlog</span>
          </h1>
          
          <p className="max-w-[220px]   lg:max-w-md mx-auto lg:text-lg md:text-sm text-gray-200 mb-8 leading-relaxed  ">
            Your intelligent platform for creating and discovering amazing AI-powered content
          </p>
          <HeroTopButtons />
        </div>

      </div>
    )
}

export default React.memo(HeroTopCard);