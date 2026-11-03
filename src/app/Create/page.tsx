"use client";
import { useContext, SetStateAction, useEffect, useState } from "react";
import { useRef } from "react";
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

const AIIntroductionModal = dynamic(
  () => import("../../components/blog/AIIntroductionModal"),
  { ssr: false }
);

export default function WriteBlogForm() {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { loggedInUserId } = useLoggedInUser();
  const { showAlert } = useAlert();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [introKey, setIntroKey] = useState("");
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

  useEffect(() => {
    if (!loggedInUserId) return;
    const key = `intelliblog.aiIntro.v1.${loggedInUserId}`;
    setIntroKey(key);
    let seen = false;
    try {
      seen = window.localStorage.getItem(key) === "seen";
    } catch {
      seen = false;
    }
    if (seen) return;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const requestIdle = window.requestIdleCallback;
    if (typeof requestIdle === "function") {
      idleId = requestIdle(() => setShowIntro(true), { timeout: 600 });
    } else {
      timeoutId = window.setTimeout(() => setShowIntro(true), 600);
    }
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
  }, [loggedInUserId]);

  const markIntroSeen = () => {
    if (introKey) {
      try {
        window.localStorage.setItem(introKey, "seen");
      } catch {
        // The modal remains dismissible when storage is unavailable.
      }
    }
    setShowIntro(false);
  };

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

  return (
    <div className="w-full px-4 py-2 md:py-4">
      <form onSubmit={addBlogs} className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-center text-5xl font-black uppercase leading-none tracking-[-0.045em] text-[var(--ink)] md:text-7xl">
          Add Article
        </h1>

        {/* Main Editor Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {/* Left Column - Title and Content */}
          <div className="order-1 space-y-5">
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
          <div className="order-2 space-y-5">
            <div
              className="relative rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--mint)] p-5 shadow-[var(--sh-card)]"
            >
              <h2 className="mb-3 text-lg font-black tracking-[-0.03em] text-[var(--ink)]">
                🤖 AI Assistance
              </h2>
              <button
                type="button"
                role="switch"
                aria-checked={aiAssistEnabled}
                onClick={toggleAssistant}
                className="absolute right-5 top-4 min-h-8 rounded-[var(--r-chip)] border-2 border-[var(--ink)] bg-[var(--paper)] px-2 text-xs font-extrabold"
              >
                AI-Assistant: {aiAssistEnabled ? "On" : "Off"}
              </button>
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
                      <AILoader />
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
              {/* Feature Image - Left side */}
              <div className="w-full">
                <FeatureImage
                  onChange={handleImageChange}
                  imagePreview={imagePreview}
                  themeValue={themeValue}
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
      {showIntro && (
        <AIIntroductionModal onSeen={markIntroSeen} onLater={markIntroSeen} />
      )}
    </div>
  );
}