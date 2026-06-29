import React, { useState } from "react";
import { BookOpen, Cpu, Briefcase, GraduationCap, Clock, Award, Users, Search, HelpCircle } from "lucide-react";
import { Course } from "../types";
import { initialCourses } from "../data";

interface CoursesProps {
  onSyllabusRequest: (courseTitle: string) => void;
  onEnrollRequest: (course: Course) => void;
  searchTerm?: string;
}

export const Courses: React.FC<CoursesProps> = ({ onSyllabusRequest, onEnrollRequest, searchTerm = "" }) => {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [localSearch, setLocalSearch] = useState<string>("");

  const departments = ["All", "Engineering", "Management", "Commerce", "Information Technology", "Law", "Arts"];

  // Merge search terms from header and local input
  const combinedSearch = (localSearch || searchTerm).toLowerCase();

  const filteredCourses = initialCourses.filter((course) => {
    const matchesDept = selectedDept === "All" || course.department === selectedDept;
    const matchesSearch = 
      course.title.toLowerCase().includes(combinedSearch) || 
      course.code.toLowerCase().includes(combinedSearch) ||
      course.description.toLowerCase().includes(combinedSearch);
    return matchesDept && matchesSearch;
  });

  const getDeptIcon = (dept: string) => {
    switch (dept) {
      case "Engineering": return <Cpu className="h-5 w-5 text-blue-500" />;
      case "Management": return <Briefcase className="h-5 w-5 text-emerald-500" />;
      case "Information Technology": return <Cpu className="h-5 w-5 text-indigo-500" />;
      case "Law": return <Award className="h-5 w-5 text-red-500" />;
      default: return <GraduationCap className="h-5 w-5 text-teal-500" />;
    }
  };

  return (
    <section className="py-16 md:py-24" id="courses-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400">JNS ACADEMIA DEPARTMENTS</p>
            <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Explore Academic Programs
            </h2>
            <p className="mt-3 max-w-xl font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
              Discover accredited undergraduate & post-graduate curriculum engineered with modern tech alignments and corporate integrations.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2" id="dept-pills">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`rounded-full px-4 py-2 font-display text-xs font-semibold tracking-wide transition border ${
                  selectedDept === dept
                    ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30 font-bold"
                    : "border-white/10 bg-white/5 text-slate-700 hover:bg-white/10 dark:text-slate-350 dark:hover:bg-white/5"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Local Search and Indicator bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search specific syllabus, codes or degrees..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs font-semibold outline-hidden backdrop-blur-md focus:border-blue-400 focus:bg-white/10 dark:text-white"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>

          {filteredCourses.length === 0 && (
            <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" /> No results found. Try choosing "All" departments or refining search query.
            </p>
          )}

          <p className="md:ml-auto text-xs font-bold text-slate-400 uppercase tracking-widest leading-6">
            Showing <span className="text-slate-700 dark:text-slate-200">{filteredCourses.length}</span> Accredited Programs
          </p>
        </div>

        {/* Courses Matrix */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id="courses-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 dark:bg-slate-950/20 shadow-xl backdrop-blur-md transition duration-300 hover:scale-102 hover:shadow-blue-500/5"
            >
              {/* Card Header & category */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-wider text-slate-400">{course.code}</span>
                <span className="flex items-center space-x-1 rounded-sm bg-white/5 px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#1e3a8a] dark:text-slate-400 uppercase">
                  {getDeptIcon(course.department)}
                  <span className="ml-1.5">{course.department}</span>
                </span>
              </div>

              {/* Main Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-500 dark:text-white dark:group-hover:text-blue-450">
                  {course.title}
                </h3>
                <p className="mt-3 text-xs/relaxed font-medium text-slate-500 dark:text-slate-400 line-clamp-3">
                  {course.description}
                </p>

                {/* Academic Metadata */}
                <div className="mt-auto pt-5 space-y-2 text-xs font-semibold text-slate-605 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-450" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-450" />
                    <span>Seat Intake: <strong className="text-slate-900 dark:text-white">{course.seats} Slots</strong></span>
                  </div>
                </div>

                {/* Spliced syllabus samples */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">Syllabus Highlights</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.syllabus.slice(0, 3).map((sub, i) => (
                      <span key={i} className="text-[9px] bg-white/5 border border-white/10 font-bold px-2 py-1 text-slate-600 dark:text-slate-400 rounded-sm">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-auto grid grid-cols-2 border-t border-white/10 bg-white/5">
                <button
                  onClick={() => onSyllabusRequest(course.title)}
                  className="py-3.5 text-center font-display text-[11px] font-bold tracking-wider text-slate-600 hover:bg-white/10 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white border-r border-white/10 flex items-center justify-center space-x-1.5"
                >
                  <BookOpen className="h-4.5 w-4.5 text-blue-400" />
                  <span>Program Details</span>
                </button>
                <button
                  onClick={() => onEnrollRequest(course)}
                  className="py-3.5 text-center font-display text-[11px] font-bold tracking-wider text-[#1e3a8a] dark:text-blue-400 hover:bg-white/10 dark:hover:bg-white/5 flex items-center justify-center space-x-1.5"
                >
                  <span>Apply Now</span>
                  <GraduationCap className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
