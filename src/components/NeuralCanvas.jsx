import React, { useEffect, useRef } from 'react';

const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    
    // Canvas dimensions
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initNodes();
    };

    // Node parameters
    const nodeCount = 80;
    const connectionDistance = 150;
    const baseRadius = 2;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = baseRadius + Math.random() * 1.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.rippleOffset = 0;
      }

      update(mouse, ripple) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (warp)
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }

        // Ripple interaction
        if (ripple.active) {
          const dx = ripple.x - this.x;
          const dy = ripple.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // If ripple is passing through this node
          if (Math.abs(dist - ripple.radius) < 20) {
            this.rippleOffset = 2;
          } else {
            this.rippleOffset *= 0.9; // decay
          }
        } else {
          this.rippleOffset *= 0.9;
        }

        this.pulsePhase += 0.05;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const currentRadius = this.radius + pulse + this.rippleOffset;

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 212, ${0.4 + pulse * 0.3 + this.rippleOffset * 0.2})`; // cyan accent
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    let mouse = { x: null, y: null };
    let ripple = { active: false, x: 0, y: 0, radius: 0 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      ripple.active = true;
      ripple.x = e.clientX;
      ripple.y = e.clientY;
      ripple.radius = 0;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    resize();

    const drawEdges = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(30, 32, 40, ${opacity * 0.5})`; // border subtle
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background scanlines natively if wanted, but doing it in CSS is better.
      
      // Update ripple
      if (ripple.active) {
        ripple.radius += 10;
        if (ripple.radius > Math.max(width, height)) {
          ripple.active = false;
        }
      }

      drawEdges();

      nodes.forEach(node => {
        node.update(mouse, ripple);
        node.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralCanvas;
