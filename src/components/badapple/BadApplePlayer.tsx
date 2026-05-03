"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Meta = { width: number; height: number; fps: number; count: number };
type Cue = { start: number; end: number; text: string };

const CELL = 32;
const STAR = 42;

const toSec = (s: string) => {
  const [hms, ms] = s.split(",");
  const [h, m, sec] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + sec + Number(ms) / 1000;
};

function parseSrt(srt: string): Cue[] {
  const cues: Cue[] = [];
  for (const block of srt.replace(/\r/g, "").trim().split(/\n\n+/)) {
    const lines = block.split("\n");
    const timing = lines.find((l) => l.includes("-->"));
    if (!timing) continue;
    const [from, to] = timing.split("-->").map((s) => s.trim());
    const textLines = lines.slice(lines.indexOf(timing) + 1);
    cues.push({ start: toSec(from), end: toSec(to), text: textLines.join("\n") });
  }
  return cues;
}

export function BadApplePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dotRef = useRef<HTMLImageElement | null>(null);
  const framesRef = useRef<string[]>([]);
  const cuesRef = useRef<Cue[]>([]);
  const metaRef = useRef<Meta | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastIdxRef = useRef(-1);
  const lastCueRef = useRef(-1);
  const [subtitle, setSubtitle] = useState("");
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const drawFrame = useCallback((frameStr: string) => {
    const ctx = ctxRef.current;
    const meta = metaRef.current;
    const dot = dotRef.current;
    if (!ctx || !meta) return;
    const W = meta.width;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const useImg = !!dot && dot.complete && dot.naturalWidth > 0;
    if (!useImg) ctx.fillStyle = "#ffffff";
    for (let i = 0, len = frameStr.length; i < len; i++) {
      if (frameStr.charCodeAt(i) === STAR) {
        const x = (i % W) * CELL;
        const y = ((i / W) | 0) * CELL;
        if (useImg) ctx.drawImage(dot!, x, y, CELL, CELL);
        else ctx.fillRect(x, y, CELL, CELL);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [meta, framesText, srt] = await Promise.all([
        fetch("/badapple/meta.json").then((r) => r.json() as Promise<Meta>),
        fetch("/badapple/frames.txt.gz").then(async (r) => {
          if (!r.body) throw new Error("no body");
          const total = Number(r.headers.get("Content-Length") || 0);
          const reader = r.body.getReader();
          const chunks: Uint8Array[] = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            if (total) setProgress(Math.min(1, received / total));
          }
          if (!total) setProgress(1);
          const stream = new Blob(chunks as BlobPart[])
            .stream()
            .pipeThrough(new DecompressionStream("gzip"));
          return new Response(stream).text();
        }),
        fetch("/badapple/bad_apple_ja.srt").then((r) => r.text()),
      ]);

      const dot = new Image();
      dot.src = "/badapple/dot_v3.png";
      try {
        await dot.decode();
      } catch {
        // dot.png missing — drawFrame falls back to filled squares
      }

      if (cancelled) return;

      metaRef.current = meta;
      framesRef.current = framesText.split("\n");
      cuesRef.current = parseSrt(srt);
      dotRef.current = dot;

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = meta.width * CELL;
        canvas.height = meta.height * CELL;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = false;
          ctxRef.current = ctx;
        }
      }

      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      const audio = audioRef.current;
      const meta = metaRef.current;
      const frames = framesRef.current;
      const cues = cuesRef.current;
      if (audio && meta && frames.length) {
        const t = audio.currentTime;
        const idx = (t * meta.fps) | 0;
        if (idx !== lastIdxRef.current && frames[idx]) {
          lastIdxRef.current = idx;
          drawFrame(frames[idx]);
        }
        let ci = lastCueRef.current;
        if (ci < 0 || t < (cues[ci]?.start ?? Infinity)) ci = -1;
        while (ci + 1 < cues.length && t >= cues[ci + 1].start) ci++;
        if (ci !== lastCueRef.current) {
          lastCueRef.current = ci;
          const cue = cues[ci];
          setSubtitle(cue && t <= cue.end ? cue.text : "");
        } else if (ci >= 0 && t > cues[ci].end) {
          setSubtitle((s) => (s === "" ? s : ""));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, drawFrame]);

  useEffect(() => {
    const onVis = () => {
      const audio = audioRef.current;
      if (!audio || !playing) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing]);

  const onPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // autoplay blocked — user can click again
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-black pt-32 pb-12">
      <div className="relative aspect-[4/3] w-[min(900px,85vw,calc(70vh*4/3))]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ imageRendering: "pixelated" }}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            {ready ? (
              <button
                onClick={onPlay}
                aria-label="Play"
                className="group flex items-center justify-center"
              >
                <span className="relative flex h-24 w-24 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full border-2 border-[#0f9] opacity-60" />
                  <span className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#0f9] bg-black shadow-[0_0_24px_#0f9] transition-transform duration-200 group-hover:scale-110">
                    <span className="ml-1 block h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-[#0f9]" />
                  </span>
                </span>
              </button>
            ) : (
              <div className="flex w-2/3 max-w-md flex-col items-center gap-3">
                <div className="h-2 w-full overflow-hidden rounded-full border border-[#0f9]/40 bg-black">
                  <div
                    className="h-full bg-[#0f9] shadow-[0_0_12px_#0f9] transition-[width] duration-100 ease-linear"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <div className="font-mono text-sm text-[#0f9]">
                  Loading {Math.round(progress * 100)}%
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 flex h-20 max-w-[80%] items-start justify-center text-center text-2xl text-[#0f9]">
        <AnimatePresence mode="wait">
          {subtitle && (
            <motion.div
              key={subtitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="whitespace-pre-line"
            >
              {subtitle}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <audio ref={audioRef} src="/badapple/bad-apple.mp3" preload="auto" />
    </div>
  );
}
