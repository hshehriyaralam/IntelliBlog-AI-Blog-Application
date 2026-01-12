'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../Redux/Slices/authSlice';
import type { AppDispatch } from '../Redux/store';
import { useLazyGetProfileQuery } from '../Redux/Services/userApi';

export function useAuthNavigate() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [getProfile] = useLazyGetProfileQuery();

  const authNavigate = useCallback(
    async (link: string) => {
      if (isAuthenticating) return;

      try {
        // 1️⃣ check session ONLY on click
        const res = await getProfile(undefined).unwrap();

        if (res?.user) {
          // ✅ already logged in
          router.push(link);
          return;
        }

      } catch (err: any) {
        // 🔥 sirf auth error par login karao
        if (err?.status !== 401) {
          console.error('Profile fetch failed:', err);
          return; // kisi aur error par popup mat dikhao
        }
      }

      // 2️⃣ yahan tab aaye jab user actually NOT logged in ho
      try {
        setIsAuthenticating(true);
        await dispatch(googleLoginThunk()).unwrap();
        router.push(link);
      } catch (err) {
        console.error('Google login failed:', err);
      } finally {
        setIsAuthenticating(false);
      }
    },
    [dispatch, getProfile, router, isAuthenticating]
  );

  return { authNavigate, isAuthenticating };
}
