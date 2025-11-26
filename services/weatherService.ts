import { WeatherData } from '../types';

// Bangkok coordinates
const LAT = 13.7563;
const LON = 100.5018;

export const getBangkokWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=sunset&current_weather=true&timezone=Asia%2FBangkok`
    );
    const data = await response.json();
    
    // Format sunset time (usually returns ISO string like 2024-12-03T17:45)
    const sunsetISO = data.daily?.sunset?.[0];
    const sunsetTime = sunsetISO ? new Date(sunsetISO).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '18:00';

    return {
      temperature: Math.round(data.current_weather?.temperature || 30),
      sunset: sunsetTime,
      conditionCode: data.current_weather?.weathercode || 0
    };
  } catch (error) {
    console.error("Failed to fetch weather", error);
    return null;
  }
};