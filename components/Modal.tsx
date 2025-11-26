import React from 'react';
import { X, Ticket, AlertCircle } from 'lucide-react';
import { BookingDetails } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  booking: BookingDetails;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, booking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
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
                <span className="text-xs">(Upload feature needed)</span>
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