'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react';
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);


  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetProfileQuery(undefined);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!data?.user;

  /** 🔹 Outside Click Close — Mobile Menu */
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


  /** 🔹 Navigation Logic */
  const handleNavigate = useCallback(async (link: string) => {

    if (isAuthenticated) {
      setMenuOpen(false);
      router.push(link);
      return;
    }
    handleAuthAndNavigate(link);

  }, [isAuthenticated, router]);




  const handleAuthAndNavigate = useCallback(async (link: string) => {
    if (isAuthenticating) return;
    setIsAuthenticating(true)

    try {
      await dispatch(googleLoginThunk()).unwrap();
      setMenuOpen(false);
      router.push(link);

    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  },[isAuthenticating, dispatch, router]);




  /** 🔹 Navbar Links */
  const navLinks = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/Create", label: "Create Blog" },
    { href: "/Blogs", label: "Blogs" },
    { href: "/Authors", label: "Authors" },
    { href: "/Collection", label: "Collection" },
  ], []);

  /** 🔹 Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [router]);


  return (
    <header className={`sticky top-0 z-50 w-full border-b-[3px] border-[var(--ink)] bg-[var(--paper)]`}>
      <div className="mx-auto flex min-h-20 max-w-[1240px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 text-lg font-black tracking-[-0.04em] text-[var(--ink)]"
          onClick={() => setMenuOpen(false)}
        >
          <div aria-hidden="true" className="relative flex h-9 w-8 items-center justify-center">
            <span className="absolute left-0 top-1 h-7 w-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--blue)]" />
            <span className="absolute left-3 top-2 h-2.5 w-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--yellow)]" />
            <span className="absolute bottom-1 right-0 h-6 w-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--pink)]" />
          </div>
          intelli.blog
        </Link>

        {/* =============== DESKTOP MENU =============== */}
        <div className="hidden md:flex items-center gap-5">
          <nav>
            <ul className="flex items-center gap-1 font-bold text-[var(--ink)]">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavigate(href)}
                    disabled={isAuthenticating}
                    className={`relative flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm transition-all cursor-pointer disabled:opacity-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] ${
                      pathname === href
                        ? "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-1 after:rounded-full after:border-2 after:border-[var(--ink)] after:bg-[var(--yellow)]"
                        : "hover:bg-[var(--yellow)]"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-l-[3px] border-[var(--ink)] pl-4">
            <button
              onClick={() => handleNavigate('/Profile')}
              disabled={isAuthenticating}
              className="flex min-h-11 items-center gap-2 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-4 font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
            >
              Profile
            </button>

          </div>
        </div>

        {/* =============== MOBILE MENU BUTTON =============== */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex size-11 items-center justify-center rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-[var(--sh-btn)] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =============== MOBILE DROPDOWN =============== */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden border-t-[3px] border-[var(--ink)] bg-[var(--paper)] transition-[max-height,opacity] duration-150 ease-out ${
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 my-4 space-y-2 rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--white)] p-4 shadow-[var(--sh-card)]">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleNavigate(href)}
              disabled={isAuthenticating}
              className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left font-bold transition-all cursor-pointer disabled:opacity-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px] ${
                pathname === href
                  ? 'bg-[var(--yellow)] text-[var(--ink)]'
                  : 'hover:bg-[var(--paper)]'
              }`}
            >
              <span>{label}</span>
            </button>
          ))}

          <div className="mt-3 border-t-[3px] border-[var(--ink)] pt-3">
            <button
              onClick={() => handleNavigate('/Profile')}
              disabled={isAuthenticating}
              className="flex min-h-11 w-full items-center gap-2 rounded-[var(--r-btn)] border-[3px] border-[var(--ink)] bg-[var(--purple)] px-3 font-extrabold text-white shadow-[var(--sh-btn)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[var(--purple)] focus-visible:outline-offset-[3px]"
            >
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
