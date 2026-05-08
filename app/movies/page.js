"use client";

import { useState, useEffect, useRef } from "react";

export default function MoviesPage() {
  const [filter, setFilter] = useState("All");
  const [movies, setMovies] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  // --- BUBBLE LOGIC STATE ---
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const buttonsRef = useRef([]);

  const categories = ["All", "Action", "Comedy", "Horror", "Sci-Fi", "Drama"];

  useEffect(() => {
    // 1. Generate Data
    const movieData = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      title: `Movie Title ${i + 1}`,
      year: 2024 - (i % 5),
      genre: categories[(i % (categories.length - 1)) + 1],
      rating: (7.5 + Math.random() * 2.0).toFixed(1),
    }));
    setMovies(movieData);
    setMounted(true);
  }, []);

  // 2. Update Bubble Position whenever Filter changes
  useEffect(() => {
    if (!mounted) return;
    const activeIndex = categories.indexOf(filter);
    const activeBtn = buttonsRef.current[activeIndex];

    if (activeBtn) {
      setBubbleStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1,
      });
    }
  }, [filter, mounted]);

  const addToWatchlist = (e, movie) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("my-watchlist") || "[]");
    if (!saved.find((m) => m.id === movie.id)) {
      localStorage.setItem("my-watchlist", JSON.stringify([...saved, movie]));
      alert(`🎬 Added ${movie.title} to Watchlist!`);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-transparent" />;

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
              Explore <span className="text-blue-600">Movies</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              Discover your next favorite story.
            </p>
          </div>

          {/* SMOOTH BUBBLE FILTER BAR */}
          <div className="relative flex items-center p-1.5 bg-gray-100 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 overflow-x-auto no-scrollbar">
            {/* The Moving Bubble */}
            <div 
              className="absolute h-[calc(100%-12px)] bg-blue-600 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-lg shadow-blue-600/30 pointer-events-none"
              style={{
                left: bubbleStyle.left,
                width: bubbleStyle.width,
                opacity: bubbleStyle.opacity
              }}
            />

            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={(el) => (buttonsRef.current[i] = el)}
                onClick={() => setFilter(cat)}
                className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 cursor-pointer whitespace-nowrap active:scale-95 ${
                  filter === cat
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* THE MOVIE GRID (It's back!) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
          {movies
            .filter((m) => filter === "All" || m.genre === filter)
            .map((movie) => (
              <div key={movie.id} className="group cursor-pointer flex flex-col">
                
                {/* Poster Card */}
                <div className="relative aspect-[2/3] w-full bg-gray-100 dark:bg-white/5 rounded-[2.5rem] overflow-hidden mb-5 border border-gray-200 dark:border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group-hover:border-blue-500/50">
                  
                  {/* Watchlist Button */}
                  <button 
                    onClick={(e) => addToWatchlist(e, movie)}
                    className="absolute top-4 left-4 z-30 w-10 h-10 bg-black/40 backdrop-blur-xl text-white rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 flex items-center justify-center"
                  >
                    <span className="text-2xl font-light mb-0.5">+</span>
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-xl text-[11px] font-black text-amber-400 border border-white/10">
                    ★ {movie.rating}
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50 transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="px-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 transition-colors leading-tight">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-500 mt-1">
                    <span>{movie.year}</span>
                    <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" />
                    <span>{movie.genre}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}