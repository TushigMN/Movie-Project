import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Movie Project",
  description: "Cinephile's Paradise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This script runs immediately, before the page paints */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
     <body className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-500">
        <Navbar />
          <main>{children}</main>
      </body>
    </html>
  );
}