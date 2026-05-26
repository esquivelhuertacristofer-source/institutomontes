"use client";

import React, { useEffect, useRef } from "react";

interface CanvasParticlesProps {
  color?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  interactive?: boolean;
}

export default function CanvasParticles({
  color = "rgba(255, 184, 0, 0.35)", // Accent Gold by default
  count = 45,
  minSize = 1,
  maxSize = 4,
  speed = 0.4,
  interactive = true,
}: CanvasParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      baseSpeedX: number = 0;
      baseSpeedY: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      fadeSpeed: number = 0;
      growing: boolean = true;

      constructor(w: number, h: number) {
        this.reset(w, h, true);
      }

      reset(w: number, h: number, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : h + 10;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.baseSpeedX = (Math.random() - 0.5) * speed;
        this.baseSpeedY = -(Math.random() * 0.5 + 0.2) * speed;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
      }

      update(w: number, h: number) {
        // Move
        this.x += this.speedX;
        this.y += this.speedY;

        // Interactive mouse push
        if (interactive && mouseRef.current.active) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2;
            this.y += Math.sin(angle) * force * 2;
          }
        }

        // Float up and reset if out of bounds
        if (this.y < -10 || this.x < -10 || this.x > w + 10) {
          this.reset(w, h);
        }

        // Pulse opacity
        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.8) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.2) this.growing = true;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Setup color and glow
        c.fillStyle = color.replace(/[\d.]+\)$/, `${this.opacity})`);
        
        // Add subtle radial glow for larger particles
        if (this.size > 2.5) {
          c.shadowColor = color;
          c.shadowBlur = 10;
        }
        
        c.fill();
        c.restore();
      }
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Initialize particles - optimize count on mobile to prevent performance lag
      let adjustedCount = count;
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        adjustedCount = Math.min(10, Math.floor(count / 3.5));
      }
      
      particles = [];
      for (let i = 0; i < adjustedCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [color, count, minSize, maxSize, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
