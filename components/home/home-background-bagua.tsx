"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  phase: number;
};

type Trigram = {
  lines: [number, number, number];
};

type HomeBackgroundBaguaProps = {
  variant?: "home" | "ambient";
};

const trigrams: Trigram[] = [
  { lines: [1, 1, 1] },
  { lines: [0, 1, 1] },
  { lines: [0, 1, 0] },
  { lines: [0, 0, 1] },
  { lines: [0, 0, 0] },
  { lines: [1, 0, 0] },
  { lines: [1, 0, 1] },
  { lines: [1, 1, 0] },
];

function usePrefersReducedMotion() {
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotionRef;
}

export function HomeBackgroundBagua({ variant = "home" }: HomeBackgroundBaguaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotionRef = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    const parent = canvas.parentElement;

    if (!context || !parent) {
      return;
    }

    const resize = () => {
      const bounds = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(bounds.width * ratio);
      canvas.height = Math.floor(bounds.height * ratio);
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const particleCount =
        variant === "home" ? (bounds.width < 700 ? 42 : 72) : bounds.width < 700 ? 28 : 42;

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.22 + 0.05,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const drawTrigram = (x: number, y: number, size: number, lines: [number, number, number], alpha: number) => {
      const lineWidth = size * 0.75;
      const lineHeight = size * 0.1;
      const gap = size * 0.23;

      context.save();
      context.translate(x, y);
      context.fillStyle = `rgba(246, 200, 123, ${alpha})`;

      lines.forEach((line, index) => {
        const lineY = (index - 1) * gap;

        if (line === 1) {
          context.fillRect(-lineWidth / 2, lineY - lineHeight / 2, lineWidth, lineHeight);
          return;
        }

        const segment = lineWidth * 0.37;
        const separation = lineWidth * 0.26;
        context.fillRect(-lineWidth / 2, lineY - lineHeight / 2, segment, lineHeight);
        context.fillRect(-lineWidth / 2 + segment + separation, lineY - lineHeight / 2, segment, lineHeight);
      });

      context.restore();
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const reducedMotion = reducedMotionRef.current;
      const centerX = width * (width < 900 ? 0.6 : variant === "home" ? 0.75 : 0.8);
      const centerY = height * (variant === "home" ? 0.54 : 0.4);
      const radius = Math.min(width, height) * (variant === "home" ? 0.24 : 0.16);

      lastTimeRef.current = time;
      context.clearRect(0, 0, width, height);

      const background = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.86);
      background.addColorStop(0, variant === "home" ? "rgba(18, 22, 38, 0.3)" : "rgba(14, 17, 28, 0.16)");
      background.addColorStop(0.45, "rgba(7, 9, 18, 0.08)");
      background.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -30) particle.x = width + 30;
          if (particle.x > width + 30) particle.x = -30;
          if (particle.y < -30) particle.y = height + 30;
          if (particle.y > height + 30) particle.y = -30;
        }

        const twinkle = 0.45 + 0.55 * Math.sin(time * 0.0007 + particle.phase);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(247, 239, 224, ${particle.alpha * twinkle})`;
        context.fill();
      }

      const trigramRotation = reducedMotion ? -Math.PI / 18 : -time * 0.00005;
      const taijiRotation = reducedMotion ? Math.PI / 12 : time * 0.00009;
      const lineAlpha = variant === "home" ? 0.16 : 0.1;

      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 3.4);
      halo.addColorStop(0, variant === "home" ? "rgba(211, 176, 107, 0.11)" : "rgba(211, 176, 107, 0.07)");
      halo.addColorStop(0.35, "rgba(158, 45, 52, 0.04)");
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      context.beginPath();
      context.arc(centerX, centerY, radius * 1.02, 0, Math.PI * 2);
      context.strokeStyle = `rgba(211, 176, 107, ${variant === "home" ? 0.28 : 0.18})`;
      context.lineWidth = 1.4;
      context.stroke();

      context.save();
      context.setLineDash([3, 8]);
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.14, 0, Math.PI * 2);
      context.strokeStyle = `rgba(211, 176, 107, ${variant === "home" ? 0.12 : 0.08})`;
      context.lineWidth = 0.7;
      context.stroke();
      context.restore();

      for (let index = 0; index < 64; index += 1) {
        const angle = (index / 64) * Math.PI * 2 + trigramRotation * 0.4;
        const isMajor = index % 8 === 0;
        context.beginPath();
        context.moveTo(centerX + Math.cos(angle) * radius * 1.2, centerY + Math.sin(angle) * radius * 1.2);
        context.lineTo(
          centerX + Math.cos(angle) * radius * (isMajor ? 1.42 : 1.32),
          centerY + Math.sin(angle) * radius * (isMajor ? 1.42 : 1.32),
        );
        context.strokeStyle = isMajor
          ? `rgba(246, 200, 123, ${variant === "home" ? 0.16 : 0.11})`
          : `rgba(211, 176, 107, ${variant === "home" ? 0.06 : 0.045})`;
        context.lineWidth = isMajor ? 1 : 0.5;
        context.stroke();
      }

      context.beginPath();
      context.arc(centerX, centerY, radius * 1.7, 0, Math.PI * 2);
      context.strokeStyle = `rgba(211, 176, 107, ${variant === "home" ? 0.08 : 0.05})`;
      context.lineWidth = 0.6;
      context.stroke();

      context.save();
      context.translate(centerX, centerY);
      context.rotate(taijiRotation);

      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(13, 18, 31, 0.74)";
      context.fill();

      context.beginPath();
      context.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
      context.fillStyle = "rgba(246, 238, 225, 0.9)";
      context.fill();

      context.beginPath();
      context.arc(0, -radius / 2, radius / 2, 0, Math.PI * 2);
      context.fillStyle = "rgba(246, 238, 225, 0.9)";
      context.fill();

      context.beginPath();
      context.arc(0, radius / 2, radius / 2, 0, Math.PI * 2);
      context.fillStyle = "rgba(13, 18, 31, 0.84)";
      context.fill();

      context.beginPath();
      context.arc(0, -radius / 2, radius * 0.11, 0, Math.PI * 2);
      context.fillStyle = "rgba(13, 18, 31, 0.88)";
      context.fill();

      context.beginPath();
      context.arc(0, radius / 2, radius * 0.11, 0, Math.PI * 2);
      context.fillStyle = "rgba(246, 238, 225, 0.94)";
      context.fill();

      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.strokeStyle = `rgba(211, 176, 107, ${variant === "home" ? 0.42 : 0.26})`;
      context.lineWidth = 1.8;
      context.stroke();

      context.restore();

      for (let index = 0; index < trigrams.length; index += 1) {
        const angle = -Math.PI / 2 + index * (Math.PI / 4) + trigramRotation;
        const x = centerX + Math.cos(angle) * radius * 1.68;
        const y = centerY + Math.sin(angle) * radius * 1.68;
        drawTrigram(x, y, radius * 0.34, trigrams[index].lines, lineAlpha);
      }

      if (!reducedMotion) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    resize();
    observer.observe(parent);
    draw(performance.now());

    return () => {
      observer.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reducedMotionRef, variant]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_54%,transparent_0%,rgba(4,6,12,0.06)_38%,rgba(4,6,12,0.38)_100%)]" />
      {variant === "home" ? (
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(5,7,13,0.74),rgba(5,7,13,0.46),transparent)]" />
      ) : null}
    </div>
  );
}
