"use client";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Users, ThumbsUp, Bookmark } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext, useTransition } from "react";

export default function DashboardLayout({ children }: any) {
  const { themeValue, light, dark } = useContext(ContextTheme);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const menuItems = [
    { href: "/Admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/Admin/allBlogs", label: "All Blogs", icon: FileText },
    { href: "/Admin/allUsers", label: "All Users", icon: Users },
    { href: "/Admin/userLikes", label: "User Likes", icon: ThumbsUp },
    { href: "/Admin/userBookmarks", label: "User Bookmarks", icon: Bookmark },
  ];

  const isActive = (href: string) => pathname === href;

  // ✅ Fast navigation handler
  const handleNavigation = (href: string) => {
    if (pathname === href) return; // Already on this page
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <section className="min-h-screen flex bg-[var(--bg)] text-[var(--ink)]">
      {/* Sidebar - Desktop */}
      <div
        className="sticky top-0 hidden h-screen w-64 flex-col border-r-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-[7px_0_0_var(--ink)] md:flex"
      >
        {/* Sidebar Header */}
        <div
          className="border-b-[3px] border-[var(--ink)] p-6"
        >
          <h1 className="text-2xl font-black tracking-[-0.04em] text-[var(--ink)]">
            Admin Control
          </h1>
          <p
            className="text-sm text-[var(--muted)]"
          >
            Manage your platform
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              disabled={isPending || isActive(item.href)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-[var(--r-btn)] border-[3px] border-transparent p-3 text-left transition-all disabled:opacity-70 ${
                isActive(item.href)
                  ? "border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-[var(--sh-btn)]"
                  : "text-[var(--muted)] hover:border-[var(--ink)] hover:bg-[var(--paper)]"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:mb-4 mb-20">
        <main className="flex-1 overflow-y-auto p-0">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed left-0 right-0 top-[76px] z-50 overflow-x-auto border-y-[3px] border-[var(--ink)] bg-[var(--paper)] px-3 py-2 md:hidden">
        <nav className="flex min-w-max items-center gap-2">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              disabled={isPending || isActive(item.href)}
              className={`flex min-h-11 flex-row items-center gap-2 rounded-full border-[2.5px] px-3 text-[12px] font-extrabold disabled:opacity-70 ${
                isActive(item.href)
                  ? "border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-[3px_3px_0_var(--ink)]"
                  : "border-[var(--ink)] bg-[var(--white)] text-[var(--muted)]"
              }`}
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}