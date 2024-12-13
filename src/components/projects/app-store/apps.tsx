import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { AppLoadingState } from '@/components/projects/loading';
import { title } from 'process';
import TicTacToe from './pvp-games/tic-tac-toe';

// Define the registry type
interface AppRegistry {
  [key: string]: {
    component: ComponentType;
    title: string;
    icon: string;
  };
}


export const AppComponents: AppRegistry = {
  Notes: {
    component: dynamic(() => import('./notes'), {
      loading: () => <AppLoadingState title="Notes" />
    }),
    title: 'Notes',
    icon: '📝'
  },
  Calculator: {
    component: dynamic(() => import('./calculator'), {
      loading: () => <AppLoadingState title="Calculator" />
    }),
    title: 'Calculator',
    icon: '🧮'
  },
  Calendar: {
    component: dynamic(() => import('./calendar'), {
      loading: () => <AppLoadingState title="Calendar" />
    }),
    title: 'Calendar',
    icon: '📅'
  },
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
  }

  // Add more apps here...
};

export const getApps = () => Object.entries(AppComponents).map(([key, app], index) => ({
  id: index + 1,
  title: app.title,
  icon: app.icon,
  component: app.component
}));