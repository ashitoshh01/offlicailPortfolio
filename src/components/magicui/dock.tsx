"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
  disableMagnificationBelow?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const DEFAULT_DISABLE_MAGNIFICATION_BELOW = 900;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  isMagnificationDisabled: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  disableMagnificationBelow = DEFAULT_DISABLE_MAGNIFICATION_BELOW,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    if (!disableMagnificationBelow) return;

    const mediaQuery = window.matchMedia(`(min-width: ${disableMagnificationBelow}px)`);
    const update = () => {
      const isBelow = !mediaQuery.matches || window.innerWidth < disableMagnificationBelow;
      setIsBelowBreakpoint(isBelow);
      if (isBelow) {
        mouseX.set(Infinity);
      }
    };

    update();
    mediaQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [disableMagnificationBelow, mouseX]);

  const isMagnificationDisabled = Boolean(disableMagnificationBelow && isBelowBreakpoint);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, isMagnificationDisabled }}>
      <motion.div
        onMouseMove={(e) => {
          if (!isMagnificationDisabled) {
            mouseX.set(e.pageX);
          }
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance, isMagnificationDisabled } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  );
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      data-dock-icon
      style={{
        width: isMagnificationDisabled ? BASE_SIZE : containerSize,
        height: isMagnificationDisabled ? BASE_SIZE : containerSize,
      }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <motion.div
        data-dock-icon-inner
        style={{
          width: isMagnificationDisabled ? BASE_ICON_SIZE : iconSize,
          height: isMagnificationDisabled ? BASE_ICON_SIZE : iconSize,
        }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
