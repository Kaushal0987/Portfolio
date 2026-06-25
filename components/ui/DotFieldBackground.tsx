"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 140;
const CURSOR_LERP = 0.14;
const FOLLOW_STRENGTH = 0.14;
const RETURN_STRENGTH = 0.04;
const CURSOR_HIT_RADIUS = 16;
const DOT_RADIUS = 1.6;
const CONTACT_DISTANCE = CURSOR_HIT_RADIUS + DOT_RADIUS + 4;
const COLLECTED_ORBIT = 9;
const LINK_DISTANCE = 130;
const LINE_WIDTH = 0.55;
const LINE_OPACITY = 0.22;

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  alpha: number;
  collected: boolean;
  orbitAngle: number;
};

type Cursor = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
};

function readAccentRgb(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();

  if (!raw) return [52, 211, 153];

  if (raw.startsWith("#")) {
    const hex = raw.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  return [52, 211, 153];
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const homeX = Math.random() * width;
    const homeY = Math.random() * height;
    return {
      homeX,
      homeY,
      x: homeX,
      y: homeY,
      alpha: 0.25 + Math.random() * 0.45,
      collected: false,
      orbitAngle: Math.random() * Math.PI * 2,
    };
  });
}

export function DotFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let particles: Particle[] = [];
    let accent: [number, number, number] = [52, 211, 153];
    const cursor: Cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      active: false,
    };

    const canvasEl = canvas;
    const ctx2d = ctx;

    let lastW = 0;
    let lastH = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvasEl.width = w * dpr;
      canvasEl.height = h * dpr;
      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = createParticles(w, h);
      } else if (lastW > 0 && lastH > 0) {
        const sx = w / lastW;
        const sy = h / lastH;
        for (const p of particles) {
          p.homeX *= sx;
          p.homeY *= sy;
          p.x *= sx;
          p.y *= sy;
        }
      }

      lastW = w;
      lastH = h;
      accent = readAccentRgb();
    }

    function onPointerMove(e: PointerEvent) {
      cursor.targetX = e.clientX;
      cursor.targetY = e.clientY;
      cursor.active = true;
    }

    function onPointerLeave() {
      cursor.active = false;
      for (const p of particles) {
        p.collected = false;
      }
    }

    function onThemeChange() {
      accent = readAccentRgb();
    }

    function drawConnections(
      list: Particle[],
      positions: { x: number; y: number }[],
      rgb: [number, number, number]
    ) {
      const [r, g, b] = rgb;
      const count = list.length;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const ax = positions[i].x;
          const ay = positions[i].y;
          const bx = positions[j].x;
          const by = positions[j].y;
          const dist = Math.hypot(bx - ax, by - ay);

          if (dist > LINK_DISTANCE) continue;

          const fade = 1 - dist / LINK_DISTANCE;
          const a =
            LINE_OPACITY *
            fade *
            Math.min(list[i].alpha, list[j].alpha);

          ctx2d.beginPath();
          ctx2d.moveTo(ax, ay);
          ctx2d.lineTo(bx, by);
          ctx2d.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx2d.lineWidth = LINE_WIDTH;
          ctx2d.stroke();
        }
      }
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx2d.clearRect(0, 0, w, h);

      if (!reducedMotion) {
        cursor.x += (cursor.targetX - cursor.x) * CURSOR_LERP;
        cursor.y += (cursor.targetY - cursor.y) * CURSOR_LERP;

        for (const p of particles) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (cursor.active) {
            if (!p.collected && dist <= CONTACT_DISTANCE) {
              p.collected = true;
            }

            if (p.collected) {
              const targetX =
                cursor.x + Math.cos(p.orbitAngle) * COLLECTED_ORBIT;
              const targetY =
                cursor.y + Math.sin(p.orbitAngle) * COLLECTED_ORBIT;
              p.x += (targetX - p.x) * FOLLOW_STRENGTH;
              p.y += (targetY - p.y) * FOLLOW_STRENGTH;
            } else {
              p.x += (p.homeX - p.x) * RETURN_STRENGTH;
              p.y += (p.homeY - p.y) * RETURN_STRENGTH;
            }
          } else {
            p.collected = false;
            p.x += (p.homeX - p.x) * RETURN_STRENGTH;
            p.y += (p.homeY - p.y) * RETURN_STRENGTH;
          }
        }

        const positions = particles.map((p) => ({ x: p.x, y: p.y }));
        drawConnections(particles, positions, accent);

        if (cursor.active) {
          const [r, g, b] = accent;
          for (const p of particles) {
            if (!p.collected) continue;
            ctx2d.beginPath();
            ctx2d.moveTo(cursor.x, cursor.y);
            ctx2d.lineTo(p.x, p.y);
            ctx2d.strokeStyle = `rgba(${r}, ${g}, ${b}, ${LINE_OPACITY * 1.4})`;
            ctx2d.lineWidth = LINE_WIDTH;
            ctx2d.stroke();
          }
        }

        for (const p of particles) {
          const [r, g, b] = accent;
          const glow = p.collected ? 0.6 : 0;
          const a = Math.min(1, p.alpha + glow * 0.3);
          const radius = DOT_RADIUS + (p.collected ? 0.6 : 0);

          ctx2d.beginPath();
          ctx2d.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx2d.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx2d.fill();
        }
      } else {
        const positions = particles.map((p) => ({ x: p.homeX, y: p.homeY }));
        drawConnections(particles, positions, accent);

        for (const p of particles) {
          const [r, g, b] = accent;
          ctx2d.beginPath();
          ctx2d.arc(p.homeX, p.homeY, DOT_RADIUS, 0, Math.PI * 2);
          ctx2d.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
          ctx2d.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    resize();
    frameRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
