"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Meta = { width: number; height: number; fps: number; count: number };
type Cue = { start: number; end: number; text: string };

const CELL = 8;
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
          const stream = r.body.pipeThrough(new DecompressionStream("gzip"));
          return new Response(stream).text();
        }),
        fetch("/badapple/bad_apple_ja.srt").then((r) => r.text()),
      ]);

      const dot = new Image();
      dot.src = "/badapple/dot_v2.png";
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
          drawFrame(framesRef.current[0] ?? "");
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
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-black py-12">
      <div className="relative w-[480px] h-[360px]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ imageRendering: "pixelated" }}
        />
        {ready && !playing && (
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/60 text-white"
          >
            ▶ Play
          </button>
        )}
      </div>
      <div className="mt-4 h-12 max-w-[80%] whitespace-pre-line text-center text-sm text-white">
        {subtitle}
      </div>
      <audio ref={audioRef} src="/badapple/bad-apple.mp3" preload="auto" />
    </div>
  );
}
