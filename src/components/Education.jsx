import { motion } from 'framer-motion';
import { SectionHeader } from './About';
import { GraduationCap, BookOpen, School } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const eduData = [
  {
    institution: "Dr. Sudhir Chandra Sur Institute of Technology",
    degree: "B.Tech Computer Science & Engineering (AI & ML)",
    duration: "2022 - 2026 (Final Year)",
    score: "CGPA 7.83 / 10",
    highlight: "Mentored in Agent Mind Patent filing by Prof. Dr. Sanjoy Bhattacharjee.",
    icon: <GraduationCap className="w-6 h-6 text-accent-cyan" />,
    active: true
  },
  {
    institution: "Future Campus School",
    degree: "CBSE Class XII (Pure Science)",
    duration: "Completed 2022",
    score: "80.4%",
    highlight: "Strong foundation in Mathematics, Physics, and Computer Science.",
    icon: <BookOpen className="w-6 h-6 text-accent-amber" />,
    active: false
  },
  {
    institution: "Future Campus School",
    degree: "CBSE Class X (Secondary School)",
    duration: "Completed 2020",
    score: "78.0%",
    highlight: "Excellence in core analytical reasoning and computer applications.",
    icon: <School className="w-6 h-6 text-blue-400" />,
    active: false
  }
];

const Education = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <SectionHeader title="06. Academic Track" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eduData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            onMouseEnter={() => sounds.hover()}
            className={`p-8 bg-surface/90 border border-border-subtle rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group hover:border-accent-cyan/60 transition-all duration-300 shadow-xl ${
              edu.active ? 'border-accent-cyan/40 shadow-[0_0_25px_rgba(0,245,212,0.1)]' : ''
            }`}
          >
            {/* Active Status Pulse */}
            {edu.active && (
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
                </span>
                <span className="text-[10px] font-code text-accent-cyan uppercase tracking-wider font-bold">
                  Final Year
                </span>
              </div>
            )}

            <div>
              <div className="p-3 bg-obsidian border border-border-subtle rounded-xl w-fit mb-5">
                {edu.icon}
              </div>

              <span className="font-code text-xs text-text-muted mb-2 block">{edu.duration}</span>

              <h3 className="font-heading font-bold text-xl text-text-primary mb-2 group-hover:text-white transition-colors pr-8">
                {edu.institution}
              </h3>

              <div className="font-sans text-sm text-accent-cyan mb-4 font-medium">
                {edu.degree}
              </div>

              <p className="font-sans text-xs text-text-muted leading-relaxed mb-6">
                {edu.highlight}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between">
              <span className="text-xs font-code text-text-muted">Standing:</span>
              <span className="font-code text-accent-amber bg-obsidian px-3 py-1 text-xs border border-border-subtle rounded-lg font-semibold">
                {edu.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
