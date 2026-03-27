"use client";
import { useState, useEffect } from "react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my-watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const removeMovie = (id) => {
    const updated = watchlist.filter(m => m.id !== id);
    setWatchlist(updated);
    localStorage.setItem("my-watchlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-8 dark:text-white">Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-white/5">
            <div className="w-16 h-20 bg-blue-600/20 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-blue-500">
              {movie.title[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-bold dark:text-white">{movie.title}</h3>
              <div className="flex items-center gap-2">
                {/* --- RATING IN WATCHLIST --- */}
                <span className="text-xs font-black text-amber-500">★ {movie.rating}</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs text-gray-500 font-medium">{movie.genre}</span>
              </div>
            </div>
            <button onClick={() => removeMovie(movie.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}