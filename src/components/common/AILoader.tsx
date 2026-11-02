import React from "react";
import type { LoaderProps } from "../../../types/Blog";
import LoadingIndicator from "./LoadingIndicator";

const AILoader: React.FC<LoaderProps> = ({
  text = "Generating...",
  color = "var(--blue)",
}) => <LoadingIndicator text={text} color={color} />;

export default AILoader;
