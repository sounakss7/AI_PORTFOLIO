import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const achievements = [
  {
    icon: "🏆",
    prefix: "Top ",
    num: 6,
    suffix: "K",
    label: "out of 55,000+ teams · ET GenAI Hackathon 2026 Phase 2",
    glow: "accent-cyan"
  },
  {
    icon: "🎯",
    num: 98,
    suffix: "%",
    label: "Model Accuracy · Breast Cancer Detection · XGBoost",
    glow: "accent-amber"
  },
  {
    icon: "🥇",
    prefix: "#",
    num: 14,
    label: "CS Mastermind Leaderboard · The Vidyawan",
    glow: "blue-400"
  },
  {
    icon: "🌐",
    num: 64,
    label: "GitHub Clones · Cancer Detection Open-Source Repo",
    glow: "accent-red"
  }
];

const StatCard = ({ achievement, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative p-6 bg-surface border border-border-subtle overflow-hidden flex flex-col justify-between group`}
    >
      {/* Ambient Glow */}
      <div className={`absolute -inset-4 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 bg-${achievement.glow}`} />
      
      <div className="relative z-10">
        <span className="text-3xl mb-4 block">{achievement.icon}</span>
        <div className={`font-display text-5xl md:text-6xl mb-4 text-${achievement.glow}`}>
          {achievement.prefix}
          {inView ? (
            <CountUp 
              end={achievement.num} 
              duration={2.5} 
              useEasing={true}
            />
          ) : "0"}
          {achievement.suffix}
        </div>
        <p className="font-sans text-sm text-text-muted leading-relaxed">
          {achievement.label}
        </p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-border-subtle/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((ach, idx) => (
          <StatCard key={idx} achievement={ach} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
