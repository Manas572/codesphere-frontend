import React from "react";
import { cn } from "@/lib/utils";

const Ripple = React.memo(function Ripple({
  mainCircleSize = 250,
  mainCircleOpacity = 0.3, // Slightly bumped for light blue visibility
  numCircles = 10,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(circle,white,transparent_100%)] select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = Math.max(0, mainCircleOpacity - i * 0.03);
        const animationDelay = `${i * 0.06}s`;

        return (
          <div
            key={i}
            className="animate-ripple absolute rounded-full border shadow-[0_0_30px_rgba(186,230,255,0.15)]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle: "solid",
              borderWidth: "1px",
              // Light Sky Blue borders (Tailwind sky-300 hex equivalent)
              borderColor: `rgba(125, 211, 252, 0.4)`, 
              // Very light blue tint fill
              backgroundColor: `rgba(186, 230, 255, 0.05)`, 
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
export { Ripple };