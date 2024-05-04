"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";

let images = [
  "/images/4.jpg",
  "/images/2.jpg",
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
      <div className="flex h-full flex-col justify-between">
        <div className="relative mt-6 overflow-hidden md:mt-10">
          <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
            {images.map((image, i) => (
              <motion.img
                key={image}
                src={image}
                animate={{ opacity: i === index ? 1 : 0.3 }}
                className="aspect-[1.85] h-screen max-h-[70vh] w-full flex-shrink-0 object-cover"
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

        <Thumbnails index={index} setIndex={setIndex} />
      </div>
    </MotionConfig>
  );
}

const COLLAPSED_ASPECT_RATIO = 1 / 3;
const FULL_ASPECT_RATIO = 3 / 2;
const MARGIN = 12;
const GAP = 2;

function Thumbnails({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (value: number) => void;
}) {
  return (
    <div className="mb-6 flex h-12 justify-center overflow-hidden">
      <motion.div
        initial={false}
        animate={{
          x: `-${
            index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) +
            MARGIN +
            index * GAP
          }%`,
        }}
        style={{
          aspectRatio: FULL_ASPECT_RATIO,
          gap: `${GAP}%`,
        }}
        className="flex min-w-0"
      >
        {images.map((image, i) => (
          <motion.button
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                aspectRatio: FULL_ASPECT_RATIO,
                marginLeft: `${MARGIN}%`,
                marginRight: `${MARGIN}%`,
              },
              inactive: {
                aspectRatio: COLLAPSED_ASPECT_RATIO,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            className={`${i === index ? "" : "grayscale hover:grayscale-0"} h-full shrink-0 transition will-change-[filter]`}
            key={image}
          >
            <img alt="" src={image} className="h-full object-cover" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
