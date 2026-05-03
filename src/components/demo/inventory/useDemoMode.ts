"use client"

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Step, DEMO_SCRIPT } from "./demoScript";

interface UseDemoModeOptions {
  enabled: boolean;
  speed: number;
  onExit: () => void;
  cursorTargetRef: RefObject<HTMLDivElement | null>;
}

export interface DemoState {
  paused: boolean;
  sceneIndex: number;
  caption: string;
  cursor: { x: number; y: number; clicking: boolean };
  highlight: DOMRect | null;
}

const findTarget = (name: string): HTMLElement | null => {
  if (typeof document === "undefined") return null;
  return document.querySelector(`[data-demo-target="${name}"]`) as HTMLElement | null;
};

const centerOf = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

// Walk up scroll-able ancestors and bring `el` into view, but stop at the
// nearest `overflow-hidden` boundary so the page (window/body) never scrolls.
const scrollWithinFrame = (el: HTMLElement) => {
  let node: HTMLElement | null = el.parentElement;
  while (node && node !== document.body) {
    const cs = getComputedStyle(node);
    const oy = cs.overflowY;
    if (oy === "auto" || oy === "scroll") {
      const elRect = el.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      if (elRect.top < nodeRect.top || elRect.bottom > nodeRect.bottom) {
        const targetTop = elRect.top - nodeRect.top + node.scrollTop - (node.clientHeight / 2 - el.offsetHeight / 2);
        node.scrollTo({ top: targetTop, behavior: "smooth" });
      }
      return;
    }
    if (oy === "hidden") return; // stop at the device-frame boundary
    node = node.parentElement;
  }
};

export function useDemoMode({ enabled, speed, onExit, cursorTargetRef }: UseDemoModeOptions) {
  const [paused, setPaused] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [caption, setCaption] = useState("");
  // cursor.clicking and cursor.x/y are mirrored in state ONLY for the click ring
  // and the highlight overlay's scene-level reads. The continuous cursor
  // position is written directly to the cursor element's style each frame.
  const [cursor, setCursor] = useState({ x: 100, y: 100, clicking: false });
  const [highlight, setHighlight] = useState<DOMRect | null>(null);

  const cancelRef = useRef(false);
  const pausedRef = useRef(false);
  const speedRef = useRef(speed);
  const posRef = useRef({ x: 100, y: 100 });

  pausedRef.current = paused;
  speedRef.current = speed;

  const writeCursor = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    const el = cursorTargetRef.current;
    if (el) el.style.transform = `translate3d(${x - 8}px, ${y - 4}px, 0)`;
  }, [cursorTargetRef]);

  const sleep = useCallback(async (ms: number) => {
    const adjusted = ms / speedRef.current;
    const start = performance.now();
    while (performance.now() - start < adjusted) {
      if (cancelRef.current) throw new Error("cancelled");
      while (pausedRef.current) {
        await new Promise((r) => setTimeout(r, 80));
        if (cancelRef.current) throw new Error("cancelled");
      }
      await new Promise((r) => setTimeout(r, 16));
    }
  }, []);

  const animateCursorTo = useCallback(async (x: number, y: number, ms = 600) => {
    const start = { ...posRef.current };
    const t0 = performance.now();
    const dur = ms / speedRef.current;
    while (true) {
      if (cancelRef.current) throw new Error("cancelled");
      while (pausedRef.current) {
        await new Promise((r) => setTimeout(r, 80));
        if (cancelRef.current) throw new Error("cancelled");
      }
      const t = Math.min(1, (performance.now() - t0) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      const nx = start.x + (x - start.x) * ease;
      const ny = start.y + (y - start.y) * ease;
      writeCursor(nx, ny);
      if (t >= 1) break;
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
  }, [writeCursor]);

  const runStep = useCallback(async (step: Step) => {
    if (step.kind === "wait") {
      await sleep(step.ms);
      return;
    }
    if (step.kind === "caption") {
      setCaption(step.text);
      await sleep(step.ms ?? 2000);
      return;
    }
    if (step.kind === "highlight") {
      const el = findTarget(step.target);
      if (el) {
        scrollWithinFrame(el);
        await sleep(250);
        setHighlight(el.getBoundingClientRect());
        await sleep(step.ms ?? 1500);
        setHighlight(null);
      }
      return;
    }
    if (step.kind === "move" || step.kind === "click") {
      const el = findTarget(step.target);
      if (!el) {
        await sleep(200);
        return;
      }
      scrollWithinFrame(el);
      await sleep(180);
      const { x, y } = centerOf(el);
      await animateCursorTo(x, y, step.ms ?? 600);
      if (step.kind === "click") {
        // Sync state for the click-ring overlay only.
        setCursor((c) => ({ ...c, x, y, clicking: true }));
        await sleep(120);
        el.click();
        await sleep(180);
        setCursor((c) => ({ ...c, clicking: false }));
      }
      return;
    }
    if (step.kind === "type") {
      const el = findTarget(step.target) as HTMLInputElement | null;
      if (!el) return;
      el.focus();
      const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      let current = "";
      for (const ch of step.text) {
        if (cancelRef.current) throw new Error("cancelled");
        while (pausedRef.current) {
          await new Promise((r) => setTimeout(r, 80));
        }
        current += ch;
        if (valueSetter) valueSetter.call(el, current);
        else el.value = current;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        await sleep(step.perCharMs ?? 60);
      }
      return;
    }
    if (step.kind === "nav") {
      const el = findTarget(step.target);
      if (el) el.click();
      await sleep(400);
      return;
    }
    if (step.kind === "escape") {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      await sleep(200);
      return;
    }
  }, [sleep, animateCursorTo]);

  // Main playback effect — depends only on `enabled`. Once started, it runs to
  // completion without re-firing.
  useEffect(() => {
    if (!enabled) return;
    cancelRef.current = false;

    if (typeof window !== "undefined") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      writeCursor(cx, cy);
      setCursor({ x: cx, y: cy, clicking: false });
    }

    let aborted = false;
    (async () => {
      try {
        for (let i = 0; i < DEMO_SCRIPT.length; i++) {
          if (cancelRef.current || aborted) break;
          setSceneIndex(i);
          for (const step of DEMO_SCRIPT[i].steps) {
            if (cancelRef.current || aborted) break;
            await runStep(step);
          }
        }
      } catch {
        // cancelled
      }
    })();

    return () => {
      aborted = true;
      cancelRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const replay = useCallback(() => {
    cancelRef.current = true;
    if (typeof window !== "undefined") {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith("nexus."))
        .forEach((k) => window.localStorage.removeItem(k));
      const url = new URL(window.location.href);
      url.searchParams.set("autoplay", "1");
      window.location.href = url.toString();
    }
  }, []);

  const exit = useCallback(() => {
    cancelRef.current = true;
    setCaption("");
    onExit();
  }, [onExit]);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      // Ignore synthetic events dispatched by the script itself
      // (e.g. the `escape` step that closes slide-overs).
      if (!e.isTrusted) return;
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
      else if (e.key === "Escape") { exit(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, exit]);

  return {
    state: { paused, sceneIndex, caption, cursor, highlight } as DemoState,
    setPaused,
    replay,
    exit,
  };
}
