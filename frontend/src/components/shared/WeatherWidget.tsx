"use client";

import { useEffect, useState } from "react";
import {
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

const DEFAULT_LAT = 13.0827;
const DEFAULT_LON = 80.2707;
const DEFAULT_LOCATION_LABEL = "Chennai, IN";

const WEATHER_CODE_META: Record<
  number,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }
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

async function reverseGeocode(
  lat: number,
  lon: number
): Promise<string | null> {
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
  const [state, setState] = useState<WeatherState>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeatherFor(
      lat: number,
      lon: number,
      knownLabel?: string
    ) {
      try {
        const [weatherRes, locationLabel] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          ),
          knownLabel
            ? Promise.resolve(knownLabel)
            : reverseGeocode(lat, lon),
        ]);

        if (!weatherRes.ok) {
          throw new Error("Weather request failed");
        }

        const data = await weatherRes.json();

        const code = data?.current_weather?.weathercode as
          | number
          | undefined;

        const temp = data?.current_weather?.temperature as
          | number
          | undefined;

        if (cancelled) return;

        if (typeof code !== "number" || typeof temp !== "number") {
          setState({ status: "error" });
          return;
        }

        const meta = WEATHER_CODE_META[code] ?? {
          label: "Clear",
          icon: Sun,
        };

        setState({
          status: "ready",
          tempC: Math.round(temp),
          condition: meta.label,
          icon: meta.icon,
          location: locationLabel || "Your location",
        });
      } catch {
        if (!cancelled) {
          setState({ status: "error" });
        }
      }
    }

    if (
      typeof window === "undefined" ||
      !("geolocation" in navigator)
    ) {
      fetchWeatherFor(
        DEFAULT_LAT,
        DEFAULT_LON,
        DEFAULT_LOCATION_LABEL
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!cancelled) {
          fetchWeatherFor(
            pos.coords.latitude,
            pos.coords.longitude
          );
        }
      },
      () => {
        if (!cancelled) {
          fetchWeatherFor(
            DEFAULT_LAT,
            DEFAULT_LON,
            DEFAULT_LOCATION_LABEL
          );
        }
      },
      {
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * Compact live-weather card.
 * Styled for a permanently-dark background
 * (the footer), unlike the old Hero panel
 * which had to support both themes.
 */
export default function WeatherWidget() {
  const weather = useWeather();

  const WeatherIcon =
    weather.status === "ready" ? weather.icon : Sun;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-3">
      <WeatherIcon
        className="h-6 w-6 shrink-0 text-blue-400"
        aria-hidden="true"
      />

      {weather.status === "ready" ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">
            {weather.tempC}°C · {weather.condition}
          </p>

          <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-zinc-500">
            <MapPin
              className="h-2.5 w-2.5 shrink-0"
              aria-hidden="true"
            />

            <span className="truncate">
              {weather.location}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-xs text-zinc-500">
          {weather.status === "loading"
            ? "Loading weather…"
            : "Weather unavailable"}
        </p>
      )}
    </div>
  );
}