import React, { useState } from "react";
import { Mail, Briefcase, Award, ArrowUpRight, Star, X, CheckCircle } from "lucide-react";
import { Faculty } from "../types";
import { initialFaculty } from "../data";

interface FacultyProps {
  onContactFaculty: (facultyName: string) => void;
}

export const FacultySection: React.FC<FacultyProps> = ({ onContactFaculty }) => {
  const [selectedProf, setSelectedProf] = useState<Faculty | null>(null);

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950/20" id="faculty-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">RESEARCH LEADERS & EDUCATORS</p>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Faculty Excellence Council
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            Meet our world-acclaimed pedagogues. Researchers, doctors, and authors dedicating their intellectual craft to training tomorrow's masterminds.
          </p>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="faculty-grid">
          {initialFaculty.map((prof) => (
            <div 
              key={prof.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Profile Image with modern rings */}
              <div className="relative mx-auto mt-2 h-36 w-36 overflow-hidden rounded-full border-4 border-slate-50 shadow-md dark:border-slate-800">
                <img 
                  src={prof.image} 
                  alt={prof.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" 
                />
              </div>

              {/* Bio details */}
              <div className="text-center mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">{prof.name}</h3>
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-400">{prof.designation}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{prof.department}</p>
                  
                  {/* Experience Badge */}
                  <div className="mt-4 inline-flex items-center space-x-1.5 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-950">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-400">Experience: {prof.experience}</span>
                  </div>
                </div>

                {/* Card footer CTA buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between dark:border-slate-800">
                  <button 
                    onClick={() => onContactFaculty(prof.name)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-950 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-blue-950/40"
                    title={`Email ${prof.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </button>

                  <button 
                    onClick={() => setSelectedProf(prof)}
                    className="flex items-center space-x-1.5 rounded-xl bg-blue-900 px-4 py-2 font-display text-[10.5px] font-bold tracking-wider text-white hover:bg-indigo-850 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xs"
                  >
                    <span>View Profile</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Curriculum Vitae / Profile modal when clicked */}
        {selectedProf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs animate-in fade-in" id="faculty-modal">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 p-6 sm:p-8 animate-in zoom-in-95 duration-230">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProf(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Body */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Professor Image */}
                <img 
                  src={selectedProf.image} 
                  alt={selectedProf.name} 
                  className="h-28 w-28 rounded-2xl object-cover shadow-md border-2 border-slate-100 dark:border-slate-800"
                />

                {/* Primary Card */}
                <div className="text-center sm:text-left flex-1">
                  <span className="text-[9px] bg-teal-50 border border-teal-200 px-2.5 py-1 font-bold text-teal-800 rounded-sm dark:bg-teal-950/60 dark:border-teal-800 dark:text-teal-400">CREDENTIALED SCHOLAR</span>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 mt-2.5 dark:text-white">{selectedProf.name}</h3>
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-400">{selectedProf.designation}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{selectedProf.department} Department</p>

                  <div className="flex items-center justify-center sm:justify-start space-x-1.5 mt-2.5 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">5.0 (Student Ratings)</span>
                  </div>
                </div>
              </div>

              {/* Extra CV sections */}
              <div className="mt-6 space-y-4 pt-6 border-t border-slate-100 dark:border-slate-850">
                
                {/* Courses Offered */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500" /> Mapped Courses (ERP Syllabus)
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProf.courses.map((course, i) => (
                      <span key={i} className="text-slate-700 bg-slate-50 text-[10px] font-semibold px-2.5 py-1.5 dark:bg-slate-950 dark:text-slate-300 rounded-lg">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Skills & Expertise */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-blue-500" /> Specializations & Research Focus
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProf.skills.map((skill, i) => (
                      <span key={i} className="text-blue-900 bg-blue-50 text-[10px] font-semibold px-2.5 py-1.5 dark:bg-blue-950/40 dark:text-blue-400 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operational Contact */}
                <div className="pt-2">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Institutional Email Handle</p>
                  <p className="text-xs font-mono font-bold text-slate-900 mt-0.5 dark:text-white select-all">{selectedProf.email}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button 
                  onClick={() => setSelectedProf(null)}
                  className="flex-1 py-3 text-center text-xs font-bold font-display tracking-wider rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition dark:bg-slate-950 dark:hover:bg-slate-850 dark:text-slate-350"
                >
                  Dismiss Profile
                </button>
                <button 
                  onClick={() => {
                    onContactFaculty(selectedProf.name);
                    setSelectedProf(null);
                  }}
                  className="flex-1 py-3 text-center text-xs font-bold font-display tracking-wider text-white rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 hover:opacity-90 transition dark:from-blue-600 dark:to-indigo-500"
                >
                  Request Consultation
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
