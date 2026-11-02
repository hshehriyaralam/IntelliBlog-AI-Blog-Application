'use client';
import { Upload, Image } from 'lucide-react';
import React from 'react';

const FeatureImage = React.memo(function FeatureImage({onChange, imagePreview,themeValue}: any){
;
  
  return(
    <div className="space-y-2">
      <label className="block text-sm font-extrabold text-[var(--ink)]">
        Featured Image
      </label>
      <label className="block min-h-48 w-full cursor-pointer rounded-[var(--r-card)] border-[3px] border-dashed border-[var(--ink)] bg-[var(--paper)] p-2 transition-transform hover:-translate-y-0.5">
        {imagePreview ? (
          <div className="relative h-full w-full">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-48 w-full rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white opacity-0 hover:opacity-100" />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Image className="mb-2 size-10 text-[var(--purple)]" />
            <p className="text-sm font-extrabold text-[var(--ink)]">
              Click to upload image
            </p>
            <p className="text-xs text-[var(--muted)]">
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