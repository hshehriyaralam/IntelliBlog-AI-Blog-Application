'use client';
import { Upload, Image } from 'lucide-react';
import React from 'react';

const FeatureImage = React.memo(function FeatureImage({onChange, imagePreview,themeValue}: any){
;
  
  return(
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        Featured Image
      </label>
      <label className={`block w-full h-30  border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-indigo-400 ${
        themeValue 
          ? 'border-gray-300 bg-gray-50 hover:bg-gray-100' 
          : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
      }`}>
        {imagePreview ? (
          <div className="relative h-full w-full">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-full w-full object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white opacity-0 hover:opacity-100" />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Image  className={`w-8 h-8 mb-2 ${themeValue ? 'text-gray-400' : 'text-gray-500'}`}  />
            <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              Click to upload image
            </p>
            <p className={`text-xs ${themeValue ? 'text-gray-500' : 'text-gray-500'}`}>
              PNG, JPG, WEBP (Max 5MB)
            </p>
          </div>
        )}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={onChange}  
          required 
        />
      </label>
    </div>
  )
})

export default FeatureImage;