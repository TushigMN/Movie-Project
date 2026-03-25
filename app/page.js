//import Image from "next/image";
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false); // Start neutral
  const [mounted, setMounted] = useState(false); // Track if component is mounted

  // 1. Check theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
    }
    setMounted(true);
  }, []);

  // 2. Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    if (dark) {
      document.documentElement.classList.add("dark"); // Better to target documentElement for Tailwind
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  const linkStyle = (path) =>
    pathname === path
      ? "text-blue-500 font-bold"
      : "text-white hover:text-amber-400";

  // Avoid rendering toggle until mounted to prevent hydration flickers
  if (!mounted) return null; 

  return (
    <nav className="p-4 bg-black transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        <h1 className="text-xl font-bold text-white">Movie project</h1>

        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            <li><Link href="/" className={linkStyle("/")}>Home</Link></li>
            <li><Link href="/movies" className={linkStyle("/movies")}>Movies</Link></li>
            <li><Link href="/watchlist" className={linkStyle("/watchlist")}>Watchlist</Link></li>
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-gray-800 text-lg border border-gray-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Hamburger (Mobile Only) */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden border-t border-gray-800 pt-4">
          <li><Link href="/" className={linkStyle("/")} onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/movies" className={linkStyle("/movies")} onClick={() => setOpen(false)}>Movies</Link></li>
          <li><Link href="/watchlist" className={linkStyle("/watchlist")} onClick={() => setOpen(false)}>Watchlist</Link></li>
        </ul>
      )}
    </nav>
  );
}