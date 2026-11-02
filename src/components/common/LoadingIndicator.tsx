import React from "react";

interface LoadingIndicatorProps {
  text?: React.ReactNode;
  color?: string;
  compact?: boolean;
}

const LoadingIndicator = ({
  text,
  color = "var(--purple)",
  compact = false,
}: LoadingIndicatorProps) => {
  return (
    <div
      className={`loading-indicator${compact ? " loading-indicator--compact" : ""}`}
      role="status"
      aria-live="polite"
      style={{ "--loading-accent": color } as React.CSSProperties}
    >
      <svg
        className="loading-indicator__spinner"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle className="loading-indicator__track" cx="32" cy="32" r="25" />
        <circle className="loading-indicator__arc" cx="32" cy="32" r="25" />
      </svg>
      {text ? <span className="loading-indicator__text">{text}</span> : null}
    </div>
  );
};

export default LoadingIndicator;
