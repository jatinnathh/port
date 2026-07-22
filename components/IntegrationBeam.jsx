"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { 
  SiAnthropic, 
  SiNotion, 
  SiPython, 
  SiReact, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiDocker, 
  SiGithub, 
  SiPytorch 
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export function IntegrationBeam({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <SiReact size={24} color="#61DAFB" />
          </Circle>
          <Circle ref={div5Ref}>
            <SiAnthropic size={24} color="#d97757" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <SiPython size={24} color="#3776AB" />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <VscVscode size={32} color="#007ACC" />
          </Circle>
          <Circle ref={div6Ref}>
            <SiGithub size={24} color="#181717" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <SiDocker size={24} color="#2496ED" />
          </Circle>
          <Circle ref={div7Ref}>
            <SiPytorch size={24} color="#EE4C2C" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}
