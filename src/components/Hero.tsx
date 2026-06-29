import React from "react";
import { ArrowRight } from "lucide-react";
import campusHeroImage from "../assets/images/campus_hero_1782189601496.jpg";

interface HeroProps {
  onApplyNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyNowClick }) => {
  const stats = [
    { value: "800", label: "Active Students" },
    { value: "60", label: "Premium Faculty" },
    { value: "95%", label: "Placement Rate" },
    { value: "12", label: "Accredited Courses" },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24" id="campus-hero-section">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text Pillar */}
          <div className="space-y-6 lg:col-span-6" id="hero-text-pillar">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="font-display text-[10px] font-bold tracking-widest text-[#1e3a8a] dark:text-blue-400 uppercase">
                Admissions Open Academic Year 2026-27
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl lg:text-6.5xl leading-[1.1]">
              Empowering Future <br className="hidden md:inline" />Leaders Through{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-white bg-clip-text text-transparent italic font-serif">
                Innovation
              </span>
            </h1>

            <p className="max-w-xl font-sans text-base/relaxed font-medium text-slate-600 dark:text-slate-400 sm:text-lg">
              Integrating cutting-edge academic excellence with industry-leading technology to nurture the next generation of global visionaries with a fully connected campus.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onApplyNowClick}
                className="group flex items-center space-x-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:scale-103 hover:opacity-95"
              >
                <span>Ask Advisor</span>
                <ArrowRight className="h-4 w-4 text-slate-950 transition duration-240 group-hover:translate-x-1" />
              </button>
            </div>


          </div>

          {/* Image Pillar (Beautiful Classic Dome building) */}
          <div className="relative lg:col-span-6" id="hero-image-pillar">
            {/* Visual Glass Cards Floating */}
            <div className="absolute -left-6 top-1/4 z-10 hidden rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-lg sm:flex items-center space-x-3 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm">95%</div>
              <div>
                <p className="text-[9px] font-bold tracking-widest text-[#1e3a8a] dark:text-slate-400">PLACEMENT RATE</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Fortune 500 Recruiters</p>
              </div>
            </div>



            {/* Main Hero Image */}
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/10 bg-white/5 shadow-2xl dark:border-white/10 shadow-blue-900/10">
              <img
                src={campusHeroImage}
                alt="JNS SmartCampus Historic Academic Dome Building"
                referrerPolicy="no-referrer"
                className="h-[360px] w-full object-cover sm:h-[480px] hover:scale-103 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none"></div>
            </div>

            {/* Decorative background grids */}
            <div className="absolute -right-8 -top-8 -z-20 h-40 w-40 rounded-full bg-teal-500/10 blur-xl"></div>
          </div>
        </div>

        {/* Statistics Bar (Bento style grid) */}
        <div className="mt-16 sm:mt-24" id="hero-statistics-grid">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-md dark:bg-white/[0.03]">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 text-center border-r last:border-0 border-white/10">
                <p className="font-display text-3xl font-extrabold tracking-tight text-blue-500 dark:text-blue-400 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-sans text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
