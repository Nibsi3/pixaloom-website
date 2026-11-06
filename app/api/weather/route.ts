import { NextResponse } from 'next/server';

const GEORGE_ZA = { lat: -33.963, lon: 22.461 };
const unavailable = () => NextResponse.json({ ok: false, error: 'Failed to fetch weather' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });

export async function GET() {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(GEORGE_ZA.lat));
    url.searchParams.set('longitude', String(GEORGE_ZA.lon));
    url.searchParams.set('current', 'temperature_2m,wind_speed_10m,weather_code');

    const res = await fetch(url.toString(), { cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(8000) });

    if (!res.ok) {
      return unavailable();
    }

    const data = (await res.json()) as {
      current?: {
        temperature_2m?: number;
        wind_speed_10m?: number;
        weather_code?: number;
      };
    };

    const current = data?.current;
    if (!current || ![current.temperature_2m, current.wind_speed_10m, current.weather_code].every(value => typeof value === 'number' && Number.isFinite(value))) {
      return unavailable();
    }

    return NextResponse.json({
      ok: true,
      city: 'George, Western Cape',
      temperatureC: current.temperature_2m ?? null,
      windKmh: current.wind_speed_10m ?? null,
      weatherCode: current.weather_code ?? null,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return unavailable();
  }
}
