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
  imagePlaceholder?: string; // URL for ticket screenshot
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
  dayLabel: string; // e.g., "Day 1"
  location: string;
  items: ItineraryItem[];
}

export interface WeatherData {
  temperature: number;
  sunset: string;
  conditionCode: number;
}