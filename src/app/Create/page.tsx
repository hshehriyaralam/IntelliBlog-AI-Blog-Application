"use client";
import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
import { useInlineSuggestion } from "../../hooks/useInlineSuggestion";
import { useLoggedInUser } from "../../hooks/LoggedInUser";
import { useAlert } from "../../Context/AlertContext";

const AIFeaturePopup = dynamic(
  () => import("../../components/blog/AIFeaturePopup"),
  { ssr: false }
);

export default function WriteBlogForm() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { loggedInUserId } = useLoggedInUser();
  const { showAlert } = useAlert();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const imageRequestRef = useRef<AbortController | null>(null);
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);
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
  const inlineSuggestion = useInlineSuggestion({
    title,
    content,
    enabled: aiAssistEnabled,
    loggedIn: Boolean(loggedInUserId),
    fieldRef: contentRef,
    onChange: (event) => handleContentChange(event as React.ChangeEvent<HTMLTextAreaElement>),
    showAlert,
    maxLength: 400,
  });
  const summarySuggestion = useInlineSuggestion({
    title,
    content: summary,
    enabled: aiAssistEnabled,
    loggedIn: Boolean(loggedInUserId),
    fieldRef: summaryRef,
    onChange: (event) => handleSummaryChange(event as React.ChangeEvent<HTMLTextAreaElement>),
    showAlert,
    hintId: "summary-ai-assist-hint",
    maxLength: 200,
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("intelliblog.aiAssist.enabled");
      if (saved !== null) setAiAssistEnabled(saved !== "false");
    } catch {
      // Keep the default enabled when storage is unavailable.
    }
  }, []);

  const toggleAssistant = () => {
    setAiAssistEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem("intelliblog.aiAssist.enabled", String(next));
      } catch {
        // The toggle still applies for this session when storage is unavailable.
      }
      return next;
    });
  };

  useEffect(() => {
    return () => imageRequestRef.current?.abort();
  }, []);

  const handleUserImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAiGenerated(false);
    handleImageChange(event);
  };

  const handleGenerateImage = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle && !trimmedContent) {
      showAlert("error", "Please add the blog title and content first.");
      return;
    }
    if (!trimmedTitle) {
      showAlert("error", "Please add a blog title to generate an image.");
      return;
    }
    if (!trimmedContent) {
      showAlert("error", "Please write some blog content to generate an image.");
      return;
    }
    if (imagePreview && !aiGenerated && !window.confirm("Replace your current image with an AI image?")) {
      return;
    }

    imageRequestRef.current?.abort();
    const controller = new AbortController();
    imageRequestRef.current = controller;
    setIsGeneratingImage(true);
    try {
      const response = await fetch("/api/ai-image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle, content: trimmedContent }),
        signal: controller.signal,
      });
      if (!response.ok) {
        let code = "";
        try {
          code = ((await response.json()) as { code?: string }).code || "";
        } catch {
          code = "";
        }
        if (response.status === 429 || code === "RATE_LIMITED") {
          showAlert("error", "Too many image requests. Please wait a minute and try again.");
        } else if (response.status === 422 || code === "IMAGE_REJECTED") {
          showAlert("error", "This topic can't be turned into an image. Try changing the title or content.");
        } else {
          showAlert("error", "Image generation failed. Please try again.");
        }
        return;
      }

      const blob = await response.blob();
      const file = new File([blob], `ai-generated-${Date.now()}.jpg`, {
        type: blob.type || "image/jpeg",
      });
      handleImageChange({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
      setAiGenerated(true);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        showAlert("error", "Image generation failed. Please try again.");
      }
    } finally {
      if (imageRequestRef.current === controller) imageRequestRef.current = null;
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 md:py-4">
      <form onSubmit={addBlogs} className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-center text-5xl font-black uppercase leading-none tracking-[-0.045em] text-[var(--ink)] md:text-7xl">
          Add Article
        </h1>

        {/* Main Editor Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {/* Left Column - Title and Content */}
          <div className="order-1 min-w-0 space-y-5">
            {/* Blog Title */}
            <InputTitle 
              onChange={handleTitleChange} 
              value={title}
              themeValue={themeValue} 
            />
            {/* Blog Content */}
            <InputContent 
              value={content} 
              themeValue={themeValue} 
              textareaRef={contentRef}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                inlineSuggestion.handleChange(event);
              }}
              onKeyDown={inlineSuggestion.handleKeyDown}
              onFocus={() => {
                inlineSuggestion.setFocused(true);
              }}
              onBlur={() => {
                inlineSuggestion.setFocused(false);
              }}
              onCompositionStart={inlineSuggestion.onCompositionStart}
              onCompositionEnd={inlineSuggestion.onCompositionEnd}
              ariaDescribedBy={inlineSuggestion.hintId}
              suggestion={inlineSuggestion.suggestion}
              isLoading={inlineSuggestion.isLoading}
              onAccept={() => inlineSuggestion.accept()}
            />
          </div>

          {/* Right Column - AI Assistance, Summary, Tags */}
          <div className="order-2 min-w-0 space-y-5">
            <div className="rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-4 shadow-[var(--sh-card)] sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-black tracking-[-0.03em] text-[var(--ink)]">
                  🤖 AI Assistance
                </h2>
                <button
                  type="button"
                  role="switch"
                  aria-checked={aiAssistEnabled}
                  onClick={toggleAssistant}
                  className="min-h-8 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--paper)] px-2 text-xs font-extrabold"
                >
                  AI-Assistant: {aiAssistEnabled ? "On" : "Off"}
                </button>
              </div>
              <div className="grid gap-3">
                <Button
                  type="button"
                  onClick={handleSuggest}
                  variant="outline"
                  disabled={aiLoading}
                  className="w-full min-w-0 cursor-pointer justify-center px-3 text-center disabled:cursor-not-allowed sm:justify-between sm:px-6"
                >
                  {aiLoading ? (
                    <div className="flex w-full items-center justify-center gap-2">
                      <AILoader text="Generating..." compact />
                    </div>
                  ) : (
                    <>
                      <span>Generate Summary & Tags</span>
                      <span className="text-[11px] opacity-70">⌘S</span>
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  variant="outline"
                  className="w-full min-w-0 cursor-pointer justify-center bg-[var(--rose)] px-3 text-center disabled:cursor-not-allowed sm:justify-between sm:px-6"
                >
                  {isGeneratingImage ? (
                    <span className="flex w-full items-center justify-center gap-2">
                      <AILoader text="Generating..." compact />
                    </span>
                  ) : (
                    <>
                      <span>🖼️ Generate Image</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            {/* Input Summary */}
            <InputSummary 
              value={summary}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                summarySuggestion.handleChange(event);
              }}
              textareaRef={summaryRef}
              onKeyDown={summarySuggestion.handleKeyDown}
              onFocus={() => summarySuggestion.setFocused(true)}
              onBlur={() => summarySuggestion.setFocused(false)}
              ariaDescribedBy={summarySuggestion.hintId}
              suggestion={summarySuggestion.suggestion}
              isLoading={summarySuggestion.isLoading}
              onAccept={() => summarySuggestion.accept()}
              themeValue={themeValue}
            />
          </div>

          {/* Full Width Row - Feature Image (Left) & Tags (Right) */}
          <div className="order-3 md:col-span-2 lg:col-span-2">
            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
              {/* Feature Image - Left side */}
              <div className="w-full">
                <FeatureImage
                  onChange={handleUserImageChange}
                  imagePreview={imagePreview}
                  themeValue={themeValue}
                  isGenerating={isGeneratingImage}
                  aiGenerated={aiGenerated}
                />
              </div>
              {/* Tags - Right side */}
              <div className="w-full">
                <InputTags
                  value={tagInput}
                  onChange={handleTagInput}
                  onKeyDown={handleTagKeyDown}
                  addTag={addTag}
                  removeTag={removeTag}
                  tags={tags}
                  themeValue={themeValue}
                />
              </div>
            </div>
          </div>

          {/* Preview Blog - Full Width */}
          <div className="order-4 lg:col-span-2">
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
      <AIFeaturePopup page="create" />
    </div>
  );
}