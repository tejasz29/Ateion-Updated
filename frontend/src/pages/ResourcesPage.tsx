import {
  BookOpen,
  Rocket,
  Sprout,
  FolderKanban,
  BookMarked,
  Award,
  Compass,
  Map,
  TrendingUp,
  Sparkles,
  ListVideo,
  Zap,
  Heart,
  Brain,
  Lightbulb,
  Smile,
  Wind,
  StickyNote,
  CheckSquare,
  Calendar,
  FileText,
  Target,
  FolderOpen,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Milestone,
  Sun,
  Moon,
  Lock,
  Activity,
  Clock,
  Star,
  Search,
  Bell,
  Plus,
  Play,
  Bookmark,
  Share2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
} from "../app/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../app/components/ui/collapsible";
import { useNavigate, Link } from "react-router";
import { useTheme } from "../app/components/ThemeProvider";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};
const navigationSections = [
  {
    title: "Courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", icon: BookMarked },
      { title: "Discover Courses", icon: Compass },
      { title: "Learning Paths", icon: Map },
      { title: "Completed Courses", icon: Award },
    ],
  },
  {
    title: "Upskill",
    icon: Rocket,
    items: [
      { title: "Skill Playlists", icon: ListVideo },
      { title: "Trending Skills", icon: TrendingUp },
      { title: "Certifications", icon: Award },
      { title: "Quick Learning", icon: Zap },
      { title: "AI Skills", icon: Sparkles },
    ],
  },
  {
    title: "Evolve",
    icon: Sprout,
    items: [
      { title: "Wellness Hub", icon: Heart },
      { title: "Mental Health", icon: Brain },
      { title: "Growth Mindset", icon: Lightbulb },
      { title: "Confidence Building", icon: Smile },
      { title: "Stress Management", icon: Wind },
      { title: "Daily Reflection", icon: StickyNote },
    ],
  },
  {
    title: "Organise",
    icon: FolderKanban,
    items: [
      { title: "Tasks", icon: CheckSquare },
      { title: "Calendar", icon: Calendar },
      { title: "Notes", icon: FileText },
      { title: "Goal Planning", icon: Target },
      { title: "Resources", icon: FolderOpen },
    ],
  },
  {
    title: "Pillar",
    icon: Milestone,
    items: [
      { title: "Sproutlings (5–7)", icon: Sprout },
      { title: "Saplings (7–14)", icon: Sprout },
      { title: "Pathfinders (14–18)", icon: Compass },
      { title: "Dreamers (18+)", icon: Sparkles },
    ],
  },
];

const MY_COURSES_DATA = [
  {
    id: 1,
    title: "Advanced React & TypeScript",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    progress: 67,
    completed: 16,
    total: 24,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    progress: 45,
    completed: 14,
    total: 32,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    instructor: "Alex Martinez",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    progress: 0,
    completed: 0,
    total: 28,
  }
];

export default function ResourcesPage() {
  const [courseQuery, setCourseQuery] = useState("");
  const [userProfile, setUserProfile] = useState({ 
    fullName: "Guest Explorer", 
    firstName: "Student", 
    segmentText: "Universal Access", 
    isPremium: false 
});
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState("Dashboard");
  const [activeAgeGroup, setActiveAgeGroup] = useState("All");
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  // Simulate network loading for course grids
  useEffect(() => {
    setIsLoadingCourses(true);
    const timer = setTimeout(() => {
      setIsLoadingCourses(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeView, courseQuery, activeAgeGroup]);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("ateion_tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
    return [
      {
        id: 1,
        title: "Complete React Hooks Assignment",
        date: "Tomorrow",
        priority: "high",
        completed: false,
      },
      {
        id: 2,
        title: "Watch Data Visualization Lecture",
        date: "May 29, 2026",
        priority: "medium",
        completed: false,
      },
      {
        id: 3,
        title: "Submit Project Proposal",
        date: "May 30, 2026",
        priority: "high",
        completed: true,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("ateion_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [selectedMood, setSelectedMood] = useState("Good");
  const [showAddTask, setShowAddTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    priority: "medium",
  });
  const handleAddTask = () => {
    if (!newTask.title) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date || "Today",
      priority: newTask.priority,
      completed: false,
    };

    setTasks([...tasks, task]);

    setNewTask({
      title: "",
      date: "",
      priority: "medium",
    });

    setShowAddTask(false);
  };
  const navigate = useNavigate();

  // Track fixed navbar height so layout clears it
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    const update = () => setNavbarHeight(nav.offsetHeight);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(nav);
    return () => obs.disconnect();
  }, []);

  // Function to check/uncheck tasks
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // 2. Fetch user data on component mount
  useEffect(() => {
    // 1. Grab the secure token from the browser
    const token = localStorage.getItem("token");

    // 2. Kick them out if they have no token at all
    if (!token) {
     // window.dispatchEvent(new CustomEvent("open-login"));
     // navigate("/");
      return;
    }

    // 3. Call the database directly to verify the token and get the user
    const fetchUserDataFromDB = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

        const response = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Token is valid! Database returned the real user row.
          const dbUser = await response.json();
          setUserProfile({
            fullName: dbUser.fullName || "Student",
            // 👇 ADD  RIGHT HERE 👇
            firstName: dbUser.fullName
              ? dbUser.fullName.split(" ")[0]
              : "Student",
            segmentText: dbUser.ageSegment || "Universal Access",
            isPremium: dbUser.isPremium || false,
          });
        } else {
          // Token is fake, expired, or user was deleted from DB
          localStorage.removeItem("token");
          window.dispatchEvent(new CustomEvent("open-login"));
          navigate("/");
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      }
    };

    fetchUserDataFromDB();
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Playground | Ateion</title>
        <meta name="description" content="Explore Ateion's interactive learning resources, tools, and activities designed to build real-world capabilities." />
      </Helmet>
    <SidebarProvider>
      <div
        className="flex w-full bg-[var(--color-background-primary)]"
        style={{
          height: `calc(100dvh - ${navbarHeight}px)`,
          marginTop: navbarHeight,
        }}
      >
        {/* SIDEBAR */}
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r-0"
          style={{
            top: navbarHeight,
            height: `calc(100svh - ${navbarHeight}px)`,
          }}
        >
          <div className="flex h-full flex-col bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]">
            {/* LOGO */}
            <SidebarHeader
              className="px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setActiveView("Dashboard")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white">
                  <Rocket size={24} />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xl font-bold text-[var(--color-text-primary)] tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ateion
                  </span>
                  <span className="text-[10px] text-[var(--color-accent)]/80 tracking-widest font-bold uppercase">
                    Playground
                  </span>
                </div>
              </div>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent className="px-2">
              {navigationSections.map((section) => (
                <SidebarGroup key={section.title} className="mb-2">
                  <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] flex items-center mb-1">
                    <section.icon className="mr-2 h-3.5 w-3.5" />
                    {section.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            className={`group/btn relative overflow-hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 py-2.5 ${activeView === item.title ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold shadow-sm border-l-4 border-[var(--color-accent)] rounded-r-xl rounded-l-none pl-3" : "rounded-xl pl-3 hover:translate-x-1"}`}
                            onClick={() => setActiveView(item.title)}
                          >
                            <item.icon className="h-4 w-4 mr-2 group-hover/btn:scale-110 group-hover/btn:-rotate-6 transition-transform duration-300" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
              {/* 1. DYNAMIC USER AVATAR BLOCK */}
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    className="group/avatar hover:bg-[var(--color-background-tertiary)]/30 text-[var(--color-text-primary)] cursor-pointer p-1 h-auto mt-2 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <a
                      href="/dashboard"
                      className="flex items-center gap-3 w-full rounded-lg"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white font-bold text-lg shrink-0">
                        {userProfile.fullName
                          ? userProfile.fullName.charAt(0).toUpperCase()
                          : "A"}
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {userProfile.fullName}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {userProfile.segmentText}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator className="bg-[var(--color-border-light)] mx-4 my-2" />

              {/* 2. SYSTEM SETTINGS */}
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/30">
                    <Settings size={16} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="group/theme text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/30 cursor-pointer hover:translate-x-1 transition-all duration-300"
                    onClick={toggleTheme}
                  >
                    <div className="group-hover/theme:rotate-180 transition-transform duration-500">
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </div>
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="group/logout text-[var(--color-text-primary)] hover:text-red-500 hover:bg-red-500/10 cursor-pointer hover:translate-x-1 transition-all duration-300"
                    onClick={() => {
                      // 1. Delete the secure token from memory
                      localStorage.removeItem("token");
                      // 2. Redirect back to the home page
                      navigate("/");
                    }}
                  >
                    <LogOut size={16} className="group-hover/logout:scale-110 group-hover/logout:-translate-x-1 transition-transform duration-300" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </div>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-transparent w-full">
          {/* 1. TOP HEADER WITH DYNAMIC AGE BADGE */}
          <header className="flex h-16 sm:h-20 items-center justify-between px-6 lg:px-10 bg-[var(--color-background-secondary)]/60 backdrop-blur-md border-b border-[var(--color-border-light)] shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1
                className="font-bold text-[var(--color-text-primary)] cursor-pointer hover:text-[var(--color-accent)] hover:scale-105 origin-left transition-all duration-300 active:scale-95"
                style={{ 
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.1"
                }}
                onClick={() => setActiveView("Dashboard")}
              >
                Playground
              </h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* DYNAMIC GATEKEEPER BADGE */}
              <div className="hidden sm:flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_var(--color-accent-light)] hover:shadow-[0_4px_15px_var(--color-accent)] hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
                <User size={14} className="group-hover:animate-bounce" />
                <span>{userProfile.segmentText}</span>
              </div>

              {/* DYNAMIC USER PROFILE */}
              <div className="flex items-center gap-3 cursor-pointer group hover:opacity-100">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {userProfile.fullName}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {userProfile.isPremium ? "Premium Member" : "Free Member"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#d97a60] to-[var(--color-accent)] border-2 border-[var(--color-border-light)] shadow-sm overflow-hidden flex items-center justify-center text-[#ffffff] font-bold text-lg group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-[var(--color-accent)]/50">
                  {/* Fallback avatar using their first initial */}
                  {userProfile.firstName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* 2. DASHBOARD SCROLL AREA */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {/* ========================================== */}
              {/* VIEW: DASHBOARD / OVERVIEW                 */}
              {/* ========================================== */}
              {activeView === "Dashboard" && (
                <>
                  {/* VIBRANT APP-LIKE WELCOME BANNER */}
                  <motion.div 
                    variants={fadeUpItem}
                    initial="hidden"
                    animate="show"
                    className="relative w-full rounded-[32px] bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] p-8 sm:p-12 text-[var(--color-text-primary)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden group border border-[var(--color-border-light)]"
                  >
                    {/* Abstract Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[var(--color-accent)]/20 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--color-info)]/20 to-transparent rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>
                    
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUwLDE1MCwxNTAsMC4xNSkiLz48L3N2Zz4=')] opacity-50"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 text-[var(--color-text-primary)] mb-4 font-bold bg-[var(--color-background-primary)]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--color-border-medium)] shadow-sm text-sm">
                          <Sparkles size={16} className="text-[var(--color-warning)]" />
                          <span>Welcome back, {userProfile.firstName}!</span>
                        </div>
                        <h2
                          className="font-bold mb-4 text-[var(--color-text-primary)] drop-shadow-sm leading-tight"
                          style={{ 
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          Continue Your Journey
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-xl mb-8 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif] font-medium">
                          Curated learning experiences specifically designed for
                          your age segment and growth path. You're making great
                          progress this week!
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-[#ffffff] px-8 py-3.5 rounded-2xl font-bold shadow-[0_0_20px_rgba(232,133,106,0.3)] hover:shadow-[0_0_30px_rgba(232,133,106,0.5)] hover:-translate-y-1 transition-all flex items-center gap-2 border border-transparent">
                            Resume Learning <ChevronRight size={18} />
                          </button>
                          <button className="bg-[var(--color-background-primary)]/80 backdrop-blur-md text-[var(--color-text-primary)] border border-[var(--color-border-medium)] px-6 py-3.5 rounded-2xl font-bold hover:bg-[var(--color-background-tertiary)] transition-all flex items-center gap-2 shadow-sm">
                            <span className="text-xl animate-pulse">🔥</span> 7 Day Streak!
                          </button>
                        </div>
                      </div>

                      {/* Right side illustration/graphic (hidden on small screens) */}
                      <div className="hidden lg:flex relative w-48 h-48 group-hover:-translate-y-2 transition-transform duration-700 flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-warning)] rounded-[2rem] rotate-6 opacity-40 blur-sm"></div>
                        <div className="absolute inset-0 bg-[var(--color-background-primary)]/60 backdrop-blur-xl border border-[var(--color-border-medium)] rounded-[2rem] -rotate-3 flex flex-col items-center justify-center shadow-lg">
                          <div className="relative w-28 h-28 flex items-center justify-center mt-2">
                            <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                              <circle cx="56" cy="56" r="48" stroke="var(--color-border-medium)" strokeWidth="6" fill="none" />
                              <circle cx="56" cy="56" r="48" stroke="var(--color-warning)" strokeWidth="6" fill="none" strokeDasharray="301.59" strokeDashoffset="80" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                            </svg>
                            <div className="flex flex-col items-center justify-center text-center z-10">
                              <span className="text-3xl font-bold text-[var(--color-text-primary)] leading-none drop-shadow-sm">12</span>
                              <span className="text-[9px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mt-1">Level</span>
                            </div>
                          </div>
                          <p className="text-[11px] font-bold text-[var(--color-text-primary)] mt-3 bg-[var(--color-background-secondary)]/80 px-3 py-1.5 rounded-full border border-[var(--color-border-medium)] shadow-sm backdrop-blur-md">
                            2,450 / 3,000 XP
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* 3. GAMIFICATION OVERVIEW STATS */}
                  <div className="flex flex-col gap-6 mt-4">
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <Compass size={28} className="text-[var(--color-accent)] group-hover:rotate-12 transition-transform duration-300" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Overview</span>
                      </h3>
                    </div>

                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      {/* Stat Card 1: Courses */}
                      <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-info),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-info)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-[var(--color-info)]/10 text-[var(--color-info)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                            <BookOpen size={24} />
                          </div>
                          <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                            <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +2
                          </span>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                              4
                            </p>
                            <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
                              Active Courses
                            </p>
                          </div>
                          {/* Sparkline */}
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                            <svg className="w-16 h-8 text-[var(--color-info)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Stat Card 2: Hours */}
                      <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-accent),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/10 text-[var(--color-warning)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                            <Clock size={24} />
                          </div>
                          <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                            <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +15%
                          </span>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                              127
                            </p>
                            <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
                              Hours Learned
                            </p>
                          </div>
                          {/* Sparkline */}
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                            <svg className="w-16 h-8 text-[var(--color-warning)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M0 30 L20 25 L40 10 L60 15 L80 5 L100 0" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Stat Card 3: Badges */}
                      <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_#8b5cf6,0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Award size={24} />
                          </div>
                          <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <Sparkles size={10} /> +5
                          </span>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                              23
                            </p>
                            <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
                              Achievements
                            </p>
                          </div>
                          {/* Sparkline */}
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                            <svg className="w-16 h-8 text-[#8b5cf6] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M0 20 L20 25 L40 15 L60 20 L80 5 L100 10" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Stat Card 4: Streaks */}
                      <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-warning),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-warning)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/10 text-[var(--color-warning)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <span className="text-2xl drop-shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 inline-block">🔥</span>
                          </div>
                          <span className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                            Best!
                          </span>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight flex items-baseline gap-1">
                              7 <span className="text-sm font-bold text-[var(--color-text-tertiary)]">Days</span>
                            </p>
                            <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
                              Active Streak
                            </p>
                          </div>
                          {/* Sparkline */}
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                            <svg className="w-16 h-8 text-[var(--color-warning)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M0 28 L20 28 L40 20 L60 20 L80 10 L100 0" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </>
              )}

              {/* ========================================== */}
              {/* VIEW: MY COURSES                           */}
              {/* ========================================== */}
              {activeView === "My Courses" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* 4. MY COURSES SECTION (3-FREE-VIDEOS PAYWALL) */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <BookMarked size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Courses</span>
                      </h3>
                      <button className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 px-4 py-2 rounded-lg transition-all flex items-center gap-1">
                        View All <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="mb-2 relative max-w-md group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search for courses, skills, or instructors..."
                        value={courseQuery}
                        onChange={(e) => setCourseQuery(e.target.value)}
                        className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
                      />
                    </div>

                    {/* Age Segment Filter Tabs */}
                    <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 mb-4 mt-2 px-1">
                      {[
                        { id: "All", icon: <Compass size={18} /> },
                        { id: "Kids (Foundation)", icon: <Smile size={18} /> },
                        { id: "Teens (Growth)", icon: <Zap size={18} /> },
                        { id: "Young Adults (Prime)", icon: <Rocket size={18} /> },
                        { id: "Parents (Resource)", icon: <Heart size={18} /> },
                      ].map((segment) => (
                        <button
                          key={segment.id}
                          onClick={() => setActiveAgeGroup(segment.id)}
                          className={`relative flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-500 group overflow-hidden ${
                            activeAgeGroup === segment.id
                              ? "text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
                              : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:-translate-y-1"
                          }`}
                        >
                          {activeAgeGroup === segment.id && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d97a60] via-[var(--color-accent)] to-[#ff9e88] z-0 opacity-90"></div>
                          )}
                          <div className={`relative z-10 flex items-center gap-2 ${activeAgeGroup === segment.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
                            {segment.icon}
                            {segment.id}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Course Grid */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {isLoadingCourses ? (
                        [1, 2, 3, 4].map((i) => (
                          <div key={`skel-my-${i}`} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col overflow-hidden border border-[var(--color-border-light)] shadow-sm animate-pulse">
                            <div className="h-[180px] w-full bg-[var(--color-background-tertiary)] opacity-50"></div>
                            <div className="p-5 flex flex-col flex-1 gap-4">
                              <div className="h-5 bg-[var(--color-background-tertiary)] rounded-md w-3/4 opacity-50"></div>
                              <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/2 opacity-50"></div>
                              <div className="mt-auto flex items-center justify-between pt-2">
                                <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/3 opacity-50"></div>
                                <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/4 opacity-50"></div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : MY_COURSES_DATA.filter(c => 
                        c.title.toLowerCase().includes(courseQuery.toLowerCase()) || 
                        c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
                      ).length > 0 ? (
                        MY_COURSES_DATA.filter(c => 
                          c.title.toLowerCase().includes(courseQuery.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
                        ).map((course) => (
                          <motion.div variants={fadeUpItem} key={course.id} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-transform transition-shadow duration-300">
                            <div className="relative h-[180px] w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* HOVER QUICK ACTIONS */}
                              <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                                <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Preview">
                                  <Play size={18} className="fill-[#ffffff]" />
                                </button>
                                <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Bookmark">
                                  <Bookmark size={18} />
                                </button>
                                <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Share">
                                  <Share2 size={18} />
                                </button>
                              </div>
                              <div className="absolute top-4 left-4 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg z-20 group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300">
                                <ListVideo size={14} className="text-[var(--color-accent)]" /> 3 VIDEOS FREE
                              </div>
                              <div className="absolute bottom-4 left-4 z-20">
                                <h4 className="text-[16px] font-bold text-[#ffffff] mb-0.5 line-clamp-2 leading-tight drop-shadow-md">
                                  {course.title}
                                </h4>
                                <p className="text-[13px] text-[#ffffff]/80 font-medium flex items-center gap-1.5 group-hover:text-[#ffffff] transition-colors duration-300">
                                  <User size={12} className="group-hover:scale-110 transition-transform duration-300" /> {course.instructor}
                                </p>
                              </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>
                              
                              <div className="mt-2 mb-6">
                                <div className="flex justify-between items-center mb-2.5">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] flex items-center gap-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                    <Target size={12} className="group-hover:rotate-12 transition-transform duration-300" /> Progress
                                  </span>
                                  <span className="text-[12px] font-bold text-[var(--color-accent)]">
                                    {course.progress}% Complete
                                  </span>
                                </div>
                                <div className="w-full bg-[var(--color-background-primary)] rounded-full h-2 mb-2.5 overflow-hidden border border-[var(--color-border-light)] shadow-inner">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88] relative overflow-hidden"
                                    style={{ width: `${course.progress}%` }}
                                  >
                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
                                  </div>
                                </div>
                                <p className="text-[12px] text-[var(--color-text-secondary)] font-medium flex items-center gap-1 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                                  <CheckSquare size={12} className="text-[var(--color-success)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" /> {course.completed} of {course.total} lessons completed
                                </p>
                              </div>
                              
                              <div className="mt-auto">
                                <button className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-white text-[var(--color-text-primary)] py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)] active:scale-95">
                                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]">
                          <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                            <BookMarked size={32} />
                          </div>
                          <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">No courses found</p>
                          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">We couldn't find any courses matching "{courseQuery}". Try adjusting your search criteria.</p>
                          <button 
                            onClick={() => setCourseQuery("")}
                            className="mt-6 text-sm font-bold text-[var(--color-accent)] hover:underline"
                          >
                            Clear search
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: DISCOVER COURSES                       */}
              {/* ========================================== */}
              {activeView === "Discover Courses" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <Compass size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Discover Courses</span>
                      </h3>
                    </div>

                    <div className="mb-2 relative max-w-xl group focus-within:scale-[1.01] transition-transform duration-300">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors group-focus-within:scale-110 group-focus-within:rotate-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search for new courses, skills, or instructors..."
                        value={courseQuery}
                        onChange={(e) => setCourseQuery(e.target.value)}
                        className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
                      />
                    </div>

                    {/* Age Segment Filter Tabs */}
                    <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 mb-4 mt-2 px-1">
                      {[
                        { id: "All", icon: <Compass size={18} /> },
                        { id: "Kids (Foundation)", icon: <Smile size={18} /> },
                        { id: "Teens (Growth)", icon: <Zap size={18} /> },
                        { id: "Young Adults (Prime)", icon: <Rocket size={18} /> },
                        { id: "Parents (Resource)", icon: <Heart size={18} /> },
                      ].map((segment) => (
                        <button
                          key={segment.id}
                          onClick={() => setActiveAgeGroup(segment.id)}
                          className={`relative flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-500 group overflow-hidden ${
                            activeAgeGroup === segment.id
                              ? "text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
                              : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:-translate-y-1"
                          }`}
                        >
                          {activeAgeGroup === segment.id && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d97a60] via-[var(--color-accent)] to-[#ff9e88] z-0 opacity-90"></div>
                          )}
                          <div className={`relative z-10 flex items-center gap-2 ${activeAgeGroup === segment.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
                            {segment.icon}
                            {segment.id}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Discovery Course Grid (Reusing mock data) */}
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {isLoadingCourses ? (
                        [1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={`skel-disc-${i}`} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col overflow-hidden border border-[var(--color-border-light)] shadow-sm animate-pulse">
                            <div className="h-[200px] w-full bg-[var(--color-background-tertiary)] opacity-50"></div>
                            <div className="p-5 flex flex-col flex-1 gap-4 relative">
                              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>
                              <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-full opacity-50"></div>
                              <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-5/6 opacity-50"></div>
                              <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-2/3 opacity-50 mb-4"></div>
                              <div className="mt-auto flex justify-between items-center">
                                <div className="h-6 bg-[var(--color-background-tertiary)] rounded-full w-24 opacity-50"></div>
                                <div className="h-8 bg-[var(--color-background-tertiary)] rounded-xl w-8 opacity-50"></div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : MY_COURSES_DATA.filter(c => 
                        c.title.toLowerCase().includes(courseQuery.toLowerCase()) || 
                        c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
                      ).map((course) => (
                        <motion.div variants={fadeUpItem} key={course.id} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
                          <div className="relative h-[200px] w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* HOVER QUICK ACTIONS */}
                            <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                              <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Preview">
                                <Play size={18} className="fill-[#ffffff]" />
                              </button>
                              <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Bookmark">
                                <Bookmark size={18} />
                              </button>
                              <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Share">
                                <Share2 size={18} />
                              </button>
                            </div>
                            <div className="absolute top-4 left-4 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg z-20">
                              <Star size={14} className="text-[var(--color-warning)]" /> FEATURED
                            </div>
                            <div className="absolute top-4 right-4 bg-[var(--color-background-primary)] text-[var(--color-text-primary)] w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform">
                              <Heart size={16} />
                            </div>
                            <div className="absolute bottom-4 left-4 z-20 right-4">
                              <h4 className="text-[18px] font-bold text-[#ffffff] mb-1 line-clamp-2 leading-tight drop-shadow-md">
                                {course.title}
                              </h4>
                              <div className="flex items-center justify-between">
                                <p className="text-[13px] text-[#ffffff]/80 font-medium flex items-center gap-1.5">
                                  <User size={12} /> {course.instructor}
                                </p>
                                <div className="flex items-center gap-1 text-[var(--color-warning)] text-xs font-bold">
                                  <Star size={12} fill="currentColor" /> 4.9 (12k)
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>
                            
                            <p className="text-[13px] text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                              Learn the fundamentals and advanced techniques in this comprehensive course tailored for {activeAgeGroup !== "All" ? activeAgeGroup : "your specific learning path"}.
                            </p>
                            
                            <div className="mt-auto">
                              <button className="w-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                                View Details
                                <ChevronRight size={16} className="transition-all" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (TASKS)                     */}
              {/* ========================================== */}
              {activeView === "Tasks" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* HEADER WITH BUTTON */}
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <CheckSquare size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Tasks</span>
                    </h3>

                    <button
                      onClick={() => setShowAddTask(true)}
                      className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
                    >
                      <Target size={16} /> Add Task
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Task List */}
                    <div className="lg:col-span-2">
                      <div className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
                        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border-light)] pb-4">
                          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                            <CheckSquare className="text-[var(--color-accent)]" size={20} />
                            Active Tasks
                          </h4>
                          <span className="text-xs font-bold bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full">
                            {tasks.filter(t => !t.completed).length} Pending
                          </span>
                        </div>

                        <motion.div 
                          className="flex flex-col gap-3"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="show"
                        >
                          {/* DYNAMIC INTERACTIVE TASKS */}
                          {tasks.map((task) => (
                            <motion.div
                              variants={fadeUpItem}
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:-translate-y-[2px] hover:shadow-md ${
                                task.completed
                                  ? "border-[var(--color-border-light)] opacity-50 bg-[var(--color-background-secondary)] grayscale"
                                  : task.priority === "medium"
                                    ? "border-[var(--color-warning)]/30 bg-[var(--color-warning_light)] hover:border-[var(--color-warning)]/50"
                                    : "border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 bg-[var(--color-background-primary)]"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                {/* Checkbox */}
                                <div
                                  className={`relative w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                                    task.completed
                                      ? "bg-[var(--color-success)] text-white scale-110"
                                      : task.priority === "medium"
                                        ? "border-2 border-[var(--color-warning)] group-hover:bg-[var(--color-warning)] group-hover:text-white"
                                        : "border-2 border-[var(--color-border-medium)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white text-transparent"
                                  }`}
                                >
                                  {/* Confetti burst for high-priority completions */}
                                  {task.completed && task.priority === "high" && (
                                    <>
                                      <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] -top-3 left-1/2 animate-[ping_0.6s_ease-out_forwards]"></div>
                                      <div className="absolute w-1 h-1 rounded-full bg-[var(--color-warning)] top-0 -right-2 animate-[ping_0.5s_ease-out_forwards]"></div>
                                      <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-info)] top-1/2 -left-3 animate-[ping_0.7s_ease-out_forwards]"></div>
                                      <div className="absolute w-1 h-1 rounded-full bg-[#8b5cf6] -bottom-2 right-0 animate-[ping_0.6s_ease-out_forwards]"></div>
                                    </>
                                  )}
                                  <CheckSquare size={14} className={task.completed ? "block animate-in zoom-in duration-300" : "hidden group-hover:block opacity-50"} />
                                </div>

                                {/* Task Content */}
                                <div className="flex flex-col relative transition-all duration-500">
                                  <p className={`text-[15px] font-bold mb-1 relative inline-block w-fit transition-colors duration-300 ${task.completed ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-primary)]"}`}>
                                    {task.title}
                                    <span className={`absolute top-1/2 left-0 h-[2px] bg-[var(--color-text-tertiary)] transition-all duration-300 ease-out origin-left ${task.completed ? "w-full" : "w-0"}`}></span>
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1 font-medium">
                                      <Calendar size={12} /> {task.date}
                                    </span>
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                        task.priority === "high"
                                          ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                                          : "text-[var(--color-warning)] bg-[var(--color-warning)]/10"
                                      }`}
                                    >
                                      {task.priority}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex -space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] border-2 border-[var(--color-background-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">
                                  {userProfile.firstName.charAt(0).toUpperCase()}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* Right: Task Progress Stats */}
                    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-6">
                      <motion.div variants={fadeUpItem} className="clay-card flex flex-col items-center justify-center text-center bg-gradient-to-b from-[var(--color-background-secondary)] to-[var(--color-background-primary)] relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-success)] opacity-10 rounded-full blur-2xl"></div>
                        <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 w-full text-left">
                          Productivity
                        </h4>
                        
                        <div className="relative w-32 h-32 mb-6">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-light)" strokeWidth="8" />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="45" 
                              fill="none" 
                              stroke="var(--color-success)" 
                              strokeWidth="8" 
                              strokeDasharray={`${(tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 283} 283`}
                              strokeLinecap="round"
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                              {Math.round((tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100)}%
                            </span>
                            <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-widest">
                              Done
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
                            <p className="text-2xl font-bold text-[var(--color-success)]">{tasks.filter(t => t.completed).length}</p>
                            <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase">Completed</p>
                          </div>
                          <div className="bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
                            <p className="text-2xl font-bold text-[var(--color-warning)]">{tasks.filter(t => !t.completed).length}</p>
                            <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase">Pending</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUpItem} className="clay-card bg-[var(--color-accent)] text-white border-none relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center justify-between relative z-10">
                          <div>
                            <p className="font-bold text-lg mb-1">Focus Mode</p>
                            <p className="text-xs text-white/80">Block distractions now</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Zap size={20} className="text-white" />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  {/* ADD TASK MODAL */}
                  {showAddTask && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="bg-[var(--color-background-secondary)] p-6 rounded-xl w-[320px] shadow-xl">
                        <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)]">
                          Add New Task
                        </h3>

                        <input
                          type="text"
                          placeholder="Task title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />

                        <input
                          type="date"
                          value={newTask.date}
                          onChange={(e) =>
                            setNewTask({ ...newTask, date: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-3 outline-none"
                        />

                        <select
                          value={newTask.priority}
                          onChange={(e) =>
                            setNewTask({ ...newTask, priority: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-4"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>

                        <div className="flex justify-between">
                          <button
                            onClick={() => setShowAddTask(false)}
                            className="px-3 py-1 bg-[var(--color-background-tertiary)] rounded hover:bg-[var(--color-border-medium)]"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleAddTask}
                            className="px-3 py-1 bg-[var(--color-accent)] text-white rounded hover:brightness-110"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (CALENDAR)                  */}
              {/* ========================================== */}
              {activeView === "Calendar" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Calendar size={28} className="text-[var(--color-accent)] group-hover:-rotate-6 transition-transform duration-300" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Calendar</span>
                    </h3>

                    <button
                      className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
                    >
                      <Calendar size={16} /> Add Event
                    </button>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {/* Left: The Calendar Grid (Col 1-2) */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full lg:col-span-2">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[18px] font-bold text-[var(--color-text-primary)]">
                          May 2026
                        </h4>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                            <ChevronLeft size={20} />
                          </button>
                          <button className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="w-full mt-2">
                        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4 text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">
                          <div>Sun</div>
                          <div>Mon</div>
                          <div>Tue</div>
                          <div>Wed</div>
                          <div>Thu</div>
                          <div>Fri</div>
                          <div>Sat</div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[15px] font-medium text-[var(--color-text-primary)]">
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">26</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">27</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">28</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">29</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">30</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">1</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                            2
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-info)]"></div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">3</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                            4
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">5</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">6</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">7</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">8</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">9</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">10</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">11</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">12</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                            13
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)]"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>
                            </div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">14</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">15</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">16</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">17</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">18</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">19</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">20</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">21</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">22</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">23</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">24</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                            25
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-info)]"></div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">26</div>
                          <div className="bg-[var(--color-accent)] text-[var(--color-text-inverse)] rounded-xl py-2 flex items-center justify-center mx-1 shadow-md font-bold cursor-pointer relative">
                            27
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-warning)] border-2 border-[var(--color-background-primary)]"></div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">28</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">29</div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                            30
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></div>
                          </div>
                          <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">31</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">1</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">2</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">3</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">4</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">5</div>
                          <div className="text-[var(--color-text-tertiary)]/50 py-2">6</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right: Today's Schedule */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-secondary)]">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Calendar size={18} className="text-[var(--color-accent)]" />
                        Schedule for May 27
                      </h4>
                      
                      <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[var(--color-border-light)]">
                        
                        {/* Event 1 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-warning)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
                          <div className="p-3 bg-[var(--color-background-primary)] rounded-xl border border-[var(--color-border-light)] shadow-sm hover:border-[var(--color-warning)]/30 transition-colors cursor-pointer group">
                            <p className="text-[10px] font-bold text-[var(--color-warning)] uppercase tracking-wider mb-1">
                              10:00 AM - 11:30 AM
                            </p>
                            <p className="text-sm font-bold text-[var(--color-text-primary)]">
                              Team Standup & Sync
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex -space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] border border-[var(--color-background-primary)]"></div>
                                <div className="w-5 h-5 rounded-full bg-[var(--color-info)] border border-[var(--color-background-primary)]"></div>
                              </div>
                              <span className="text-[10px] text-[var(--color-text-tertiary)] font-medium">+3 others</span>
                            </div>
                          </div>
                        </div>

                        {/* Event 2 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
                          <div className="p-3 bg-[var(--color-background-primary)] rounded-xl border border-[var(--color-border-light)] shadow-sm hover:border-[var(--color-accent)]/30 transition-colors cursor-pointer group">
                            <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
                              1:00 PM - 2:00 PM
                            </p>
                            <p className="text-sm font-bold text-[var(--color-text-primary)]">
                              1:1 Mentoring Session
                            </p>
                            <p className="text-xs text-[var(--color-text-tertiary)] mt-1 flex items-center gap-1">
                              <ListVideo size={12} /> Google Meet
                            </p>
                          </div>
                        </div>

                        {/* Event 3 */}
                        <div className="relative pl-8">
                          <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-info)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
                          <div className="p-3 bg-[var(--color-info_light)] rounded-xl border border-[var(--color-info)]/20 shadow-sm cursor-pointer group">
                            <p className="text-[10px] font-bold text-[var(--color-info)] uppercase tracking-wider mb-1">
                              4:00 PM - 5:30 PM
                            </p>
                            <p className="text-sm font-bold text-[var(--color-text-primary)]">
                              Focus Work: React Course
                            </p>
                            <p className="text-xs text-[var(--color-info)]/80 font-medium mt-1">
                              Chapter 4: Advanced State
                            </p>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (NOTES)                     */}
              {/* ========================================== */}
              {activeView === "Notes" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <StickyNote size={28} className="text-[var(--color-accent)] group-hover:rotate-6 transition-transform duration-300" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Notes</span>
                    </h3>

                    <button
                      className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
                    >
                      <StickyNote size={16} /> New Note
                    </button>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {/* Note 1 */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-accent)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 rounded-xl bg-[var(--color-accent_light)] text-[var(--color-accent)]">
                          <StickyNote size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
                          Draft
                        </span>
                      </div>
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
                        React Hooks Best Practices
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
                        Always use the dependency array carefully. Avoid infinite loops by ensuring all external variables are accounted for. Custom hooks should start with "use".
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                            {userProfile.firstName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                          Updated 2h ago
                        </span>
                      </div>
                    </motion.div>

                    {/* Note 2 */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-info)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 rounded-xl bg-[var(--color-info_light)] text-[var(--color-info)]">
                          <FileText size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
                          Study
                        </span>
                      </div>
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
                        Python Data Structures
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
                        Lists are mutable arrays. Tuples are immutable. Dictionaries use hash maps for O(1) lookups. Sets are great for deduplication and fast membership tests.
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                            {userProfile.firstName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                          Updated yesterday
                        </span>
                      </div>
                    </motion.div>

                    {/* Note 3 */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-success)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 rounded-xl bg-[var(--color-success_light)] text-[var(--color-success)]">
                          <BookMarked size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
                          Reference
                        </span>
                      </div>
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
                        SQL Query Optimization
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
                        Avoid SELECT *. Always use indexes on columns you frequently filter or join on. Use EXPLAIN ANALYZE to understand the query execution plan.
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                            {userProfile.firstName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                          Updated 3d ago
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: EVOLVE (WELLNESS )    */}
              {/* ========================================== */}
              {activeView === "Wellness Hub" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Heart size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Evolve & Wellness</span>
                    </h3>

                    <button className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-background-tertiary)] transition shadow-sm flex items-center gap-2">
                      <Target size={16} className="text-[var(--color-accent)]" /> 
                      Set Wellness Goal
                    </button>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {/* A. Learning Activity Chart Placeholder */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
                        <TrendingUp size={20} className="text-[var(--color-accent)]" />
                        Learning Activity
                      </h4>
                      <div className="relative w-full h-[180px] flex items-end justify-between pb-6 border-b border-[var(--color-border-light)] group">
                        {/* Grid Lines */}
                        <div className="absolute top-0 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>
                        <div className="absolute top-1/3 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>
                        <div className="absolute top-2/3 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>

                        {/* SVG Line connecting dots */}
                        <svg
                          className="absolute inset-0 h-[calc(100%-24px)] w-full pointer-events-none"
                          preserveAspectRatio="none"
                          viewBox="0 0 500 150"
                        >
                          <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="var(--color-info)" />
                              <stop offset="50%" stopColor="var(--color-accent)" />
                              <stop offset="100%" stopColor="var(--color-warning)" />
                            </linearGradient>
                            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100 L 465 150 L 35 150 Z"
                            fill="url(#fillGrad)"
                            className="transition-opacity duration-500 opacity-50 group-hover:opacity-100"
                          />
                          <path
                            d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100"
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="4"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-opacity duration-500 opacity-80 group-hover:opacity-100 drop-shadow-md"
                          />
                        </svg>

                        {/* Data Points */}
                        {[
                          { day: "Mon", mb: 45, color: "var(--color-info)" },
                          { day: "Tue", mb: 75, color: "var(--color-info)" },
                          { day: "Wed", mb: 35, color: "var(--color-accent)" },
                          { day: "Thu", mb: 85, color: "var(--color-accent)" },
                          { day: "Fri", mb: 105, color: "var(--color-warning)" },
                          { day: "Sat", mb: 55, color: "var(--color-warning)" },
                          { day: "Sun", mb: 95, color: "var(--color-warning)" },
                        ].map((d, i) => (
                          <motion.div variants={fadeUpItem} key={i} className="relative z-10 flex flex-col items-center group/dot cursor-pointer" style={{ width: "14%" }}>
                            <div className="absolute -top-10 opacity-0 group-hover/dot:opacity-100 transition-opacity bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] text-[10px] font-bold px-2 py-1 rounded shadow-md border border-[var(--color-border-light)] pointer-events-none whitespace-nowrap z-20">
                              {Math.round(d.mb / 10)}h logged
                            </div>
                            <div 
                              className="h-3 w-3 rounded-full border-2 border-[var(--color-background-primary)] shadow-sm group-hover/dot:scale-150 transition-all duration-300"
                              style={{ marginBottom: `${d.mb}px`, backgroundColor: d.color }}
                            ></div>
                            <span className="absolute bottom-[-24px] text-[11px] font-bold text-[var(--color-text-tertiary)] group-hover/dot:text-[var(--color-text-primary)] transition-colors">
                              {d.day}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-8 flex justify-between items-center bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-0.5">This Week</p>
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">23.1 Hours</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-0.5">Compared to last</p>
                          <p className="text-sm font-bold text-[var(--color-success)] flex items-center gap-1 justify-end">
                            <TrendingUp size={14} /> +12%
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* B. Wellness Hub Timeline */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Sprout size={20} className="text-[var(--color-success)]" />
                        Wellness Journey
                      </h4>
                      <motion.div 
                        className="flex flex-col gap-6 border-l-2 border-[var(--color-border-light)] ml-2 pl-6 relative mt-2"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                      >
                        {/* Activity 1 */}
                        <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
                          <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-success)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
                          <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/5 transition-colors -mt-2">
                            <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                              Daily Reflection
                            </p>
                            <p className="text-xs text-[var(--color-success)] font-bold mt-1 flex items-center gap-1">
                              <CheckSquare size={12} /> Completed Today
                            </p>
                          </div>
                        </motion.div>

                        {/* Activity 2 */}
                        <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
                          <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
                          <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-colors -mt-2">
                            <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                              Mindfulness Practice
                            </p>
                            <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                              <Clock size={12} /> 5 min session
                            </p>
                          </div>
                        </motion.div>

                        {/* Activity 3 */}
                        <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
                          <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-info)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
                          <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-info)]/30 hover:bg-[var(--color-info)]/5 transition-colors -mt-2">
                            <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                              Stress Management
                            </p>
                            <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                              <Calendar size={12} /> Scheduled
                            </p>
                          </div>
                        </motion.div>

                        {/* Activity 4 */}
                        <motion.div variants={fadeUpItem} className="relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                          <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-border-medium)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
                          <div className="p-3 rounded-xl border border-dashed border-[var(--color-border-medium)] hover:border-[var(--color-text-secondary)] transition-colors -mt-2">
                            <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                              Growth Mindset
                            </p>
                            <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                              <Lock size={12} /> Coming Up
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* C. Achievements Grid */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full lg:col-span-2 bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] relative overflow-hidden">
                      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-warning)] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Award size={20} className="text-[var(--color-warning)]" />
                        Achievements
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-accent)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <Award
                            className="text-[var(--color-accent)] mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 relative z-10"
                            size={36}
                          />
                          <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                            Course Master
                          </p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Unlocked</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-warning)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-warning)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-4xl mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300 relative z-10 drop-shadow-sm">
                            🔥
                          </span>
                          <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                            7 Day Streak
                          </p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">In Progress</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-success)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-success)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <TrendingUp
                            className="text-[var(--color-success)] mb-4 group-hover:scale-125 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10"
                            size={36}
                          />
                          <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                            Rising Star
                          </p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Unlocked</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-info)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-info)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <Target
                            className="text-[var(--color-info)] mb-4 group-hover:scale-125 transition-transform duration-300 relative z-10"
                            size={36}
                          />
                          <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                            Goal Crusher
                          </p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Locked</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: EVOLVE (MENTAL HEALTH) */}
              {/* ========================================== */}
              {activeView === "Mental Health" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Smile size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Mental Health & Support</span>
                    </h3>

                    <button className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-background-tertiary)] transition shadow-sm flex items-center gap-2">
                      <Heart size={16} className="text-[var(--color-accent)]" /> 
                      Talk to a Counselor
                    </button>
                  </div>

                  <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {/* A. Mood Check-in (Fully Interactive & Professionalized) */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Smile className="text-[var(--color-warning)]" size={20} />
                        How are you feeling today?
                      </h4>
                      <div className="flex justify-between items-center gap-3 mb-6">
                        {/*                           <button
                             onClick={() => setSelectedMood("Stressed")}
                             className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                               selectedMood === "Stressed"
                                 ? "border-[var(--color-accent)] bg-gradient-to-b from-[var(--color-accent)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                                 : "border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-background-secondary)]"
                             }`}
                           >
                             {selectedMood === "Stressed" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)]"></div>}
                             <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Stressed" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😫</span>
                             <span className={`text-xs uppercase tracking-widest ${selectedMood === "Stressed" ? "font-bold text-[var(--color-accent)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                               Stressed
                             </span>
                           </button>

                           {/* Okay Button */}
                           <button
                             onClick={() => setSelectedMood("Okay")}
                             className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                               selectedMood === "Okay"
                                 ? "border-[var(--color-warning)] bg-gradient-to-b from-[var(--color-warning)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                                 : "border-[var(--color-border-light)] hover:border-[var(--color-warning)]/40 hover:bg-[var(--color-background-secondary)]"
                             }`}
                           >
                             {selectedMood === "Okay" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-warning)]"></div>}
                             <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Okay" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😐</span>
                             <span className={`text-xs uppercase tracking-widest ${selectedMood === "Okay" ? "font-bold text-[var(--color-warning)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                               Okay
                             </span>
                           </button>

                           {/* Good Button */}
                           <button
                             onClick={() => setSelectedMood("Good")}
                             className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                               selectedMood === "Good"
                                 ? "border-[var(--color-info)] bg-gradient-to-b from-[var(--color-info)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                                 : "border-[var(--color-border-light)] hover:border-[var(--color-info)]/40 hover:bg-[var(--color-background-secondary)]"
                             }`}
                           >
                             {selectedMood === "Good" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-info)]"></div>}
                             <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Good" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>😊</span>
                             <span className={`text-xs uppercase tracking-widest ${selectedMood === "Good" ? "font-bold text-[var(--color-info)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                               Good
                             </span>
                           </button>

                           {/* Great Button */}
                           <button
                             onClick={() => setSelectedMood("Great")}
                             className={`flex-1 py-5 flex flex-col items-center gap-3 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                               selectedMood === "Great"
                                 ? "border-[var(--color-success)] bg-gradient-to-b from-[var(--color-success)]/10 to-[var(--color-background-primary)] shadow-md -translate-y-1"
                                 : "border-[var(--color-border-light)] hover:border-[var(--color-success)]/40 hover:bg-[var(--color-background-secondary)]"
                             }`}
                           >
                             {selectedMood === "Great" && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-success)]"></div>}
                             <span className={`text-4xl transition-all duration-500 ease-out ${selectedMood === "Great" ? "scale-[1.35] -translate-y-1 drop-shadow-lg" : "group-hover:scale-110"}`}>🤩</span>
                             <span className={`text-xs uppercase tracking-widest ${selectedMood === "Great" ? "font-bold text-[var(--color-success)]" : "font-bold text-[var(--color-text-tertiary)]"}`}>
                               Great
                             </span>
                           </button>
                      </div>

                      {/* NEW FEATURE: Contextual Tags (Slides down when any mood is active) */}
                      <div className={`transition-all duration-500 overflow-hidden ${selectedMood ? "max-h-40 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"}`}>
                        <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">
                          What's contributing to your mood?
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Studies",
                            "Health",
                            "Sleep",
                            "Social",
                            "Coding",
                            "Hobbies",
                          ].map((tag) => (
                            <button
                              key={tag}
                              className="px-3 py-1.5 text-xs font-bold rounded-full border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background-primary)] transition-all"
                            >
                              +{tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* DYNAMIC AI Insight Box */}
                      <div className="p-5 bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] rounded-2xl border border-[var(--color-border-light)] mt-auto relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500"></div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                          <Brain size={16} className="text-[var(--color-accent)]" /> AI Insight
                        </p>
                        <p className="text-[13px] font-medium text-[var(--color-text-secondary)] leading-relaxed min-h-[40px]">
                          {selectedMood === "Stressed" &&
                            "Take a deep breath. It looks like you're feeling overwhelmed. Consider trying the Box Breathing exercise below to recenter yourself."}
                          {selectedMood === "Okay" &&
                            "You're doing alright! A quick Mindfulness Practice could help elevate your focus and energy for the rest of the day."}
                          {selectedMood === "Good" &&
                            'Your mood has been consistently "Good"! Keeping up with your daily reflections is having a positive impact on your stress levels.'}
                          {selectedMood === "Great" &&
                            "Fantastic! You're in a great headspace to tackle challenging new concepts today. Keep that momentum going!"}
                          {!selectedMood &&
                            "Select a mood above to generate a real-time mental well-being insight based on your day."}
                        </p>
                      </div>
                    </motion.div>

                    {/* B. Recommended Exercises */}
                    <motion.div variants={fadeUpItem} className="clay-card flex flex-col bg-[var(--color-background-secondary)]">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-[var(--color-info)]" />
                        Quick Relief Exercises
                      </h4>
                      <div className="flex flex-col gap-4">
                        {/* Exercise 1 */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-info)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-info)]/10 text-[var(--color-info)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Wind size={22} />
                            </div>
                            <div>
                              <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                                Box Breathing
                              </p>
                              <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                                <Clock size={10} /> 3 mins • Reduce anxiety
                              </p>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-info)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                            <ChevronRight size={16} />
                          </div>
                        </div>

                        {/* Exercise 2 */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-success)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 text-[var(--color-success)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Smile size={22} />
                            </div>
                            <div>
                              <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                                Guided Meditation
                              </p>
                              <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                                <Clock size={10} /> 10 mins • Regain focus
                              </p>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-success)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                            <ChevronRight size={16} />
                          </div>
                        </div>

                        {/* Exercise 3 */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Heart size={22} />
                            </div>
                            <div>
                              <p className="text-[15px] font-bold text-[var(--color-text-primary)] mb-0.5">
                                Gratitude Journal
                              </p>
                              <p className="text-xs font-medium text-[var(--color-text-tertiary)] flex items-center gap-1">
                                <Clock size={10} /> 5 mins • Evening reflection
                              </p>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white text-[var(--color-text-tertiary)] transition-colors">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: FALLBACK FOR UNUSED SIDEBAR BUTTONS  */}
              {/* ========================================== */}
              {![
                "Dashboard",
                "Overview",
                "My Courses",
                "Tasks",
                "Calendar",
                "Notes",
                "Wellness Hub",
                "Mental Health",
              ].includes(activeView) && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="font-bold text-[var(--color-text-primary)]"
                      style={{ 
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                        letterSpacing: "-0.03em",
                        lineHeight: "1.1"
                      }}
                    >
                      {activeView}
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-background-primary)] border border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-wider">
                      <Lock size={14} /> Available Soon
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] shadow-sm mt-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 rounded-bl-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-info)] opacity-5 rounded-tr-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative w-32 h-32 mb-6 group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-info)] rounded-3xl rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-500 blur-md"></div>
                      <div className="absolute inset-0 bg-[var(--color-background-primary)] backdrop-blur-xl border border-[var(--color-border-medium)] rounded-3xl -rotate-3 flex flex-col items-center justify-center shadow-xl group-hover:-rotate-6 transition-transform duration-500">
                        <Lock size={40} className="text-[var(--color-text-secondary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300" />
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse"></span>
                          <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">Something exciting is brewing</h4>
                    <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8 leading-relaxed">
                      We're currently crafting the <span className="font-bold text-[var(--color-accent)]">{activeView}</span> experience. Check back soon to explore new tools and resources tailored just for you.
                    </p>
                    
                    <button className="bg-[var(--color-text-primary)] text-[var(--color-background-primary)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
                      Notify Me When It's Ready
                    </button>
                  </div>
                </div>
              )}

              {/* STICKY QUICK ACTIONS TOOLBAR */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-[var(--color-background-secondary)]/90 backdrop-blur-xl border border-[var(--color-border-medium)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-4 py-2.5 flex items-center gap-2 pointer-events-auto transition-transform hover:-translate-y-1 duration-300">
                  <button 
                    onClick={() => setActiveView("Dashboard")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${activeView === "Dashboard" ? "bg-[var(--color-accent)] text-[#ffffff] shadow-md scale-105" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"}`}
                    title="Home"
                  >
                    <Compass size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveView("My Courses")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${activeView === "My Courses" ? "bg-[var(--color-info)] text-[#ffffff] shadow-md scale-105" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"}`}
                    title="My Courses"
                  >
                    <BookMarked size={20} />
                  </button>
                  <div className="w-px h-6 bg-[var(--color-border-medium)] mx-1"></div>
                  <button 
                    className="p-2.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105"
                    title="Search"
                  >
                    <Search size={20} />
                  </button>
                  <button 
                    className="p-2.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105"
                    title="Notifications"
                  >
                    <div className="relative">
                      <Bell size={20} />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-warning)] rounded-full border-2 border-[var(--color-background-secondary)] shadow-sm animate-pulse"></span>
                    </div>
                  </button>
                  <button 
                    className="p-2.5 rounded-full bg-[var(--color-success)] text-[#ffffff] hover:bg-[var(--color-success)]/90 hover:scale-110 transition-all duration-300 ml-1 shadow-lg active:scale-95"
                    title="New Action"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
    </>
  );
}

