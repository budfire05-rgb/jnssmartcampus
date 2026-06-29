import React from "react";
import { Sparkles, Shield, Award, Landmark } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 font-sans text-xs select-text">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Core links array rows */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: JNS Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-white">
              <Landmark className="h-6 w-6 text-blue-400" />
              <span className="font-display font-extrabold text-[#94a3b8] tracking-widest text-[14.5px] uppercase">JNS SmartCampus</span>
            </div>
            
            <p className="font-semibold leading-relaxed text-slate-400">
              Empowering Future Leaders Through Technological Innovations & Scholarly Disciplines. Fully credentialed OMR university curriculum.
            </p>

            <div className="flex items-center space-x-2 text-[10px] uppercase font-bold text-slate-500">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Accreditation: NAAC A++ Grade</span>
            </div>
          </div>

          {/* Column 2: Academic Streams */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest">Academic Streams</h4>
            <ul className="space-y-2 font-semibold">
              <li><a href="#courses-section" className="hover:text-white transition">Engineering & Applied Sciences</a></li>
              <li><a href="#courses-section" className="hover:text-white transition">Business Management Systems</a></li>
              <li><a href="#courses-section" className="hover:text-white transition">Corporate Law Jurisprudence</a></li>
              <li><a href="#courses-section" className="hover:text-white transition">Information Technology & AI</a></li>
            </ul>
          </div>

          {/* Column 3: Campus Links */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest">Campus Links</h4>
            <ul className="space-y-2 font-semibold">
              <li><a href="#courses-section" className="hover:text-white transition">Academic Programs</a></li>
              <li><a href="#admissions-section" className="hover:text-white transition">Admissions</a></li>
              <li><a href="#campus-life" className="hover:text-white transition">Campus Life</a></li>
              <li><a href="#contact-section" className="hover:text-white transition">Contact Office</a></li>
            </ul>
          </div>

          {/* Column 4: Legals and credentials */}
          <div className="space-y-3">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest">Registrar Badging</h4>
            <ul className="space-y-2 font-semibold">
              <li className="flex items-center space-x-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition">
                <Award className="h-4 w-4 text-[#f59e0b]" /> 
                <span>AICTE approved core programs</span>
              </li>
              <li className="flex items-center space-x-1.5 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition">
                <Sparkles className="h-4 w-4 text-[#a855f7]" /> 
                <span>Campus Innovation & Learning Excellence</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-semibold font-mono text-[9.5px] uppercase text-slate-500">
          <p>© 2026 JNS SmartCampus Private Ltd. Chennai Campus. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#contact-section" className="hover:text-white transition">Admissions Terms</a>
            <a href="#contact-section" className="hover:text-white transition">Registrar Privacy</a>
            <span>Admissions Support Open</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
