import React, { useState, useEffect } from "react";
import { 
  CheckSquare, Calendar, ClipboardList, Wallet, Bell, Award, BookOpen, 
  UserCheck, FileEdit, TrendingUp, DollarSign, Briefcase, Server, RefreshCw, Smartphone, Play, Plus, Trash, Users
} from "lucide-react";
import { Student, LogEntry, Book, PlacementDrive } from "../types";

interface PortalsProps {
  currentTab: string;
  systemStudents: Student[];
  onUpdateStudent: (id: string, updated: Partial<Student>) => void;
  onDispatchAnnouncement: (title: string, category: string, recipient: string, text: string) => void;
}

export const Portals: React.FC<PortalsProps> = ({
  currentTab,
  systemStudents,
  onUpdateStudent,
  onDispatchAnnouncement
}) => {
  // Shared console logger hook
  const [logsList, setLogsList] = useState<LogEntry[]>([]);
  const [isPollingLogs, setIsPollingLogs] = useState(true);

  // Student portal active sub-tabs
  const [studentPortalSubTab, setStudentPortalSubTab] = useState<"grades" | "timetable" | "assignments" | "fees">("assignments");
  const [activeStudentId, setActiveStudentId] = useState<string>("s1");

  // Faculty portal active sub-tabs & grades entry state
  const [facultyStudentId, setFacultyStudentId] = useState<string>("s1");
  const [facultyAssignmentId, setFacultyAssignmentId] = useState<string>("");
  const [facultyGradeValue, setFacultyGradeValue] = useState<string>("A+");
  const [attendanceIncrementField, setAttendanceIncrementField] = useState<string>("s1");

  // Admin portal announcement dispatchers
  const [anTitle, setAnTitle] = useState("");
  const [anCategory, setAnCategory] = useState<"Announcement" | "Email" | "SMS" | "Push">("Announcement");
  const [anRecipient, setAnRecipient] = useState("All Students");
  const [anMessage, setAnMessage] = useState("");

  const activeStudent = systemStudents.find(s => s.id === activeStudentId) || systemStudents[0];

  // Poll terminal logs from Express database
  const fetchTerminalLogs = () => {
    fetch("/api/db-logs")
      .then(res => res.json())
      .then(data => {
        if (data.logs) setLogsList(data.logs);
      })
      .catch(err => console.error("Logs poll error", err));
  };

  useEffect(() => {
    fetchTerminalLogs();
    let timer: NodeJS.Timeout;
    if (isPollingLogs) {
      timer = setInterval(fetchTerminalLogs, 1500);
    }
    return () => clearInterval(timer);
  }, [isPollingLogs]);

  // Reset simulated database state on server
  const handleServerReset = () => {
    if (confirm("Reset local fullstack MySQL and Spring Boot simulated memory matrices? This refreshes all default values.")) {
      fetch("/api/db/reset", { method: "POST" })
        .then(() => {
          fetchTerminalLogs();
          alert("MySQL Database tables successfully re-seeded. Checking transactional log pools!");
        })
        .catch(err => console.error(err));
    }
  };

  // Student submits homework file action
  const handleAssignmentSubmit = (studId: string, assignmentId: string) => {
    const studentObj = systemStudents.find(s => s.id === studId);
    if (!studentObj) return;
    const nextAssignments = studentObj.assignments.map(a => {
      if (a.id === assignmentId) return { ...a, status: "Submitted" as const };
      return a;
    });
    onUpdateStudent(studId, { assignments: nextAssignments });
    alert(`Success: Homework attachment registered for assignment. Transmitting multi-part multipart/form-data transaction payloads to Spring Boot storage nodes!`);
  };

  // Faculty uploads marks entry action
  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyStudentId || !facultyAssignmentId) {
      alert("Error: Select a student first and choose one of their pending/submitted assignments.");
      return;
    }
    const studentObj = systemStudents.find(s => s.id === facultyStudentId);
    if (!studentObj) return;

    let totalPoints = 0;
    let assignmentCount = 0;
    const nextAssignments = studentObj.assignments.map(a => {
      if (a.id === facultyAssignmentId) {
        return { ...a, status: "Graded" as const, grade: facultyGradeValue };
      }
      return a;
    });

    // Recalculate CGPA as mock weighting algorithm
    const gradeMapper: Record<string, number> = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C": 6, "D": 5 };
    nextAssignments.forEach(a => {
      if (a.grade && gradeMapper[a.grade]) {
        totalPoints += gradeMapper[a.grade];
        assignmentCount++;
      }
    });
    const nextGPA = assignmentCount > 0 ? Number((totalPoints / assignmentCount).toFixed(2)) : studentObj.cgpa;

    onUpdateStudent(facultyStudentId, { 
      assignments: nextAssignments,
      cgpa: nextGPA
    });
    alert(`Record Grade: Registered "${facultyGradeValue}" for student ${studentObj.name}. Mapped database query triggered!`);
    setFacultyAssignmentId("");
  };

  // Faculty increments active student attendance rate
  const handleIncrementAttendance = () => {
    const stud = systemStudents.find(s => s.id === attendanceIncrementField);
    if (!stud) return;
    const nextRate = Math.min(100, Number((stud.attendanceRate + 4.2).toFixed(1)));
    onUpdateStudent(attendanceIncrementField, { attendanceRate: nextRate });
    alert(`Attendance logged. Scored +4.2% daily attendance weighting for ${stud.name}. Current: ${nextRate}%`);
  };

  // Admin broadcasts alert
  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anTitle || !anMessage) return;
    onDispatchAnnouncement(anTitle, anCategory, anRecipient, anMessage);
    setAnTitle("");
    setAnMessage("");
    alert(`Broadcast dispatched: "${anTitle}". Check the System Logs terminal for network routing indicators!`);
  };

  return (
    <section className="py-12 bg-slate-50/50 dark:bg-slate-950/20" id="portals-interactive-area">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Render Student Portal */}
        {currentTab === "portal-student" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-6 duration-240">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sidebar-divider pb-5 dark:border-slate-800">
              <div>
                <p className="text-xs font-mono font-extrabold tracking-wider text-blue-900 uppercase dark:text-blue-400">JNS STUDENT PORTAL v4.1</p>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Student Dashboard Overview</h2>
              </div>
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-slate-500">Sign-in profile:</label>
                <select
                  value={activeStudentId}
                  onChange={(e) => {
                    setActiveStudentId(e.target.value);
                    setFacultyStudentId(e.target.value);
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold tracking-wide outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                >
                  {systemStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.registerNo})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Metric Board */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 flex items-center space-x-4">
                <div className="rounded-xl p-3 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-400"><Award className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cumulative CGPA</p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white">{activeStudent?.cgpa || 0.0} / 10.0</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 flex items-center space-x-4">
                <div className="rounded-xl p-3 bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-400"><UserCheck className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance Ratio</p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white">{activeStudent?.attendanceRate || 0.0}%</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 flex items-center space-x-4">
                <div className="rounded-xl p-3 bg-indigo-50 text-indigo-850 dark:bg-indigo-950 dark:text-indigo-400"><BookOpen className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Mapped Department</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-[140px]">{activeStudent?.department}</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 flex items-center space-x-4">
                <div className="rounded-xl p-3 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-455"><Wallet className="h-6 w-6" /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">LEDGER BALANCE DUE</p>
                  <p className="text-xl font-extrabold text-rose-650">${activeStudent?.feeDue}</p>
                </div>
              </div>
            </div>

            {/* Portal Interior Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Internal subtab rails */}
              <div className="lg:col-span-3 flex lg:flex-col gap-2">
                <button 
                  onClick={() => setStudentPortalSubTab("assignments")}
                  className={`flex-1 rounded-xl p-3.5 text-left text-xs font-bold tracking-wide flex items-center space-x-3 transition ${
                    studentPortalSubTab === "assignments" 
                      ? "bg-blue-900 text-white dark:bg-blue-600" 
                      : "bg-white hover:bg-slate-50 text-slate-705 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border"
                  }`}
                >
                  <ClipboardList className="h-4.5 w-4.5" />
                  <span>Assignments Submission</span>
                </button>
                <button 
                  onClick={() => setStudentPortalSubTab("grades")}
                  className={`flex-1 rounded-xl p-3.5 text-left text-xs font-bold tracking-wide flex items-center space-x-3 transition ${
                    studentPortalSubTab === "grades" 
                      ? "bg-blue-900 text-white dark:bg-blue-600" 
                      : "bg-white hover:bg-slate-50 text-slate-705 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border"
                  }`}
                >
                  <Award className="h-4.5 w-4.5" />
                  <span>Grades Transcript</span>
                </button>
                <button 
                  onClick={() => setStudentPortalSubTab("timetable")}
                  className={`flex-1 rounded-xl p-3.5 text-left text-xs font-bold tracking-wide flex items-center space-x-3 transition ${
                    studentPortalSubTab === "timetable" 
                      ? "bg-blue-900 text-white dark:bg-blue-600" 
                      : "bg-white hover:bg-slate-50 text-slate-705 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border"
                  }`}
                >
                  <Calendar className="h-4.5 w-4.5" />
                  <span>Standard Class Timetable</span>
                </button>
              </div>

              {/* Subtab Stage Content */}
              <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800">
                
                {studentPortalSubTab === "assignments" && (
                  <div>
                    <h3 className="font-display text-sm font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">Active Curricular Assignments Portal</h3>
                    {activeStudent?.assignments?.length === 0 ? (
                      <p className="text-xs font-medium text-slate-400">All homework cleared. No outstanding assignments.</p>
                    ) : (
                      <div className="space-y-3.5">
                        {activeStudent?.assignments?.map((a) => (
                          <div key={a.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/60 dark:bg-slate-950/40 dark:border-slate-850 text-xs">
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{a.title}</p>
                              <p className="text-[10px] text-slate-400 font-semibold mt-1">Due Date: {a.dueDate}</p>
                            </div>

                            <div className="mt-2 sm:mt-0 flex items-center space-x-3">
                              {a.status === "Pending" && (
                                <button 
                                  onClick={() => handleAssignmentSubmit(activeStudent.id, a.id)}
                                  className="rounded-xl bg-blue-900 text-white font-bold px-4 py-2 font-display text-[10.5px] hover:bg-indigo-850 dark:bg-blue-600 shadow-xs"
                                >
                                  Submit Assignment
                                </button>
                              )}
                              {a.status === "Submitted" && (
                                <span className="rounded-full bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 font-bold tracking-wide text-[10px] dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-900">Awaiting Grade</span>
                              )}
                              {a.status === "Graded" && (
                                <div className="flex items-center space-x-2">
                                  <span className="rounded-full bg-emerald-50 border border-emerald-250 text-emerald-800 px-3 py-1 font-bold text-[10px] dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900">Graded</span>
                                  <span className="h-8 w-8 rounded-full bg-blue-900 text-white font-mono font-bold text-xs flex items-center justify-center dark:bg-blue-600">{a.grade}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {studentPortalSubTab === "grades" && (
                  <div>
                    <h3 className="font-display text-sm font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">Active Grades & GPA Ledger Registry</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-900 flex items-center justify-between text-xs font-semibold">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">Honor Standing</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Calculated weighting: {activeStudent?.cgpa >= 8.5 ? "First Class Hon." : "General Placement"}</p>
                        </div>
                        <span className="text-xl font-display font-extrabold text-blue-900 dark:text-blue-400">{activeStudent?.cgpa} CGPA</span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-150 dark:border-slate-800">
                        <table className="w-full text-left text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-800">
                            <tr>
                              <th className="p-3">Syllabus Subject</th>
                              <th className="p-3">Semester</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-right">Grade Assigned</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {activeStudent?.assignments?.map((a, i) => (
                              <tr key={i}>
                                <td className="p-3 font-bold text-slate-900 dark:text-white">{a.title}</td>
                                <td className="p-3">{activeStudent.semester}</td>
                                <td className="p-3">{a.status}</td>
                                <td className="p-3 text-right"><strong className="text-blue-900 font-bold font-mono dark:text-blue-400">{a.grade || "Awaiting"}</strong></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {studentPortalSubTab === "timetable" && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-display text-sm font-extrabold tracking-tight mb-2 text-slate-900 dark:text-white">Standard Class Timetable</h3>
                    {activeStudent?.timetable?.map((day, idx) => (
                      <div key={idx} className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-955 dark:border-slate-800 text-xs text-slate-900 dark:text-white">
                        <p className="font-display font-extrabold text-blue-900 uppercase tracking-widest text-[10px] dark:text-blue-400 mb-3">{day.day}</p>
                        <div className="space-y-2">
                          {day.periods.map((period, pIdx) => (
                            <div key={pIdx} className="flex justify-between items-center p-2.5 bg-white border border-slate-200/40 rounded-xl dark:bg-slate-900 dark:border-slate-800/65 font-semibold text-slate-805 dark:text-slate-205">
                              <div>
                                <p className="font-bold">{period.subject}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">Faculty: {period.faculty} | Room: {period.room}</p>
                              </div>
                              <span className="font-mono text-[10.5px] font-bold text-slate-500">{period.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Render Faculty Portal */}
        {currentTab === "portal-faculty" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-6 duration-240">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sidebar-divider pb-5 dark:border-slate-800">
              <div>
                <p className="text-xs font-mono font-extrabold tracking-wider text-teal-600 uppercase dark:text-teal-400">INSTRUCTIONAL PORTAL v1.2</p>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Faculty Grading & Attendance Panel</h2>
              </div>
            </div>

            {/* Attendance & Grading side-by-side grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Daily Attendance Controller */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-display text-base font-extrabold text-slate-900 mb-2 dark:text-white flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-emerald-500" /> Digital Attendance Roll Call
                </h3>
                <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Select single student profiles to increment daily lecture attendance percentages instantly.</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Student profile</label>
                    <select
                      value={attendanceIncrementField}
                      onChange={(e) => setAttendanceIncrementField(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-bold tracking-wide outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                    >
                      {systemStudents.map(s => (
                        <option key={s.id} value={s.id}>{s.name} (Current: {s.attendanceRate}%)</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleIncrementAttendance}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 py-3 text-xs font-bold text-white shadow hover:opacity-90 dark:from-blue-600 dark:to-indigo-500"
                  >
                    Mark Present ( +4.2% )
                  </button>
                </div>
              </div>

              {/* Assignment Grader Panel */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-display text-base font-extrabold text-slate-900 mb-2 dark:text-white flex items-center gap-2">
                  <FileEdit className="h-5 w-5 text-blue-500" /> Marks & Grades Ledger Registry
                </h3>
                <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Query student registration files and input certified letter grades. Triggers real-time CGPA calculus updates.</p>

                <form onSubmit={handleGradeSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Grade Student</label>
                      <select
                        value={facultyStudentId}
                        onChange={(e) => {
                          setFacultyStudentId(e.target.value);
                          setFacultyAssignmentId("");
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-bold tracking-wide outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                      >
                        {systemStudents.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Assignment</label>
                      <select
                        value={facultyAssignmentId}
                        onChange={(e) => setFacultyAssignmentId(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-bold tracking-wide outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                      >
                        <option value="">-- Choose Task --</option>
                        {systemStudents.find(s => s.id === facultyStudentId)?.assignments?.map((a) => (
                          <option key={a.id} value={a.id}>{a.title} ({a.status})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Letter Grade Score</label>
                    <select
                      value={facultyGradeValue}
                      onChange={(e) => setFacultyGradeValue(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-bold tracking-wide outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                    >
                      <option>A+</option>
                      <option>A</option>
                      <option>B+</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 py-3 text-xs font-bold text-white shadow hover:opacity-90 dark:from-blue-600 dark:to-indigo-500"
                  >
                    Commit Grade in MySQL Schema
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

        {/* Render Admin Dashboard */}
        {currentTab === "portal-admin" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-6 duration-240">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-sidebar-divider pb-5 dark:border-slate-800">
              <div>
                <p className="text-xs font-mono font-extrabold tracking-wider text-rose-500 uppercase">ENTERPRISE ROOT CONSOLE</p>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Admin Dashboard Overview</h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleServerReset}
                  className="rounded-xl border border-rose-250 bg-rose-50/50 text-rose-800 hover:bg-rose-100 flex items-center space-x-1.5 px-4 py-2 font-display text-xs font-bold tracking-wider dark:bg-rose-950/40 dark:text-rose-450 dark:border-rose-900 shadow-xs"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reseed SQLite Memory</span>
                </button>
              </div>
            </div>

            {/* Quick Statistics Array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200/85 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3 text-xs font-bold">
                  <span className="text-slate-400">TOTAL EST. REVENUE</span>
                  <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">$450,000</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1"><span>▲ 12%</span> <span className="text-slate-400 font-medium">vs prior semester</span></p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/85 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-3 text-xs font-bold">
                  <span className="text-slate-400">ACTIVE REGISTRATION COMPONENT</span>
                  <Users className="h-4.5 w-4.5 text-blue-500" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{systemStudents.length} Students</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1.5 flex items-center gap-1"><span>▲ {systemStudents.length - 3} added</span> <span className="text-slate-400 font-medium">via current sandbox</span></p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/85 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition">
                <div className="flex items-center justify-between pb-2 border-b border-slate-105 mb-3 text-xs font-semibold tracking-wider text-slate-400 dark:border-slate-800">
                  <span>OUTSTANDING RECEIVABLES</span>
                  <TrendingUp className="h-4.5 w-4.5 text-orange-500" />
                </div>
                <p className="text-2xl font-extrabold text-[#9a3412] font-mono dark:text-[#f97316]">
                  ${systemStudents.reduce((acc, s) => acc + s.feeDue, 0)}
                </p>
                <p className="text-[10px] text-[#9a3412] font-semibold mt-1.5">Action is Required: Dispatch auto SMS bills</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/85 dark:bg-slate-900 dark:border-slate-800 hover:shadow-md transition">
                <div className="flex items-center justify-between pb-2 border-b border-slate-101 mb-3 text-xs font-semibold text-slate-400 dark:border-slate-805">
                  <span>SYSTEM TELEMETRY STATUS</span>
                  <Server className="h-4.5 w-4.5 text-teal-500" />
                </div>
                <p className="text-2xl font-extrabold text-teal-650 dark:text-teal-400 flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 bg-emerald-500 rounded-full animate-pulse flex shrink-0"></span> Operational
                </p>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase">Spring Boot Mapping Connected</p>
              </div>
            </div>

            {/* Grid for SMS Broadcast and Spring Boot Terminal Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Dispatch Comms Panel */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800">
                <h3 className="font-display text-base font-extrabold text-slate-900 mb-2 dark:text-white flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-indigo-500" /> Multi-Channel Broadcaster
                </h3>
                <p className="text-xs text-slate-500 mb-6 dark:text-slate-400">Broadcast official alerts via SMTP Mailer, Twilio SMS API, or Firebase Cloud Messaging gateways.</p>

                <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Alert Headline Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Holiday Notice/Fee Reminders"
                      value={anTitle}
                      onChange={(e) => setAnTitle(e.target.value)}
                      className="w-full rounded-xl border border-slate-205 bg-slate-50/50 p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Alert Channel</label>
                      <select
                        value={anCategory}
                        onChange={(e) => setAnCategory(e.target.value as any)}
                        className="w-full rounded-xl border border-slate-205 bg-slate-50/50 p-2.5 text-xs font-bold outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                      >
                        <option>Announcement</option>
                        <option>Email</option>
                        <option>SMS</option>
                        <option>Push</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Target Recipient</label>
                      <select
                        value={anRecipient}
                        onChange={(e) => setAnRecipient(e.target.value)}
                        className="w-full rounded-xl border border-slate-205 bg-slate-50/50 p-2.5 text-xs font-bold outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white"
                      >
                        <option>All Students</option>
                        <option>CSE Branch</option>
                        <option>Faculty Council</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Dispatch Message Text</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your announcement details here..."
                      value={anMessage}
                      onChange={(e) => setAnMessage(e.target.value)}
                      className="w-full rounded-xl border border-slate-205 bg-slate-50/50 p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-950 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 py-3 text-xs font-bold text-white shadow hover:opacity-90 dark:from-blue-600 dark:to-indigo-500"
                  >
                    Broadcast Transactional Alert
                  </button>
                </form>
              </div>

              {/* REAL SPRING BOOT & MYSQL TRANSACTIONAL TERMINAL */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between text-white" id="terminal-logger-console">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1.5">
                        <span className="h-3 w-3 bg-rose-500 rounded-full inline-block"></span>
                        <span className="h-3 w-3 bg-amber-500 rounded-full inline-block"></span>
                        <span className="h-3 w-3 bg-emerald-500 rounded-full inline-block"></span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Spring Boot & MySQL JDBC Roster</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-450 animate-pulse">
                        <span className="h-2 w-2 bg-emerald-400 rounded-full inline-block"></span> POLLING STREAM
                      </span>
                      <button 
                        onClick={() => setIsPollingLogs(!isPollingLogs)}
                        className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md border ${isPollingLogs ? "border-slate-755 text-slate-400 hover:text-white" : "border-emerald-700 text-emerald-400"}`}
                      >
                        {isPollingLogs ? "Pause" : "Resume"}
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono font-bold text-slate-500 tracking-wide uppercase mb-3">
                    REAL-TIME TRANSACTIONS POOLED ON LOCAL EXPRESS SERVER MEMORY
                  </p>
                </div>

                {/* Log list wrapper */}
                <div className="flex-1 max-h-[300px] overflow-y-auto font-mono text-[10px] space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800/80 pr-1 select-all h-[260px]">
                  {logsList.length === 0 ? (
                    <p className="text-slate-600 italic">No transactional logs detected. Perform operations in our modules to prompt logs stream.</p>
                  ) : (
                    logsList.map((log) => {
                      const serviceColors = {
                        "SPRING-BOOT-API": "text-[#38bdf8]",
                        "MYSQL-DB": "text-[#22d3ee]",
                        "SECURITY": "text-[#f43f5e]",
                        "GEMINI-AI": "text-[#a855f7]"
                      };
                      const typeColors = {
                        "INFO": "text-slate-400",
                        "SUCCESS": "text-emerald-450 font-bold",
                        "WARN": "text-amber-500 font-bold",
                        "ERROR": "text-[#f43f5e] font-extrabold"
                      };

                      return (
                        <div key={log.id} className="bg-slate-905 p-2 rounded-xl border border-slate-900 hover:bg-slate-900 transition-all">
                          <div className="flex justify-between items-start text-[9px] text-slate-500 font-medium pb-1.5 border-b border-slate-900 mb-1.5">
                            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span className={`font-extrabold ${serviceColors[log.service] || "text-white"}`}>{log.service}</span>
                          </div>
                          
                          <p className="font-semibold">{log.message}</p>
                          
                          {log.query && (
                            <p className="mt-1 font-mono text-[9px] text-amber-500 opacity-90 select-all font-bold bg-slate-950/60 p-1.5 rounded-md leading-relaxed border-l-2 border-amber-500">
                              {log.query}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-semibold font-mono">
                  <span>HikariPool-1 Connections: Active 4 / Idly 16</span>
                  <span>Port 3000 Active Ingress</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
