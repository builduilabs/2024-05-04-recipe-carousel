"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useState } from "react";

export default function Page() {
  let x = useMotionValue(1);

  function updateX(val: number) {
    animate(x, val, { ease: "linear", duration: 4 });
  }

  return (
    <div className="p-8">
      <motion.div style={{ aspectRatio: x }} className="h-10 bg-white" />

      <div className="mt-4 flex gap-4">
        <button onClick={() => updateX(1)}>0</button>
        <button onClick={() => updateX(3)}>200</button>
      </div>
    </div>
  );
}
