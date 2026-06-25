import { useEffect, useRef, useCallback } from "react";

const FRICTION = 0.88;
const MIN_VEL = 0.3;

/**
 * Creates an infinite horizontal slider with drag and inertia support.
 *
 * The track element should contain repeated content, usually three duplicated
 * segments, so the animation can loop smoothly.
 *
 * @param {"left"|"right"} direction - Direction of the automatic animation.
 * @param {number} speed - Automatic animation speed in pixels per frame.
 * @returns {Object} Slider ref and event handlers for the wrapper element.
 */
export function useInfiniteSlider(direction = "left", speed = 0.5) {
  const trackRef = useRef(null);
  const posRef = useRef(null);
  const rafRef = useRef(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const resumeTimer = useRef(null);
  const hasDragged = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const velocityRef = useRef(0);

  /**
   * Keeps the slider position inside one repeated segment.
   *
   * @param {number} p - Current slider position.
   * @param {number} segment - Width of one repeated segment.
   * @returns {number} Normalized slider position.
   */
  const clampPos = useCallback((p, segment) => {
    if (p > 0) p -= segment;
    if (p < -segment) p += segment;
    return p;
  }, []);

  /**
   * Starts the automatic slider animation.
   */
  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const el = trackRef.current;

      if (!el) return;

      if (posRef.current === null) {
        posRef.current = direction === "right" ? -(el.scrollWidth / 3) : 0;
      }

      const segment = el.scrollWidth / 3;

      posRef.current = clampPos(
        posRef.current + (direction === "left" ? -speed : speed),
        segment,
      );

      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [direction, speed, clampPos]);

  /**
   * Stops the current animation frame.
   */
  const stopAnimation = useCallback(() => {
    if (!rafRef.current) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  /**
   * Restarts automatic animation after a short delay.
   */
  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    resumeTimer.current = setTimeout(startAnimation, 5000);
  }, [startAnimation]);

  /**
   * Runs inertia after the user releases the slider.
   */
  const runInertia = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const el = trackRef.current;

      if (!el) return;

      velocityRef.current *= FRICTION;

      if (Math.abs(velocityRef.current) < MIN_VEL) {
        velocityRef.current = 0;
        scheduleResume();
        return;
      }

      const segment = el.scrollWidth / 3;

      posRef.current = clampPos(posRef.current + velocityRef.current, segment);
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [clampPos, scheduleResume]);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, [startAnimation, stopAnimation]);

  /**
   * Starts mouse dragging and pauses automatic animation.
   *
   * @param {MouseEvent} e - Mouse down event.
   */
  const onMouseDown = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartPos.current = posRef.current ?? 0;
      hasDragged.current = false;
      lastX.current = e.clientX;
      lastT.current = performance.now();
      velocityRef.current = 0;

      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }

      e.preventDefault();
    },
    [stopAnimation],
  );

  /**
   * Updates the slider position while the mouse is dragging.
   *
   * @param {MouseEvent} e - Mouse move event.
   */
  const onMouseMove = useCallback(
    (e) => {
      if (!dragging.current || !trackRef.current) return;

      const delta = e.clientX - dragStartX.current;

      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }

      const now = performance.now();
      const dt = now - lastT.current;

      if (dt > 0) {
        velocityRef.current = ((e.clientX - lastX.current) / dt) * 16;
      }

      lastX.current = e.clientX;
      lastT.current = now;

      const segment = trackRef.current.scrollWidth / 3;

      posRef.current = clampPos(dragStartPos.current + delta, segment);
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    },
    [clampPos],
  );

  /**
   * Ends mouse dragging and starts inertia or delayed auto resume.
   */
  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;

    dragging.current = false;

    if (Math.abs(velocityRef.current) > MIN_VEL) {
      runInertia();
    } else {
      scheduleResume();
    }
  }, [runInertia, scheduleResume]);

  /**
   * Ends dragging when the cursor leaves the wrapper.
   */
  const onMouseLeave = useCallback(() => {
    if (dragging.current) {
      onMouseUp();
    }
  }, [onMouseUp]);

  /**
   * Prevents link clicks after a drag gesture.
   *
   * @param {MouseEvent} e - Captured click event.
   */
  const onClickCapture = useCallback((e) => {
    if (!hasDragged.current) return;

    e.preventDefault();
    e.stopPropagation();
    hasDragged.current = false;
  }, []);

  /**
   * Starts touch dragging and pauses automatic animation.
   *
   * @param {TouchEvent} e - Touch start event.
   */
  const onTouchStart = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartPos.current = posRef.current ?? 0;
      hasDragged.current = false;
      lastX.current = e.touches[0].clientX;
      lastT.current = performance.now();
      velocityRef.current = 0;

      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    },
    [stopAnimation],
  );

  /**
   * Updates the slider position while the user drags with touch.
   *
   * @param {TouchEvent} e - Touch move event.
   */
  const onTouchMove = useCallback(
    (e) => {
      if (!dragging.current || !trackRef.current) return;

      const clientX = e.touches[0].clientX;
      const delta = clientX - dragStartX.current;

      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }

      const now = performance.now();
      const dt = now - lastT.current;

      if (dt > 0) {
        velocityRef.current = ((clientX - lastX.current) / dt) * 16;
      }

      lastX.current = clientX;
      lastT.current = now;

      const segment = trackRef.current.scrollWidth / 3;

      posRef.current = clampPos(dragStartPos.current + delta, segment);
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    },
    [clampPos],
  );

  /**
   * Ends touch dragging and starts inertia or delayed auto resume.
   */
  const onTouchEnd = useCallback(() => {
    if (!dragging.current) return;

    dragging.current = false;

    if (Math.abs(velocityRef.current) > MIN_VEL) {
      runInertia();
    } else {
      scheduleResume();
    }
  }, [runInertia, scheduleResume]);

  return {
    trackRef,
    wrapperHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onClickCapture,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
