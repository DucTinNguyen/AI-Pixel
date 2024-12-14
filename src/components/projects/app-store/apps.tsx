import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { AppLoadingState } from '@/components/projects/loading';


// Define the registry type
interface AppRegistry {
  [key: string]: {
    component: ComponentType;
    title: string;
    icon: string;
    width?: number;
    height?: number;
  };
}


export const AppComponents: AppRegistry = {
  PointClick:{
    component: dynamic(() => import('./pvp-games/point-click'), {
      loading: () => <AppLoadingState title="Point Click" />
    }),
    title: 'Point Click',
    icon: '🎯',
    width: 400,
    height:372
  },
  MemoryGame:{
    component: dynamic(() => import('./pvp-games/memory'), {
      loading: () => <AppLoadingState title="Memory Game" />
    }),
    title: 'Memory Game',
    icon: '🧠 ',
    width: 400,
    height:400
  },
  Snake:{
    component: dynamic(() => import('./pvp-games/snake'), {
      loading: () => <AppLoadingState title="Snake" />
    }),
    title: 'Snake',
    icon: '🐍',
    width: 400,
    height:480
  },
  TicTacToe:{
    component: dynamic(() => import('./pvp-games/tic-tac-toe'), {
      loading: () => <AppLoadingState title="Tic Tac Toe" />
    }),
    title: 'Tic Tac Toe',
    icon: '❌⭕',
    width: 400,
    height:520
  },
  /* token price */
  PriceTracker:{
    component: dynamic(() => import('./token-price/price-tracker'), {
      loading: () => <AppLoadingState title="Price Tracker" />
    }),
    title: 'Price Tracker',
    icon: '💰',
    width: 660,
    height:450
  },
  PriceChart:{
    component: dynamic(() => import('./token-price/price-chart'), {
      loading: () => <AppLoadingState title="Price Chart" />
    }),
    title: 'Price Chart',
    icon: '📈',
    width:400,
    height:380

  },
  MarketDepth:{
    component: dynamic(() => import('./token-price/market-depth'), {
      loading: () => <AppLoadingState title="Market Depth" />
    }),
    title: 'Market Depth',
    icon: '📊',
    width: 300,
    height:400
  },
  TokenInfo:{
    component: dynamic(() => import('./token-price/token-info'), {
      loading: () => <AppLoadingState title="Token Info" />
    }),
    title: 'Token Info',
    icon: '🔍',
    width: 400,
    height:280
  },
  /* weather */
  WeatherDashboard:{
    component: dynamic(() => import('./weather/dashboard'), {
      loading: () => <AppLoadingState title="Weather Dashboard" />
    }),
    title: 'Weather Dashboard',
    icon: '🌤️',
    width:330,
    height:400
  },
  ForeCast:{
    component: dynamic(() => import('./weather/forecast'), {
      loading: () => <AppLoadingState title="Forecast" />
    }),
    title: 'Forecast',
    icon: '🌦️',
    width: 310,
    height:520
  },
  Alert:{
    component: dynamic(() => import('./weather/alert'), {
      loading: () => <AppLoadingState title="Alert" />
    }),
    title: 'Alert',
    icon: '⚠️',
    width: 400,
    height:420
  },
  Map:{
    component: dynamic(() => import('./weather/map'), {
      loading: () => <AppLoadingState title="Map" />
    }),
    title: 'Map',
    icon: '🗺️',
    width:400,
    height:570
  },
  /* video */
  VideoPlayer:{
    component: dynamic(() => import('./video/video-player'), {
      loading: () => <AppLoadingState title="Video Player" />
    }),
    title: 'Video Player',
    icon: '📺',
    width:630,
    height:410
  },
  AudioExtract:{
    component: dynamic(() => import('./video/audio-extract'), {
      loading: () => <AppLoadingState title="Audio Extract" />
    }),
    title: 'Audio Extract',
    icon: '🔊',
    width:330,
    height:410
  },
  AudioRecorder:{
    component: dynamic(() => import('./video/audio-record'), {
      loading: () => <AppLoadingState title="Audio Recorder" />
    }),
    title: 'Audio Recorder',
    icon: '🎙️',
    width:330,
    height:410
  },
  Visualizer:{
    component: dynamic(() => import('./video/visualizer'), {
      loading: () => <AppLoadingState title="Visualizer" />
    }),
    title: 'Visualizer',
    icon: '🎵',
    width:330,
    height:410
  },
  /* ocr */
  Scanner:{
    component: dynamic(() => import('./ocr/text-scanner'), {
      loading: () => <AppLoadingState title="Scanner" />
    }),
    title: 'Scanner',
    icon: '📄',
    width:410,
    height:410
  },
  Translator:{
    component: dynamic(() => import('./ocr/spell-trans'), {
      loading: () => <AppLoadingState title="Translator" />
    }),
    title: 'Translator',
    icon: '🔮',
    width:440,
    height:410
  },
  Caster:{
    component: dynamic(() => import('./ocr/spell-cast'), {
      loading: () => <AppLoadingState title="Caster" />
    }),
    title: 'Caster',
    icon: '🧙',
    width:510,
    height:570
  },
  Writer:{
    component: dynamic(() => import('./ocr/writer'), {
      loading: () => <AppLoadingState title="Writer" />
    }),
    title: 'Writer',
    icon: '📜',
    width:330,
    height:410
  },
  /* maps */
  MapSearch:{
    component: dynamic(() => import('./maps/map-search'), {
      loading: () => <AppLoadingState title="Map Search" />
    }),
    title: 'Map Search',
    icon: '🗺️',
    width:495,
    height:510
  },
  StreetTour:{
    component: dynamic(() => import('./maps/street-tour'), {
      loading: () => <AppLoadingState title="Street Tour" />
    }),
    title: 'Street Tour',
    icon: '🚶',
    width:960,
    height:710
  },
  ScrollsLocation:{
    component: dynamic(() => import('./maps/scrolls-location'), {
      loading: () => <AppLoadingState title="Scrolls Location" />
    }),
    title: 'Scrolls Location',
    icon: '📜',
    width:910,
    height:610
  },
  Guide:{
    component: dynamic(() => import('./maps/guide'), {
      loading: () => <AppLoadingState title="Guide" />
    }),
    title: 'Guide',
    icon: '🌙',
    width:910,
    height:670
  },
  /* city guesser */
  CityGuesser:{
    component: dynamic(() => import('./city-guesser/city-guesser'), {
      loading: () => <AppLoadingState title="City Guesser" />
    }),
    title: 'City Guesser',
    icon: '🌆',
    width:895,
    height:686
  },
  Distance:{
    component: dynamic(() => import('./city-guesser/distance'), {
      loading: () => <AppLoadingState title="Distance" />
    }),
    title: 'Distance',
    icon: '📏',
    width:912,
    height:615
  },
  Time:{
    component: dynamic(() => import('./city-guesser/time'), {
      loading: () => <AppLoadingState title="Time" />
    }),
    title: 'Time',
    icon: '⏰',
    width:835,
    height:618
  },
  Temple:{
    component: dynamic(() => import('./city-guesser/temple'), {
      loading: () => <AppLoadingState title="Temple" />
    }),
    title: 'Temple',
    icon: '🏯',
    width:810,
    height:674
  },
  /* stocks */
  Metrics:{
    component: dynamic(() => import('./stocks/metrics'), {
      loading: () => <AppLoadingState title="Metrics" />
    }),
    title: 'Metrics',
    icon: '📊',
    width:521,
    height:610
  },
  Watch:{
    component: dynamic(() => import('./stocks/watch'), {
      loading: () => <AppLoadingState title="Watch" />
    }),
    title: 'Watch',
    icon: '📈',
    width:455,
    height:640
  },
  Mystic:{
    component: dynamic(() => import('./stocks/mystic'), {
      loading: () => <AppLoadingState title="Mystic" />
    }),
    title: 'Mystic',
    icon: '🔮',
    width:570,
    height:930
  },
  PortFolio:{
    component: dynamic(() => import('./stocks/portfolio'), {
      loading: () => <AppLoadingState title="PortFolio" />
    }),
    title: 'PortFolio',
    icon: '📈',
    width:700,
    height:650
  },
  /* token lab */
  AlchemyLab:{
    component: dynamic(() => import('./token/lab'), {
      loading: () => <AppLoadingState title="Alchemy Lab" />
    }),
    title: 'Alchemy Lab',
    icon: '🧪',
    width:700,
    height:700
  },
  Dungeon:{
    component: dynamic(() => import('./token/dungeon'), {
      loading: () => <AppLoadingState title="Dungeon" />
    }),
    title: 'Dungeon',
    icon: '🏰',
    width:700,
    height:700
  },
  Market:{
    component: dynamic(() => import('./token/market'), {
      loading: () => <AppLoadingState title="Market" />
    }),
    title: 'Market',
    icon: '📈',
    width:700,
    height:700
  },
  Forge:{
    component: dynamic(() => import('./token/forge'), {
      loading: () => <AppLoadingState title="Forge" />
    }),
    title: 'Forge',
    icon: '🔥',
    width:700,
    height:700
  },
  /* youtube */
  MagicalPlayer:{
    component: dynamic(() => import('./youtube/spell-tube'), {
      loading: () => <AppLoadingState title="Magical Player" />
    }),
    title: 'Magical Player',
    icon: '🎩',
    width:700,
    height:700
  },
  VisualizerVideo:{
    component: dynamic(() => import('./youtube/visualizer'), {
      loading: () => <AppLoadingState title="Visualizer" />
    }),
    title: 'Visualizer',
    icon: '🎵',
    width:700,
    height:700
  },
  Chat:{
    component: dynamic(() => import('./youtube/chat'), {
      loading: () => <AppLoadingState title="Chat" />
    }),
    title: 'Chat',
    icon: '💬',
    width:700,
    height:700
  },
  Capture:{
    component: dynamic(() => import('./youtube/capture'), {
      loading: () => <AppLoadingState title="Capture" />
    }),
    title: 'Capture',
    icon: '📸',
    width:700,
    height:700
  },
  /* currency api */
  Exchange:{
    component: dynamic(() => import('./currency/exchange'), {
      loading: () => <AppLoadingState title="Exchange" />
    }),
    title: 'Exchange',
    icon: '💱',
    width:580,
    height:700
  },
  MarketCurrency:{
    component: dynamic(() => import('./currency/market'), {
      loading: () => <AppLoadingState title="Market" />
    }),
    title: 'Market',
    icon: '📈'
    ,
    width:700,
    height:700
  },
  Quest:{
    component: dynamic(() => import('./currency/quest'), {
      loading: () => <AppLoadingState title="Quest" />
    }),
    title: 'Quest',
    icon: '🏰',
    width:700,
    height:700
  },
  Tax:{
    component: dynamic(() => import('./currency/tax'), {
      loading: () => <AppLoadingState title="Tax" />
    }),
    title: 'Tax',
    icon: '⚖️',
    width:700,
    height:700
  },
  /* news */
  Dashboard:{
    component: dynamic(() => import('./news/dashboard'), {
      loading: () => <AppLoadingState title="Dashboard" />
    }),
    title: 'Dashboard',
    icon: '📰',
    width:700,
    height:700
  },
  EventReport:{
    component: dynamic(() => import('./news/event'), {
      loading: () => <AppLoadingState title="Event Report" />
    }),
    title: 'Event Report',
    icon: '🚨',
    width:700,
    height:700
  },
  Prophecy:{
    component: dynamic(() => import('./news/prophecy'), {
      loading: () => <AppLoadingState title="Prophecy" />
    }),
    title: 'Prophecy',
    icon: '🔮',
    width:700,
    height:700
  },
  Realm:{
    component: dynamic(() => import('./news/network'), {
      loading: () => <AppLoadingState title="Realm" />
    }),
    title: 'Realm',
    icon: '🌌',
    width:700,
    height:700
  },
  /* sports */
  Teams:{
    component: dynamic(() => import('./sports/teams'), {
      loading: () => <AppLoadingState title="Teams" />
    }),
    title: 'Teams',
    icon: '🏆',
    width:510,
    height:700
  },
  Upcoming:{
    component: dynamic(() => import('./sports/upcoming'), {
      loading: () => <AppLoadingState title="Upcoming" />
    }),
    title: 'Upcoming',
    icon: '📅',
    width:700,
    height:700
  },
  Top:{
    component: dynamic(() => import('./sports/top-league'), {
      loading: () => <AppLoadingState title="Top League" />
    }),
    title: 'Top League',
    icon: '🏆',
    width:510,
    height:700
  },
  TeamSearch:{
    component: dynamic(() => import('./sports/team-search'), {
      loading: () => <AppLoadingState title="Team Search" />
    }),
    title: 'Team Search',
    icon: '🔍',
    width:700,
    height:700
  },
  /* ai within ai */
  AiChat:{
    component: dynamic(() => import('./ai/chat'), {
      loading: () => <AppLoadingState title="Ai Chat" />
    }),
    title: 'Ai Chat',
    icon: '💬',
    width:700,
    height:700
  },
  Transcribe:{
    component: dynamic(() => import('./ai/transcribe'), {
      loading: () => <AppLoadingState title="Transcribe" />
    }),
    title: 'Transcribe',
    icon: '🔊',
    width:700,
    height:700
  },
  Vision:{
    component: dynamic(() => import('./ai/vision'), {
      loading: () => <AppLoadingState title="Vision" />
    }),
    title: 'Vision',
    icon: '👁️',
    width:700,
    height:700
  },
  SpellGen:{
    component: dynamic(() => import('./ai/spell-gen'), {
      loading: () => <AppLoadingState title="Spell Gen" />
    }),
    title: 'Spell Gen',
    icon: '🧙',
    width:700,
    height:700
  },
  /* image */
  Canvas:{
    component: dynamic(() => import('./image/canvas'), {
      loading: () => <AppLoadingState title="Canvas" />
    }),
    title: 'Canvas',
    icon: '✧',
    width:700,
    height:700
  },
  ForgeImage:{
    component: dynamic(() => import('./image/forge'), {
      loading: () => <AppLoadingState title="Forge" />
    }),
    title: 'Forge',
    icon: '⚜️',
    width:700,
    height:700
  },
  /* qr */
  Sigil:{
    component: dynamic(() => import('./qr/sigil'), {
      loading: () => <AppLoadingState title="Sigil" />
    }),
    title: 'Sigil',
    icon: '📿',
    width:700,
    height:700
  },
  Runic:{
    component: dynamic(() => import('./qr/runic'), {
      loading: () => <AppLoadingState title="Runic" />
    }),
    title: 'Runic',
    icon: '🔮',
    width:700,
    height:700
  },
  /* speech to text */
  Speech:{
    component: dynamic(() => import('./speech/speech'), {
      loading: () => <AppLoadingState title="Speech" />
    }),
    title: 'Speech',
    icon: '🔊',
    width:700,
    height:700
  },
  Oracle:{
    component: dynamic(() => import('./speech/oracle'), {
      loading: () => <AppLoadingState title="Oracle" />
    }),
    title: 'Oracle',
    icon: '🔮',
    width:700,
    height:700
  },
  Scribe:{
    component: dynamic(() => import('./speech/scribe'), {
      loading: () => <AppLoadingState title="Scribe" />
    }),
    title: 'Scribe',
    icon: '📜',
    width:700,
    height:700
  },
  Crystal:{
    component: dynamic(() => import('./speech/crystal'), {
      loading: () => <AppLoadingState title="Crystal" />
    }),
    title: 'Crystal',
    icon: '💎',
    width:700,
    height:700
  },
};

export const getApps = () => Object.entries(AppComponents).map(([key, app], index) => ({
  id: index + 1,
  title: app.title,
  icon: app.icon,
  component: app.component
}));