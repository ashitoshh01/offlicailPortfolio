"use client";

import { useEffect, useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { Maximize2, Minimize2 } from "lucide-react";

// Curated SimpleIcons slugs matching Ashitosh's actual technical stack
const ICON_SLUGS = [
  "python",
  "typescript",
  "javascript",
  "openjdk", // Java
  "cplusplus",
  "c",
  "react",
  "nextdotjs",
  "html5",
  "css", // CSS3
  "tailwindcss",
  "nodedotjs",
  "express",
  "django",
  "flask",
  "postgresql",
  "mysql",
  "mongodb",
  "redis",
  "prisma",
  "docker",
  "git",
  "github",
  "linux",
  "vercel",
  "render",
  "socketdotio",
  "opencv",
  "pytorch",
  "scikitlearn",
];

const ICON_IMAGES = ICON_SLUGS.map(
  (slug) => `https://cdn.simpleicons.org/${slug}`,
);

type AnimationState = "normal" | "shrinking" | "cloud" | "expanding";

export default function SkillsSection() {
  const [animState, setAnimState] = useState<AnimationState>("normal");
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Preload IconCloud images into memory on mount
  useEffect(() => {
    ICON_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleShrink = () => {
    if (animState !== "normal") return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isReducedMotion) {
      setAnimState("cloud");
      return;
    }

    const container = containerRef.current;
    if (!container) {
      setAnimState("cloud");
      return;
    }

    const containerRect = container.getBoundingClientRect();
    // Center point where the sphere will sit
    const targetX = containerRect.left + containerRect.width / 2;
    const targetY = containerRect.top + Math.min(containerRect.height / 2, 220);

    setAnimState("shrinking");

    // Fade out category titles
    categoryRefs.current.forEach((el) => {
      if (el) {
        el.style.transition = "opacity 240ms ease-out, transform 240ms ease-out";
        el.style.opacity = "0";
        el.style.transform = "scale(0.95)";
      }
    });

    // Animate each pill physically toward target center
    let index = 0;
    const totalPills = pillRefs.current.size;

    pillRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = targetX - centerX;
      const dy = targetY - centerY;

      // Varied rotation angle for organic suction feel
      const rotation = (index % 2 === 0 ? 1 : -1) * (15 + ((index * 17) % 45));
      const delay = index * 20;

      el.style.willChange = "transform, opacity";
      el.style.transition = `transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 500ms ease-in ${delay + 200}ms`;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(0.1) rotate(${rotation}deg)`;
      el.style.opacity = "0";

      index++;
    });

    // Once converged, transition to cloud state
    const totalDuration = totalPills * 20 + 750;
    setTimeout(() => {
      setAnimState("cloud");
    }, Math.min(totalDuration, 1100));
  };

  const handleExpand = () => {
    if (animState !== "cloud") return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isReducedMotion) {
      setAnimState("normal");
      return;
    }

    const container = containerRef.current;
    if (!container) {
      setAnimState("normal");
      return;
    }

    setAnimState("expanding");

    // Sphere compression/release effect
    if (sphereRef.current) {
      sphereRef.current.style.transition =
        "transform 180ms ease-in, opacity 180ms ease-in";
      sphereRef.current.style.transform = "scale(0.85)";
      sphereRef.current.style.opacity = "0.3";
    }

    setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const targetX = containerRect.left + containerRect.width / 2;
      const targetY = containerRect.top + Math.min(containerRect.height / 2, 220);

      // Initialize all pills at the center position
      let index = 0;
      pillRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const rotation = (index % 2 === 0 ? 1 : -1) * (20 + ((index * 13) % 40));

        el.style.willChange = "transform, opacity";
        el.style.transition = "none";
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(0.1) rotate(${rotation}deg)`;
        el.style.opacity = "0";
        index++;
      });

      // Force browser reflow to register starting point
      if (container) void container.offsetHeight;

      // Explode outward with spring overshoot to exact original coordinates
      index = 0;
      const totalPills = pillRefs.current.size;

      pillRefs.current.forEach((el) => {
        if (!el) return;
        const delay = 40 + index * 20;

        el.style.transition = `transform 750ms cubic-bezier(0.34, 1.35, 0.64, 1) ${delay}ms, opacity 450ms ease-out ${delay}ms`;
        el.style.transform = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
        el.style.opacity = "1";
        index++;
      });

      // Fade category headers back in
      categoryRefs.current.forEach((el) => {
        if (el) {
          el.style.transition =
            "opacity 400ms ease-out 250ms, transform 400ms ease-out 250ms";
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
        }
      });

      // Reset inline styles and finalize normal state
      const totalDuration = totalPills * 20 + 800;
      setTimeout(() => {
        pillRefs.current.forEach((el) => {
          if (el) {
            el.style.willChange = "";
            el.style.transition = "";
            el.style.transform = "";
            el.style.opacity = "";
          }
        });
        categoryRefs.current.forEach((el) => {
          if (el) {
            el.style.transition = "";
            el.style.opacity = "";
            el.style.transform = "";
          }
        });
        if (sphereRef.current) {
          sphereRef.current.style.transition = "";
          sphereRef.current.style.transform = "";
          sphereRef.current.style.opacity = "";
        }
        setAnimState("normal");
      }, Math.min(totalDuration, 1200));
    }, 180);
  };

  const isCloudVisible = animState === "cloud";
  const isNormalLayoutVisible = animState !== "cloud";

  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      {/* Header: Section Title + Highlighted Interactive Action Button */}
      <div className="flex items-center gap-3 select-none">
        <h2 className="text-xl font-bold tracking-tight">Skills</h2>

        {animState === "normal" && (
          <button
            type="button"
            onClick={handleShrink}
            aria-label="Shrink skills into interactive 3D sphere"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

            {/* Glowing pulsing beacon dot */}
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>

            <Minimize2 className="size-3.5 transition-transform duration-300 group-hover:rotate-12" />
            <span>Shrink to 3D</span>
          </button>
        )}

        {animState === "shrinking" && (
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/85 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground opacity-90 cursor-wait shadow-sm">
            <span className="size-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Shrinking...</span>
          </div>
        )}

        {animState === "cloud" && (
          <button
            type="button"
            onClick={handleExpand}
            aria-label="Expand 3D sphere back into skills list"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <Maximize2 className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
            <span>Expand</span>
          </button>
        )}

        {animState === "expanding" && (
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/85 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground opacity-90 cursor-wait shadow-sm">
            <span className="size-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Expanding...</span>
          </div>
        )}
      </div>

      {/* Animation & Content Canvas */}
      <div ref={containerRef} className="relative w-full min-h-[380px]">
        {/* State 1: Normal Skills Layout (also active during shrinking & expanding) */}
        <div
          className={`flex flex-col gap-6 w-full ${
            isNormalLayoutVisible ? "block" : "hidden"
          }`}
        >
          {DATA.skills.map((group) => (
            <div
              key={group.category}
              ref={(el) => {
                if (el) categoryRefs.current.set(group.category, el);
                else categoryRefs.current.delete(group.category);
              }}
              className="flex flex-col gap-2.5 transition-transform"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const key = `${group.category}-${skill.name}`;
                  return (
                    <div
                      key={skill.name}
                      ref={(el) => {
                        if (el) pillRefs.current.set(key, el);
                        else pillRefs.current.delete(key);
                      }}
                      data-skill-pill={key}
                      className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-3 flex items-center gap-2 hover:border-primary/50 transition-colors select-none"
                    >
                      {skill.icon && (
                        <skill.icon className="size-4 rounded overflow-hidden object-contain flex-none" />
                      )}
                      <span className="text-foreground text-sm font-medium">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* State 2: Icon Cloud Sphere */}
        {isCloudVisible && (
          <div
            ref={sphereRef}
            className="flex flex-col items-center justify-center py-2 w-full animate-in fade-in zoom-in-95 duration-300"
          >
            {/* Subtle ambient sphere glow */}
            <div className="absolute inset-0 m-auto size-64 md:size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            {/* Interactive 3D IconCloud Sphere */}
            <div className="relative flex items-center justify-center max-w-full overflow-hidden">
              <IconCloud images={ICON_IMAGES} />
            </div>

            {/* Expand Button under the sphere */}
            <div className="flex justify-center pt-3">
              <button
                type="button"
                onClick={handleExpand}
                aria-label="Expand 3D sphere back into skills list"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Maximize2 className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                <span>Expand to List</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
