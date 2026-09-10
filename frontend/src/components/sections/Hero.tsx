"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowRight,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import {
  Check,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  MapPin,
  Sun,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { getEvents, type EventApiResponse } from "@/lib/api/events";
import { getTasks, type TaskApiResponse } from "@/lib/api/tasks";

/* ==========================================================================
   Live Status panel — weather, upcoming schedule, tasks
   ========================================================================== 
   Lives in Hero's right column instead of as its own separate section, so
   it uses space that would otherwise sit empty next to the heading rather
   than forcing an extra scroll just to show a handful of lines.
   ========================================================================== */

const DEFAULT_LAT = 13.0827;
const DEFAULT_LON = 80.2707;
const DEFAULT_LOCATION_LABEL = "Chennai, IN";

const WEATHER_CODE_META: Record<
  number,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  0: { label: "Clear sky", icon: Sun },
  1: { label: "Mostly clear", icon: Sun },
  2: { label: "Partly cloudy", icon: CloudSun },
  3: { label: "Overcast", icon: Cloud },
  45: { label: "Foggy", icon: CloudFog },
  48: { label: "Foggy", icon: CloudFog },
  51: { label: "Light drizzle", icon: CloudDrizzle },
  53: { label: "Drizzle", icon: CloudDrizzle },
  55: { label: "Heavy drizzle", icon: CloudDrizzle },
  61: { label: "Light rain", icon: CloudRain },
  63: { label: "Rain", icon: CloudRain },
  65: { label: "Heavy rain", icon: CloudRain },
  71: { label: "Light snow", icon: CloudSnow },
  73: { label: "Snow", icon: CloudSnow },
  75: { label: "Heavy snow", icon: CloudSnow },
  80: { label: "Rain showers", icon: CloudRain },
  81: { label: "Rain showers", icon: CloudRain },
  82: { label: "Violent showers", icon: CloudRain },
  95: { label: "Thunderstorm", icon: CloudLightning },
};

type WeatherState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      tempC: number;
      condition: string;
      icon: React.ComponentType<{ className?: string }>;
      location: string;
    };

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const city = data?.city || data?.locality;
    const country = data?.countryCode;
    return [city, country].filter(Boolean).join(", ") || null;
  } catch {
    return null;
  }
}

function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeatherFor(lat: number, lon: number, knownLabel?: string) {
      try {
        const [weatherRes, locationLabel] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          ),
          knownLabel ? Promise.resolve(knownLabel) : reverseGeocode(lat, lon),
        ]);

        if (!weatherRes.ok) throw new Error("Weather request failed");
        const data = await weatherRes.json();
        const code = data?.current_weather?.weathercode as number | undefined;
        const temp = data?.current_weather?.temperature as number | undefined;

        if (cancelled) return;

        if (typeof code !== "number" || typeof temp !== "number") {
          setState({ status: "error" });
          return;
        }

        const meta = WEATHER_CODE_META[code] ?? { label: "Clear", icon: Sun };
        setState({
          status: "ready",
          tempC: Math.round(temp),
          condition: meta.label,
          icon: meta.icon,
          location: locationLabel || "Your location",
        });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      fetchWeatherFor(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOCATION_LABEL);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!cancelled) fetchWeatherFor(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        if (!cancelled) fetchWeatherFor(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOCATION_LABEL);
      },
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateLabel(isoDate: string, today: Date): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tmrw";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ==========================================================================
   Animation choreography
   ========================================================================== */

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const weather = useWeather();
  const now = useLiveClock();
  const today = useMemo(() => startOfDay(now), [now]);

  const [events, setEvents] = useState<EventApiResponse[]>([]);
  const [tasks, setTasks] = useState<TaskApiResponse[]>([]);
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [eventsData, tasksData] = await Promise.all([getEvents(), getTasks()]);
        setEvents(eventsData);
        setTasks(tasksData);
      } catch {
        // Fail quietly — the panel just renders its empty states.
      } finally {
        setStatusLoading(false);
      }
    }
    load();
  }, []);

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => new Date(`${e.eventDate}T00:00:00`) >= today)
      .sort((a, b) => {
        const dateDiff = a.eventDate.localeCompare(b.eventDate);
        if (dateDiff !== 0) return dateDiff;
        return (a.startTime ?? "").localeCompare(b.startTime ?? "");
      })
      .slice(0, 3);
  }, [events, today]);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => a.displayOrder - b.displayOrder),
    [tasks]
  );

  const WeatherIcon = weather.status === "ready" ? weather.icon : Sun;
  const liveTimeLabel = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-zinc-200/70 bg-white dark:border-zinc-900 dark:bg-zinc-950"
    >
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.30] [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: [0, 24, -12, 0], y: [0, -18, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[42%] top-[-220px] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-blue-500/[0.055] blur-[130px] dark:bg-blue-500/[0.065]"
      />

      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: [0, -20, 14, 0], y: [0, 16, -12, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[-260px] right-[-180px] h-[460px] w-[460px] rounded-full bg-indigo-500/[0.035] blur-[130px] dark:bg-indigo-500/[0.04]"
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1fr)_380px]"
        >
          {/* ===================================================== */}
          {/* LEFT — INTRODUCTION */}
          {/* ===================================================== */}

          <div className="min-w-0">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 text-[clamp(0.7rem,0.6rem+0.3vw,0.8rem)] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500"
            >
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]"
              />
              AI Engineer
            </motion.div>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="mt-5 max-w-2xl text-[clamp(1.875rem,1rem+2.4vw,3rem)] font-black leading-[1.12] tracking-tight text-zinc-950 dark:text-white"
            >
              Building software that puts{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400">
                intelligence
              </span>{" "}
              to work.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-semibold leading-8 text-zinc-800 dark:text-zinc-200"
            >
              AI engineering backed by strong software engineering foundations.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-[clamp(0.9rem,0.85rem+0.25vw,1.125rem)] leading-7 text-zinc-600 dark:text-zinc-400 sm:leading-8"
            >
              I build practical AI-powered products and reliable software
              systems designed to solve real problems and work beyond the
              prototype stage.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a href="/projects" className="w-full sm:w-auto">
                <Button className="group inline-flex w-full items-center justify-center px-6 py-3.5 text-sm font-semibold shadow-lg shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto">
                  Explore my work
                  <FaArrowRight
                    aria-hidden="true"
                    className="ml-2 text-xs transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </a>

              <a
                href="/#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
              >
                Let&apos;s connect
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                Find me
              </span>

              <a
                href="https://github.com/deepak-sjd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
              >
                <FaGithub aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/deepak-sjd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-800 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
              >
                <FaLinkedin aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/gupta_deepak_74/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-pink-800 dark:hover:text-pink-400 dark:focus-visible:ring-offset-zinc-950"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-14 flex flex-col gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                AI · Software · Engineering
              </p>

              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
              >
                <motion.span
                  animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <FaArrowDown aria-hidden="true" className="text-[10px]" />
                </motion.span>
                More about my work
              </a>
            </motion.div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT — LIVE STATUS PANEL */}
          {/* ===================================================== */}

          <motion.div
            variants={item}
            className="rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 lg:sticky lg:top-28"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                  Live status
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {liveTimeLabel}
              </span>
            </div>

            {/* Weather */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-50 px-3.5 py-3 dark:bg-zinc-950/50">
              <WeatherIcon className="h-6 w-6 shrink-0 text-blue-500 dark:text-blue-400" aria-hidden="true" />
              {weather.status === "ready" ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                    {weather.tempC}°C · {weather.condition}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-zinc-400 dark:text-zinc-600">
                    <MapPin className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{weather.location}</span>
                  </p>
                </div>
              ) : (
                <p className="text-xs text-zinc-400 dark:text-zinc-600">
                  {weather.status === "loading" ? "Loading weather…" : "Weather unavailable"}
                </p>
              )}
            </div>

            {/* Upcoming */}
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
                Next up
              </p>
              <div className="mt-2 space-y-2.5">
                {statusLoading && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">Loading…</p>
                )}
                {!statusLoading && upcomingEvents.length === 0 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">Nothing scheduled.</p>
                )}
                {!statusLoading &&
                  upcomingEvents.map((ev) => (
                    <div key={ev.id} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-10 shrink-0 text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">
                        {dateLabel(ev.eventDate, today)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs text-zinc-700 dark:text-zinc-300">
                        {ev.title}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
                Tasks
              </p>
              <div className="mt-2 space-y-2">
                {statusLoading && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">Loading…</p>
                )}
                {!statusLoading && sortedTasks.length === 0 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">No tasks right now.</p>
                )}
                {!statusLoading &&
                  sortedTasks.slice(0, 4).map((t) => (
                    <div key={t.id} className="flex items-center gap-2">
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border ${
                          t.completed
                            ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      >
                        {t.completed && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                      </span>
                      <span
                        className={`truncate text-xs ${
                          t.completed
                            ? "text-zinc-400 line-through dark:text-zinc-600"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                  ))}
                {!statusLoading && sortedTasks.length > 4 && (
                  <p className="pt-0.5 text-[11px] text-zinc-400 dark:text-zinc-600">
                    +{sortedTasks.length - 4} more
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
