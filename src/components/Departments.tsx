import React from "react";
import { Cpu, Briefcase, Landmark, ShieldCheck, Scale, Palette, Users, FileText, Award } from "lucide-react";

export const Departments: React.FC = () => {
  const depts = [
    {
      name: "Engineering & Applied Sciences",
      icon: Cpu,
      hod: "Dr. Aradhana M. Panday",
      seats: "500 Slots",
      citations: "1,240+ Citations",
      specialties: ["Machine Learning", "Microprocessors", "Robotic Synergies"],
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40"
    },
    {
      name: "School of Business Management",
      icon: Briefcase,
      hod: "Dean Robert G. Vance, PhD",
      seats: "350 Slots",
      citations: "840+ Citations",
      specialties: ["Strategic Audit", "Fintech Innovations", "Retail Logistics"],
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
    },
    {
      name: "Department of Corporate Commerce",
      icon: Landmark,
      hod: "Dr. Somesh K. Singhania",
      seats: "300 Slots",
      citations: "490+ Citations",
      specialties: ["International Trade", "Audit Practicals", "Tax Legislation"],
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
    },
    {
      name: "Department of Corporate Law",
      icon: Scale,
      hod: "Hon. Justice Meera Swaminathan",
      seats: "120 Slots",
      citations: "650+ Citations",
      specialties: ["Jurisprudence", "Contract Torts", "Patent Legis"],
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40"
    },
    {
      name: "School of Arts & Humanities",
      icon: Palette,
      hod: "Dr. Kenneth L. Woods",
      seats: "200 Slots",
      citations: "310+ Citations",
      specialties: ["Creative Literature", "Social Anthropologies", "Digital Media"],
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/20" id="departments-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title row */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#155e75] dark:text-cyan-400">JNS ACADEMIC SCHOOLS</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Syllabus Streams & Departments
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            Explore accredited departmental divisions led by eminent chairs. Configured directly in local MySQL server database states.
          </p>
        </div>

        {/* Bento Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="departments-grid">
          {depts.map((d, index) => {
            const Icon = d.icon;
            return (
              <div 
                key={index}
                className="group flex flex-col justify-between p-6 rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-900 dark:bg-slate-955 shadow-xs"
              >
                <div>
                  {/* Icon & Seats row */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900 mb-5">
                    <div className={`p-2.5 rounded-xl ${d.color}`}>
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <span className="flex items-center space-x-1 rounded-sm bg-slate-50 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-slate-500 uppercase dark:bg-slate-900 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800">
                      <Users className="h-3.5 w-3.5" />
                      <span>{d.seats}</span>
                    </span>
                  </div>

                  {/* Class details */}
                  <h3 className="font-display text-base font-extrabold text-slate-950 group-hover:text-blue-900 dark:text-white dark:group-hover:text-blue-400 transition leading-snug">
                    {d.name}
                  </h3>
                  <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Department HOD: <strong className="text-slate-800 dark:text-slate-200 select-all font-bold">{d.hod}</strong>
                  </p>

                  {/* Citation details */}
                  <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-teal-850 dark:text-teal-450 bg-teal-50/50 p-2 rounded-xl dark:bg-teal-950/20 max-w-fit border border-teal-100 dark:border-transparent">
                    <Award className="h-4 w-4" />
                    <span>Dean Citation Index: {d.citations}</span>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-850">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Specialties & Labs
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="text-slate-650 bg-slate-50 text-[10px] font-bold px-2 py-1 dark:bg-slate-900 dark:text-slate-400 rounded-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
