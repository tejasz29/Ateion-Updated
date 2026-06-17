import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  ShieldCheck,
  Zap,
  Upload,
  Settings,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";
import { containerVariants, itemVariants } from "../utils/variants";
import StatCard from "../components/ui/StatCard";

const statCards = [
  { label: "Total Courses", value: "0", icon: BookOpen, gradient: "from-blue-500/20 to-blue-600/10", iconBg: "bg-blue-500/10 text-blue-600", border: "border-blue-500/20" },
  { label: "Active Students", value: "0", icon: Users, gradient: "from-emerald-500/20 to-emerald-600/10", iconBg: "bg-emerald-500/10 text-emerald-600", border: "border-emerald-500/20" },
  { label: "Platform Revenue", value: "₹0", icon: DollarSign, gradient: "from-amber-500/20 to-amber-600/10", iconBg: "bg-amber-500/10 text-amber-600", border: "border-amber-500/20" },
  { label: "Completion Rate", value: "--", icon: TrendingUp, gradient: "from-purple-500/20 to-purple-600/10", iconBg: "bg-purple-500/10 text-purple-600", border: "border-purple-500/20" },
];

const quickActions = [
  { label: "Upload Course", icon: Upload, path: "/admin/upload" },
  { label: "Manage Users", icon: Users, path: "/admin/users" },
  { label: "View Analytics", icon: TrendingUp, path: "/admin/dashboard" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Ateion Admin — Dashboard</title>
        <meta name="description" content="Ateion admin portal for managing courses, users, and platform settings." />
      </Helmet>
      <motion.div
        className="pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">
            Welcome to the Admin Portal
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
            This is a fully functional frontend dashboard simulation. Select
            "Upload Course" to try the new course builder.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          variants={containerVariants}
        >
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="lg:col-span-2 clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5 border-b border-[var(--color-border-light)] flex items-center gap-3">
              <BarChart3 size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Courses by Category</h3>
            </div>
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]/40 text-[var(--color-text-tertiary)]">
                <BarChart3 size={20} className="opacity-80" />
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">No data available</p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1 max-w-xs leading-relaxed">Categories will appear once courses are published.</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)]"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap size={18} className="text-[var(--color-accent)]" />
                <h3 className="font-bold text-lg">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.path}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/60 hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                    >
                      <Icon
                        size={20}
                        className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                      />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)]"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={18} className="text-emerald-500" />
                <h3 className="font-bold text-lg">System Status</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "API Server", status: "Operational", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                  { label: "Database", status: "Connected", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                  { label: "AI Service", status: "Degraded", textColor: "text-amber-600 dark:text-amber-400", dotBg: "bg-amber-500" },
                  { label: "Storage", status: "64% Used", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${item.textColor}`}>
                      <span className={`w-2 h-2 rounded-full ${item.dotBg}`} />
                      {item.status}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    Overall
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={14} />
                    All Systems
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-5 border-b border-[var(--color-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Recent Activity</h3>
            </div>
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]/40 text-[var(--color-text-tertiary)]">
              <Activity size={20} className="opacity-80" />
            </div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">No recent activity</p>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1 max-w-xs leading-relaxed">Activity will appear here as actions are performed.</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
