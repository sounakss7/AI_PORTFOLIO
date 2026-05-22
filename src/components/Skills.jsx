import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './About';

const skillsData = [
  {
    domain: "Agentic AI / LLM",
    icon: "🤖",
    tools: ["LangChain", "LangGraph", "LangSmith", "OpenAI", "Groq", "Gemini", "RAG", "HuggingFace"],
    color: "bg-accent-cyan"
  },
  {
    domain: "Machine Learning",
    icon: "🧠",
    tools: ["XGBoost", "Scikit-Learn", "TensorFlow", "Ensemble Methods", "SHAP"],
    color: "bg-accent-amber"
  },
  {
    domain: "Data Science",
    icon: "📊",
    tools: ["NumPy", "Pandas", "Matplotlib", "Feature Engineering", "Statistical Analysis"],
    color: "bg-blue-400"
  },
  {
    domain: "Backend & APIs",
    icon: "🔧",
    tools: ["FastAPI", "REST API", "Pydantic", "Docker"],
    color: "bg-purple-400"
  },
  {
    domain: "Databases",
    icon: "🗄️",
    tools: ["MySQL", "Qdrant Vector DB"],
    color: "bg-green-400"
  },
  {
    domain: "Deployment",
    icon: "🚀",
    tools: ["Streamlit", "Render", "Vercel", "Git", "GitHub"],
    color: "bg-accent-red"
  },
  {
    domain: "Languages",
    icon: "💻",
    tools: ["Python", "SQL"],
    color: "bg-yellow-400"
  }
];

const HexagonSkill = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-square md:w-64 md:h-72 cursor-none"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <motion.div
        layout
        className={`absolute inset-0 bg-surface border border-border-subtle overflow-hidden flex flex-col justify-center items-center p-6 ${
          isHovered ? 'rounded-2xl shadow-2xl' : ''
        }`}
        style={{
          clipPath: isHovered 
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
            : 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          transition: 'clip-path 0.4s ease-in-out, border-radius 0.4s',
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          borderColor: isHovered ? 'rgba(0, 245, 212, 0.4)' : '#1e2028',
        }}
      >
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <span className="text-4xl">{skill.icon}</span>
              <h3 className="font-heading text-lg text-text-primary leading-tight">{skill.domain}</h3>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{skill.icon}</span>
                <h3 className="font-heading text-sm text-text-primary truncate">{skill.domain}</h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-center gap-2">
                {skill.tools.slice(0, 5).map((tool, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-border-subtle" />
                    <span className="font-code text-xs text-text-muted">{tool}</span>
                  </div>
                ))}
                {skill.tools.length > 5 && (
                  <span className="font-code text-xs text-text-muted italic">+{skill.tools.length - 5} more</span>
                )}
              </div>

              {/* Thin proficiency bar */}
              <div className="w-full h-1 bg-obsidian rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full ${skill.color}`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="02. Technical Matrix" />
      
      {/* Honeycomb grid simulation using flex wrap and negative margins */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-x-6 md:gap-y-[-2rem] pt-10">
        {skillsData.map((skill, idx) => (
          <div key={idx} className={`${idx % 2 === 1 ? 'md:mt-36' : ''}`}>
             <HexagonSkill skill={skill} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
