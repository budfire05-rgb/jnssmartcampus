import React, { useState } from "react";
import { campusLifeItems } from "../data";
import { Grid, Eye, Map, HeartHandshake, Compass } from "lucide-react";

export const CampusLifeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [zoomedItem, setZoomedItem] = useState<(typeof campusLifeItems)[0] | null>(null);

  const tabs = ["All", "Infrastructure", "Events", "Sports", "Hostel", "Activities"];

  const filteredItems = campusLifeItems.filter(item => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950" id="campus-life">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#155e75] dark:text-cyan-400">IMMERSE IN CAMPUS DESIGN</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Campus Life & Facilities
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
              Clubs, activities, high-end laboratories, and interactive groups designed to stimulate emotional and collaborative physical synergy.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2" id="gallery-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 font-display text-xs font-bold tracking-wider transition ${
                  activeTab === tab
                    ? "bg-[#155e75] text-white"
                    : "bg-slate-50 border border-slate-200/60 text-slate-755 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="campus-life-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setZoomedItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-xs transition hover:shadow-xl dark:border-slate-900 dark:bg-slate-900"
            >
              {/* Media viewport */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-855">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[9px] font-bold tracking-widest text-[#22d3ee] uppercase backdrop-blur-xs">
                  {item.category}
                </span>

                {/* Cover hovering element */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-xs transition group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="mt-4 px-1.5 pb-2">
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-[#185e78] dark:text-white dark:group-hover:text-cyan-400">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs/relaxed font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Zoomed view modal */}
        {zoomedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in" id="campus-detail-modal">
            <div 
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95 duration-230"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image segment */}
              <div className="relative h-72 sm:h-96 w-full">
                <img 
                  src={zoomedItem.image} 
                  alt={zoomedItem.title} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <button 
                  onClick={() => setZoomedItem(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/75 text-white hover:bg-slate-950 transition"
                >
                  ✕
                </button>
                <div className="absolute left-4 bottom-4 rounded-full bg-cyan-700 px-4 py-1 text-xs font-bold text-white uppercase tracking-widest">
                  {zoomedItem.category}
                </div>
              </div>

              {/* Text metadata segment */}
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl font-extrabold text-slate-950 dark:text-white">{zoomedItem.title}</h3>
                <p className="mt-3 text-sm/relaxed font-medium text-slate-600 dark:text-slate-350">{zoomedItem.description}</p>

                {/* Multi features row */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-950/40">
                    <Map className="h-5 w-5 text-cyan-600 mx-auto" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Campus Location</p>
                    <p className="text-[11px] font-bold text-slate-705 dark:text-slate-200 mt-0.5">Central Block</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-950/40">
                    <Compass className="h-5 w-5 text-emerald-600 mx-auto" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Weekly Access</p>
                    <p className="text-[11px] font-bold text-slate-705 dark:text-slate-200 mt-0.5">24 Hours Open</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl dark:bg-slate-950/40">
                    <HeartHandshake className="h-5 w-5 text-blue-600 mx-auto" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Peer Support</p>
                    <p className="text-[11px] font-bold text-slate-705 dark:text-slate-200 mt-0.5">Mentors Assigned</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setZoomedItem(null)}
                    className="rounded-xl bg-slate-100 px-6 py-2.5 font-display text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  >
                    Close Facility Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
