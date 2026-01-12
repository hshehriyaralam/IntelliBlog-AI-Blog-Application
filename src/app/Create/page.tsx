'use client'
import {  useContext, SetStateAction } from 'react';
import { ContextTheme } from '../../Context/DarkTheme';
import { Button } from '../../components/ui/button';
import InputTitle from "./_component/InputTitle"
import InputContent from "./_component/InputContent"
import FeatureImage  from "./_component/FeatureImage"
import InputSummary from "./_component/InputSummary"
import InputTags from "./_component/InputTags"
import PreviewBlog from "./_component/PreviewBlog";
import CenteredButtons from "./_component/CenteredButtons";
import BlogFormFunctions  from '../../utilities/BlogFornFunc'
import ButtonLoader from '../../components/common/BtnLoader'
import useAIGenerate from '../../utilities/AI-Functions/AI-Generate'
import AILoader from '../../components/common/AILoader';


export default function WriteBlogForm() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const {
    handleChange,
    handleImageChange,
    addTag,
    removeTag,
    addBlogs,
    CancellBlog,
    formData,
    setFormData,
    tagInput,
    setTagInput,
    loading
  } = BlogFormFunctions();

  
  
const { handleSuggest, aiLoading } = useAIGenerate(setFormData, formData);




  return (
    <div className={`w-full min-h-screen ${themeValue ? light : dark}`}>
      <form 
      onSubmit={addBlogs}
      className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-4xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent text-center">
          Add Article
        </h1>
          

        {/* Main Editor Grid */}
        <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column - Title and Content */}
          <div className="space-y-3">
            {/* Blog Titlle  */}
            <InputTitle  onChange={handleChange} value={formData.title} />
            {/* Blog Content  */}
            <InputContent  onChange={handleChange} value={formData.content}  />
            {/* Feature Image */}
            <FeatureImage  onChange={handleImageChange} imagePreview={formData.imagePreview} /> 
           </div>

          {/* Middle Column - Summary and Tags */}
          <div className="space-y-3">

              <div className={`p-4 rounded-2xl shadow-sm transition-all ${
          themeValue ? "bg-gray-50" : "bg-gray-900 border border-gray-700"
        }`}
      >
        <h2
          className={`text-sm font-semibold mb-3 tracking-wide ${
            themeValue ? "text-gray-700" : "text-gray-200"
          }`}
        >
          🤖 AI Assistance
        </h2>
        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleSuggest}
            variant="outline"
            disabled={aiLoading}
            className={`w-full flex justify-between items-center rounded-xl px-3 py-2 text-xs font-medium transition-all cursor-pointer
              ${
                themeValue
                  ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                  : "border-gray-600 text-gray-200 hover:bg-gray-800"
              }
              disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {aiLoading ? (
              <div className="flex items-center gap-2 w-full justify-center">
                <AILoader /> {/* Loader from earlier */}
              </div>
            ) : (
              <>
                <span>Generate Summary & Tags</span>
                <span className="text-[11px] opacity-70">⌘S</span>
              </>
            )}
          </Button>
        </div>
      </div>
            {/* Input Summary */}
            <InputSummary  value={formData.summary} onChange={handleChange} />
            {/* InputTags */}
            <InputTags 
            value={tagInput} 
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTagInput(e.target.value)}
            onKeyDown={(e: { key: string; }) => e.key === 'Enter' && addTag()}
            addTag={addTag}
            removeTag={removeTag}
            formData={formData}
            />
          </div>
            <PreviewBlog  formData={formData} />
        </div>

        {/* Action Buttons - Centered */}
        <CenteredButtons   CancellBlog={CancellBlog} 
        text={loading ?  <ButtonLoader /> : "Publish"} />
      </form>
    </div>
    
  );
}