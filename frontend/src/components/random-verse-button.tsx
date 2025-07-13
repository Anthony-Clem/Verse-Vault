"use client";

import { useVerse } from "@/contexts/verse-context";
import { Dices } from "lucide-react";

const RandomVerseButton = () => {
  const { randomVerse } = useVerse();

  return (
    <button className="hover:text-primary transition">
      <Dices onClick={randomVerse} />
    </button>
  );
};
export default RandomVerseButton;
