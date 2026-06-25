import { useCallback } from "react";

/**
 * Creates a callback ref used to move a glow element with the cursor.
 *
 * The target element must contain a child with the `.glow-orb` class.
 * The hook attaches a mousemove listener to the target element and updates
 * the glow position based on the cursor coordinates inside that element.
 *
 * @returns {Function} Callback ref to bind to a DOM element.
 */
export function useCursorGlow() {
  const bind = useCallback((ref) => {
    if (!ref) return;

    const orb = ref.querySelector(".glow-orb");

    if (!orb) return;

    /**
     * Updates the glow position inside the bound element.
     *
     * @param {MouseEvent} e - Mouse move event.
     */
    const onMove = (e) => {
      const rect = ref.getBoundingClientRect();

      orb.style.left = `${e.clientX - rect.left}px`;
      orb.style.top = `${e.clientY - rect.top}px`;
    };

    ref.addEventListener("mousemove", onMove);

    return () => {
      ref.removeEventListener("mousemove", onMove);
    };
  }, []);

  return bind;
}
