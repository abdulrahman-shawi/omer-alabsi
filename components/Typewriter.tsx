"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number; // المدة بين كل حرف وآخر بالمللي ثانية
  startDelay?: number; // تأخير البدء بالمللي ثانية
};

export default function Typewriter({
  text,
  speed = 70,
  startDelay = 600,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span>
      {displayed}
      <span
        className={`text-sky-400 font-normal ${
          done ? "opacity-40" : "animate-pulse"
        }`}
      >
        |
      </span>
    </span>
  );
}
