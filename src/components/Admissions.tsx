import React, { useState } from "react";
import { Compass, GraduationCap, ShieldAlert, CheckCircle, FileText, Smartphone } from "lucide-react";

export const Admissions: React.FC = () => {
  const [degreeTier, setDegreeTier] = useState<"UG" | "PG">("UG");

  const ugRequirements = [
    "High School Certificate (10+2 / Secondary Board Accreditation)",
    "Minimum 65% aggregate score in major scientific or technical courses",
    "Qualified score in JNS-CET Entrance Audits or associated state ranks",
    "Identity documentation, academic transcripts, and certified reference letters"
  ];

  const pgRequirements = [
    "Accredited Bachelor Degree with a CGPA exceeding 6.5 / 10.0 scale",
    "Certified transcripts, professional CV, and Letter of Academic Intent",
    "Qualified scores in JNS-MET, CAT, GATE, or GRE specialized papers",
    "Minimum of two formal scholarly letters of recommendation"
  ];

  const activeRequirements = degreeTier === "UG" ? ugRequirements : pgRequirements;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950" id="admissions-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#155e75] dark:text-cyan-400">JNS REGISTRAR OFFICE</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Admissions & Enrollments
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            Learn about enrollment standards, scholastic prerequisites, and document verification cycles to join JNS SmartCampus.
          </p>
        </div>

        {/* Dynamic Requirements Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Eligibility Prerequisites panel */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-205 bg-white p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-6 dark:border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <GraduationCap className="h-5.5 w-5.5 text-blue-900 dark:text-blue-400" />
                  <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white">Admission Prerequisites Council</h3>
                </div>
                
                {/* Degree Tier switcher pills */}
                <div className="flex bg-slate-50 border p-1 rounded-lg dark:bg-slate-950 dark:border-slate-850">
                  <button 
                    onClick={() => setDegreeTier("UG")}
                    className={`px-3 py-1 text-[10.5px] font-bold rounded-md uppercase transition ${degreeTier === "UG" ? "bg-white text-blue-900 dark:bg-slate-900 dark:text-white shadow-xs" : "text-slate-400"}`}
                  >
                    UG Std
                  </button>
                  <button 
                    onClick={() => setDegreeTier("PG")}
                    className={`px-3 py-1 text-[10.5px] font-bold rounded-md uppercase transition ${degreeTier === "PG" ? "bg-white text-blue-900 dark:bg-slate-900 dark:text-white shadow-xs" : "text-slate-400"}`}
                  >
                    PG Std
                  </button>
                </div>
              </div>

              {/* Requirement Items list */}
              <div className="space-y-4">
                {activeRequirements.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 text-xs">
                    <div className="mt-0.5 rounded-full bg-blue-50 p-1 text-blue-900 dark:bg-blue-950 dark:text-blue-400 shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-slate-705 dark:text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Note about deadlines */}
            <div className="mt-8 border-t border-slate-100 pt-5 dark:border-slate-800 flex items-center space-x-3 text-xs bg-slate-50/50 p-4 rounded-xl dark:bg-slate-950/20">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
              <p className="font-semibold text-slate-500 dark:text-slate-400">
                Deadline Notice: Complete application registries before <strong className="text-slate-900 dark:text-white">July 15, 2026</strong> to protect your curriculum seating slot.
              </p>
            </div>
          </div>

          {/* Quick Flow Verification checklist */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-205 bg-slate-50 p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between" id="admissions-process-timeline">
            <div>
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                <Compass className="h-5 w-5 text-teal-600 dark:text-teal-400" /> Digital Admissions Process
              </h3>
              <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Our 100% digital admission pipeline simplifies registrar review cycles down to minutes.</p>

              {/* List steps */}
              <div className="relative border-l-2 border-slate-200 pl-6 space-y-6 dark:border-slate-800 font-sans text-xs">
                
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center dark:bg-blue-600 dark:border-slate-900"></span>
                  <h4 className="font-bold text-slate-955 dark:text-white">1. Initiate application</h4>
                  <p className="text-slate-500 mt-0.5 font-semibold dark:text-slate-400">Fill your candidate biography and academic sheets online through the JNS admissions desk.</p>
                </div>
                
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center dark:bg-blue-600 dark:border-slate-900"></span>
                  <h4 className="font-bold text-slate-955 dark:text-white">2. Upload documents</h4>
                  <p className="text-slate-500 mt-0.5 font-semibold dark:text-slate-400">Submit school transcripts and references utilizing secure digital document lockboxes.</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center dark:border-slate-900"></span>
                  <h4 className="font-bold text-slate-955 dark:text-white">3. Registrar audit</h4>
                  <p className="text-slate-500 mt-0.5 font-semibold dark:text-slate-400">Database controllers verify records and issue offer credentials. Track your reference via the admissions portal.</p>
                </div>

              </div>
            </div>

            {/* Helpline contact details */}
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl dark:bg-slate-950">
                <FileText className="h-4 w-4 text-slate-400 mb-1" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">BROCHURE FILES</p>
                <a href="#courses-section" className="text-[11px] font-bold text-blue-900 dark:text-blue-400">Download Curriculum</a>
              </div>
              <div className="p-3 bg-white rounded-xl dark:bg-slate-950">
                <Smartphone className="h-4 w-4 text-slate-400 mb-1" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">ADMISSION HOTLINE</p>
                <span className="text-[11px] font-bold text-slate-805 dark:text-slate-200 select-all">+91 44 2840-9941</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
