import React, { useState } from 'react';
import { MapPin, Train, Camera, Utensils, ShoppingBag, Coffee, ChevronRight, Ticket } from 'lucide-react';
import { ItineraryItem, ActivityType } from '../types';
import { Modal } from './Modal';

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
    default: return 'bg-thai-goldLight text-yellow-800'; // Sightseeing / Default
  }
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex group">
      {/* Time Column */}
      <div className="w-16 flex-shrink-0 flex flex-col items-center pt-2">
        <span className="text-sm font-bold text-gray-600 font-mono">{item.time}</span>
      </div>

      {/* Timeline Line & Node */}
      <div className="relative flex flex-col items-center px-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm border-2 border-white ${getActivityColor(item.type)}`}>
          {getActivityIcon(item.type)}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-200 absolute top-8" />
        )}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8 pl-2 pr-4 min-w-0">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden transition-all active:scale-[0.98]">
          {/* Decorative Corner */}
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

      {/* Modal for Booking Details */}
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