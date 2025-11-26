import React, { useState, useEffect, useRef } from 'react';
import { ITINERARY_DATA } from './constants';
import { Hero } from './components/Hero';
import { TimelineItem } from './components/TimelineItem';
import { DayItinerary } from './types';
import { Calendar, Map, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay: DayItinerary = ITINERARY_DATA[currentDayIndex];
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when changing days
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentDayIndex]);

  return (
    <div className="flex flex-col h-screen bg-[#FAFAF5] text-gray-800 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Scrollable Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar pb-24 scroll-smooth">
        
        {/* Dynamic Hero Section */}
        <Hero 
          currentDate={currentDay.date} 
          location={currentDay.location} 
        />

        {/* Timeline Container */}
        <div className="mt-6 px-2">
          {currentDay.items.map((item, index) => (
            <TimelineItem 
              key={item.id} 
              item={item} 
              isLast={index === currentDay.items.length - 1} 
            />
          ))}
          
          {/* End of day decoration */}
          <div className="flex justify-center pb-8 opacity-40">
            <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Sticky) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 pb-safe">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-2 space-x-2 snap-x snap-mandatory">
          {ITINERARY_DATA.map((day, index) => (
            <button
              key={day.dayLabel}
              onClick={() => setCurrentDayIndex(index)}
              className={`flex-shrink-0 snap-center flex flex-col items-center justify-center min-w-[70px] h-16 rounded-xl transition-all duration-300 ${
                index === currentDayIndex 
                  ? 'bg-thai-green text-white shadow-lg translate-y-[-4px]' 
                  : 'bg-transparent text-gray-400 hover:bg-gray-50'
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider mb-1">
                {day.dayLabel}
              </span>
              <span className={`text-sm font-bold ${index === currentDayIndex ? 'text-white' : 'text-gray-600'}`}>
                {new Date(day.date).getDate()}日
              </span>
            </button>
          ))}
        </div>
        
        {/* Safe area spacer for iPhone home bar */}
        <div className="h-5 w-full"></div> 
      </div>
      
      {/* Floating Info / AI Help Button (Placeholder for future Gemini integration) */}
      <div className="absolute bottom-28 right-4 z-30">
        <button className="bg-thai-gold text-thai-green p-3 rounded-full shadow-lg shadow-yellow-500/30 hover:scale-110 transition-transform flex items-center justify-center">
            <Info size={24} />
        </button>
      </div>

    </div>
  );
};

export default App;