import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, X, Search, LayoutGrid, List, BookOpen, Compass, Sprout, Sparkles, Clock, Signal, BarChart2, PlayCircle, GraduationCap } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import type { AgeGroupId } from "../shared/types";
import { courseMatchesAgeGroup, normalizeAgeGroupId } from "../shared/courseAgeGroups";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { useState, useMemo, useCallback } from "react";
import FilterBar from "../components/FilterBar";
import CoursePreviewPopover from "../components/CoursePreviewPopover";

type SortOption = "popular" | "rating" | "newest" | "free";
type ViewMode = "grid" | "list";
type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUPS: { id: AgeGroupFilterId; label: string; icon: JSX.Element }[] = [
  { id: "All", label: "All", icon: <Compass size={18} /> },
  { id: "Sproutlings (5-7)", label: "Sproutlings (5-7)", icon: <Sprout size={18} /> },
  { id: "Saplings (7-14)", label: "Saplings (7-14)", icon: <Sprout size={18} /> },
  { id: "Pathfinders (14-18)", label: "Pathfinders (14-18)", icon: <Compass size={18} /> },
  { id: "Dreamers (18+)", label: "Dreamers (18+)", icon: <Sparkles size={18} /> },
];

const AGE_GROUP_THEMES: Record<AgeGroupFilterId, {
  kicker: string;
  title: string;
  description: string;
  accent: string;
  activePill: string;
  wallpaper: string;
  panelClass: string;
  cardClass: string;
  imageOverlayClass: string;
  badgeClass: string;
  buttonClass: string;
  listClass: string;
}> = {
  All: {
    kicker: "Universal course library",
    title: "All learning paths",
    description: "Browse every course across age groups, goals and skill levels.",
    accent: "var(--color-accent)",
    activePill: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)",
    wallpaper: "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)",
    panelClass: "border-[var(--color-border-light)] bg-[var(--color-background-secondary)]",
    cardClass: "rounded-3xl border border-t-[3px] border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl",
    imageOverlayClass: "bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent opacity-60 group-hover:opacity-80",
    badgeClass: "rounded-lg border border-[#ffffff]/20 bg-[#ffffff]/10 text-[#ffffff]",
    buttonClass: "border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#fff] group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)]",
    listClass: "rounded-xl border border-l-[3px] border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
  "Sproutlings (5-7)": {
    kicker: "Playful quest path",
    title: "Tiny quests, bright wins",
    description: "Short playful lessons, cheerful progress cues and simple cards for early learners.",
    accent: "#58cc02",
    activePill: "linear-gradient(135deg, #1e5f18 0%, #58cc02 58%, #a8ef38 100%)",
    wallpaper: "radial-gradient(circle at 12% 22%, rgba(88,204,2,0.22), transparent 18%), radial-gradient(circle at 82% 24%, rgba(255,199,44,0.26), transparent 17%), radial-gradient(circle at 48% 95%, rgba(125,224,0,0.18), transparent 20%), linear-gradient(135deg, rgba(88,204,2,0.08) 0%, rgba(255,255,255,0) 55%)",
    panelClass: "border-[#d7efc8] bg-[#f7fff0] text-[#27391c] shadow-[0_5px_0_#d7efc8]",
    cardClass: "rounded-[22px] border-2 border-[#d7efc8] bg-[#ffffff] shadow-[0_5px_0_#d7efc8] hover:shadow-[0_8px_0_#d7efc8]",
    imageOverlayClass: "bg-gradient-to-t from-[#22480f]/85 via-[#22480f]/25 to-transparent opacity-75 group-hover:opacity-90",
    badgeClass: "rounded-xl border border-[#c8edb0] bg-[#f1ffe9] text-[#276900]",
    buttonClass: "border border-[#46a302] bg-[#58cc02] text-[#ffffff] shadow-[0_4px_0_#46a302] hover:bg-[#62df05] active:translate-y-0.5 active:shadow-[0_2px_0_#46a302]",
    listClass: "rounded-[20px] border-2 border-l-[6px] border-[#d7efc8] bg-[#ffffff] shadow-[0_4px_0_#d7efc8]",
  },
  "Saplings (7-14)": {
    kicker: "Build and explore",
    title: "Creative skill labs",
    description: "Hands-on beginner projects for curious learners moving from play into creation.",
    accent: "#14b8a6",
    activePill: "linear-gradient(135deg, #0f3f47 0%, #14b8a6 58%, #22d3ee 100%)",
    wallpaper: "radial-gradient(circle at 14% 18%, rgba(20,184,166,0.20), transparent 18%), radial-gradient(circle at 78% 16%, rgba(34,211,238,0.24), transparent 19%), radial-gradient(circle at 54% 100%, rgba(45,212,191,0.18), transparent 22%), linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(255,255,255,0) 60%)",
    panelClass: "border-[#bdebe5] bg-[#f0fdfa] text-[#123f3c] shadow-[0_5px_0_#bdebe5]",
    cardClass: "rounded-[20px] border-2 border-[#bdebe5] bg-[#ffffff] shadow-[0_5px_0_#bdebe5] hover:shadow-[0_8px_0_#bdebe5]",
    imageOverlayClass: "bg-gradient-to-t from-[#0f4f4b]/85 via-[#0f4f4b]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-xl border border-[#a7ece4] bg-[#ecfeff] text-[#0f766e]",
    buttonClass: "border border-[#0f766e] bg-[#14b8a6] text-[#ffffff] shadow-[0_4px_0_#0f766e] hover:bg-[#16cfc0] active:translate-y-0.5 active:shadow-[0_2px_0_#0f766e]",
    listClass: "rounded-[18px] border-2 border-l-[6px] border-[#bdebe5] bg-[#ffffff] shadow-[0_4px_0_#bdebe5]",
  },
  "Pathfinders (14-18)": {
    kicker: "Portfolio-ready growth",
    title: "Skill tracks for teen builders",
    description: "Focused courses with clearer career signals, project depth and measurable progress.",
    accent: "#6366f1",
    activePill: "linear-gradient(135deg, #27316f 0%, #6366f1 58%, #8b5cf6 100%)",
    wallpaper: "radial-gradient(circle at 14% 18%, rgba(99,102,241,0.18), transparent 18%), radial-gradient(circle at 82% 18%, rgba(139,92,246,0.18), transparent 18%), linear-gradient(135deg, rgba(99,102,241,0.08), rgba(255,255,255,0) 60%)",
    panelClass: "border-[#d7d8ff] bg-[#f5f5ff] text-[#25265f] shadow-[0_5px_0_#d7d8ff]",
    cardClass: "rounded-[18px] border border-t-[4px] border-[#d7d8ff] bg-[var(--color-background-secondary)] shadow-md hover:shadow-xl",
    imageOverlayClass: "bg-gradient-to-t from-[#161840]/85 via-[#161840]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-lg border border-[#c9cbff] bg-[#eef0ff] text-[#4f46e5]",
    buttonClass: "border border-[#5558e8] bg-[#6366f1] text-[#ffffff] shadow-sm hover:bg-[#5558e8]",
    listClass: "rounded-[16px] border border-l-[5px] border-[#d7d8ff] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
  "Dreamers (18+)": {
    kicker: "Professional momentum",
    title: "Career-grade mastery",
    description: "Longer, deeper tracks for advanced upskilling and applied workplace readiness.",
    accent: "#f59e0b",
    activePill: "linear-gradient(135deg, #111827, #7c3aed)",
    wallpaper: "radial-gradient(circle at 15% 18%, rgba(245,158,11,0.18), transparent 18%), radial-gradient(circle at 84% 16%, rgba(124,58,237,0.14), transparent 19%), linear-gradient(135deg, rgba(245,158,11,0.08), rgba(255,255,255,0) 62%)",
    panelClass: "border-[#f5d99b] bg-[#fff8e8] text-[#4a3310] shadow-[0_5px_0_#f5d99b]",
    cardClass: "rounded-[16px] border border-t-[4px] border-[#f5d99b] bg-[var(--color-background-secondary)] shadow-md hover:shadow-xl",
    imageOverlayClass: "bg-gradient-to-t from-[#2b1b06]/85 via-[#2b1b06]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-lg border border-[#f5d99b] bg-[#fff7ed] text-[#b45309]",
    buttonClass: "border border-[#d97706] bg-[#f59e0b] text-[#111827] shadow-sm hover:bg-[#fbbf24]",
    listClass: "rounded-[14px] border border-l-[5px] border-[#f5d99b] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
};

const SORTS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "free", label: "Free first" },
];

const TOPIC_QUICK_FILTERS = ["Programming", "Data", "Design", "Video", "Excel", "Python", "Animation", "Languages"];

const AGE_GROUP_HIGHLIGHTS: Record<AgeGroupId, { label: string; value: string }[]> = {
  "Sproutlings (5-7)": [
    { label: "Daily quest", value: "5 min wins" },
    { label: "XP boost", value: "+20 practice" },
    { label: "Skill streak", value: "Gentle goals" },
  ],
  "Saplings (7-14)": [
    { label: "Project quest", value: "Build today" },
    { label: "XP boost", value: "+35 project XP" },
    { label: "Skill streak", value: "Weekly labs" },
  ],
  "Pathfinders (14-18)": [
    { label: "Portfolio task", value: "Ship one project" },
    { label: "XP boost", value: "+50 skill XP" },
    { label: "Progress streak", value: "Career track" },
  ],
  "Dreamers (18+)": [
    { label: "Career sprint", value: "Role-ready work" },
    { label: "Mentor review", value: "Deep feedback" },
    { label: "Mastery streak", value: "Advanced pace" },
  ],
};

function formatStudents(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function DiscoverCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, enrollCourse, courseAccess } = usePlayground();
  const { allCourses, discoverCourses } = useCourses(courseQuery, enrolledIds, courseAccess);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const normalizedAgeGroup = normalizeAgeGroupId(activeAgeGroup) as AgeGroupFilterId;
  const activeTheme = AGE_GROUP_THEMES[normalizedAgeGroup] ?? AGE_GROUP_THEMES.All;
  const activeHighlights = normalizedAgeGroup === "All"
    ? []
    : AGE_GROUP_HIGHLIGHTS[normalizedAgeGroup as AgeGroupId];

  const toggleArray = useCallback((setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }, []);

  const allTopics = useMemo(() => [...new Set(allCourses.flatMap(c => c.topics))], [allCourses]);
  const freeCount = useMemo(() => allCourses.filter(c => c.isFree).length, [allCourses]);

  const displayCourses = useMemo(() => {
    let filtered = discoverCourses.filter(c => {
      const queryMatch = !courseQuery ||
        c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(courseQuery.toLowerCase());
      const ageMatch = courseMatchesAgeGroup(c, activeAgeGroup);
      const levelMatch = !selectedLevels.length || selectedLevels.some(l => c.level.includes(l));
      const durationMatch = !selectedDurations.length || selectedDurations.some(d => {
        const hours = parseInt(c.duration);
        if (isNaN(hours)) return true;
        if (d === "Under 1h") return hours < 1;
        if (d === "1–3h") return hours >= 1 && hours <= 3;
        if (d === "3–10h") return hours >= 3 && hours <= 10;
        if (d === "10h+") return hours >= 10;
        return true;
      });
      const ratingMatch = !selectedRatings.length || selectedRatings.some(r => c.rating >= parseFloat(r));
      const topicMatch = !selectedTopics.length || c.topics.some(t => selectedTopics.includes(t));
      const freeMatch = priceFilter === "all" || (priceFilter === "free" ? c.isFree : !c.isFree);
      return queryMatch && ageMatch && levelMatch && durationMatch && ratingMatch && topicMatch && freeMatch;
    });

    switch (sortBy) {
      case "popular": filtered.sort((a, b) => b.enrollments - a.enrollments); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "newest": filtered.sort((a, b) => b.createdAt - a.createdAt); break;
      case "free": filtered.sort((a, b) => Number(b.isFree) - Number(a.isFree)); break;
    }
    return filtered;
  }, [discoverCourses, courseQuery, activeAgeGroup, selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter, sortBy]);

  const chips = useMemo(() => [
    ...selectedLevels.map(l => ({ label: l, onRemove: () => setSelectedLevels(selectedLevels.filter(v => v !== l)) })),
    ...selectedDurations.map(d => ({ label: d, onRemove: () => setSelectedDurations(selectedDurations.filter(v => v !== d)) })),
    ...selectedRatings.map(r => ({ label: `${r}+ stars`, onRemove: () => setSelectedRatings(selectedRatings.filter(v => v !== r)) })),
    ...selectedTopics.map(t => ({ label: t, onRemove: () => setSelectedTopics(selectedTopics.filter(v => v !== t)) })),
    ...(priceFilter !== "all" ? [{ label: priceFilter === "free" ? "Free" : "Paid", onRemove: () => setPriceFilter("all") }] : []),
  ], [selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter]);

  const clearFilters = useCallback(() => {
    setSelectedLevels([]); setSelectedDurations([]); setSelectedRatings([]);
    setSelectedTopics([]); setPriceFilter("all");
  }, []);

  const hasFilters = chips.length > 0;

  const renderStars = useCallback((rating: number, size = 12) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className="text-[var(--color-warning)]" fill={i < Math.round(rating) ? "var(--color-warning)" : "none"} />
      ))}
    </div>
  ), []);

  const handleEnroll = useCallback((id: number, title: string) => {
    enrollCourse(id, title);
    navigate("/playground/my-courses");
  }, [enrollCourse, navigate]);

  const handleQuickTopic = useCallback((topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  }, []);

  return (
    <div className="flex flex-col gap-6">

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] p-8 border border-[var(--color-border-light)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-info)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-accent)] font-bold mb-2">
              <Compass size={18} /> Discover
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Explore {allCourses.length} courses
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Find the perfect course for your goals — from programming and design to data science and languages.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{discoverCourses.length}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Available</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{allTopics.length}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Topics</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{freeCount}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick topic pills */}
      <div className="flex snap-x overflow-x-auto hide-scrollbar gap-2 pb-1">
        {TOPIC_QUICK_FILTERS.map(topic => (
          <button
            key={topic}
            onClick={() => handleQuickTopic(topic)}
            className={`inline-flex min-h-10 shrink-0 snap-start items-center justify-center rounded-full px-4 py-2 text-center text-xs font-bold leading-none transition-all ${
              selectedTopics.includes(topic)
                ? "bg-[var(--color-accent)] text-[#fff] shadow-md"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Search + controls row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-lg group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search courses, skills, instructors..."
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
            className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
          />
        </div>
        <div className="flex items-center gap-1 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Age group pills */}
      <div className="flex snap-x overflow-x-auto hide-scrollbar gap-3 pb-1 px-0.5">
        {AGE_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveAgeGroup(g.id)}
            className={`relative inline-flex min-h-12 min-w-[112px] shrink-0 snap-start items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-5 py-3 text-center text-[14px] font-bold leading-none transition-colors duration-500 group sm:min-w-0 sm:px-6 ${
              normalizedAgeGroup === g.id
                ? "text-[#fff] shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:-translate-y-1"
            }`}
            style={normalizedAgeGroup === g.id ? { boxShadow: `0 8px 20px ${AGE_GROUP_THEMES[g.id].accent}33` } : undefined}
          >
            {normalizedAgeGroup === g.id && (
              <div className="absolute inset-0 z-0 opacity-95" style={{ background: AGE_GROUP_THEMES[g.id].activePill }} />
            )}
            <div className={`relative z-10 flex min-w-0 items-center justify-center gap-2 ${normalizedAgeGroup === g.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
              <span className="shrink-0">{g.icon}</span>
              <span className="truncate text-center">{g.label}</span>
            </div>
          </button>
        ))}
      </div>

      {normalizedAgeGroup !== "All" && (
        <motion.div
          key={normalizedAgeGroup}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className={`relative grid gap-4 overflow-hidden rounded-[22px] border p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${activeTheme.panelClass}`}
          style={{ fontFamily: "var(--font-family-body)" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: activeTheme.wallpaper }} />
          {!!activeHighlights.length && (
            <motion.div
              aria-hidden="true"
              className="absolute -right-5 -top-5 h-24 w-24 rounded-full opacity-25"
              style={{ backgroundColor: activeTheme.accent }}
              animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="relative z-10 min-w-0">
            <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: activeTheme.accent }}>
              {activeTheme.kicker}
            </p>
            <h2 className="mt-1 text-2xl font-bold leading-tight tracking-normal text-inherit sm:text-3xl">
              {activeTheme.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-medium leading-relaxed text-inherit opacity-80">
              {activeTheme.description}
            </p>
          </div>
          <div className="relative z-10 grid gap-2 min-[520px]:grid-cols-3 sm:w-[360px]">
            {activeHighlights.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -1 }}
                className="min-w-0 rounded-xl border bg-[#ffffff]/75 px-3.5 py-2.5 text-left text-inherit shadow-sm backdrop-blur-sm"
                style={{
                  borderColor: `${activeTheme.accent}38`,
                  boxShadow: `0 5px 14px ${activeTheme.accent}14`,
                }}
              >
                <p className="truncate text-[12px] font-semibold leading-tight opacity-70">{item.label}</p>
                <p className="mt-0.5 text-[13px] font-bold leading-snug">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filter bar */}
      <div className="relative z-50 isolation-isolate">
      <FilterBar
        selectedDurations={selectedDurations}
        toggleDuration={(v) => toggleArray(setSelectedDurations, v)}
        selectedLevels={selectedLevels}
        toggleLevel={(v) => toggleArray(setSelectedLevels, v)}
        selectedRatings={selectedRatings}
        toggleRating={(v) => toggleArray(setSelectedRatings, v)}
        selectedTopics={selectedTopics}
        toggleTopic={(v) => toggleArray(setSelectedTopics, v)}
        allTopics={allTopics}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={SORTS}
        totalCount={displayCourses.length}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="flex items-center gap-1 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1.5 rounded-full font-bold"
            >
              {chip.label}
              <X size={12} className="cursor-pointer hover:scale-110 transition-transform" onClick={chip.onRemove} />
            </span>
          ))}
        </div>
      )}

      {/* Course grid */}
          {displayCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                <BookOpen size={32} />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">No courses match your filters</p>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">Try adjusting your search or clearing filters</p>
              {(courseQuery || hasFilters) && (
                <button
                  onClick={() => { setCourseQuery(""); clearFilters(); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[#fff] text-sm font-bold hover:brightness-110 transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  className="grid auto-rows-fr grid-cols-1 justify-center gap-4 sm:grid-cols-[repeat(2,minmax(0,330px))] sm:gap-5 xl:grid-cols-[repeat(3,minmax(0,330px))]"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                >
                  {displayCourses.map(course => (
                    <motion.div variants={fadeUpItem} key={course.id} className="h-full">
                      <CoursePreviewPopover course={course} onEnroll={() => handleEnroll(course.id, course.title)}>
                        <div
                          className={`relative mx-auto flex h-full min-h-[430px] w-full max-w-[330px] cursor-pointer flex-col overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 group ${activeTheme.cardClass}`}
                          style={{ borderTopColor: normalizedAgeGroup === "All" ? getTopicColor(course.topics) : activeTheme.accent, fontFamily: "var(--font-family-body)" }}
                          onClick={() => navigate(`/playground/course/${course.id}`)}
                        >
                          <div className="relative h-[150px] w-full overflow-hidden">
                            <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${activeTheme.imageOverlayClass}`} />
                            <img
                              src={course.image}
                              alt={course.title}
                              loading="lazy"
                              onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute left-3 right-12 top-3 z-20 flex flex-wrap items-center gap-1.5">
                              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold tracking-wider shadow-lg backdrop-blur-md ${activeTheme.badgeClass}`}>
                                <Signal size={12} /> {course.level}
                              </div>
                              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold tracking-wider shadow-lg backdrop-blur-md ${activeTheme.badgeClass}`}>
                                <Clock size={12} /> {course.duration}
                              </div>
                              {course.isFree && (
                                <div className="rounded-lg bg-[#22c55e]/80 px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-[#fff] shadow-lg backdrop-blur-md">FREE</div>
                              )}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#ffffff]/20 bg-[#ffffff]/10 shadow-lg backdrop-blur-md transition-transform hover:scale-110"
                            >
                              <Heart size={16} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-[#fff]"} />
                            </button>
                            <div className="absolute bottom-3 left-3 right-3 z-20">
                              <h4 className="line-clamp-2 min-h-10 text-[16px] font-bold leading-tight text-[#ffffff] drop-shadow-md">{course.title}</h4>
                            </div>
                          </div>
                          <div className="relative flex flex-1 flex-col bg-[var(--color-background-secondary)] p-4">
                            <div className="mt-1 flex min-h-6 items-center gap-2">
                              <img src={course.instructorAvatar} className="w-6 h-6 rounded-full object-cover" />
                              <span className="truncate text-xs text-[var(--color-text-secondary)]">{course.instructor}</span>
                            </div>

                            <div className="mt-2 flex min-h-4 items-center gap-1.5">
                              <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating}</span>
                              {renderStars(course.rating, 11)}
                              <span className="text-xs text-[var(--color-text-tertiary)]">({formatStudents(course.students)})</span>
                            </div>

                            <div className="mt-2 flex min-h-7 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--color-text-tertiary)]">
                              <span className="flex items-center gap-1"><BarChart2 size={12} /> {course.level}</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                              <span className="flex items-center gap-1"><PlayCircle size={12} /> {course.lessons} lessons</span>
                            </div>

                            <div className="mt-2.5 flex min-h-5 flex-wrap gap-1.5">
                              {course.topics.slice(0, 3).map(topic => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                                  style={{ backgroundColor: getTopicColor(course.topics) + "20", color: getTopicColor(course.topics) }}
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>

                            <div className="mt-2.5 flex min-h-6 items-baseline gap-2">
                              {!course.isFree && course.price && (
                                <>
                                <span className="text-base font-bold text-[var(--color-text-primary)]">{course.price}</span>
                                {course.originalPrice && <span className="text-xs text-[var(--color-text-tertiary)] line-through">{course.originalPrice}</span>}
                                {course.originalPrice && (
                                  <span className="text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-1.5 py-0.5 rounded">
                                    {Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, "")) / parseInt(course.originalPrice.replace(/[^0-9]/g, ""))) * 100)}% off
                                  </span>
                                )}
                                </>
                              )}
                            </div>

                            <div className="mt-auto pt-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleEnroll(course.id, course.title); }}
                                className={`flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-[14px] font-bold leading-none transition-colors duration-300 active:scale-95 ${activeTheme.buttonClass}`}
                              >
                                <span className="min-w-0 truncate text-center">{course.isEnrolled ? "Continue Learning" : "Enroll now"}</span>
                                <GraduationCap size={16} className="shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CoursePreviewPopover>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="flex flex-col gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                >
                  {displayCourses.map(course => (
                    <motion.div
                      variants={fadeUpItem}
                      key={course.id}
                      className={`grid cursor-pointer grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-2 p-3 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4 ${activeTheme.listClass}`}
                      style={{ borderLeftColor: normalizedAgeGroup === "All" ? getTopicColor(course.topics) : activeTheme.accent, fontFamily: "var(--font-family-body)" }}
                      onClick={() => navigate(`/playground/course/${course.id}`)}
                    >
                      <div className="row-span-2 h-[68px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-[var(--color-background-primary)] sm:h-[72px] sm:w-[100px]">
                        <img
                          src={course.image}
                          alt={course.title}
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight truncate">{course.title}</h4>
                        <p className="text-[12px] text-[var(--color-text-tertiary)] truncate mt-0.5">
                          {course.instructor} · {course.level} · {course.duration} · {course.lessons} lessons
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[11px] font-bold text-[var(--color-warning)]">{course.rating}</span>
                          {renderStars(course.rating, 10)}
                          <span className="text-[10px] text-[var(--color-text-tertiary)]">({formatStudents(course.students)})</span>
                        </div>
                      </div>
                      <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 sm:row-span-2 sm:flex-col sm:items-end sm:justify-center">
                        {course.isFree ? (
                          <span className="rounded-md bg-[var(--color-success)]/10 px-2 py-1 text-[10px] font-bold text-[var(--color-success)]">Free</span>
                        ) : course.price && (
                          <div className="flex min-w-0 items-baseline gap-1">
                            <span className="text-xs font-bold text-[var(--color-text-primary)]">{course.price}</span>
                            {course.originalPrice && <span className="text-[10px] text-[var(--color-text-tertiary)] line-through">{course.originalPrice}</span>}
                          </div>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEnroll(course.id, course.title); }}
                          className={`inline-flex min-h-9 shrink-0 items-center justify-center rounded-lg px-3.5 py-2 text-center text-[12px] font-semibold transition-colors ${activeTheme.buttonClass}`}
                        >
                          {course.isEnrolled ? "Continue" : "Enroll now"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
    </div>
  );
}
