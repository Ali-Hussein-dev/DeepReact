"use client";
import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

interface TextProps {
  text: string;
}

function Text({ text }: TextProps) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full text-lg font-medium"
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
interface LoadingProps {
  messages: string[];
  interval?: number;
}

export function AnimatedText({ messages, interval = 2000 }: LoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => {
      clearInterval(messageInterval);
    };
  }, [messages.length, interval]);

  return (
    <div className="px-2 py-1">
      <Text text={messages[currentIndex] ?? ""} />
    </div>
  );
}
