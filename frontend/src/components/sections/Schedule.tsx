"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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

import { getEvents, type EventApiResponse } from "@/lib/api/events";
import { getTasks, type TaskApiResponse } from "@/lib/api/tasks";

/*
|--------------------------------------------------------------------------
| Weather
|--------------------------------------------------------------------------
| Open-Meteo requires no API key, so this calls it directly from the
| client. Coordinates are fixed to a single location — update LAT/LON/
| LOCATION_LABEL below if you're based somewhere else.
|--------------------------------------------------------------------------
*/

const LAT = 13.0827;
const LON = 80.2707;
const LOCATION_LABEL = "Chennai, IN";

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
  | { status: "ready"; tempC: number; label: string; icon: React.ComponentType<{ className?: string }> };

function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        );
        if (!res.ok) throw new Error("Weather request failed");
        const data = await res.json();
        const code = data?.current_weather?.weathercode as number | undefined;
        const temp = data?.current_weather?.temperature as number | undefined;

        if (cancelled) return;

        if (typeof code !== "number" || typeof temp !== "number") {
          setState({ status: "error" });
          return;
        }

        const meta = WEATHER_CODE_META[code] ?? { label: "Clear", icon: Sun };
        setState({ status: "ready", tempC: Math.round(temp), label: meta.label, icon: meta.icon });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    loadWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/* ==========================================================================
   Date helpers
   ========================================================================== */

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const today = startOfToday();
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(time?: string | null): string | null {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/* ==========================================================================
   Animation
   ========================================================================== */

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
};

/* ==========================================================================
   Component
   ========================================================================== */

export default function Schedule() {
  const [events, setEvents] = useState<EventApiResponse[]>([]);
  const [tasks, setTasks] = useState<TaskApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const weather = useWeather();

  useEffect(() => {
    async function load() {
      try {
        const [eventsData, tasksData] = await Promise.all([getEvents(), getTasks()]);
        setEvents(eventsData);
        setTasks(tasksData);
      } catch {
        // Fail quietly — the section just renders its empty states.
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const upcomingEvents = useMemo(() => {
    const today = startOfToday();
    return events
      .filter((e) => new Date(`${e.eventDate}T00:00:00`) >= today)
      .sort((a, b) => {
        const dateDiff = a.eventDate.localeCompare(b.eventDate);
        if (dateDiff !== 0) return dateDiff;
        return (a.startTime ?? "").localeCompare(b.startTime ?? "");
      })
      .slice(0, 6);
  }, [events]);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => a.displayOrder - b.displayOrder),
    [tasks]
  );

  const WeatherIcon = weather.status === "ready" ? weather.icon : Sun;

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Live Status
            </span>
          </div>
          <h2
            id="schedule-heading"
            className="mt-4 text-3xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            What I&apos;m working on this week.
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            A live view of my schedule and current tasks — kept up to date
            from my own planning, not for show.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Schedule — agenda list */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white">Upcoming schedule</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                {upcomingEvents.length} upcoming
              </span>
            </div>

            <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
              {loading && (
                <p className="py-6 text-center text-sm text-zinc-400 dark:text-zinc-600">
                  Loading schedule…
                </p>
              )}

              {!loading && upcomingEvents.length === 0 && (
                <p className="py-6 text-center text-sm text-zinc-400 dark:text-zinc-600">
                  Nothing scheduled right now.
                </p>
              )}

              {!loading &&
                upcomingEvents.map((event) => {
                  const start = formatTime(event.startTime);
                  const end = formatTime(event.endTime);
                  return (
                    <div key={event.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="w-20 shrink-0 pt-0.5">
                        <p className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                          {dateLabel(event.eventDate)}
                        </p>
                        {start && (
                          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-600">
                            {start}
                            {end ? ` – ${end}` : ""}
                          </p>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {event.title}
                        </p>
                        {(event.location || event.description) && (
                          <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-500">
                            {event.location ?? event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>

          {/* Right column — weather + tasks */}
          <div className="flex flex-col gap-5">
            {/* Weather */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-white p-5 dark:border-zinc-800 dark:from-blue-950/20 dark:to-zinc-900"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-500">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {LOCATION_LABEL}
              </div>

              <div className="mt-3 flex items-center justify-between">
                {weather.status === "ready" ? (
                  <>
                    <div>
                      <p className="text-4xl font-black text-zinc-950 dark:text-white">
                        {weather.tempC}°
                        <span className="text-lg font-bold text-zinc-400 dark:text-zinc-600">C</span>
                      </p>
                      <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {weather.label}
                      </p>
                    </div>
                    <WeatherIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                  </>
                ) : (
                  <p className="py-2 text-sm text-zinc-400 dark:text-zinc-600">
                    {weather.status === "loading" ? "Loading weather…" : "Weather unavailable"}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Tasks */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-1 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">Tasks</h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                  {sortedTasks.filter((t) => !t.completed).length} open
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {loading && (
                  <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-600">Loading…</p>
                )}

                {!loading && sortedTasks.length === 0 && (
                  <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-600">
                    No tasks right now.
                  </p>
                )}

                {!loading &&
                  sortedTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
                          task.completed
                            ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <p
                        className={`text-sm leading-5 ${
                          task.completed
                            ? "text-zinc-400 line-through dark:text-zinc-600"
                            : "text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
