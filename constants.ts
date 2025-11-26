import { ActivityType, DayItinerary } from './types';

// Helper to generate Google Maps Search URL
const getMapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const ITINERARY_DATA: DayItinerary[] = [
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