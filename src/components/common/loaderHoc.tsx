"use client";
import { useSelector } from "react-redux";
import LoadingPage from "../layout/LoadingPage";

export default function LoaderHOC(Wrapped: React.ComponentType<any>) {
  return function WithLoader(props: any) {
    const globalLoading = useSelector((state: any) => state.global?.isLoading);

    if (globalLoading) return <LoadingPage />;
    return <Wrapped {...props} />;
  };
}
