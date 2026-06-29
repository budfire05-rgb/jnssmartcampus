import React, { useState } from "react";
import { Search, Sun, Moon, GraduationCap, ChevronDown, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onApplyNowClick: () => void;
  onCrmLoginClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  toggleDarkMode,
  onApplyNowClick,
  onCrmLoginClick,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "courses", label: "Courses" },
    { key: "campus-life", label: "Campus Life" },
    { key: "faculty", label: "Faculty" },
    { key: "placements", label: "Placements" },
    { key: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-2xl text-slate-100 transition-colors" id="smartcampus-header">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-white shadow-sm"></div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            className="flex cursor-pointer items-center space-x-3 text-slate-900 transition hover:opacity-90 dark:text-white"
            onClick={() => handleNavClick("home")}
            id="brand-logo"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-cyan-400 to-white p-2.5 text-white shadow-lg shadow-violet-500/20">
              <GraduationCap className="h-6 w-6" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-400 text-[8px] font-bold text-slate-950 shadow-xs">★</span>
            </div>
            <div>
              <div className="font-display text-xl font-extrabold tracking-tight">
                JNS <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-white bg-clip-text text-transparent">SmartCampus</span>
              </div>
              <p className="text-[9px] -mt-0.5 font-bold tracking-widest text-violet-700 dark:text-slate-400">STATE-OF-THE-ART UNIVERSITY</p>
            </div>
          </button>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`rounded-lg px-3.5 py-2 font-sans text-[13.5px] font-semibold transition-all duration-200 border ${
                currentTab === item.key
                  ? "bg-cyan-400/15 text-cyan-200 border-cyan-400/20 dark:bg-cyan-500/20 dark:text-cyan-100 dark:border-cyan-400/30"
                  : "border-transparent text-slate-300 hover:bg-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}

        </nav>

        {/* Right Section Actions (Search, Theme, Desktop Actions) */}
        <div className="flex items-center space-x-3" id="header-actions">
          {/* Search Trigger form */}
          <form onSubmit={onSearchSubmit} className="hidden md:flex relative max-w-[180px] lg:max-w-[240px]">
            <input
              type="text"
              placeholder="Search campus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-10 text-xs font-medium outline-hidden transition backdrop-blur-md focus:border-blue-400 focus:bg-white/10 focus:ring-1 focus:ring-blue-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-blue-400 dark:focus:bg-white/10"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-450 hover:text-blue-500 dark:hover:text-blue-400">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* CRM Login Button */}
          <button
            onClick={onCrmLoginClick}
            className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500"
            id="btn-crm-login"
          >
            Login to CRM
          </button>

          {/* Apply Now Button */}
          <button
            onClick={onApplyNowClick}
            className="hidden md:flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-violet-600 via-cyan-400 to-white px-5 py-2.5 font-display text-xs font-bold tracking-wider text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-103 hover:opacity-95"
            id="btn-apply-now"
          >
            <span>Ask Advisor</span>
            <ArrowRight className="h-4 w-4 text-slate-950" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-700 hover:bg-white/10 dark:text-slate-200 xl:hidden"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Responsive Navigation) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/15 bg-white/95 backdrop-blur-xl p-4 space-y-4 shadow-lg animate-in slide-in-from-top-5 duration-200 dark:border-white/10 dark:bg-slate-950/95" id="mobile-nav-panel">
          {/* Mobile Search */}
          <form onSubmit={onSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search catalog, library, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-12 text-xs font-semibold outline-hidden dark:text-white"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Navigation keys */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`rounded-xl p-3 text-left font-sans text-xs font-bold tracking-wide transition ${
                  currentTab === item.key
                    ? "bg-blue-500/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "bg-slate-500/5 text-slate-600 hover:bg-white/10 dark:bg-slate-900/40 dark:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>


          {/* Apply button for mobile */}
          <button
            onClick={() => {
              onApplyNowClick();
              setMobileMenuOpen(false);
            }}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-blue-500 py-3 text-center font-display text-xs font-bold text-white shadow-md hover:bg-blue-400"
          >
            <span>Ask Advisor</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
};
