import React from "react";
import { TrendingUp, Users, DollarSign, Briefcase, Award, CheckCircle } from "lucide-react";
import { initialPlacementDrives } from "../data";

export const Placements: React.FC = () => {
  const stats = [
    { label: "Placement Rate", value: "95.6%", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Max Salary Package Offered", value: "44.0 LPA", icon: DollarSign, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40" },
    { label: "Average CTC Index", value: "12.4 LPA", icon: Award, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40" },
    { label: "Global Recruiter Alliances", value: "150+ Brands", icon: Users, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" }
  ];

  const recruiters = [
    { name: "Microsoft", color: "border-blue-200 text-blue-900 bg-blue-50/50 dark:border-blue-950 dark:text-blue-300 dark:bg-blue-950/40" },
    { name: "Amazon", color: "border-orange-200 text-orange-950 bg-orange-50/40 dark:border-orange-950 dark:text-orange-300 dark:bg-orange-300/10" },
    { name: "Google", color: "border-emerald-200 text-emerald-900 bg-emerald-50/50 dark:border-emerald-950 dark:text-emerald-300 dark:bg-emerald-950/40" },
    { name: "Cisco Systems", color: "border-teal-200 text-teal-900 bg-teal-50/50 dark:border-teal-950 dark:text-teal-300 dark:bg-teal-950/40" },
    { name: "Zoho Corporation", color: "border-rose-200 text-rose-900 bg-rose-50/50 dark:border-rose-950 dark:text-rose-300 dark:bg-rose-950/40" },
    { name: "Cognizant", color: "border-indigo-200 text-indigo-900 bg-indigo-50/50 dark:border-indigo-950 dark:text-indigo-300 dark:bg-indigo-950/40" }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950" id="placements-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">CORPORATE NETWORKS</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Placements & Corporate Relations
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            JNS SmartCampus hosts an exclusive placement training syndicate, mapping corporate requirements and routing interviews in real-time.
          </p>
        </div>

        {/* Stats Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-5 rounded-3xl border border-slate-200 bg-slate-50/40 flex items-center space-x-4 dark:border-slate-900 dark:bg-slate-900/50"
              >
                <div className={`rounded-xl p-3 shrink-0 ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-xl font-extrabold text-slate-950 mt-0.5 dark:text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Recruiting Brands showcase */}
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 mb-16">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-8">PROMINENT RECRUITMENT GLOBAL PARTNERS</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recruiters.map((rec, index) => (
              <div 
                key={index}
                className={`py-4 text-center rounded-2xl border font-display text-xs font-extrabold tracking-wide uppercase select-none transition hover:scale-103 ${rec.color}`}
              >
                {rec.name}
              </div>
            ))}
          </div>
        </div>

        {/* Support syndicate workflows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Support panel */}
          <div className="rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-900 bg-white dark:bg-slate-910 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                <Briefcase className="h-5.5 w-5.5 text-blue-900 dark:text-blue-400" /> Career Services Support
              </h3>
              <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Our support infrastructure grooms students into elite engineering and management prospects.</p>

              <div className="space-y-4">
                {[
                  "Algorithmic Resume Grading & Evaluation Sandbox",
                  "1-on-1 Mock Interview sessions with corporate HOD delegates",
                  "Accredited professional bootcamps covering cloud architect roles",
                  "Dedicated alumni referrals matrix serving globally"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs font-semibold text-slate-705 dark:text-slate-350">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-900 dark:text-blue-400 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Drive list preview */}
          <div className="rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-900 bg-white dark:bg-slate-910 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-white mb-4">Ongoing/Upcoming Drives</h3>
              <div className="space-y-3">
                {initialPlacementDrives.slice(0, 3).map((drive) => (
                  <div key={drive.id} className="p-3.5 border border-slate-150 rounded-2xl dark:border-slate-800 text-xs flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{drive.company}</p>
                      <p className="text-[10px] font-semibold text-slate-450 mt-0.5">Role: {drive.role}</p>
                    </div>
                    <div>
                      <span className="font-mono font-bold text-emerald-800 text-xs dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-1.5 rounded-md">{drive.package}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-6 tracking-wide">
              * Enroll drives using the interactive Placement Hub controller inside ERP Modules.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
