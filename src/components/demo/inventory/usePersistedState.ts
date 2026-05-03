"use client"

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

export const NEXUS_NAMESPACE = "nexus.";
export const NEXUS_SCHEMA_VERSION = 1;

const SCHEMA_KEY = `${NEXUS_NAMESPACE}schemaVersion`;

type Stored<T> = { v: number; d: T };

function readKey<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Stored<T>;
    if (!parsed || parsed.v !== NEXUS_SCHEMA_VERSION) return fallback;
    return parsed.d;
  } catch {
    return fallback;
  }
}

function writeKey<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    const payload: Stored<T> = { v: NEXUS_SCHEMA_VERSION, d: value };
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Quota exceeded, private mode, etc. — fail silently for a demo.
  }
}

export function usePersistedState<T>(
  key: string,
  initial: T
): [T, Dispatch<SetStateAction<T>>] {
  const fullKey = key.startsWith(NEXUS_NAMESPACE) ? key : NEXUS_NAMESPACE + key;
  const [state, setState] = useState<T>(initial);
  const hydrated = useRef(false);
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    if (typeof window !== "undefined") {
      const versionRaw = window.localStorage.getItem(SCHEMA_KEY);
      if (versionRaw !== String(NEXUS_SCHEMA_VERSION)) {
        clearNexusKeys();
        window.localStorage.setItem(SCHEMA_KEY, String(NEXUS_SCHEMA_VERSION));
        return;
      }
    }

    const stored = readKey(fullKey, initial);
    if (stored !== initial) setState(stored);
  }, [fullKey, initial]);

  useEffect(() => {
    if (!hydrated.current) return;
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(() => writeKey(fullKey, state), 250);
    return () => {
      if (writeTimer.current) clearTimeout(writeTimer.current);
    };
  }, [fullKey, state]);

  return [state, setState];
}

export function clearNexusKeys() {
  if (typeof window === "undefined") return;
  const keys = Object.keys(window.localStorage).filter((k) =>
    k.startsWith(NEXUS_NAMESPACE)
  );
  keys.forEach((k) => window.localStorage.removeItem(k));
}

export function resetDemoState() {
  clearNexusKeys();
  if (typeof window !== "undefined") {
    window.sessionStorage.clear();
    window.location.reload();
  }
}

const stored = <T,>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      NEXUS_NAMESPACE + key,
      JSON.stringify({ v: NEXUS_SCHEMA_VERSION, d: value })
    );
  } catch {}
};

export function switchProfile(profileId: string, seeds: { products?: unknown; vendors?: unknown }) {
  if (typeof window === "undefined") return;
  clearNexusKeys();
  window.localStorage.setItem(SCHEMA_KEY, String(NEXUS_SCHEMA_VERSION));
  window.localStorage.setItem(NEXUS_NAMESPACE + "demoProfile", JSON.stringify({ v: NEXUS_SCHEMA_VERSION, d: profileId }));
  if (seeds.products) stored("products", seeds.products);
  if (seeds.vendors) stored("vendors", seeds.vendors);
  window.sessionStorage.clear();
  window.location.reload();
}
