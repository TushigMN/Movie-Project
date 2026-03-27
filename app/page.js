export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-4">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 dark:text-white">
          Unlimited <span className="text-blue-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.3)]">Movies</span>
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mb-10 font-medium">
          Track your favorite cinema, discover new releases, and build your ultimate watchlist in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
            Browse Movies
          </button>
          <button className="px-10 py-4 bg-gray-100 dark:bg-white/5 dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="max-w-7xl w-full px-8 pb-20">
        <h2 className="text-3xl font-bold mb-8 dark:text-white tracking-tight">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="group relative aspect-[2/3] bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden cursor-pointer border border-transparent hover:border-blue-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* This is where the poster goes later */}
              <div className="absolute bottom-4 left-4 text-white font-bold translate-y-4 group-hover:translate-y-0 transition-transform">
                Movie {i}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}