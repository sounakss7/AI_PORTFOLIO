import { motion } from 'framer-motion';
import { SectionHeader } from './About';
import { Award, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const certs = [
  {
    issuer: "Oracle Cloud Infrastructure",
    title: "AI Foundations Associate",
    date: "Aug 2024",
    score: "Score: 78%",
    credentialId: "OCI-AI-2024-FND",
    accentText: "text-accent-cyan",
    accentBorderHover: "group-hover:border-accent-cyan",
    accentBg: "bg-accent-cyan/10",
    skillsCovered: ["Machine Learning Basics", "Deep Learning", "Generative AI", "OCI AI Services"]
  },
  {
    issuer: "Tata / Forage",
    title: "GenAI Powered Data Analytics Simulation",
    date: "Aug 2024",
    score: "Verified Completion",
    credentialId: "TATA-GENAI-DATA",
    accentText: "text-accent-amber",
    accentBorderHover: "group-hover:border-accent-amber",
    accentBg: "bg-accent-amber/10",
    skillsCovered: ["Data Analysis", "Prompt Engineering", "Business Intelligence", "AI Analytics"]
  }
];

const Certifications = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <SectionHeader title="05. Verified Credentials" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certs.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            onMouseEnter={() => sounds.hover()}
            className="p-8 bg-surface/90 border border-border-subtle rounded-2xl flex flex-col justify-between group hover:border-accent-cyan/50 transition-all duration-300 shadow-xl"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl border border-border-subtle bg-obsidian ${cert.accentBorderHover} transition-colors`}>
                  <Award className={`w-8 h-8 ${cert.accentText}`} />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-obsidian border border-border-subtle rounded-full text-[11px] font-code text-text-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>

              <span className="font-code text-xs text-text-muted mb-2 block">{cert.date}</span>
              <h3 className="font-display text-2xl sm:text-3xl text-text-primary mb-2 group-hover:text-white transition-colors">
                {cert.title}
              </h3>
              <div className="font-sans text-sm text-text-muted mb-6">{cert.issuer}</div>

              {/* Covered Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skillsCovered.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-obsidian border border-border-subtle text-[10px] font-code text-text-muted rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Score & ID */}
            <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between">
              <span className="inline-block px-3 py-1 bg-obsidian border border-border-subtle font-code text-xs text-accent-cyan rounded-full font-semibold">
                {cert.score}
              </span>
              <span className="font-code text-[10px] text-text-muted">
                ID: {cert.credentialId}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
