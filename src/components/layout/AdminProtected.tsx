"use client";
import { useGetProfileQuery } from "../../Redux/Services/userApi";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from '../../components/layout/LoadingPage'

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetProfileQuery(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading  && data?.user.role === "author") {
      router.push("/");
    }
  }, [data, isLoading, router]);

  if (isLoading) return <LoadingPage />

  return <>{children}</>;
}
