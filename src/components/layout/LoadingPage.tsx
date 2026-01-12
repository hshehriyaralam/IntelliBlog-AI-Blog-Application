'use client'
import { ContextTheme } from  '../../Context/DarkTheme'
import { useContext } from 'react'
import Loader from "../../components/common/Loader";

export default function LoadingPage(){
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

    return(
        <div className={`w-full h-screen flex justify-center items-center ${themeValue ? light : dark}`}>
            <Loader /> 
            </div>
    )
}

