"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
   <nav className="flex justify-between items-center p-4 bg-background text-foreground border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      
      <h1 className="text-xl font-bold">MovieCenter</h1>

      <ul className="flex gap-6">
        <li>Home</li>
        <li>Movies</li>
        <li>Watchlist</li>
      </ul>

      <button 
        onClick={() => setDark(!dark)}
        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}