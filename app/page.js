//import Image from "next/image";
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // track dark mode and persist to localStorage
  const [dark, setDark] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("theme") === "dark";
      }
    } catch (e) {
      // ignore
    }
    return false;
  });

  const linkStyle = (path) =>
    pathname === path
      ? "text-blue-500 font-bold"
      : "text-white hover:text-amber-400";
  useEffect(() => {
    try {
      if (dark) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // window/localStorage might be unavailable in some environments
    }
  }, [dark]);

  return (
    <nav className="flex justify-between items-center p-4 bg-black dark:bg-black transition-colors duration-300">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-black dark:text-white">Movie project</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link href="/" className={linkStyle("/")}>Home</Link>
          </li>
          <li>
            <Link href="/movies" className={linkStyle("/movies")}>Movies</Link>
          </li>
          <li>
            <Link href="/watchlist" className={linkStyle("/watchlist")}>Watchlist</Link>
          </li>
        </ul>

        {/* toggle button */}
        <button
          onClick={() => setDark(!dark)}
          className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          <li>
            <Link href="/" className={linkStyle("/")} onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className={linkStyle("/movies")} onClick={() => setOpen(false)}>
              Movies
            </Link>
          </li>
          <li>
            <Link href="/watchlist" className={linkStyle("/watchlist")} onClick={() => setOpen(false)}>
              Watchlist
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
