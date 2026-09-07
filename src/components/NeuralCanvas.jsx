import { useEffect, useRef } from 'react';

const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let pulses = [];
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    const nodeCount = Math.floor(Math.min(width, 1400) / 16) || 75;
    const connectionDistance = 145;

    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = 1.8 + Math.random() * 1.8;
        this.baseRadius = this.radius;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connectedIndices = [];
      }

      update(mouse, ripple) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around smoothly with bounds padding
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Mouse interaction (gentle magnetic warp)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = (180 - dist) / 180;
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }

        // Ripple reaction
        if (ripple.active) {
          const dx = ripple.x - this.x;
          const dy = ripple.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - ripple.radius) < 25) {
            this.radius = this.baseRadius + 2.5;
          } else {
            this.radius += (this.baseRadius - this.radius) * 0.1;
          }
        } else {
          this.radius += (this.baseRadius - this.radius) * 0.1;
        }

        this.pulsePhase += 0.035;
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const currentRadius = this.radius + pulse * 0.8;

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 212, ${0.35 + pulse * 0.45})`;
        ctx.shadowColor = 'rgba(0, 245, 212, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    class SynapticPulse {
      constructor(fromNode, toNode) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.progress = 0;
        this.speed = 0.015 + Math.random() * 0.02;
        this.color = Math.random() > 0.3 ? 'rgba(0, 245, 212, 0.9)' : 'rgba(245, 166, 35, 0.9)';
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }

      draw() {
        const x = this.fromNode.x + (this.toNode.x - this.fromNode.x) * this.progress;
        const y = this.fromNode.y + (this.toNode.y - this.fromNode.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initNodes = () => {
      nodes = [];
      pulses = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    let mouse = { x: null, y: null };
    let ripple = { active: false, x: 0, y: 0, radius: 0 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      ripple.active = true;
      ripple.x = e.clientX - rect.left;
      ripple.y = e.clientY - rect.top;
      ripple.radius = 0;

      // Spawn extra synaptic pulses on click
      for (let i = 0; i < Math.min(6, nodes.length); i++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a !== b) {
          pulses.push(new SynapticPulse(nodes[a], nodes[b]));
        }
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    resize();

    // Spawn pulses periodically
    let lastPulseSpawn = 0;

    const drawEdges = (timestamp) => {
      const shouldSpawnPulse = timestamp - lastPulseSpawn > 320 && pulses.length < 24;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(30, 35, 48, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Random chance to send a synaptic packet along this active connection
            if (shouldSpawnPulse && Math.random() < 0.008) {
              pulses.push(new SynapticPulse(nodes[i], nodes[j]));
              lastPulseSpawn = timestamp;
            }
          }
        }
      }
    };

    const render = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Expand ripple
      if (ripple.active) {
        ripple.radius += 12;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 245, 212, ${Math.max(0, 0.4 - ripple.radius / 900)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (ripple.radius > Math.max(width, height) * 0.8) {
          ripple.active = false;
        }
      }

      // Draw edges and connections
      drawEdges(timestamp);

      // Update & draw synaptic pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const isDone = pulse.update();
        pulse.draw();
        if (isDone) {
          pulses.splice(p, 1);
        }
      }

      // Update & draw nodes
      nodes.forEach((node) => {
        node.update(mouse, ripple);
        node.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralCanvas;
