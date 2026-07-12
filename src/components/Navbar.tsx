"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Lock, Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Manifesto & Cells", path: "/manifesto" },
    { name: "Member Dashboard", path: "/dashboard", icon: Lock },
    { name: "Executives", path: "/executives" },
  ];

  return (
    <>
      {/* Saffron Top Accent */}
      <div className="h-1.5 bg-brand-saffron w-full"></div>

      <header className="border-b border-brand-dark/10 dark:border-brand-chalk/10 sticky top-0 z-40 bg-brand-chalk/95 dark:bg-brand-dark/95 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Brand Logotype */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 border border-brand-dark dark:border-brand-chalk flex items-center justify-center font-bold tracking-tighter text-md bg-brand-dark text-brand-chalk dark:bg-brand-chalk dark:text-brand-dark transition-colors duration-200">
              NSF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight uppercase text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  NSF JU
                </span>
              </div>
              <p className="text-[10px] text-brand-dark/60 dark:text-brand-chalk/60 uppercase tracking-widest font-bold font-mono transition-colors duration-200">
                Nationalist Students&apos; Front • Jadavpur
              </p>
            </div>
          </Link>

          {/* Newspaper-style Tab Navigation */}
          <nav className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 border-b-2 transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "border-brand-saffron text-brand-saffron"
                      : "border-transparent text-brand-dark/60 dark:text-brand-chalk/60 hover:text-brand-dark dark:hover:text-brand-chalk"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Minimalist Action Bar */}
          <div className="hidden md:flex items-center gap-4">
            {/* Session Badge */}
            {currentUser && (
              <div className="font-mono text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 border border-emerald-200 dark:border-emerald-800/40">
                Active: {currentUser.name}
              </div>
            )}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 border border-brand-dark dark:border-brand-chalk hover:bg-brand-dark hover:text-brand-chalk dark:hover:bg-brand-chalk dark:hover:text-brand-dark text-brand-dark dark:text-brand-chalk transition-all duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <Link
              href="/join"
              className="px-5 py-2.5 border border-brand-dark dark:border-brand-chalk hover:bg-brand-dark hover:text-brand-chalk dark:hover:bg-brand-chalk dark:hover:text-brand-dark text-brand-dark dark:text-brand-chalk text-xs font-bold uppercase tracking-wider transition-all duration-200"
            >
              Enroll
            </Link>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle for Mobile Bar */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-brand-dark dark:border-brand-chalk text-brand-dark dark:text-brand-chalk cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-dark dark:text-brand-chalk focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-chalk dark:bg-brand-dark border-b border-brand-dark/10 dark:border-brand-chalk/10 px-6 py-6 space-y-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors duration-200">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left py-2 block flex items-center gap-2 ${
                  isActive 
                    ? "text-brand-saffron" 
                    : "text-brand-dark/60 dark:text-brand-chalk/60 hover:text-brand-dark dark:hover:text-brand-chalk"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
          <hr className="border-brand-dark/10 dark:border-brand-chalk/10 my-2" />
          {currentUser && (
            <div className="font-mono text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-2 border border-emerald-200 dark:border-emerald-800/40 text-center mb-2">
              Active: {currentUser.name}
            </div>
          )}
          <Link
            href="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-brand-dark dark:bg-brand-chalk text-brand-chalk dark:text-brand-dark text-center tracking-wider block uppercase hover:bg-brand-saffron transition-colors duration-200"
          >
            Enroll as Volunteer
          </Link>
        </div>
      )}
    </>
  );
}
