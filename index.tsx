import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  MapPin, Train, Camera, Utensils, ShoppingBag, Coffee, 
  ChevronRight, Ticket, X, AlertCircle, CloudSun, Sunset, Info 
} from 'lucide-react';

// --- TYPES ---

export enum ActivityType {
  Transport = 'TRANSPORT',
  Sightseeing = 'SIGHTSEEING',
  Food = 'FOOD',
  Shopping = 'SHOPPING',
  Relax = 'RELAX',
  Activity = 'ACTIVITY'
}

export interface BookingDetails {
  refNumber?: string;
  imagePlaceholder?: string;
  notes?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  location: string;
  googleMapsUrl: string;
  type: ActivityType;
  description?: string;
  booking?: BookingDetails;
}

export interface DayItinerary {
  date: string;
  dayLabel: string;
  location: string;
  items: ItineraryItem[];
}

export interface WeatherData {
  temperature: number;
  sunset: string;
  conditionCode: number;
}

// --- DATA & CONSTANTS ---

const getMapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const ITINERARY_DATA: DayItinerary[] = [
  {
    date: '2024-12-03',
    dayLabel: 'Day 1',
    location: 'Bangkok',
    items: [
      {
        id: 'd1-1',
        time: '12:00',
        title: '抵達曼谷市區',
        location: 'Bangkok City Center',
        googleMapsUrl: getMapLink('Bangkok City Center'),
        type: ActivityType.Transport,
        description: '前往飯店放行李，準備開始行程。',
      },
      {
        id: 'd1-2',
        time: '13:30',
        title: '藍色觀光船 / 歷史古蹟巡禮',
        location: 'Sathorn Pier',
        googleMapsUrl: getMapLink('Chao Phraya Tourist Boat Sathorn Pier'),
        type: ActivityType.Sightseeing,
        description: '搭乘觀光船前往大皇宮、玉佛寺、臥佛寺。感受昭披耶河風光。',
        booking: {
          refNumber: 'BOAT-TICKET-888',
          notes: '請出示電子票券 QR Code'
        }
      },
      {
        id: 'd1-3',
        time: '17:30',
        title: '鄭王廟 (黎明寺) 夜景',
        location: 'Wat Arun',
        googleMapsUrl: getMapLink('Wat Arun'),
        type: ActivityType.Sightseeing,
        description: '欣賞著名的鄭王廟夕陽與夜景點燈，拍攝絕美倒影。',
      },
      {
        id: 'd1-4',
        time: '19:00',
        title: 'Talat Phlu 美食市集',
        location: 'Talat Phlu Market',
        googleMapsUrl: getMapLink('Talat Phlu Market'),
        type: ActivityType.Food,
        description: '搭乘 MRT 到 Talat Phlu 站。品嚐在地街頭美食，必吃韭菜粿、泰式脆麵。',
      }
    ]
  },
  {
    date: '2024-12-04',
    dayLabel: 'Day 2',
    location: 'Ayutthaya (大城)',
    items: [
      {
        id: 'd2-1',
        time: '08:30',
        title: 'Mini Van 前往大城',
        location: 'Mo Chit Bus Terminal',
        googleMapsUrl: getMapLink('Mo Chit Bus Terminal'),
        type: ActivityType.Transport,
        description: '搭乘小巴前往大城歷史遺跡公園。',
      },
      {
        id: 'd2-2',
        time: '10:30',
        title: '瑪哈泰寺 (樹中佛頭)',
        location: 'Wat Mahathat Ayutthaya',
        googleMapsUrl: getMapLink('Wat Mahathat Ayutthaya'),
        type: ActivityType.Sightseeing,
        description: '大城最著名的地標，樹根包覆的佛頭。',
      },
      {
        id: 'd2-3',
        time: '12:00',
        title: '大城古蹟巡禮',
        location: 'Ayutthaya Historical Park',
        googleMapsUrl: getMapLink('Ayutthaya Historical Park'),
        type: ActivityType.Sightseeing,
        description: '柴瓦塔那蘭寺 (Wat Chaiwatthanaram)、帕司三碧寺 (Wat Phra Si Sanphet)、拉嘉布拉那寺 (Wat Ratchaburana)。',
      },
      {
        id: 'd2-4',
        time: '16:00',
        title: '火車前往廊曼機場站',
        location: 'Ayutthaya Railway Station',
        googleMapsUrl: getMapLink('Ayutthaya Railway Station'),
        type: ActivityType.Transport,
        description: '體驗泰國火車風情，轉乘 Grab 前往夜市。',
      },
      {
        id: 'd2-5',
        time: '18:30',
        title: 'Save One Go 夜市',
        location: 'Save One Go Market',
        googleMapsUrl: getMapLink('Save One Go Market'),
        type: ActivityType.Food,
        description: '在地人喜愛的夜市，價格親民，食物選擇多樣。',
      }
    ]
  },
  {
    date: '2024-12-05',
    dayLabel: 'Day 3',
    location: 'Kanchanaburi',
    items: [
      {
        id: 'd3-1',
        time: '08:00',
        title: '包車前往大象保護區',
        location: 'Hotel Lobby',
        googleMapsUrl: '',
        type: ActivityType.Transport,
        description: '司機將在飯店大廳等候。',
        booking: {
          refNumber: 'CAR-BOOKING-556',
          notes: '車牌: 12-3456 (Toyota Commuter)'
        }
      },
      {
        id: 'd3-2',
        time: '10:30',
        title: 'Somboon Legacy Foundation',
        location: 'Somboon Legacy Foundation',
        googleMapsUrl: getMapLink('Somboon Legacy Foundation'),
        type: ActivityType.Activity,
        description: 'Hands-Off Elephant Sanctuary (不騎乘、不強迫)。觀察大象自然生活，準備食物餵食，學習保育知識。',
        booking: {
          refNumber: 'ELE-2024-1205',
          notes: '含午餐。請穿著輕便衣物。'
        }
      }
    ]
  },
  {
    date: '2024-12-06',
    dayLabel: 'Day 4',
    location: 'Floating Markets',
    items: [
      {
        id: 'd4-1',
        time: '07:30',
        title: '包車出發水上市場',
        location: 'Hotel Lobby',
        googleMapsUrl: '',
        type: ActivityType.Transport,
        description: '前往丹嫩莎多水上市場 (Damnoen Saduak)。',
      },
      {
        id: 'd4-2',
        time: '09:30',
        title: '丹嫩莎多水上市場',
        location: 'Damnoen Saduak Floating Market',
        googleMapsUrl: getMapLink('Damnoen Saduak Floating Market'),
        type: ActivityType.Sightseeing,
        description: '搭乘手搖船體驗傳統水上交易，品嚐船麵、椰子冰淇淋。',
      },
      {
        id: 'd4-3',
        time: '13:00',
        title: '美功鐵道市場',
        location: 'Maeklong Railway Market',
        googleMapsUrl: getMapLink('Maeklong Railway Market'),
        type: ActivityType.Sightseeing,
        description: '觀看火車經過時攤販收棚的奇景。',
      },
      {
        id: 'd4-4',
        time: '15:30',
        title: '安帕瓦水上市場',
        location: 'Amphawa Floating Market',
        googleMapsUrl: getMapLink('Amphawa Floating Market'),
        type: ActivityType.Sightseeing,
        description: '較為在地的水上市場，適合傍晚散步，有機會可看螢火蟲。',
      }
    ]
  },
  {
    date: '2024-12-07',
    dayLabel: 'Day 5',
    location: 'Bangkok Suburbs',
    items: [
      {
        id: 'd5-1',
        time: '09:30',
        title: '前往暹羅古城 (Ancient City)',
        location: 'BTS Kheha Station',
        googleMapsUrl: getMapLink('The Ancient City'),
        type: ActivityType.Sightseeing,
        description: '搭乘 BTS 至 Kheha 站轉乘雙條車或計程車。租高爾夫球車遊園。',
        booking: {
          refNumber: 'KLOOK-ANCIENT-99',
          notes: '出示 QR Code 換票'
        }
      },
      {
        id: 'd5-2',
        time: '17:00',
        title: '前往席娜卡琳火車夜市',
        location: 'Srinakarin Train Night Market',
        googleMapsUrl: getMapLink('Srinakarin Train Night Market'),
        type: ActivityType.Food,
        description: 'Grab 叫車前往。復古風格夜市，有許多古董車、二手商品及巨大美食區。',
      }
    ]
  },
  {
    date: '2024-12-08',
    dayLabel: 'Day 6',
    location: 'Bangkok & Home',
    items: [
      {
        id: 'd6-1',
        time: '10:00',
        title: '吞武里海鮮市集',
        location: 'Thonburi Market Place',
        googleMapsUrl: getMapLink('Thonburi Market Place'),
        type: ActivityType.Food,
        description: 'Grab 叫車前往。現撈海鮮代客料理，必吃烤大蝦、咖哩螃蟹。',
      },
      {
        id: 'd6-2',
        time: '14:00',
        title: 'Big C 採買伴手禮',
        location: 'Big C Supercenter Ratchadamri',
        googleMapsUrl: getMapLink('Big C Supercenter Ratchadamri'),
        type: ActivityType.Shopping,
        description: '購買泰國零食、藥妝、伴手禮最後衝刺。',
      },
      {
        id: 'd6-3',
        time: '18:00',
        title: 'Bhawa Spa 按摩放鬆',
        location: 'Bhawa Spa on the Eight',
        googleMapsUrl: getMapLink('Bhawa Spa on the Eight'),
        type: ActivityType.Relax,
        description: '18:00 ~ 21:00 享受高級精油按摩，洗去旅途疲勞。',
        booking: {
          refNumber: 'SPA-RES-1208',
          notes: '預約時間: 18:00, 療程: Aromatherapy 180min'
        }
      },
      {
        id: 'd6-4',
        time: '21:30',
        title: '前往機場',
        location: 'Suvarnabhumi Airport',
        googleMapsUrl: getMapLink('Suvarnabhumi Airport'),
        type: ActivityType.Transport,
        description: 'Grab 叫車前往機場，準備搭機返家。',
      }
    ]
  }
];

// --- SERVICE: Weather ---

// Bangkok coordinates
const LAT = 13.7563;
const LON = 100.5018;

const getBangkokWeather = async (): Promise<WeatherData | null> => {
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

// --- COMPONENTS ---

// 1. Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  booking: BookingDetails;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, booking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.2s_ease-out]">
        <div className="bg-thai-green p-4 flex justify-between items-center text-white">
          <h3 className="font-semibold text-lg truncate pr-4">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3 text-thai-green">
            <div className="bg-thai-gold/20 p-2 rounded-full">
              <Ticket size={24} className="text-thai-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Booking Reference</p>
              <p className="text-xl font-mono font-bold">{booking.refNumber || 'N/A'}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
             <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{booking.notes || 'No special notes.'}</p>
             </div>
          </div>
          
          <div className="pt-2">
            <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                <span className="text-sm">Ticket Screenshot Placeholder</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-thai-green text-white py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-transform"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Hero Component
interface HeroProps {
  currentDate: string;
  location: string;
}

const Hero: React.FC<HeroProps> = ({ currentDate, location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    getBangkokWeather().then(setWeather);
  }, []);

  const dateObj = new Date(currentDate);
  const dateDisplay = dateObj.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="relative w-full bg-thai-green overflow-hidden rounded-b-[2.5rem] shadow-xl border-b-4 border-thai-gold">
      <div className="absolute inset-0 opacity-10 bg-thai-pattern pointer-events-none"></div>
      
      {/* Decorative Elephant SVG */}
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

// 3. Timeline Item Component
interface TimelineItemProps {
  item: ItineraryItem;
  isLast: boolean;
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case ActivityType.Transport: return <Train size={18} />;
    case ActivityType.Food: return <Utensils size={18} />;
    case ActivityType.Shopping: return <ShoppingBag size={18} />;
    case ActivityType.Relax: return <Coffee size={18} />;
    case ActivityType.Sightseeing: 
    default: return <Camera size={18} />;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case ActivityType.Transport: return 'bg-blue-100 text-blue-700';
    case ActivityType.Food: return 'bg-orange-100 text-orange-700';
    case ActivityType.Shopping: return 'bg-pink-100 text-pink-700';
    case ActivityType.Relax: return 'bg-teal-100 text-teal-700';
    default: return 'bg-thai-goldLight text-yellow-800';
  }
};

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex group">
      <div className="w-16 flex-shrink-0 flex flex-col items-center pt-2">
        <span className="text-sm font-bold text-gray-600 font-mono">{item.time}</span>
      </div>

      <div className="relative flex flex-col items-center px-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm border-2 border-white ${getActivityColor(item.type)}`}>
          {getActivityIcon(item.type)}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-200 absolute top-8" />
        )}
      </div>

      <div className="flex-1 pb-8 pl-2 pr-4 min-w-0">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden transition-all active:scale-[0.98]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-thai-gold/10 rounded-bl-2xl"></div>

          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-lg leading-tight pr-2">{item.title}</h3>
            {item.booking && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-thai-green/10 text-thai-green p-1.5 rounded-full hover:bg-thai-green/20 transition-colors"
              >
                <Ticket size={16} />
              </button>
            )}
          </div>
          
          <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center space-x-3">
             <a 
               href={item.googleMapsUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
             >
               <MapPin size={12} className="mr-1" />
               導航
             </a>
             <span className="text-xs text-gray-400 truncate max-w-[120px]">{item.location}</span>
          </div>
        </div>
      </div>

      {item.booking && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={item.title}
          booking={item.booking}
        />
      )}
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay: DayItinerary = ITINERARY_DATA[currentDayIndex];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentDayIndex]);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FAFAF5] text-gray-800 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* Scrollable Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar pb-24 scroll-smooth">
        <Hero 
          currentDate={currentDay.date} 
          location={currentDay.location} 
        />

        <div className="mt-6 px-2">
          {currentDay.items.map((item, index) => (
            <TimelineItem 
              key={item.id} 
              item={item} 
              isLast={index === currentDay.items.length - 1} 
            />
          ))}
          
          <div className="flex justify-center pb-8 opacity-40">
            <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
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
        <div className="h-5 w-full"></div> 
      </div>
      
      <div className="absolute bottom-28 right-4 z-30">
        <button className="bg-thai-gold text-thai-green p-3 rounded-full shadow-lg shadow-yellow-500/30 hover:scale-110 transition-transform flex items-center justify-center">
            <Info size={24} />
        </button>
      </div>
    </div>
  );
};

// --- ENTRY POINT ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);