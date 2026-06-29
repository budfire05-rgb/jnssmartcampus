import React, { useState, useEffect } from "react";
import { 
  Users, BookOpen, Clock, QrCode, FileText, CreditCard, Library, BarChart3, 
  MapPin, Home, MessageSquare, ShieldCheck, Sparkles, Plus, Search, Calendar, CheckSquare, AlertTriangle, Printer
} from "lucide-react";
import { Student, Book, PlacementDrive } from "../types";

interface ERPModulesProps {
  onRegisterStudent: (stud: Partial<Student>) => void;
  onPayFee: (studId: string, amount: number) => void;
  onCheckoutBook: (bookId: string, reg: string) => void;
  onReturnBook: (bookId: string) => void;
  onRegisterPlacement: (driveId: string) => void;
  systemStudents: Student[];
  systemBooks: Book[];
  systemPlacementDrives: PlacementDrive[];
}

export const ERPModules: React.FC<ERPModulesProps> = ({
  onRegisterStudent,
  onPayFee,
  onCheckoutBook,
  onReturnBook,
  onRegisterPlacement,
  systemStudents,
  systemBooks,
  systemPlacementDrives
}) => {
  const [activeModule, setActiveModule] = useState<string>("students");
  
  // Interactive Module States
  const [regName, setRegName] = useState("");
  const [regDept, setRegDept] = useState("Computer Science Engineering");
  const [regSem, setRegSem] = useState("I Semester");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  
  const [qrStudentID, setQrStudentID] = useState(systemStudents[0]?.id || "");
  const [qrTimer, setQrTimer] = useState(30);
  const [showQRScanSuccess, setShowQRScanSuccess] = useState(false);
  
  const [checkoutISBN, setCheckoutISBN] = useState("");
  const [checkoutStudentID, setCheckoutStudentID] = useState("");
  const [libSearchQuery, setLibSearchQuery] = useState("");
  
  const [feeStudentID, setFeeStudentID] = useState(systemStudents[0]?.id || "");
  const [payAmount, setPayAmount] = useState<number>(50000);
  const [feeNotificationLogs, setFeeNotificationLogs] = useState<string[]>([]);
  
  const [hallTicketStudent, setHallTicketStudent] = useState<Student | null>(null);
  
  const [admissionTrackingNo, setAdmissionTrackingNo] = useState("JNS-2026-8941");
  const [admissionStatus, setAdmissionStatus] = useState("Under Verification");

  const modules = [
    { id: "students", label: "Student Management", icon: Users, desc: "Seamless registration, profile management, academic rosters." },
    { id: "admissions", label: "Admissions Management", icon: BookOpen, desc: "Enrollment cycles, application trackers, verification workflows." },
    { id: "attendance", label: "Attendance Control", icon: QrCode, desc: "Dynamic QR loggers, biometrics endpoints, threshold alerts." },
    { id: "examination", label: "Examination Office", icon: FileText, desc: "Hall ticket generators, grades auditing, transcript processors." },
    { id: "fees", label: "Financial Accounts", icon: CreditCard, desc: "Digital balance checks, payment checkout simulation, receipts." },
    { id: "library", label: "Digital Library", icon: Library, desc: "Catalogue search engine, automated lends trackers, fines calculations." },
    { id: "placements", label: "Placements Hub", icon: BarChart3, desc: "Resume parsing gateway, corporate registry, drives dashboard." },
    { id: "logistics", label: "Logistics & Hostels", icon: MapPin, desc: "Asset allocations, bus route tracking, biometric dorm entries." }
  ];

  // QR dynamic regenerator interval
  useEffect(() => {
    const interval = setInterval(() => {
      setQrTimer((prev) => {
        if (prev <= 1) return 30;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    onRegisterStudent({
      name: regName,
      department: regDept,
      semester: regSem,
      email: regEmail,
      phone: regPhone,
      feePaid: 0,
      feeDue: 150000,
      feeStatus: "Unpaid"
    });
    setRegName("");
    setRegEmail("");
    setRegPhone("");
    alert(`Success: ${regName} registered in local ERP context. Checking Spring Boot API trace for JPA transaction logs!`);
  };

  const handleQRScanSimulate = () => {
    setShowQRScanSuccess(true);
    setTimeout(() => {
      setShowQRScanSuccess(false);
    }, 2500);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeStudentID) return;
    onPayFee(feeStudentID, payAmount);
    const stud = systemStudents.find(s => s.id === feeStudentID);
    alert(`Payment of $${payAmount} processed for ${stud?.name}. Receipt dispatching through messaging API gateways!`);
  };

  const handleSendFeeDueSMS = (student: Student) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const log = `[${timestamp}] SMS Sent to ${student.phone}: "URGENT JNS NOTICE: Outstanding dues of $${student.feeDue} pending on ledger. Pay before July 1."`;
    setFeeNotificationLogs(prev => [log, ...prev]);
    
    // Express Server endpoint call to log to systemic terminal logger
    fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Outstanding Fees Due Alert",
        category: "SMS",
        recipient: student.name,
        message: `Outstanding dues of $${student.feeDue} pending on ledger.`
      })
    }).catch(err => console.error(err));
  };

  const selectedQRStudent = systemStudents.find(s => s.id === qrStudentID);

  return (
    <section className="relative py-16 md:py-24" id="erp-crm-features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 font-bold text-blue-500 rounded-full backdrop-blur-md dark:bg-blue-500/20 dark:text-blue-400">ENTERPRISE SYSTEM PREVIEW</span>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            College CRM & ERP System
          </h2>
          <p className="mt-3 font-sans text-sm font-semibold text-slate-500 dark:text-slate-400">
            Click into our robust academic micro-modules. This playground synchronizes live inputs directly into the Express API server endpoints.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Rails */}
          <div className="lg:col-span-4 space-y-2.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2">OPERATIONAL CORE MODULES</p>
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`flex w-full items-start space-x-4 rounded-2xl p-4 text-left border transition ${
                    activeModule === mod.id
                      ? "bg-white/10 border-white/20 shadow-lg dark:bg-white/10 dark:border-white/25 backdrop-blur-md"
                      : "bg-white/5 border-transparent hover:bg-white/10 dark:bg-white/[0.02] dark:hover:bg-white/5"
                  }`}
                >
                  <div className={`mt-0.5 rounded-xl p-2.5 ${activeModule === mod.id ? "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-405" : "bg-white/5 text-slate-500 dark:text-slate-450"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[13.5px] font-bold text-slate-900 dark:text-slate-200">{mod.label}</h3>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5 dark:text-slate-400 line-clamp-1">{mod.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Modular Content Stage */}
          <div className="lg:col-span-8 rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 shadow-xl dark:bg-slate-950/20 backdrop-blur-md flex flex-col justify-between" id="erp-module-terminal">
            
            {/* Stage Title */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-650 dark:text-teal-400">MICRO-MODULE INTERACTION</span>
                <h3 className="font-display text-lg font-bold text-slate-950 mt-1 dark:text-white">
                  {modules.find(m => m.id === activeModule)?.label}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-800 dark:text-teal-400">
                <Sparkles className="h-3.5 w-3.5 fill-teal-500 text-teal-500 animate-pulse-slow shrink-0" /> Web Database Synced
              </span>
            </div>

            {/* Stage Body matching each tab */}
            <div className="flex-1">

              {/* STUDENT MANAGEMENT VIEW */}
              {activeModule === "students" && (
                <div className="space-y-6">
                  {/* Register student Form */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                      <Plus className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Administrative Quick Enrollment Form
                    </p>
                    <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Full Student Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Institutional Email Handle</label>
                        <input
                          type="email"
                          required
                          placeholder="j.doe@jns.edu.in"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Academic Curriculum Department</label>
                        <select
                          value={regDept}
                          onChange={(e) => setRegDept(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                        >
                          <option>Computer Science Engineering</option>
                          <option>Artificial Intelligence</option>
                          <option>Data Science</option>
                          <option>Information Technology</option>
                          <option>Management</option>
                          <option>Commerce</option>
                          <option>Corporate Law</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 95000 12345"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="sm:col-span-2 pt-2 flex justify-end">
                        <button type="submit" className="rounded-xl bg-blue-900 px-6 py-2.5 font-display text-xs font-bold text-white shadow hover:bg-indigo-850 dark:bg-blue-600 dark:hover:bg-blue-500">
                          Register MySQL Record
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Registered student view */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Live Database Students Roster</p>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/50 dark:bg-slate-900 dark:border-slate-800">
                          <tr>
                            <th className="p-3">Register No</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Branch</th>
                            <th className="p-3">Sem</th>
                            <th className="p-3">Performance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-350">
                          {systemStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                              <td className="p-3 font-mono font-bold text-slate-500">{student.registerNo}</td>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">{student.name}</td>
                              <td className="p-3 max-w-[120px] truncate">{student.department}</td>
                              <td className="p-3">{student.semester}</td>
                              <td className="p-3 text-right">
                                <span className={`mr-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${student.attendanceRate >= 80 ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" : "bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-450"}`}>
                                  {student.attendanceRate}% Attd
                                </span>
                                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900 dark:bg-blue-950 dark:text-blue-400">
                                  {student.cgpa} CGPA
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}


              {/* ADMISSIONS MANAGEMENT VIEW */}
              {activeModule === "admissions" && (
                <div className="space-y-6">
                  {/* Pipeline graphic */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                    <div className="p-3 rounded-2xl border border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30">
                      <div className="h-6 w-6 rounded-full bg-blue-900 text-white font-bold mx-auto mb-1 flex items-center justify-center dark:bg-blue-600">1</div>
                      <span className="text-slate-900 dark:text-white text-[10px]">Online Submission</span>
                    </div>
                    <div className="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 dark:border-teal-900 dark:bg-teal-950/30">
                      <div className="h-6 w-6 rounded-full bg-teal-600 text-white font-bold mx-auto mb-1 flex items-center justify-center">2</div>
                      <span className="text-slate-900 dark:text-white text-[10px]">Doc Verification</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-transparent dark:bg-slate-900">
                      <div className="h-6 w-6 rounded-full bg-slate-300 text-slate-700 font-bold mx-auto mb-1 flex items-center justify-center dark:bg-slate-800 dark:text-slate-400">3</div>
                      <span className="text-slate-500 text-[10px]">Entrance Auditing</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-transparent dark:bg-slate-900">
                      <div className="h-6 w-6 rounded-full bg-slate-300 text-slate-700 font-bold mx-auto mb-1 flex items-center justify-center dark:bg-slate-800 dark:text-slate-400">4</div>
                      <span className="text-slate-500 text-[10px]">Slot Allocation</span>
                    </div>
                  </div>

                  {/* Application check box */}
                  <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-850">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Track Admission Application</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Enter your customized JNS Admission Reference code to fetch verification workflow logs from the Spring Boot servlet.</p>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="JNS-2026-8941"
                        value={admissionTrackingNo}
                        onChange={(e) => setAdmissionTrackingNo(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                      />
                      <button 
                        onClick={() => {
                          if (admissionTrackingNo.trim() === "JNS-2026-8941") {
                            setAdmissionStatus("Approved - Slot allocated on CSE Block. Verification Complete.");
                          } else {
                            setAdmissionStatus("Document Reviewing (In-Progress) - Awaiting High School Transcript.");
                          }
                        }}
                        className="rounded-xl bg-blue-900 px-5 text-xs font-bold text-white hover:bg-indigo-850 dark:bg-blue-600 dark:hover:bg-blue-500"
                      >
                        Track Status
                      </button>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-white border border-slate-150 dark:bg-slate-900 dark:border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-400 uppercase text-[10px]">Current Workflow Node</span>
                        <span className="font-mono text-xs font-bold text-slate-500 uppercase">{admissionTrackingNo}</span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 dark:bg-emerald-950/70 dark:border-emerald-900 dark:text-emerald-400">
                        Status Log: {admissionStatus}
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* ATTENDANCE CONTROL VIEW (QR CODE SCANNING) */}
              {activeModule === "attendance" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Simulator console */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">QR Code Dynamic Attendance Logger</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                          JNS SmartCampus features dynamic decaying encrypted QR tags in every classroom. Students scan the tag via their mobile portal to submit biometric secure attendance logs.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Active Student Profile</label>
                          <select
                            value={qrStudentID}
                            onChange={(e) => setQrStudentID(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                          >
                            {systemStudents.map(s => (
                              <option key={s.id} value={s.id}>{s.name} ({s.registerNo})</option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={handleQRScanSimulate}
                          className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 py-3 text-xs font-bold text-white shadow-md dark:from-blue-600 dark:to-indigo-500 flex items-center justify-center space-x-2"
                        >
                          <QrCode className="h-4.5 w-4.5" />
                          <span>Simulate Mobile Scan</span>
                        </button>

                        {showQRScanSuccess && (
                          <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 border border-emerald-250 rounded-xl p-3 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900 text-xs font-bold animate-pulse">
                            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                            <span>Biometric Attendance scan successful: Mapped to student {selectedQRStudent?.name}!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Encrypted QR representational UI */}
                    <div className="flex flex-col items-center justify-center p-6 border border-slate-200 rounded-3xl bg-slate-50 dark:bg-slate-950 dark:border-slate-850">
                      <p className="text-[10px] font-extrabold tracking-widest text-[#155e75] uppercase dark:text-cyan-400 mb-3 text-center">ENCRYPTED ATTENDANCE TOKEN</p>
                      <div className="relative border-4 border-white dark:border-slate-900 p-2.5 bg-white rounded-2xl animate-pulse">
                        {/* Custom SVG CSS QR */}
                        <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="100" fill="white" />
                          <path d="M5 5h30v30H5V5zm6 6v18h18V11H11zM65 5h30v30H65V5zm6 6v18h18V11H71zM5 65h30v30H5V65zm6 6v18h18V71H11z" fill="black" />
                          <rect x="17" y="17" width="6" height="6" fill="black" />
                          <rect x="77" y="17" width="6" height="6" fill="black" />
                          <rect x="17" y="77" width="6" height="6" fill="black" />
                          <path d="M45 10h10v10H45V10zm5 20h10v15H50V30zm-5 25v15h15V55H45zm25 15h15v5H70v-5zm10 10h5v10h-5v-10zm-35 5h10v5H45v-5zm15-20H55V45h5v5zm10-5h10V40H70v10zm10 5h15v5H80v-5zm-5 15h10v5H75v-5zm5-15h5v5h-5v-5zm-25 10h5v10h-5v-10z" fill="black" />
                        </svg>
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                          <span className="bg-white/95 px-2 py-1 rounded-sm text-[8px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200">JNS-SECURE</span>
                        </div>
                      </div>
                      <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">REGENERATES IN {qrTimer}S</p>
                    </div>
                  </div>
                </div>
              )}


              {/* EXAMINATION SYSTEM */}
              {activeModule === "examination" && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-850">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Academic Hall Ticket Dispatcher</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Undergraduates must clear outstanding ledger balances and maintain attendance over 75% to auto-generate exam entry credentials.</p>

                    <div className="flex gap-2">
                      <select
                        onChange={(e) => {
                          const s = systemStudents.find(stud => stud.id === e.target.value);
                          setHallTicketStudent(s || null);
                        }}
                        className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                      >
                        <option value="">-- Choose Student --</option>
                        {systemStudents.map(s => (
                          <option key={s.id} value={s.id}>{s.name} (Attd: {s.attendanceRate}%)</option>
                        ))}
                      </select>
                    </div>

                    {hallTicketStudent && (
                      <div className="mt-6 border-2 border-dashed border-slate-250 p-5 rounded-2xl bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white animate-in zoom-in-95" id="hall-ticket-layout">
                        
                        {/* Ticket Emblem */}
                        <div className="flex justify-between items-start border-b border-sidebar-divider pb-3 mb-4">
                          <div>
                            <h5 className="font-display font-bold text-sm tracking-tight">JNS HALL TICKET FOR SEMESTER EXAMS</h5>
                            <p className="text-[10px] font-medium text-slate-400">OFFICE OF CONTROLLER OF EXAMINATIONS</p>
                          </div>
                          <span className={`rounded-sm px-2.5 py-1 text-[9px] font-extrabold tracking-widest uppercase ${hallTicketStudent.attendanceRate >= 75 ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" : "bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-450"}`}>
                            {hallTicketStudent.attendanceRate >= 75 ? "Eligible" : "Dues Flagged"}
                          </span>
                        </div>

                        {hallTicketStudent.attendanceRate < 75 ? (
                          <div className="flex items-center space-x-3 text-rose-800 bg-rose-50 border border-rose-200 rounded-xl p-4 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900">
                            <AlertTriangle className="h-5 w-5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold font-display">Generation Prohibited (Attendance Critical)</p>
                              <p className="text-[11px] font-semibold mt-0.5 opacity-80">This hall ticket has been held back because the attendance rate is only {hallTicketStudent.attendanceRate}%, which sits below regulatory 75%. Please consult your Dean.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase">Student Appellee</p>
                              <p className="text-slate-900 font-bold dark:text-white">{hallTicketStudent.name}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase">Registry Reference No</p>
                              <p className="font-mono text-slate-805 dark:text-slate-205">{hallTicketStudent.registerNo}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase">Specialty Branch</p>
                              <p className="text-slate-805 dark:text-slate-205">{hallTicketStudent.department}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase">Term Class</p>
                              <p className="text-slate-855 dark:text-slate-255">{hallTicketStudent.semester}</p>
                            </div>
                            <div className="col-span-2 pt-3 border-t border-slate-100">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ASSESSMENT CALENDAR SCHEDULE</p>
                              <div className="space-y-1 text-[11px] font-bold text-slate-805 dark:text-slate-205">
                                <p className="flex justify-between p-1 bg-slate-50 dark:bg-slate-950 rounded-sm"><span>1. Advanced Computing Methods</span> <span className="font-mono">July 14, 09:30 AM</span></p>
                                <p className="flex justify-between p-1 bg-slate-50 dark:bg-slate-950 rounded-sm"><span>2. Distributed Database Shards</span> <span className="font-mono">July 17, 09:30 AM</span></p>
                                <p className="flex justify-between p-1 bg-slate-50 dark:bg-slate-950 rounded-sm"><span>3. Enterprise Software Testing</span> <span className="font-mono">July 20, 09:30 AM</span></p>
                              </div>
                            </div>
                            <div className="col-span-2 pt-2 flex justify-end">
                              <button 
                                onClick={() => {
                                  window.print();
                                }}
                                className="flex items-center space-x-1.5 rounded-xl border border-slate-250 hover:bg-slate-50 px-4 py-2 font-display text-xs text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950"
                              >
                                <Printer className="h-4 w-4" />
                                <span>Export (PDF)</span>
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                </div>
              )}


              {/* FEE MANAGEMENT */}
              {activeModule === "fees" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Simulated payments form */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Ledger Balance Quick-Pay Simulator</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Process outstanding educational due fees in our sandbox. Mapped safely to Express database states.</p>

                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Student profile</label>
                          <select
                            value={feeStudentID}
                            onChange={(e) => setFeeStudentID(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                          >
                            {systemStudents.map(s => (
                              <option key={s.id} value={s.id}>{s.name} (Due: ${s.feeDue})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Payment Amount</label>
                          <input
                            type="number"
                            required
                            step="1000"
                            min="5000"
                            value={payAmount}
                            onChange={(e) => setPayAmount(Number(e.target.value))}
                            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-indigo-850 py-3 text-xs font-bold text-white shadow hover:opacity-90 dark:from-blue-600 dark:to-indigo-500"
                        >
                          Submit Payment ($ {payAmount})
                        </button>
                      </form>
                    </div>

                    {/* Ledger due and automated alert actions list */}
                    <div className="bg-slate-50/50 p-5 border border-slate-200 rounded-3xl dark:bg-slate-950/20 dark:border-slate-850">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Live Outstandings Roster</p>
                      
                      <div className="space-y-2.5">
                        {systemStudents.map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-150 dark:bg-slate-905 dark:border-slate-800 text-xs">
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{student.name}</p>
                              <p className="text-[10px] font-mono text-slate-400 mt-0.5">Due: <strong className="text-rose-500">${student.feeDue}</strong> (Paid: ${student.feePaid})</p>
                            </div>
                            {student.feeDue > 0 ? (
                              <button
                                onClick={() => handleSendFeeDueSMS(student)}
                                className="rounded-lg bg-rose-50 px-3 py-1.5 hover:bg-rose-100 text-[10px] font-extrabold text-rose-800 dark:bg-rose-950/60 dark:text-rose-400"
                              >
                                Dispatch Alert
                              </button>
                            ) : (
                              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">Paid</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Outbound log triggers display */}
                      {feeNotificationLogs.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                          <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1.5">Outbound Comms Dispatcher Console</p>
                          <div className="max-h-24 overflow-y-auto font-mono text-[9px] leading-relaxed text-slate-500 space-y-1">
                            {feeNotificationLogs.map((log, idx) => (
                              <p key={idx} className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-sm">{log}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}


              {/* DIGITAL LIBRARY */}
              {activeModule === "library" && (
                <div className="space-y-6">
                  {/* Library controls */}
                  <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-850 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search books by author, title or ISBN..."
                        value={libSearchQuery}
                        onChange={(e) => setLibSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pl-10 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white"
                      />
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    {/* Add checklist trigger */}
                    <div className="flex gap-2 w-full md:w-auto">
                      <input
                        type="text"
                        placeholder="Checkout Student ID"
                        value={checkoutStudentID}
                        onChange={(e) => setCheckoutStudentID(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold outline-hidden dark:border-slate-850 dark:bg-slate-900 dark:text-white max-w-[150px]"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/50 dark:bg-slate-900 dark:border-slate-800">
                        <tr>
                          <th className="p-3">ISBN Code</th>
                          <th className="p-3">Volume Title</th>
                          <th className="p-3">Author Group</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-350">
                        {systemBooks
                          .filter(b => b.title.toLowerCase().includes(libSearchQuery.toLowerCase()) || b.author.toLowerCase().includes(libSearchQuery.toLowerCase()))
                          .map((book) => (
                            <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                              <td className="p-3 font-mono text-slate-500">{book.isbn}</td>
                              <td className="p-3 font-bold text-slate-905 dark:text-white">{book.title}</td>
                              <td className="p-3 text-slate-500">{book.author}</td>
                              <td className="p-3">
                                {book.available ? (
                                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-450">Available</span>
                                ) : (
                                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:bg-rose-950/60 dark:text-rose-450">Issued: Due {book.dueDate}</span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                {book.available ? (
                                  <button
                                    onClick={() => {
                                      const studID = checkoutStudentID || "2026JNSCS001";
                                      onCheckoutBook(book.id, studID);
                                      alert(`Book successfully checked out to Registrar ${studID}. Mapped via Spring Boot Library Management!`);
                                    }}
                                    className="rounded-lg bg-blue-50 hover:bg-blue-100 px-3 py-1.5 text-[10px] font-bold text-blue-900 dark:bg-blue-950/60 dark:text-blue-400"
                                  >
                                    Lend Book
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      onReturnBook(book.id);
                                    }}
                                    className="rounded-lg bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-700 dark:bg-slate-850 dark:text-slate-300"
                                  >
                                    Return Book
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {/* PLACEMENT HUB */}
              {activeModule === "placements" && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-850 mb-4">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">Resume Evaluator Gateway (Simulated Parsing Node)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Upload student resumes in CSV / PDF profile layouts. Secure scoring triggers automated matches to active company drives below.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="text-xs font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 dark:file:bg-blue-950/60 dark:file:text-blue-400 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            alert(`File "${file.name}" received. Running simulated AI-resume analyzer. Checked qualifications match for Microsoft of 44.0 LPA!`);
                          }
                        }}
                      />
                      <span className="text-[10px] text-slate-400 font-bold uppercase sm:ml-auto">ROUTER-ONLINE</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-405 uppercase tracking-widest mb-3">Active Recruitment Company Drives</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {systemPlacementDrives.map((drive) => (
                        <div key={drive.id} className="p-4 border border-slate-200 rounded-2xl bg-white dark:bg-slate-955 dark:border-slate-800 flex flex-col justify-between text-xs">
                          <div>
                            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg dark:bg-slate-900 mb-2">
                              <span className="font-bold text-slate-900 dark:text-white">{drive.company}</span>
                              <span className="font-mono text-emerald-800 font-extrabold text-[10px] dark:text-emerald-400">{drive.package}</span>
                            </div>
                            <p className="font-semibold text-slate-600 mt-1 dark:text-slate-350">Position: {drive.role}</p>
                            <p className="text-[10px] mt-0.5 text-slate-400 font-medium">Criteria: {drive.eligibility}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                            <span className="font-mono text-[10px] text-slate-440 font-semibold">{drive.registrations} Candidates Applied</span>
                            <button
                              onClick={() => {
                                onRegisterPlacement(drive.id);
                                alert(`Registration request received for ${drive.company}. Dispatching query parameters to MySQL schema!`);
                              }}
                              className="rounded-lg bg-blue-900 text-white font-bold px-3 py-1.5 text-[10px] hover:bg-indigo-850 dark:bg-blue-600"
                            >
                              Enroll Portal
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}


              {/* LOGISTICS & HOSTEL VIEW */}
              {activeModule === "logistics" && (
                <div className="space-y-6 text-xs">
                  <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-2xl dark:bg-teal-950/40 dark:border-teal-900 dark:text-teal-400 font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 animate-pulse" /> Unified Logistics telemetry matches live GPS trackers for bus and biome allocations.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bus details */}
                    <div className="p-4 border border-slate-200 rounded-2xl bg-white dark:bg-slate-950 dark:border-slate-800">
                      <h4 className="font-display font-extrabold text-[#155e75] dark:text-cyan-400 uppercase text-[10px] tracking-widest mb-3">Live Bus Route telemetry Tracker</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl dark:bg-slate-900">
                          <div>
                            <p className="font-bold">Route Alpha-1 (Sector 9 - Campus)</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Driver: Mr. Jagat Pal | Bus: DL-1PA-8840</p>
                          </div>
                          <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 text-[9px] font-bold">In-Transit</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl dark:bg-slate-900">
                          <div>
                            <p className="font-bold">Route Beta-2 (Southend Metro - Campus)</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Driver: Mr. K. Sharma | Bus: DL-1PA-1542</p>
                          </div>
                          <span className="rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 text-[9px] font-bold">Depot Standard</span>
                        </div>
                      </div>
                    </div>

                    {/* Hostel assignments roster */}
                    <div className="p-4 border border-slate-200 rounded-2xl bg-white dark:bg-slate-950 dark:border-slate-800">
                      <h4 className="font-display font-extrabold text-[#155e75] dark:text-cyan-400 uppercase text-[10px] tracking-widest mb-3">Dorm Allocation Roster</h4>
                      <div className="space-y-3 font-semibold text-slate-700 dark:text-slate-350">
                        <div className="flex justify-between items-center p-2 border-b dark:border-slate-850">
                          <span>Emerald Block - Row A - Room 102 (Double)</span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold text-right">Occupied: s1 & s2</span>
                        </div>
                        <div className="flex justify-between items-center p-2 border-b dark:border-slate-850 border-transparent">
                          <span>Emerald Block - Row A - Room 104 (Double)</span>
                          <span className="text-[10px] font-mono text-emerald-500 font-bold text-right">1 Slot Free</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
