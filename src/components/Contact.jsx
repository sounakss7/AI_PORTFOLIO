import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './About';
import { Mail, Code2 } from 'lucide-react'; // Code2 for LeetCode stand-in

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  const [activeField, setActiveField] = useState(null);
  
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionHeader title="06. Initialize Connection" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Terminal Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="bg-obsidian border border-border-subtle p-6 rounded-md font-code text-sm text-text-muted overflow-x-auto relative"
        >
          <div className="flex gap-2 mb-6 border-b border-border-subtle pb-4">
            <div className="w-3 h-3 rounded-full bg-accent-red opacity-50" />
            <div className="w-3 h-3 rounded-full bg-accent-amber opacity-50" />
            <div className="w-3 h-3 rounded-full bg-accent-cyan opacity-50" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center">
              <span className="text-accent-cyan mr-4">{'>'} name:</span>
              <span className="mr-2">[</span>
              <input 
                type="text" 
                className="bg-transparent border-b border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-2 py-1 w-full max-w-[250px]"
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              />
              <span className="ml-2">]</span>
              {activeField === 'name' && <span className="animate-pulse w-2 h-4 bg-accent-cyan ml-2 block" />}
            </div>

            <div className="flex items-center">
              <span className="text-accent-cyan mr-3">{'>'} email:</span>
              <span className="mr-2">[</span>
              <input 
                type="email" 
                className="bg-transparent border-b border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-2 py-1 w-full max-w-[250px]"
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
              />
              <span className="ml-2">]</span>
              {activeField === 'email' && <span className="animate-pulse w-2 h-4 bg-accent-cyan ml-2 block" />}
            </div>

            <div className="flex items-start">
              <span className="text-accent-cyan mr-4">{'>'} msg:</span>
              <span className="mr-2 mt-1">[</span>
              <textarea 
                rows="3"
                className="bg-transparent border-b border-border-subtle focus:border-accent-cyan outline-none text-text-primary px-2 py-1 w-full max-w-[250px] resize-none"
                onFocus={() => setActiveField('msg')}
                onBlur={() => setActiveField(null)}
              />
              <span className="ml-2 mt-1">]</span>
              {activeField === 'msg' && <span className="animate-pulse w-2 h-4 bg-accent-cyan ml-2 mt-2 block" />}
            </div>

            <div className="flex items-center mt-6 ml-14">
              <span className="mr-2">[</span>
              <button className="text-text-primary hover:text-accent-cyan transition-colors uppercase tracking-widest text-xs px-2 py-1 outline-none">
                Send Message →
              </button>
              <span className="ml-2">]</span>
            </div>
          </form>
        </motion.div>

        {/* Info & Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-10">
            <h3 className="font-heading text-xl text-text-primary mb-4">Let's build something.</h3>
            <p className="font-sans text-text-muted mb-6">
              I'm always open to discussing AI architecture, new ML models, or potential collaborations. Drop a message or connect through any of these platforms.
            </p>
            <div className="flex gap-6">
              {[
                { icon: <GithubIcon />, link: "https://github.com/sounakss7" },
                { icon: <LinkedinIcon />, link: "https://linkedin.com/in/sounak-sarkar-aa230a248" },
                { icon: <Code2 />, link: "#" }, // Leetcode placeholder
                { icon: <Mail />, link: "mailto:hrick3130@gmail.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface border border-border-subtle text-text-muted hover:text-accent-cyan hover:border-accent-cyan transition-all duration-300 rounded-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="font-heading text-sm text-text-muted uppercase tracking-widest block mb-4">Open To:</span>
            <div className="flex flex-wrap gap-3">
              {['Full-Time Roles', 'Internships', 'AI Consulting', 'Open Source Collab'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-surface border border-border-subtle font-code text-xs text-text-primary hover:border-accent-cyan transition-colors cursor-default rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
