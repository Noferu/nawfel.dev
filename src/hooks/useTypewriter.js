import { useState, useEffect, useRef } from "react";

/**
 * Creates a typewriter animation for a list of words.
 *
 * The hook types the current word, waits, deletes it, then moves to the next
 * word in a loop. Each timeout is cleared when the effect reruns or unmounts.
 *
 * @param {string[]} words - Words displayed by the animation.
 * @param {Object} options - Animation settings.
 * @param {number} options.speed - Typing speed in milliseconds.
 * @param {number} options.deleteSpeed - Deleting speed in milliseconds.
 * @param {number} options.pause - Pause duration after a word is fully typed.
 * @returns {string} Current text displayed by the animation.
 */
export function useTypewriter(
  words,
  { speed = 80, deleteSpeed = 40, pause = 1800 } = {},
) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  const charIdx = useRef(0);

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === "typing") {
      if (charIdx.current >= word.length) {
        setPhase("pausing");
        return;
      }

      const timer = setTimeout(() => {
        setDisplay(word.slice(0, charIdx.current + 1));
        charIdx.current++;
      }, speed);

      return () => clearTimeout(timer);
    }

    if (phase === "pausing") {
      const timer = setTimeout(() => {
        setPhase("deleting");
      }, pause);

      return () => clearTimeout(timer);
    }

    if (phase === "deleting") {
      if (charIdx.current <= 0) {
        setWordIdx((index) => (index + 1) % words.length);
        setPhase("typing");
        return;
      }

      const timer = setTimeout(() => {
        charIdx.current--;
        setDisplay(word.slice(0, charIdx.current));
      }, deleteSpeed);

      return () => clearTimeout(timer);
    }
  }, [phase, display, wordIdx, words, speed, deleteSpeed, pause]);

  return display;
}
