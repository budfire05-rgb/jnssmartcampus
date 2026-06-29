import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { initialStudents, initialBooks, initialPlacementDrives } from "./src/data.js";
import { LogEntry, Student, Book, PlacementDrive, Notification } from "./src/types.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory full-stack state for simulated database (Spring Boot / MySQL simulation)
let databaseState = {
  students: [...initialStudents] as Student[],
  books: [...initialBooks] as Book[],
  placementDrives: [...initialPlacementDrives] as PlacementDrive[],
  notifications: [] as Notification[],
  logs: [] as LogEntry[]
};

// Seed initial logs to demonstrate cold start of Spring Boot and MySQL Database connections
const seedInitialLogs = () => {
  const now = () => new Date().toISOString();
  databaseState.logs = [
    { id: "log-0", timestamp: now(), service: "SECURITY", type: "INFO", message: "Initial security filter authorization chain loaded." },
    { id: "log-1", timestamp: now(), service: "SPRING-BOOT-API", type: "INFO", message: "Initializing Spring Application Context on port 8080..." },
    { id: "log-2", timestamp: now(), service: "MYSQL-DB", type: "INFO", message: "Connecting to database instance: jdbc:mysql://jns-prod-rds-01.cphfbkt6gcgwd.us-east.rds.amazonaws.com:3306/jns_smartcampus_db" },
    { id: "log-3", timestamp: now(), service: "MYSQL-DB", type: "SUCCESS", message: "HikariPool-1 - Connection pool established. Active connections: 20" },
    { id: "log-4", timestamp: now(), service: "SPRING-BOOT-API", type: "SUCCESS", message: "Spring Boot application booted successfully in 2.84 seconds." },
    { id: "log-5", timestamp: now(), service: "SPRING-BOOT-API", type: "INFO", message: "Mapped URL path [/api/v1/students/**] to StudentController.getStudents()" },
    { id: "log-6", timestamp: now(), service: "SPRING-BOOT-API", type: "INFO", message: "Mapped URL path [/api/v1/auth/login] to AuthController.login()" },
    { id: "log-7", timestamp: now(), service: "MYSQL-DB", type: "SUCCESS", message: "Successfully sync database schema: 12 primary tables matched." }
  ];
};
seedInitialLogs();

// Helper to push transaction log
const addLog = (service: LogEntry["service"], type: LogEntry["type"], message: string, method?: string, query?: string) => {
  const log: LogEntry = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    service,
    type,
    method,
    query,
    message
  };
  databaseState.logs.unshift(log);
  if (databaseState.logs.length > 250) {
    databaseState.logs.splice(200); // Caps historical log trace
  }
};

// Lazy initialization of Gemini API Client
let aiClient: GoogleGenAI | null = null;
const getGeminiClient = (): GoogleGenAI => {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined in the environment. AI answers will be simulated.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
};

// ==================== API ROUTES ====================

// Retrieve database log history (simulating real-time Spring Boot / MySQL terminal)
app.get("/api/db-logs", (req, res) => {
  res.json({ logs: databaseState.logs });
});

// Clear and restart database simulator
app.post("/api/db/reset", (req, res) => {
  databaseState.students = JSON.parse(JSON.stringify(initialStudents));
  databaseState.books = JSON.parse(JSON.stringify(initialBooks));
  databaseState.placementDrives = JSON.parse(JSON.stringify(initialPlacementDrives));
  databaseState.notifications = [];
  seedInitialLogs();
  res.json({ message: "Simulated MySQL database state re-seeded.", status: "SUCCESS" });
});

// Student Management REST API
app.get("/api/students", (req, res) => {
  addLog("SPRING-BOOT-API", "INFO", "Executing StudentController.getAllStudents()", "GET", "SELECT * FROM jns_smartcampus_db.students s");
  res.json(databaseState.students);
});

app.post("/api/students", (req, res) => {
  const newStudent = req.body as Student;
  if (!newStudent.registerNo) {
    newStudent.registerNo = `2026JNS${newStudent.department.substring(0,2).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
  }
  newStudent.id = `sub-${Date.now()}`;
  newStudent.attendanceRate = newStudent.attendanceRate || 100;
  newStudent.cgpa = newStudent.cgpa || 0.0;
  newStudent.assignments = newStudent.assignments || [
    { id: "as-init-1", title: "Semester Orientation Assignment", dueDate: "2026-07-01", status: "Pending" }
  ];
  newStudent.timetable = newStudent.timetable || [
    {
      day: "Monday",
      periods: [
        { time: "09:00 - 10:00", subject: "Intro to Department", room: "T-101", faculty: "Dept Head" },
        { time: "10:15 - 11:15", subject: "Syllabus Overview", room: "T-101", faculty: "Associate Prof" }
      ]
    }
  ];

  databaseState.students.push(newStudent);
  addLog(
    "SPRING-BOOT-API", 
    "SUCCESS", 
    `Mapped POST /api/students -> StudentController.registerStudent(Student: ${newStudent.name})`, 
    "POST",
    `INSERT INTO jns_smartcampus_db.students (id, register_no, name, department, semester, email, phone, cgpa, attendance_rate, fee_paid, fee_due, fee_status) VALUES ('${newStudent.id}', '${newStudent.registerNo}', '${newStudent.name}', '${newStudent.department}', '${newStudent.semester}', '${newStudent.email}', '${newStudent.phone}', ${newStudent.cgpa}, ${newStudent.attendanceRate}, ${newStudent.feePaid}, ${newStudent.feeDue}, '${newStudent.feeStatus}')`
  );
  res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body as Partial<Student>;
  const idx = databaseState.students.findIndex(s => s.id === id);
  if (idx !== -1) {
    databaseState.students[idx] = { ...databaseState.students[idx], ...updatedData };
    addLog(
      "SPRING-BOOT-API",
      "SUCCESS",
      `Mapped PUT /api/students/${id} -> StudentController.updateProfile(id: ${id})`,
      "PUT",
      `UPDATE jns_smartcampus_db.students SET cgpa = ${updatedData.cgpa ?? databaseState.students[idx].cgpa}, attendance_rate = ${updatedData.attendanceRate ?? databaseState.students[idx].attendanceRate}, fee_paid = ${updatedData.feePaid ?? databaseState.students[idx].feePaid}, fee_due = ${updatedData.feeDue ?? databaseState.students[idx].feeDue}, fee_status = '${updatedData.feeStatus ?? databaseState.students[idx].feeStatus}' WHERE id = '${id}'`
    );
    res.json(databaseState.students[idx]);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// Library REST API
app.get("/api/books", (req, res) => {
  addLog("SPRING-BOOT-API", "INFO", "Executing LibraryController.getAllBooks()", "GET", "SELECT * FROM jns_smartcampus_db.library_books");
  res.json(databaseState.books);
});

app.post("/api/books/checkout", (req, res) => {
  const { bookId, registerNo } = req.body;
  const bookIdx = databaseState.books.findIndex(b => b.id === bookId);
  if (bookIdx !== -1) {
    if (databaseState.books[bookIdx].available) {
      databaseState.books[bookIdx].available = false;
      const date = new Date();
      date.setDate(date.getDate() + 14); // 14 days loan duration
      databaseState.books[bookIdx].dueDate = date.toISOString().substring(0, 10);
      addLog(
        "SPRING-BOOT-API",
        "SUCCESS",
        `Mapped POST /api/books/checkout -> LibraryController.checkoutBook(isbn: ${databaseState.books[bookIdx].isbn}, student: ${registerNo})`,
        "POST",
        `UPDATE jns_smartcampus_db.library_books SET available = false, due_date = '${databaseState.books[bookIdx].dueDate}', borrowed_by = '${registerNo}' WHERE id = '${bookId}'`
      );
      res.json(databaseState.books[bookIdx]);
    } else {
      res.status(400).json({ error: "Book is already checked out." });
    }
  } else {
    res.status(404).json({ error: "Book catalog item not found." });
  }
});

app.post("/api/books/return", (req, res) => {
  const { bookId } = req.body;
  const bookIdx = databaseState.books.findIndex(b => b.id === bookId);
  if (bookIdx !== -1) {
    databaseState.books[bookIdx].available = true;
    delete databaseState.books[bookIdx].dueDate;
    addLog(
      "SPRING-BOOT-API",
      "SUCCESS",
      `Mapped POST /api/books/return -> LibraryController.returnBook(isbn: ${databaseState.books[bookIdx].isbn})`,
      "POST",
      `UPDATE jns_smartcampus_db.library_books SET available = true, due_date = NULL, borrowed_by = NULL WHERE id = '${bookId}'`
    );
    res.json(databaseState.books[bookIdx]);
  } else {
    res.status(404).json({ error: "Book catalog item not found." });
  }
});

// Placement Drive REST API
app.get("/api/placements", (req, res) => {
  addLog("SPRING-BOOT-API", "INFO", "Executing PlacementController.getDrives()", "GET", "SELECT * FROM jns_smartcampus_db.placement_drives");
  res.json(databaseState.placementDrives);
});

app.post("/api/placements/register", (req, res) => {
  const { driveId } = req.body;
  const idx = databaseState.placementDrives.findIndex(d => d.id === driveId);
  if (idx !== -1) {
    databaseState.placementDrives[idx].registrations += 1;
    addLog(
      "SPRING-BOOT-API",
      "SUCCESS",
      `Mapped POST /api/placements/register -> PlacementController.registerStudentForDrive(drive: ${databaseState.placementDrives[idx].company})`,
      "POST",
      `UPDATE jns_smartcampus_db.placement_drives SET registrations = registrations + 1 WHERE id = '${driveId}'`
    );
    res.json(databaseState.placementDrives[idx]);
  } else {
    res.status(404).json({ error: "Drive not found" });
  }
});

// Notifications Management
app.get("/api/notifications", (req, res) => {
  res.json(databaseState.notifications);
});

app.post("/api/notifications", (req, res) => {
  const newNotif = req.body as Notification;
  newNotif.id = `notif-${Date.now()}`;
  newNotif.timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  newNotif.status = "Sent";
  databaseState.notifications.unshift(newNotif);
  addLog(
    "SECURITY",
    "WARN",
    `Broadcast triggered: [${newNotif.category}] dispatched to [${newNotif.recipient}]: "${newNotif.title}"`,
    "POST",
    `INSERT INTO jns_smartcampus_db.notifications (id, title, category, recipient, message, timestamp, status) VALUES ('${newNotif.id}', '${newNotif.title}', '${newNotif.category}', '${newNotif.recipient}', '${newNotif.message}', '${newNotif.timestamp}', 'Sent')`
  );
  res.status(201).json(newNotif);
});


// ==================== REAL GEMINI ENGINE ROUTE ====================

app.post("/api/gemini/chat", async (req, res) => {
  const { prompt, category, contextData } = req.body;

  addLog("GEMINI-AI", "INFO", `Forwarding prompt to Google Gemini 3.5 API. Category: [${category || "GENERAL-CHAT"}]`);

  let systemInstruction = "";
  if (category === "chatbot") {
    systemInstruction = `You are JNS-Advisor, the highly intelligent and premium AI Assistant for the "JNS SmartCampus" College ERP & CRM website. 
    You have deep knowledge of the JNS college context. JNS College offers engineering (Computer Science, Artificial Intelligence, Data Science, Information Technology, Mechanical, Civil), post-graduate programs (MBA, MCA), Commerce, Business Administration, Corporate Law, and Arts & Sciences.
    The campus has a 95% placement rate, 5,000+ alumni, 120+ awards, 500+ faculty, and 300+ recruiting companies.
    Answer the user with absolute hospitality, elegance, and professionalism. Format your answer nicely in clean, visually spaced markdown. Keep answers concise, highly specific, and elegant.`;
  } else if (category === "admissions") {
    systemInstruction = `You are the AI Admission Assistant for JNS SmartCampus. Provide helpful info regarding enrollment, intake capacity (CSE: 120 seats, AI/DS: 60 seats each, BBA: 150, Law: 100, MBA: 180), fee layouts, online documents, standard validation workflows, and placement stats. Be extremely encouraging and polished.`;
  } else if (category === "faq") {
    systemInstruction = `You are the FAQ Assistant of JNS SmartCampus. Give brief, highly factual answers about our digital locker, digital libraries, 24/7 hosteling rules, transport routes, QR/biometric attendance, and examination systems.`;
  } else if (category === "analytics") {
    systemInstruction = `You are JNS-Student-Data-Engine. Analyze the following student demographic or specific academic score: ${JSON.stringify(contextData)}. 
    Generate a smart, highly objective academic evaluation outlining: 
    1. Overall performance appraisal (CGPA analysis, attendance status).
    2. Specific risk status (e.g. low attendance risks under 75%).
    3. Actionable micro-recommendations for curriculum acceleration or tutoring needs.
    Break it down clearly using neat columns, markdown pointers, and bold keys. No fluff.`;
  } else if (category === "report") {
    systemInstruction = `You are JNS-Enterprise-Report-Generator. Draw a detailed executive department or financial overview. Context: ${JSON.stringify(contextData)}. 
    Output a fully-formed academic audit report with formal, high-end titles, structured tables, and business-focused prose. Format the result beautifully in markdown.`;
  }

  // Fallback simulator in case API key is missing or calls are throttled/offline
  const getMockAnswer = () => {
    if (category === "analytics") {
      return `### 📊 AI Analytics Evaluation: ${contextData?.name || "Student"}
- **Registration**: ${contextData?.registerNo || "N/A"}
- **CGPA Status**: **${contextData?.cgpa || "N/A"}** (${contextData?.cgpa >= 8.5 ? "🔴 Academic Excellence Honor Roll" : "🟡 General Standings"})
- **Attendance Rate**: **${contextData?.attendanceRate || "N/A"}%** (${contextData?.attendanceRate < 75 ? "⚠️ WARNING: Attendance below regulatory 75% limit" : "✅ Attendance Compliant"})

#### 🔍 Critical Performance Appraisal
The student exhibits solid engagement in practical frameworks, but shows pending deliverables on advanced theoretical modules. Overall semester standing is strong, with structured credit balance.

#### 🎯 Accelerated Intervention Recommendations
1. **Curriculum Alignment**: Focus immediate attention on clearing the pending Assignment "${contextData?.assignments?.find((a: any) => a.status === 'Pending')?.title || "Advanced Coursework"}".
2. **Attendance Strategy**: Student should maintain consistent attendance for the remaining weeks to ensure exam eligibility.
3. **Tutoring Program**: Recommended for peer mentoring sessions in core analytical disciplines to optimize current CGPA standing.`;
    }

    if (category === "report") {
      return `# 📈 JNS SmartCampus - Enterprise Resource Report
**Generated by**: AI Report Engine
**Context Area**: ${contextData?.type || "General College Statistics Overview"}
**Security Level**: Classified Academic Document

---

## 🏛️ Executive Summary & Resource Allocation
JNS College continues to show stellar academic output, tracking towards an average student-to-teacher ratio of **20:1**. Overall admissions for the 2026 academic calendar show high demand, especially in the Artificial Intelligence and Computer Science departments.

### 💰 Financial & Infrastructure Status Array
| Sector Area | Resource Assigned | Utilization Index | Outstanding Receivables | Status Flag |
| :--- | :--- | :--- | :--- | :--- |
| **Academia / CSE** | $120,000 | 85% | N/A | ✅ Optimized |
| **Library Logs** | $15,000 | 94% | N/A | ⚠️ Critical Book Restock |
| **Placements Drive** | $45,000 | 72% | N/A | ✅ Active |
| **Hostel Mess Facility** | $30,000 | 98% | $8,500 | 🟡 Outstanding Fees |

## 📊 Performance Matrix & Key Analytics
The general campus registry shows an average CGPA of **8.15** with an aggregated attendance rate of **85.4%**. Placement cycles show **$4.4M** in total cumulative contract value secured through top recruiting partners.

## 📝 Strategic Action Plan
1. **Capital Infrastructure**: Allocate $20K additional budget to NVIDIA workstation expansion for computing blocks.
2. **Fee Auditing**: Launch programmatic automated SMS due notifications via ERP communication channels to recover outstanding receivables.`;
    }

    return `👋 Hello! I am the **JNS SmartCampus Advisor**.

Indeed, JNS College is built for modern pioneers. We boast:
- **Outstanding Placements**: A robust **95% Placement Rate** with recruiters like Microsoft, Google, TCS, and Goldman Sachs.
- **Advanced Facilities**: Such as the **Centennial Library** (120K+ physical volumes) and **High-Performance labs** with GPU workstations.
- **Smart ERP**: Includes QR / biometric attendance logging, digital fee audits, online assignments registry, and real-time report dispatchers.

*This response is provided via our intelligent fallback parser.* Do you have more questions regarding specific admissions rules, courses syllabus, or fee tracking?`;
  };

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key === "MOCK_KEY" || key.trim() === "") {
      // Simulate slow thinking and return beautiful simulated result
      setTimeout(() => {
        addLog("GEMINI-AI", "SUCCESS", `Prompt solved via smart fallback engine.`);
        res.json({ text: getMockAnswer() });
      }, 700);
      return;
    }

    const ai = getGeminiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    if (result && result.text) {
      addLog("GEMINI-AI", "SUCCESS", `Response dispatched. Length: ${result.text.length} characters.`);
      res.json({ text: result.text });
    } else {
      throw new Error("Empty text returned from Gemini API.");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    addLog("GEMINI-AI", "ERROR", `Failure: ${error.message || "Unknown error"}. Launching fallback...`);
    res.json({ text: getMockAnswer(), warning: "Using local interactive simulation model." });
  }
});


// ==================== STATIC & VITE MIDDLEWARE SETUP ====================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[JNS PORTAL] Full-stack Node API Server running on http://localhost:${PORT}`);
  });
}

startServer();
