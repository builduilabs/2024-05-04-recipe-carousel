"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";

let images = [
  "/images/2.jpg",
  "/images/4.jpg",
  "/images/3.jpg",
  "/images/1.jpg",
  "/images/5.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/6.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
];

let collapsedAspectRatio = 1 / 3;
let fullAspectRatio = 3 / 2;
let margin = 12;
let gap = 2;

export default function Carousel() {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        if (index > 0) {
          setIndex(index - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (index < images.length - 1) {
          setIndex(index + 1);
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [index]);

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  src={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="aspect-[960/402] max-h-[70vh] object-cover w-full flex-shrink-0"
                />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6 text-black" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6 text-black" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bg-black bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,.8)_50%)] bottom-0 py-6 flex h-24 justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`,
              }}
              className="flex"
            >
              {images.map((image, i) => (
                <motion.button
                  onClick={() => setIndex(i)}
                  initial={false}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                    },
                  }}
                  className={`${i === index ? "" : "grayscale hover:grayscale-0"} transition shrink-0 will-change-[filter]`}
                  key={image}
                >
                  <img alt="" src={image} className="h-full object-cover" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
