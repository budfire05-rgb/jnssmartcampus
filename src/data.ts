import { Course, Faculty, Student, Book, PlacementDrive, Notification } from "./types";

export const initialCourses: Course[] = [
  {
    id: "cse",
    code: "CSE-401",
    title: "Computer Science Engineering",
    department: "Engineering",
    description: "Study software systems, algorithms, computing theory, and modern full-stack development methodologies.",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    syllabus: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "Software Engineering", "Web Technologies"]
  },
  {
    id: "ai",
    code: "AI-302",
    title: "Artificial Intelligence",
    department: "Engineering",
    description: "Deep dive into Neural Networks, Deep Learning, Natural Language Processing, and intelligent agent structures.",
    duration: "4 Years (8 Semesters)",
    seats: 60,
    syllabus: ["Machine Learning Basics", "Deep Learning Architectures", "NLP & Computer Vision", "Reinforcement Learning", "AI Ethics & Governance"]
  },
  {
    id: "ds",
    code: "DS-315",
    title: "Data Science",
    department: "Engineering",
    description: "Master big data analytics, predictive modeling, statistical learning, and information visualization frameworks.",
    duration: "4 Years (8 Semesters)",
    seats: 60,
    syllabus: ["Advanced Statistics", "Data Mining & Wrangling", "Big Data Analytics (Hadoop)", "Visual Analytics", "Predictive Forecasting"]
  },
  {
    id: "it",
    code: "IT-204",
    title: "Information Technology",
    department: "Engineering",
    description: "Focuses on cloud architectures, computer networks, internet of things, and enterprise security management.",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    syllabus: ["Routing and Switching", "Cloud Computing & AWS", "Cybersecurity & Cryptography", "Enterprise System Integration", "DevOps Principles"]
  },
  {
    id: "mech",
    code: "ME-102",
    title: "Mechanical Engineering",
    department: "Engineering",
    description: "Core principles of thermodynamics, fluid dynamics, manufacturing science, robotics, and CAD design.",
    duration: "4 Years (8 Semesters)",
    seats: 120,
    syllabus: ["Engineering Mechanics", "Thermodynamics", "Fluid Machinery", "Machine Design & CAD", "Robotics & Automation"]
  },
  {
    id: "civil",
    code: "CE-111",
    title: "Civil Engineering",
    department: "Engineering",
    description: "Learn structural engineering, geotechnical analysis, transportation systems, and sustainable masonry architecture.",
    duration: "4 Years (8 Semesters)",
    seats: 90,
    syllabus: ["Surveying & GIS", "Strength of Materials", "Structural Analysis", "Geotechnical Engineering", "Fluid Mechanics & Hydraulics"]
  },
  {
    id: "mba",
    code: "MGT-501",
    title: "MBA (Master of Business Administration)",
    department: "Management",
    description: "Develop global leadership qualities, financial acumen, strategic marketing knowledge, and operations governance.",
    duration: "2 Years (4 Semesters)",
    seats: 180,
    syllabus: ["Organizational Behavior", "Financial Management", "Marketing Strategy", "International Relations", "Human Resource Management"]
  },
  {
    id: "mca",
    code: "CA-512",
    title: "MCA (Master of Computer Applications)",
    department: "Information Technology",
    description: "Advanced post-graduate studies in software application construction, cloud tools, and database administrations.",
    duration: "2 Years (4 Semesters)",
    seats: 120,
    syllabus: ["Java & C++ Application Design", "Advanced RDBMS", "Cloud Architecture & APIs", "Mobile App Development", "Agile Software Testing"]
  },
  {
    id: "com",
    code: "COM-201",
    title: "Commerce & Accounting",
    department: "Commerce",
    description: "Covers financial accounting, taxation audits, corporate law, economics, and portfolio investment modeling.",
    duration: "3 Years (6 Semesters)",
    seats: 200,
    syllabus: ["Financial Accounting", "Corporate Law", "Corporate Taxation", "Audit Practices", "Corporate Governance"]
  },
  {
    id: "bba",
    code: "BBA-101",
    title: "Business Administration",
    department: "Management",
    description: "Undergraduate degree focusing on general commercial systems, entrepreneurship, and organizational skills.",
    duration: "3 Years (6 Semesters)",
    seats: 150,
    syllabus: ["Principles of Management", "Marketing Basics", "Business Communication", "Human Resource Systems", "Micro & Macro Economics"]
  },
  {
    id: "law",
    code: "LAW-301",
    title: "Corporate Law",
    department: "Law",
    description: "Integrated study of constitution, mercantile contracts, litigation procedures, and intellectual property litigation.",
    duration: "5 Years (10 Semesters)",
    seats: 100,
    syllabus: ["Constitutional Law", "Law of Contracts", "IPR & Trademark Protection", "Cyber Jurisprudence", "Corporate Merger Audits"]
  },
  {
    id: "arts",
    code: "ART-105",
    title: "Arts & Humanities",
    department: "Arts",
    description: "Comprehensive study in English Literature, Psychology, Political Sciences, and Sociological Development.",
    duration: "3 Years (6 Semesters)",
    seats: 120,
    syllabus: ["Literary Criticism", "Cognitive Psychology", "International Politics", "Sociological Paradigms", "Developmental Psychology"]
  }
];

export const initialFaculty: Faculty[] = [
  {
    id: "f1",
    name: "Dr. R. Sharma",
    designation: "Professor & Head",
    department: "Computer Science",
    experience: "18+ Years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    email: "rsharma@jns.edu.in",
    courses: ["Database Management Systems", "Advanced RDBMS"],
    skills: ["PostgreSQL", "Database Sharding", "Distributed Systems"]
  },
  {
    id: "f2",
    name: "Dr. Anjali Mehta",
    designation: "Dean, School of Business",
    department: "Management",
    experience: "15+ Years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    email: "amehta@jns.edu.in",
    courses: ["Organizational Behavior", "Marketing Strategy"],
    skills: ["Corporate Strategy", "FinTech", "Human Resource Dynamics"]
  },
  {
    id: "f3",
    name: "Dr. Vivek Rao",
    designation: "Professor",
    department: "Engineering",
    experience: "12+ Years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    email: "vrao@jns.edu.in",
    courses: ["CAD Design", "Robotics & Automation"],
    skills: ["AutoCAD", "MATLAB", "Kinematic Analysis"]
  },
  {
    id: "f4",
    name: "Dr. Neha Kapoor",
    designation: "Associate Professor",
    department: "Law",
    experience: "10+ Years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    email: "nkapoor@jns.edu.in",
    courses: ["Constitutional Law", "IPR & Trademark Protection"],
    skills: ["Litigation", "IPR Arbitration", "Cyber Laws"]
  }
];

export const campusLifeItems = [
  {
    id: "library",
    title: "Centennial Library",
    category: "Infrastructure",
    description: "A state-of-the-art multi-level library hosting over 120,000 physical volumes, 5,000 digital journals, 24/7 hyper-speed quiet study portals, and advanced group seminar rooms.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800"
  },

  {
    id: "hostel",
    title: "Emerald Premium Residency",
    category: "Hostel",
    description: "Modern, secure student housings designed with ultra-fast Wi-Fi corridors, individual study units, double-sharing layouts, internal gymnasiums, and premium hygienic mess halls.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "laboratories",
    title: "Turing AI & Computing Lab",
    category: "Infrastructure",
    description: "Cutting-edge laboratory infrastructure fitted with heavy-duty NVIDIA DGX workstation architectures, quantum-computing simulation setups, and smart IoT device clusters.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cultural",
    title: "Symphony Spring Fest",
    category: "Events",
    description: "The grand annual celebration uniting theater, musical performances, street dancing, national art showcases, and global street-food stalls, drawing over 15,000 cross-campus delegates.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "workshops",
    title: "Interactive Full-Stack Camps",
    category: "Activities",
    description: "Specialized weekend developer bootcamps where student cohorts team up with external tech-leads to code distributed applications, backend microservices, and databases.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
  }
];

export const initialAlumni = [
  {
    id: "a1",
    name: "Priya Malhotra",
    yearClass: "Class of 2023",
    department: "Computer Science Engineering",
    company: "Google",
    role: "L4 Software Engineer",
    statement: "The rigorous academic schedule combined with real-world project assignments at JNS prepared me for complex technological issues immediately.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "a2",
    name: "Rohan Sen",
    yearClass: "Class of 2021",
    department: "Information Technology",
    company: "Amazon AWS",
    role: "Senior Cloud Architect",
    statement: "JNS SmartCampus's integrated ERP and placement training module streamlined my recruitment completely, allowing me to secure two distinct Fortune-100 offers.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "a3",
    name: "Sanjana Roy",
    yearClass: "Class of 2022",
    department: "MBA",
    company: "Goldman Sachs",
    role: "Equity Governance Analyst",
    statement: "The Case Studies in investment analytics structured by our Business school layout was instrumental in helping me clear my financial mock assessments.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300"
  }
];

export const testimonialsList = [
  {
    id: "t1",
    name: "Dr. Sandeep Malhotra",
    role: "Parent of Student (CSE)",
    content: "Sending our daughter to JNS SmartCampus was the best administrative decision we made. The transparent fee trackers, digital dashboards, and safety profiles are outstanding.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t2",
    name: "Ashwin K.",
    role: "Final Year Student (AI & DS)",
    content: "The QR attendance logs, biometric triggers, and instant assignment review alerts through the Student Portal keep dynamic deadlines clear and extremely stress-free.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t3",
    name: "Prof. Melinda Watson",
    role: "Visiting Research Fellow",
    content: "JNS supports raw research with top-tier materials. The digital libraries integrated smoothly with IEEE journals make academic tracking robust.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  }
];

export const initialNewsEvents = [
  {
    id: "ne1",
    title: "National Smart Campus Hackathon 2026",
    date: "July 12, 2026",
    category: "Hackathons",
    description: "A continuous 36-hour coding battle focused on Web3, AI in governance, and smart structural architectures. Grand Cash Prize: $10,000.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "ne2",
    title: "Advanced Machine Learning Summit & Panel",
    date: "July 28, 2026",
    category: "Seminars",
    description: "Invited academic researchers from top institutes debate deep vision mechanics, NLP paradigms, and ethical boundaries of large model pipelines.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "ne3",
    title: "Summer Mega-Placement Drive: Tech & Consulting",
    date: "August 15, 2026",
    category: "Placement Drives",
    description: "Host of over 45+ premier technology companies (including Microsoft, Salesforce, McKinsey) conducting on-site technical interviews and instant recruitment pipelines.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600"
  }
];

export const initialPlacementDrives: PlacementDrive[] = [
  {
    id: "p1",
    company: "Google India",
    role: "Associate Software Engineer",
    package: "32.5 LPA",
    eligibility: "CGPA > 8.0, CSE/IT/AI",
    date: "2026-08-10",
    registrations: 420
  },
  {
    id: "p2",
    company: "Microsoft",
    role: "Member of Technical Staff",
    package: "44.0 LPA",
    eligibility: "CGPA > 8.5, All Engineering",
    date: "2026-08-12",
    registrations: 380
  },
  {
    id: "p3",
    company: "Deloitte US-India",
    role: "Technology Risk Consultant",
    package: "14.2 LPA",
    eligibility: "CGPA > 7.0, MCA/B.Tech/MBA",
    date: "2026-08-14",
    registrations: 850
  },
  {
    id: "p4",
    company: "Tata Consultancy Services (TCS Digital)",
    role: "Systems Engineer",
    package: "7.5 LPA",
    eligibility: "CGPA > 6.5, Open to all",
    date: "2026-08-18",
    registrations: 1200
  }
];

export const initialBooks: Book[] = [
  { id: "b1", isbn: "978-0131103627", title: "The C Programming Language", author: "Brian W. Kernighan, Dennis M. Ritchie", department: "Computer Science", available: true },
  { id: "b2", isbn: "978-0262033848", title: "Introduction to Algorithms", author: "Thomas H. Cormen", department: "Computer Science", available: false, dueDate: "2026-06-30" },
  { id: "b3", isbn: "978-0134685991", title: "Effective Java", author: "Joshua Bloch", department: "Computer Science", available: true },
  { id: "b4", isbn: "978-0072449747", title: "Database System Concepts", author: "Abraham Silberschatz", department: "Computer Science", available: true },
  { id: "b5", isbn: "978-0321356680", title: "Design Patterns: Elements of Reusable Object-Oriented Software", author: "Erich Gamma", department: "Computer Science", available: true }
];

export const initialStudents: Student[] = [
  {
    id: "s1",
    registerNo: "2026JNSCS001",
    name: "Ashwin Kumar",
    department: "Computer Science Engineering",
    semester: "VI Semester",
    email: "ashwin.kumar@jns.edu.in",
    phone: "+91 98765 43210",
    attendanceRate: 92.4,
    cgpa: 8.95,
    feePaid: 150000,
    feeDue: 0,
    feeStatus: "Paid",
    assignments: [
      { id: "as1", title: "Distributed Database Indexing", dueDate: "2026-06-25", status: "Submitted" },
      { id: "as2", title: "Full-Stack Express CRUD Design", dueDate: "2026-06-20", status: "Graded", grade: "A+" },
      { id: "as3", title: "Advanced Compiler Lexical Analysis", dueDate: "2026-06-29", status: "Pending" }
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          { time: "09:00 - 10:00", subject: "Compiler Design", room: "T-301", faculty: "Dr. G. Saxena" },
          { time: "10:15 - 11:15", subject: "Database Systems", room: "LAB-CSE2", faculty: "Dr. R. Sharma" },
          { time: "11:30 - 12:30", subject: "Computer Networks", room: "T-304", faculty: "Dr. A. Joseph" }
        ]
      },
      {
        day: "Tuesday",
        periods: [
          { time: "09:00 - 10:00", subject: "Software Engineering", room: "T-202", faculty: "Prof. S. Datta" },
          { time: "10:15 - 11:15", subject: "Compiler Design", room: "T-301", faculty: "Dr. G. Saxena" }
        ]
      }
    ]
  },
  {
    id: "s2",
    registerNo: "2026JNSAI042",
    name: "Preeti Shenoy",
    department: "Artificial Intelligence",
    semester: "IV Semester",
    email: "preeti.shenoy@jns.edu.in",
    phone: "+91 76543 21098",
    attendanceRate: 88.5,
    cgpa: 9.12,
    feePaid: 100000,
    feeDue: 50000,
    feeStatus: "Partial",
    assignments: [
      { id: "as4", title: "Backpropagation Implementation", dueDate: "2026-06-24", status: "Submitted" },
      { id: "as5", title: "Heuristic Search Heuristics", dueDate: "2026-06-18", status: "Graded", grade: "A" }
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          { time: "09:00 - 10:00", subject: "Neural Networks", room: "AI-LAB", faculty: "Dr. K. Nair" },
          { time: "10:15 - 11:15", subject: "Python Optimization", room: "T-105", faculty: "Dr. R. Sharma" }
        ]
      }
    ]
  },
  {
    id: "s3",
    registerNo: "2026JNSMG102",
    name: "Gaurav Sen",
    department: "Management",
    semester: "II Semester",
    email: "gaurav.sen@jns.edu.in",
    phone: "+91 99112 23344",
    attendanceRate: 74.2, // Borderline attendance flag!
    cgpa: 7.24,
    feePaid: 0,
    feeDue: 180000,
    feeStatus: "Unpaid",
    assignments: [
      { id: "as6", title: "Socio-Economic Corporate Policy", dueDate: "2026-06-22", status: "Pending" }
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          { time: "10:15 - 11:15", subject: "Financial Accounting", room: "MBA-1", faculty: "Prof. Anjali Mehta" }
        ]
      }
    ]
  }
];
