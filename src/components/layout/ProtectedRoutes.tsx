"use client";
import { useGetProfileQuery } from "../../Redux/Services/userApi";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from '../../components/layout/LoadingPage'
import LoaderHOC from "../common/loaderHoc";


 function InnerProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetProfileQuery(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <LoadingPage />

  return <>{children}</>;
}

const ProtectedRoute = LoaderHOC(InnerProtectedRoute);

export default ProtectedRoute;
