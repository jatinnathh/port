"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    /**
     * Optional custom class for the button container
     */
    className?: string;
    /**
     * Optional custom class for the button cover (the visible part)
     */
    coverClassName?: string;
}

type Coords = {
    x: number;
    y: number;
};

export const CreepyButton = ({
    children,
    className,
    coverClassName,
    onClick,
    ...props
}: CreepyButtonProps) => {
    const eyesRef = useRef<HTMLSpanElement>(null);
    const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
        const userEvent =
            "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);

        if (!eyesRef.current) return;

        // get the center of the eyes container
        const eyesRect = eyesRef.current.getBoundingClientRect();
        const eyesCenter = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2,
        };

        // cursor position
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY,
        };

        // calculate the eye angle
        const dx = cursor.x - eyesCenter.x;
        const dy = cursor.y - eyesCenter.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;

        // pupil distance from the eye center
        const visionRangeX = 180; // Max distance to look horizontally
        const visionRangeY = 100; // Max distance to look vertically
        const distance = Math.hypot(dx, dy);

        // Limit the movement so pupils don't go too far
        // We normalize the distance influence
        const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
        const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

        setEyeCoords({ x, y });
    };

    // Reset eyes when mouse leaves
    const resetEyes = () => {
        setEyeCoords({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const pupilStyle = {
        transform: `translate(calc(-50% + ${eyeCoords.x * 150}%), calc(-50% + ${eyeCoords.y * 150}%))`,
    };

    return (
        <button
            className={cn(
                "relative w-30   h-10 rounded-xl bg-black cursor-pointer outline-none select-none group tap-highlight-transparent",
                "focus-visible:ring-2 focus-visible:ring-offset-20 focus-visible:ring-blue-400",
                className
            )}
            onClick={onClick}
            onMouseMove={(e) => {
                updateEyes(e);
                setIsHovered(true);
            }}
            onTouchMove={updateEyes}
            onMouseLeave={resetEyes}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            {...props}
        >
            {/* Eyes Container */}
            <span
                ref={eyesRef}
                className="absolute flex items-center gap-[0.5em] right-[0.5em] bottom-0 h-[1.25em] z-0 pointer-events-none"
            >
                {/* Left Eye */}
                <motion.span
                    className="relative w-[1.25em] bg-white rounded-full overflow-hidden"
                    animate={{ height: ["1.25em", "1.25em", "0em", "1.25em"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.625em] h-[0.625em] bg-black rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle}
                    />
                </motion.span>
                {/* Right Eye */}
                <motion.span
                    className="relative w-[1.25em] bg-white rounded-full overflow-hidden"
                    animate={{ height: ["1.25em", "1.25em", "0em", "1.25em"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.625em] h-[0.625em] bg-black rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle}
                    />
                </motion.span>
            </span>

            {/* Button Cover */}
            <motion.span
                className={cn(
                    "absolute inset-0 block rounded-xl bg-purple-600 text-white font-bold tracking-wider",
                    "border-[3px] border-purple-400",
                    "flex items-center justify-center px-4 py-2",
                    "origin-[1.25em_50%]",
                    coverClassName
                )}
                animate={{
                    rotate: isHovered ? -12 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                }}
            >
                {children}
            </motion.span>

            {/* Invisible placeholder to maintain size since cover is absolute */}
            <span className="block opacity-0 px-4 py-2 font-bold tracking-wider min-w-[9em]">
                {children}
            </span>
        </button>
    );
};

export default CreepyButton;
