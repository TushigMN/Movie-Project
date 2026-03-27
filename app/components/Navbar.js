"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  
  // --- BUBBLE STATE ---
  const [hoveredPath, setHoveredPath] = useState(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Movies", path: "/movies", icon: "🎬" },
    { name: "Watchlist", path: "/watchlist", icon: "🔖" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    dark ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  // --- BUBBLE LOGIC ---
  const handleMouseEnter = (e, path) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    setHoveredPath(path);
    setBubbleStyle({
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPath(null);
    setBubbleStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  if (!mounted) return null;

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-lg">M</span>
            </div>
            <span className="text-lg font-bold dark:text-white tracking-tighter">MovieProj</span>
          </Link>

          {/* Desktop Nav with SMOOTH BUBBLE */}
          <div className="hidden md:flex items-center relative">
            {/* The Actual Bubble */}
            <div
              className="absolute h-9 bg-blue-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
              style={{
                left: bubbleStyle.left,
                width: bubbleStyle.width,
                opacity: bubbleStyle.opacity,
              }}
            />
            
            <ul className="flex items-center relative z-10">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    onMouseEnter={(e) => handleMouseEnter(e, link.path)}
                    onMouseLeave={handleMouseLeave}
                    className={`px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                      hoveredPath === link.path 
                        ? "text-white" 
                        : pathname === link.path 
                          ? "text-blue-600" 
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-xl transition-transform active:scale-90">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* --- BOTTOM NAV (Mobile Only) --- */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-20 bg-white/90 dark:bg-black/80 backdrop-blur-2xl border-t border-gray-100 dark:border-white/10 px-6 pb-4">
        <div className="flex h-full items-center justify-around">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.path} href={link.path} className="flex flex-col items-center gap-1 relative">
                <div className={`text-xl transition-all duration-300 ${isActive ? "scale-125 -translate-y-1" : "grayscale opacity-50"}`}>
                  {link.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                  {link.name}
                </span>
                {isActive && <div className="absolute -bottom-2 w-1 h-1 bg-blue-600 rounded-full shadow-[0_0_10px_#2563eb]" />}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}