"use client";
import { useContext, SetStateAction, useEffect, useState } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import { Button } from "../../components/ui/button";
import InputTitle from "./_component/InputTitle";
import InputContent from "./_component/InputContent";
import FeatureImage from "./_component/FeatureImage";
import InputSummary from "./_component/InputSummary";
import InputTags from "./_component/InputTags";
import PreviewBlog from "./_component/PreviewBlog";
import CenteredButtons from "./_component/CenteredButtons";
import BlogFormFunctions from "../../utilities/BlogFornFunc";
import ButtonLoader from "../../components/common/BtnLoader";
import useAIGenerate from "../../utilities/AI-Functions/AI-Generate";
import AILoader from "../../components/common/AILoader";

export default function WriteBlogForm() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const {
    // values
    title,
    content,
    summary,
    tags,
    tagInput,
    imagePreview,
    loading,
    setTags,
    setSummary,

    // setters / handlers
    handleTitleChange,
    handleContentChange,
    handleSummaryChange,
    handleImageChange,

    // actions
    addTag,
    removeTag,
    addBlogs,
    CancellBlog,
    handleTagInput,
    handleTagKeyDown
  } = BlogFormFunctions();
  const { handleSuggest, aiLoading } = useAIGenerate({
    title,
    content,
    setSummary,
    setTags,
  });









  return (
    <div className="w-full px-4 py-10 md:py-16">
      <form onSubmit={addBlogs} className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-5xl font-black uppercase leading-none tracking-[-0.045em] text-[var(--ink)] md:text-7xl">
          Add Article
        </h1>

        {/* Main Editor Grid */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Column - Title and Content */}
          <div className="order-1 space-y-7">
            {/* Blog Titlle  */}
            <InputTitle 
            onChange={handleTitleChange} 
            value={title}
            themeValue={themeValue} />
            {/* Blog Content  */}
            <InputContent 
            onChange={handleContentChange} 
            value={content} 
            themeValue={themeValue} />
          </div>

          {/* Middle Column - Summary and Tags */}
          <div className="order-2 space-y-7">
            <div
              className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-5 shadow-[var(--sh-card)]"
            >
              <h2
                className="mb-3 text-lg font-black tracking-[-0.03em] text-[var(--ink)]"
              >
                🤖 AI Assistance
              </h2>
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={handleSuggest}
                  variant="outline"
                  disabled={aiLoading}
                  className="w-full cursor-pointer justify-between disabled:cursor-not-allowed"
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
            <InputSummary 
            value={summary}
             onChange={handleSummaryChange}
             themeValue={themeValue}
             />
            {/* InputTags */}
            <InputTags
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleTagKeyDown}
              addTag={addTag}
              removeTag={removeTag}
              tags={tags}
              themeValue={themeValue}
            />
            <FeatureImage
              onChange={handleImageChange}
              imagePreview={imagePreview}
              themeValue={themeValue}
            />
          </div>
          <div className="order-3 lg:row-span-2">
          <PreviewBlog
          themeValue={themeValue}
          title={title} 
           summary={summary} 
           tags={tags} 
          imagePreview={imagePreview} 
          />
          </div>
        </div>

        {/* Action Buttons - Centered */}
        <CenteredButtons
        themeValue={themeValue}
          CancellBlog={CancellBlog}
          text={loading ? <ButtonLoader /> : "Publish"}
        />
      </form>
    </div>
  );
}
