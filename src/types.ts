export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  description: string;
  duration: string;
  seats: number;
  syllabus: string[];
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  experience: string;
  image: string;
  email: string;
  courses: string[];
  skills: string[];
}

export interface Student {
  id: string;
  registerNo: string;
  name: string;
  department: string;
  semester: string;
  email: string;
  phone: string;
  attendanceRate: number;
  cgpa: number;
  feePaid: number;
  feeDue: number;
  feeStatus: "Paid" | "Partial" | "Unpaid";
  assignments: {
    id: string;
    title: string;
    dueDate: string;
    status: "Pending" | "Submitted" | "Graded";
    grade?: string;
  }[];
  timetable: {
    day: string;
    periods: {
      time: string;
      subject: string;
      room: string;
      faculty: string;
    }[];
  }[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  service: "SPRING-BOOT-API" | "MYSQL-DB" | "SECURITY" | "GEMINI-AI";
  type: "INFO" | "SUCCESS" | "WARN" | "ERROR";
  method?: string;
  query?: string;
  message: string;
}

export interface Notification {
  id: string;
  title: string;
  category: "Announcement" | "Email" | "SMS" | "Push";
  timestamp: string;
  message: string;
  recipient: string;
  status: "Sent" | "Scheduled" | "Failed";
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  department: string;
  available: boolean;
  dueDate?: string;
}

export interface PlacementDrive {
  id: string;
  company: string;
  role: string;
  package: string;
  eligibility: string;
  date: string;
  registrations: number;
}
