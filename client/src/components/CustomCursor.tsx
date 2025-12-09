import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState("black");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Returns black/white depending on background brightness
  const getContrastColor = (bg: string) => {
    const rgb = bg.match(/\d+/g);
    if (!rgb) return "black";

    const [r, g, b] = rgb.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 140 ? "black" : "white"; // threshold
  };

  const updateCursorColor = (x: number, y: number) => {
    const elem = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!elem) return;

    const style = window.getComputedStyle(elem);
    let bg = style.backgroundColor;

    // If transparent → check parent until non-transparent found
    let current: HTMLElement | null = elem;
    while (bg === "rgba(0, 0, 0, 0)" || bg === "transparent") {
      current = current.parentElement;
      if (!current) break;
      bg = window.getComputedStyle(current).backgroundColor;
    }

    setCursorColor(getContrastColor(bg));
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      updateCursorColor(e.clientX, e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], [data-cursor-hover], .cursor-hover'
      );

      const handleEnter = () => setIsHovered(true);
      const handleLeave = () => setIsHovered(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    const cleanup = setupHoverListeners();

    const observer = new MutationObserver(() => {
      cleanup();
      setupHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cleanup();
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const defaultSize = 20;
  const hoverSize = 42;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-70%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          backgroundColor: cursorColor,
          width: isHovered ? hoverSize : defaultSize,
          height: isHovered ? hoverSize : defaultSize,
          opacity: isVisible ? (isHovered ? 0.5 : 1) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </motion.div>
  );
}
