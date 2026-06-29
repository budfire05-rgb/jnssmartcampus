import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Courses } from "./components/Courses";
import { Admissions } from "./components/Admissions";
import { Departments } from "./components/Departments";
import { FacultySection } from "./components/Faculty";
import { CampusLifeSection } from "./components/CampLife";
import { Placements } from "./components/Placements";
import { AiAssistant } from "./components/AiAssistant";
import { CRM } from "./components/CRM";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MessageSquare } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeHeaderSearch, setActiveHeaderSearch] = useState<string>("");
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantTab, setAssistantTab] = useState<"chatbot" | "admissions">("chatbot");

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveHeaderSearch(searchQuery);
    setCurrentTab("courses");
    setTimeout(() => {
      const el = document.getElementById("courses-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const openAdvisor = (tab: "chatbot" | "admissions") => {
    setAssistantTab(tab);
    setIsAssistantOpen(true);
    setTimeout(() => {
      const el = document.getElementById("ai-assistant-drawer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-cyan-500 to-white transition-colors duration-200 text-slate-100 flex flex-col justify-between">
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === "courses" || tab === "campus-life" || tab === "faculty" || tab === "placements" || tab === "contact") {
            setTimeout(() => {
              const el = document.getElementById(`${tab}-section`) || document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }
        }}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onApplyNowClick={() => openAdvisor("chatbot")}
        onCrmLoginClick={() => {
          window.location.href = "http://localhost:3001";
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="flex-1">
        {currentTab === "home" && (
          <div className="animate-in fade-in duration-300">
            <Hero onApplyNowClick={() => openAdvisor("chatbot")} />
            <Courses
              onSyllabusRequest={() => openAdvisor("chatbot")}
              onEnrollRequest={() => openAdvisor("admissions")}
            />
            <Departments />
            <Admissions />
            <FacultySection onContactFaculty={(prof) => alert(`Direct email interface routed to Dr. ${prof} (${prof.toLowerCase().replace(/[^a-z]/g, "")}@jns.edu.in).`)} />
            <CampusLifeSection />
            <Placements />
            <Contact />
          </div>
        )}

        {currentTab === "courses" && (
          <div className="animate-in fade-in duration-150">
            <Courses
              onSyllabusRequest={() => openAdvisor("chatbot")}
              onEnrollRequest={() => openAdvisor("admissions")}
              searchTerm={activeHeaderSearch}
            />
          </div>
        )}

        {currentTab === "campus-life" && (
          <div className="animate-in fade-in duration-150">
            <CampusLifeSection />
          </div>
        )}

        {currentTab === "faculty" && (
          <div className="animate-in fade-in duration-150">
            <FacultySection onContactFaculty={(prof) => alert(`Direct email interface routed to Dr. ${prof}.`)} />
          </div>
        )}

        {currentTab === "placements" && (
          <div className="animate-in fade-in duration-150">
            <Placements />
          </div>
        )}

        {currentTab === "contact" && (
          <div className="animate-in fade-in duration-150">
            <Contact />
          </div>
        )}

        {currentTab === "crm" && (
          <div className="animate-in fade-in duration-150">
            <CRM onClose={() => setCurrentTab("home")} />
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 dark:bg-white/[0.03] backdrop-blur-md text-blue-600 dark:text-blue-400 shadow-2xl transition hover:scale-106 hover:rotate-6 group"
          id="advisor-floating-trigger"
          title="Open Academic Advisor"
        >
          <MessageSquare className="h-6 w-6 group-hover:scale-105" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-extrabold text-white animate-pulse">
            Ask
          </span>
        </button>
      </div>

      <AiAssistant
        activeTab={assistantTab}
        setActiveTab={setAssistantTab}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
      <Footer />
    </div>
  );
}
