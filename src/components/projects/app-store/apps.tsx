import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { AppLoadingState } from '@/components/projects/loading';


// Define the registry type
interface AppRegistry {
  [key: string]: {
    component: ComponentType;
    title: string;
    icon: string;
  };
}


export const AppComponents: AppRegistry = {
  PointClick:{
    component: dynamic(() => import('./pvp-games/point-click'), {
      loading: () => <AppLoadingState title="Point Click" />
    }),
    title: 'Point Click',
    icon: '🎯'
  },
  MemoryGame:{
    component: dynamic(() => import('./pvp-games/memory'), {
      loading: () => <AppLoadingState title="Memory Game" />
    }),
    title: 'Memory Game',
    icon: '🧠 '
  },
  Snake:{
    component: dynamic(() => import('./pvp-games/snake'), {
      loading: () => <AppLoadingState title="Snake" />
    }),
    title: 'Snake',
    icon: '🐍'
  },
  TicTacToe:{
    component: dynamic(() => import('./pvp-games/tic-tac-toe'), {
      loading: () => <AppLoadingState title="Tic Tac Toe" />
    }),
    title: 'Tic Tac Toe',
    icon: '❌⭕'
  },
  /* token price */
  PriceTracker:{
    component: dynamic(() => import('./token-price/price-tracker'), {
      loading: () => <AppLoadingState title="Price Tracker" />
    }),
    title: 'Price Tracker',
    icon: '💰'
  },
  PriceChart:{
    component: dynamic(() => import('./token-price/price-chart'), {
      loading: () => <AppLoadingState title="Price Chart" />
    }),
    title: 'Price Chart',
    icon: '📈'
  },
  MarketDepth:{
    component: dynamic(() => import('./token-price/market-depth'), {
      loading: () => <AppLoadingState title="Market Depth" />
    }),
    title: 'Market Depth',
    icon: '📊'
  },
  TokenInfo:{
    component: dynamic(() => import('./token-price/token-info'), {
      loading: () => <AppLoadingState title="Token Info" />
    }),
    title: 'Token Info',
    icon: '🔍'
  },
  /* weather */
  WeatherDashboard:{
    component: dynamic(() => import('./weather/dashboard'), {
      loading: () => <AppLoadingState title="Weather Dashboard" />
    }),
    title: 'Weather Dashboard',
    icon: '🌤️'
  },
  ForeCast:{
    component: dynamic(() => import('./weather/forecast'), {
      loading: () => <AppLoadingState title="Forecast" />
    }),
    title: 'Forecast',
    icon: '🌦️'
  },
  Alert:{
    component: dynamic(() => import('./weather/alert'), {
      loading: () => <AppLoadingState title="Alert" />
    }),
    title: 'Alert',
    icon: '⚠️'
  },
  Map:{
    component: dynamic(() => import('./weather/map'), {
      loading: () => <AppLoadingState title="Map" />
    }),
    title: 'Map',
    icon: '🗺️'
  },
  /* video */
  VideoPlayer:{
    component: dynamic(() => import('./video/video-player'), {
      loading: () => <AppLoadingState title="Video Player" />
    }),
    title: 'Video Player',
    icon: '📺'
  },
  AudioExtract:{
    component: dynamic(() => import('./video/audio-extract'), {
      loading: () => <AppLoadingState title="Audio Extract" />
    }),
    title: 'Audio Extract',
    icon: '🔊'
  },
  AudioRecorder:{
    component: dynamic(() => import('./video/audio-record'), {
      loading: () => <AppLoadingState title="Audio Recorder" />
    }),
    title: 'Audio Recorder',
    icon: '🎙️'
  },
  Visualizer:{
    component: dynamic(() => import('./video/visualizer'), {
      loading: () => <AppLoadingState title="Visualizer" />
    }),
    title: 'Visualizer',
    icon: '🎵'
  },
  /* ocr */
  Scanner:{
    component: dynamic(() => import('./ocr/text-scanner'), {
      loading: () => <AppLoadingState title="Scanner" />
    }),
    title: 'Scanner',
    icon: '📄'
  },
  Translator:{
    component: dynamic(() => import('./ocr/spell-trans'), {
      loading: () => <AppLoadingState title="Translator" />
    }),
    title: 'Translator',
    icon: '🔮'
  },
  Caster:{
    component: dynamic(() => import('./ocr/spell-cast'), {
      loading: () => <AppLoadingState title="Caster" />
    }),
    title: 'Caster',
    icon: '🧙'
  },
  Writer:{
    component: dynamic(() => import('./ocr/writer'), {
      loading: () => <AppLoadingState title="Writer" />
    }),
    title: 'Writer',
    icon: '📜'
  },
  /* maps */
  MapSearch:{
    component: dynamic(() => import('./maps/map-search'), {
      loading: () => <AppLoadingState title="Map Search" />
    }),
    title: 'Map Search',
    icon: '🗺️'
  },
  StreetTour:{
    component: dynamic(() => import('./maps/street-tour'), {
      loading: () => <AppLoadingState title="Street Tour" />
    }),
    title: 'Street Tour',
    icon: '🚶'
  },
  ScrollsLocation:{
    component: dynamic(() => import('./maps/scrolls-location'), {
      loading: () => <AppLoadingState title="Scrolls Location" />
    }),
    title: 'Scrolls Location',
    icon: '📜'
  },
  Guide:{
    component: dynamic(() => import('./maps/guide'), {
      loading: () => <AppLoadingState title="Guide" />
    }),
    title: 'Guide',
    icon: '🌙'
  },
  /* city guesser */
  CityGuesser:{
    component: dynamic(() => import('./city-guesser/city-guesser'), {
      loading: () => <AppLoadingState title="City Guesser" />
    }),
    title: 'City Guesser',
    icon: '🌆'
  },
  Distance:{
    component: dynamic(() => import('./city-guesser/distance'), {
      loading: () => <AppLoadingState title="Distance" />
    }),
    title: 'Distance',
    icon: '📏'
  },
  Time:{
    component: dynamic(() => import('./city-guesser/time'), {
      loading: () => <AppLoadingState title="Time" />
    }),
    title: 'Time',
    icon: '⏰'
  },
  Temple:{
    component: dynamic(() => import('./city-guesser/temple'), {
      loading: () => <AppLoadingState title="Temple" />
    }),
    title: 'Temple',
    icon: '🏯'
  },
  /* stocks */
  Metrics:{
    component: dynamic(() => import('./stocks/metrics'), {
      loading: () => <AppLoadingState title="Metrics" />
    }),
    title: 'Metrics',
    icon: '📊'
  },
  Watch:{
    component: dynamic(() => import('./stocks/watch'), {
      loading: () => <AppLoadingState title="Watch" />
    }),
    title: 'Watch',
    icon: '📈'
  },
  Mystic:{
    component: dynamic(() => import('./stocks/mystic'), {
      loading: () => <AppLoadingState title="Mystic" />
    }),
    title: 'Mystic',
    icon: '🔮'
  },
  PortFolio:{
    component: dynamic(() => import('./stocks/portfolio'), {
      loading: () => <AppLoadingState title="PortFolio" />
    }),
    title: 'PortFolio',
    icon: '📈'
  },
  /* token lab */
  AlchemyLab:{
    component: dynamic(() => import('./token/lab'), {
      loading: () => <AppLoadingState title="Alchemy Lab" />
    }),
    title: 'Alchemy Lab',
    icon: '🧪'
  },
  Dungeon:{
    component: dynamic(() => import('./token/dungeon'), {
      loading: () => <AppLoadingState title="Dungeon" />
    }),
    title: 'Dungeon',
    icon: '🏰'
  },
  Market:{
    component: dynamic(() => import('./token/market'), {
      loading: () => <AppLoadingState title="Market" />
    }),
    title: 'Market',
    icon: '📈'
  },
  Forge:{
    component: dynamic(() => import('./token/forge'), {
      loading: () => <AppLoadingState title="Forge" />
    }),
    title: 'Forge',
    icon: '🔥'
  },
  /* youtube */
  MagicalPlayer:{
    component: dynamic(() => import('./youtube/spell-tube'), {
      loading: () => <AppLoadingState title="Magical Player" />
    }),
    title: 'Magical Player',
    icon: '🎩'
  },
  VisualizerVideo:{
    component: dynamic(() => import('./youtube/visualizer'), {
      loading: () => <AppLoadingState title="Visualizer" />
    }),
    title: 'Visualizer',
    icon: '🎵'
  },
  Chat:{
    component: dynamic(() => import('./youtube/chat'), {
      loading: () => <AppLoadingState title="Chat" />
    }),
    title: 'Chat',
    icon: '💬'
  },
  Capture:{
    component: dynamic(() => import('./youtube/capture'), {
      loading: () => <AppLoadingState title="Capture" />
    }),
    title: 'Capture',
    icon: '📸'
  },
  /* currency api */
  Exchange:{
    component: dynamic(() => import('./currency/exchange'), {
      loading: () => <AppLoadingState title="Exchange" />
    }),
    title: 'Exchange',
    icon: '💱'
  },
  MarketCurrency:{
    component: dynamic(() => import('./currency/market'), {
      loading: () => <AppLoadingState title="Market" />
    }),
    title: 'Market',
    icon: '📈'
  },
  Quest:{
    component: dynamic(() => import('./currency/quest'), {
      loading: () => <AppLoadingState title="Quest" />
    }),
    title: 'Quest',
    icon: '🏰'
  },
  Tax:{
    component: dynamic(() => import('./currency/tax'), {
      loading: () => <AppLoadingState title="Tax" />
    }),
    title: 'Tax',
    icon: '⚖️'
  },
  /* news */
  Dashboard:{
    component: dynamic(() => import('./news/dashboard'), {
      loading: () => <AppLoadingState title="Dashboard" />
    }),
    title: 'Dashboard',
    icon: '📰'
  },
  EventReport:{
    component: dynamic(() => import('./news/event'), {
      loading: () => <AppLoadingState title="Event Report" />
    }),
    title: 'Event Report',
    icon: '🚨'
  },
  Prophecy:{
    component: dynamic(() => import('./news/prophecy'), {
      loading: () => <AppLoadingState title="Prophecy" />
    }),
    title: 'Prophecy',
    icon: '🔮'
  },
  Realm:{
    component: dynamic(() => import('./news/network'), {
      loading: () => <AppLoadingState title="Realm" />
    }),
    title: 'Realm',
    icon: '🌌'
  },
  /* sports */
  Teams:{
    component: dynamic(() => import('./sports/teams'), {
      loading: () => <AppLoadingState title="Teams" />
    }),
    title: 'Teams',
    icon: '🏆'
  },
  Upcoming:{
    component: dynamic(() => import('./sports/upcoming'), {
      loading: () => <AppLoadingState title="Upcoming" />
    }),
    title: 'Upcoming',
    icon: '📅'
  },
  Top:{
    component: dynamic(() => import('./sports/top-league'), {
      loading: () => <AppLoadingState title="Top League" />
    }),
    title: 'Top League',
    icon: '🏆'
  },
  TeamSearch:{
    component: dynamic(() => import('./sports/team-search'), {
      loading: () => <AppLoadingState title="Team Search" />
    }),
    title: 'Team Search',
    icon: '🔍'
  },
  /* ai within ai */
  AiChat:{
    component: dynamic(() => import('./ai/chat'), {
      loading: () => <AppLoadingState title="Ai Chat" />
    }),
    title: 'Ai Chat',
    icon: '💬'
  },
  Transcribe:{
    component: dynamic(() => import('./ai/transcribe'), {
      loading: () => <AppLoadingState title="Transcribe" />
    }),
    title: 'Transcribe',
    icon: '🔊'
  },
  Vision:{
    component: dynamic(() => import('./ai/vision'), {
      loading: () => <AppLoadingState title="Vision" />
    }),
    title: 'Vision',
    icon: '👁️'
  },
  SpellGen:{
    component: dynamic(() => import('./ai/spell-gen'), {
      loading: () => <AppLoadingState title="Spell Gen" />
    }),
    title: 'Spell Gen',
    icon: '🧙'
  },
  /* image */
  Canvas:{
    component: dynamic(() => import('./image/canvas'), {
      loading: () => <AppLoadingState title="Canvas" />
    }),
    title: 'Canvas',
    icon: '✧'
  },
  ForgeImage:{
    component: dynamic(() => import('./image/forge'), {
      loading: () => <AppLoadingState title="Forge" />
    }),
    title: 'Forge',
    icon: '⚜️'
  },
  /* qr */
  Sigil:{
    component: dynamic(() => import('./qr/sigil'), {
      loading: () => <AppLoadingState title="Sigil" />
    }),
    title: 'Sigil',
    icon: '📿'
  },
  Runic:{
    component: dynamic(() => import('./qr/runic'), {
      loading: () => <AppLoadingState title="Runic" />
    }),
    title: 'Runic',
    icon: '🔮'
  },
  /* speech to text */
  Speech:{
    component: dynamic(() => import('./speech/speech'), {
      loading: () => <AppLoadingState title="Speech" />
    }),
    title: 'Speech',
    icon: '🔊'
  },
  Oracle:{
    component: dynamic(() => import('./speech/oracle'), {
      loading: () => <AppLoadingState title="Oracle" />
    }),
    title: 'Oracle',
    icon: '🔮'
  },
  Scribe:{
    component: dynamic(() => import('./speech/scribe'), {
      loading: () => <AppLoadingState title="Scribe" />
    }),
    title: 'Scribe',
    icon: '📜'
  },
  Crystal:{
    component: dynamic(() => import('./speech/crystal'), {
      loading: () => <AppLoadingState title="Crystal" />
    }),
    title: 'Crystal',
    icon: '💎'
  },
};

export const getApps = () => Object.entries(AppComponents).map(([key, app], index) => ({
  id: index + 1,
  title: app.title,
  icon: app.icon,
  component: app.component
}));