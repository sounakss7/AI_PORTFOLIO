import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const navItems = [
  { id: 'about', label: '01. Identity' },
  { id: 'skills', label: '02. Matrix' },
  { id: 'projects', label: '03. Works' },
  { id: 'achievements', label: '04. Telemetry' },
  { id: 'contact', label: '05. Terminal' },
];

const Navbar = ({ onOpenAgent }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const state = sounds.toggleMute();
    setIsAudioOn(state);
    if (state) {
      sounds.success();
    }
  };

  const handleNavClick = (id) => {
    sounds.click();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 px-4 py-4 md:py-5 transition-all duration-300 ${
      isScrolled ? 'bg-obsidian/60 backdrop-blur-md' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={() => {
            sounds.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 px-4 py-2 bg-surface/80 backdrop-blur-md border border-border-subtle rounded-full hover:border-accent-cyan/60 transition-all group"
        >
          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span className="font-code text-xs tracking-wider text-text-primary font-semibold">
            SOUNAK <span className="text-accent-cyan">//</span> NEURAL
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-code bg-accent-cyan/10 text-accent-cyan rounded-full border border-accent-cyan/20">
            v2.5
          </span>
        </a>

        {/* Desktop Navigation Dock */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-surface/80 backdrop-blur-md border border-border-subtle rounded-full shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sounds.hover()}
                className={`relative px-4 py-2 font-code text-xs transition-colors rounded-full ${
                  isActive
                    ? 'text-accent-cyan font-medium'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound FX Switch */}
          <button
            onClick={toggleAudio}
            title={isAudioOn ? 'Sound FX: ON (Click to mute)' : 'Sound FX: MUTED (Click to activate)'}
            className={`p-2.5 rounded-full border transition-all ${
              isAudioOn
                ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                : 'bg-surface/80 border-border-subtle text-text-muted hover:text-text-primary'
            }`}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Ask Agent Mind AI Button */}
          <button
            onClick={() => {
              sounds.modal();
              onOpenAgent();
            }}
            onMouseEnter={() => sounds.hover()}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-accent-cyan/20 to-blue-500/20 hover:from-accent-cyan hover:to-cyan-400 hover:text-obsidian text-accent-cyan border border-accent-cyan/40 rounded-full font-code text-xs font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(0,245,212,0.15)] group"
          >
            <Bot className="w-4 h-4 animate-pulse group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Ask Agent Mind</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sounds.click();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2.5 bg-surface/80 border border-border-subtle text-text-primary rounded-full"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 p-4 bg-surface/95 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl max-w-md mx-auto flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-lg font-code text-xs flex items-center justify-between transition-colors ${
                  activeSection === item.id
                    ? 'bg-accent-cyan/10 text-accent-cyan font-bold border border-accent-cyan/30'
                    : 'text-text-muted hover:bg-obsidian hover:text-text-primary'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
