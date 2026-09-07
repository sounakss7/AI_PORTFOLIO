import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from './About';
import { Trophy, Target, Award, GitFork } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const CountUp = ({ end, duration = 2.2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return <>{count}</>;
};

const achievements = [
  {
    icon: <Trophy className="w-6 h-6 text-accent-cyan" />,
    prefix: "Top ",
    num: 6,
    suffix: "K",
    total: "55K+ Teams",
    percentage: 89,
    label: "ET GenAI Hackathon 2026 Phase 2",
    detail: "National AI competitive selection across 55,000+ developer teams.",
    glowColor: "rgba(0, 245, 212, 0.2)",
    accentText: "text-accent-cyan",
    strokeColor: "#00f5d4"
  },
  {
    icon: <Target className="w-6 h-6 text-accent-amber" />,
    num: 98,
    suffix: "%",
    total: "Test Accuracy",
    percentage: 98,
    label: "Breast Cancer XGBoost Diagnostic",
    detail: "Rigorous clinical benchmark on Wisconsin dataset with SHAP verification.",
    glowColor: "rgba(245, 166, 35, 0.2)",
    accentText: "text-accent-amber",
    strokeColor: "#f5a623"
  },
  {
    icon: <Award className="w-6 h-6 text-blue-400" />,
    prefix: "#",
    num: 14,
    total: "National Rank",
    percentage: 92,
    label: "CS Mastermind Leaderboard",
    detail: "Ranked #14 nationally on The Vidyawan computer science evaluations.",
    glowColor: "rgba(96, 165, 250, 0.2)",
    accentText: "text-blue-400",
    strokeColor: "#60a5fa"
  },
  {
    icon: <GitFork className="w-6 h-6 text-accent-red" />,
    num: 64,
    suffix: "+",
    total: "Active Clones",
    percentage: 75,
    label: "Open-Source Clinical Repositories",
    detail: "Engineered codebases adopted & cloned by global ML practitioners.",
    glowColor: "rgba(255, 77, 109, 0.2)",
    accentText: "text-accent-red",
    strokeColor: "#ff4d6d"
  }
];

const StatCard = ({ achievement, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (achievement.percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => sounds.hover()}
      className="relative p-7 bg-surface/90 border border-border-subtle rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-accent-cyan/50 transition-all duration-300 shadow-xl"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -inset-6 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: achievement.glowColor }}
      />

      <div className="relative z-10">
        {/* Top bar with icon and circular SVG indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-obsidian border border-border-subtle rounded-xl group-hover:scale-110 transition-transform">
            {achievement.icon}
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
              <circle
                cx="38"
                cy="38"
                r={radius}
                className="text-obsidian"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
              />
              <motion.circle
                cx="38"
                cy="38"
                r={radius}
                stroke={achievement.strokeColor}
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: inView ? strokeDashoffset : circumference }}
                transition={{ duration: 1.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[10px] font-code text-text-muted">
              {achievement.total}
            </span>
          </div>
        </div>

        {/* Counter Metric */}
        <div className={`font-display text-4xl sm:text-5xl mb-2 ${achievement.accentText}`}>
          {achievement.prefix}
          {inView ? (
            <CountUp end={achievement.num} duration={2.2} />
          ) : (
            "0"
          )}
          {achievement.suffix}
        </div>

        {/* Metric Label */}
        <h4 className="font-heading font-bold text-text-primary text-base mb-2 group-hover:text-white transition-colors">
          {achievement.label}
        </h4>

        <p className="font-sans text-xs text-text-muted leading-relaxed">
          {achievement.detail}
        </p>
      </div>

      <div className="relative z-10 mt-6 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-[11px] font-code text-text-muted">
        <span>Verified Milestone</span>
        <span className="w-2 h-2 rounded-full bg-accent-cyan/80 animate-pulse" />
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="04. System Telemetry" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((ach, idx) => (
          <StatCard key={idx} achievement={ach} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
