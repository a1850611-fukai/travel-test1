import React, { useEffect, useState } from 'react';
import { CloudSun, Sunset, MapPin } from 'lucide-react';
import { getBangkokWeather } from '../services/weatherService';
import { WeatherData } from '../types';

interface HeroProps {
  currentDate: string;
  location: string;
}

export const Hero: React.FC<HeroProps> = ({ currentDate, location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    getBangkokWeather().then(setWeather);
  }, []);

  // Format Date for display
  const dateObj = new Date(currentDate);
  const dateDisplay = dateObj.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="relative w-full bg-thai-green overflow-hidden rounded-b-[2.5rem] shadow-xl border-b-4 border-thai-gold">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-thai-pattern pointer-events-none"></div>
      
      {/* Elephant Decoration (SVG) */}
      <div className="absolute right-[-20px] bottom-[-20px] opacity-20 transform rotate-12">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-thai-gold">
           <path d="M16.53 3.65c.95.34 1.83.91 2.57 1.65s1.31 1.62 1.65 2.57c.34.95.43 1.98.24 2.99-.18.99-.6 1.9-1.21 2.65-.62.76-1.4 1.34-2.29 1.71-.88.36-1.85.5-2.81.39-.96-.11-1.87-.45-2.66-.99l-.88 1.52c-.22.38-.63.62-1.07.62H5.5c-.83 0-1.5-.67-1.5-1.5v-2c0-.83.67-1.5 1.5-1.5h1.38l.88-1.52c-.54-.79-.88-1.7-.99-2.66-.11-.96.03-1.93.39-2.81.37-.89.95-1.67 1.71-2.29.75-.61 1.66-1.03 2.65-1.21 1.01-.19 2.04-.1 2.99.24zM7 13h2v2H7v-2zm-2 0h1v2H5v-2zm10.5-8c-1.93 0-3.5 1.57-3.5 3.5S13.57 12 15.5 12 19 10.43 19 8.5 17.43 5 15.5 5z"/>
        </svg>
      </div>

      <div className="relative z-10 px-6 pt-12 pb-10 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-thai-goldLight mb-1">
              <MapPin size={16} />
              <span className="text-sm font-medium tracking-wide uppercase">{location}</span>
            </div>
            <h1 className="text-3xl font-bold font-sans tracking-tight mb-2">
              {dateDisplay}
            </h1>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <CloudSun size={20} className="text-thai-gold" />
              <span className="text-lg font-semibold">{weather ? `${weather.temperature}°` : '--'}</span>
            </div>
            {weather && (
              <div className="flex items-center space-x-1 text-xs text-white/80 mt-1">
                <Sunset size={12} />
                <span>日落 {weather.sunset}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};