import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(pointer: fine)').matches : true
  );

  useEffect(() => {
    if (!isFinePointer) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'input' ||
        e.target.tagName.toLowerCase() === 'textarea' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('[role="button"]') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Center pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-cyan rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
      />

      {/* Lagging outer cyber target ring */}
      <motion.div
        className="fixed top-0 left-0 border border-accent-cyan/80 rounded-full pointer-events-none z-50 backdrop-blur-[0.5px]"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? 'rgba(0, 245, 212, 0.15)' : 'rgba(0, 245, 212, 0.02)',
          borderColor: isHovering ? 'rgba(0, 245, 212, 0.9)' : 'rgba(0, 245, 212, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 24, mass: 0.6 }}
      />
    </>
  );
};

export default CustomCursor;
