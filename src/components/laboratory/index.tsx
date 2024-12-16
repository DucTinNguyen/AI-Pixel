import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import forgebutton from '@/assets/images/forge-button.svg';
import modalbody from '@/assets/images/modal-body-laboratory.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import NormalModePopover from '@/components/laboratory/normal-model-popover';
import CustomFeature from '@/components/laboratory/custom-feature';
import useItemStore from '@/stores/use-item-store';
import { ContentProps } from '@/types';
import { AppComponents } from '../projects/app-store/apps';
import Brewing from './brewing';

// Feature to Apps mapping
const featureToAppsMap: { [key: string]: string[] } = {
  'AUTO': [], // Special case - includes all apps
  'YOUTUBE DOWNLOADER': ['MagicalPlayer', 'VisualizerVideo', 'Chat', 'Capture'],
  'NORMAL MODEL': ['AiChat', 'Transcribe', 'Vision', 'SpellGen'],
  'CITY GUESSER API': ['CityGuesser', 'Distance', 'Time', 'Temple'],
  'WEATHER API': ['WeatherDashboard', 'ForeCast', 'Alert', 'Map'],
  'STOCKS API': ['Metrics', 'Watch', 'Mystic', 'PortFolio'],
  'VIDEO/AUDIO API': ['VideoPlayer', 'AudioExtract', 'AudioRecorder', 'Visualizer'],
  'BLOCKCHAIN TOKEN API': ['AlchemyLab', 'Dungeon', 'Market', 'Forge'],
  'TOKEN PRICE API': ['PriceTracker', 'PriceChart', 'MarketDepth', 'TokenInfo'],
  'SPEECH TO TEXT API': ['Speech', 'Oracle', 'Scribe', 'Crystal'],
  'MAPS API': ['MapSearch', 'StreetTour', 'ScrollsLocation', 'Guide'],
  'CURRENCY API': ['Exchange', 'MarketCurrency', 'Quest', 'Tax'],
  'OCR ANALYZER': ['Scanner', 'Translator', 'Caster', 'Writer'],
  'NEWS API': ['Dashboard', 'EventReport', 'Prophecy', 'Realm'],
  'GAMES API': ['PointClick', 'MemoryGame', 'Snake', 'TicTacToe'],
  'IMAGE API': ['Canvas', 'ForgeImage'],
  'QR API': ['Sigil', 'Runic'],
  'SPORTS API': ['Teams', 'Upcoming', 'Top', 'TeamSearch']
};

// Keyword to Apps mapping
const keywordToAppsMap: { [key: string]: string[] } = {
  // Video/Audio related
  'VIDEO': ['VideoPlayer', 'VisualizerVideo', 'AudioExtract', 'Visualizer'],
  'AUDIO': ['AudioExtract', 'AudioRecorder', 'Visualizer', 'VideoPlayer'],
  'YOUTUBE': ['MagicalPlayer', 'VisualizerVideo', 'Chat', 'Capture'],
  'PLAYER': ['VideoPlayer', 'MagicalPlayer', 'AudioExtract'],
  
  // Finance related
  'STOCK': ['Metrics', 'Watch', 'Mystic', 'PortFolio'],
  'PRICE': ['PriceTracker', 'PriceChart', 'MarketDepth', 'TokenInfo'],
  'MARKET': ['Market', 'MarketDepth', 'MarketCurrency'],
  'TOKEN': ['AlchemyLab', 'TokenInfo', 'PriceTracker'],
  'EXCHANGE': ['Exchange', 'MarketCurrency'],
  
  // Location related
  'MAP': ['MapSearch', 'StreetTour', 'ScrollsLocation'],
  'CITY': ['CityGuesser', 'Distance', 'Time'],
  'WEATHER': ['WeatherDashboard', 'ForeCast', 'Alert'],
  
  // AI/ML related
  'AI': ['AiChat', 'Vision', 'Speech'],
  'CHAT': ['AiChat', 'Chat'],
  'SPEECH': ['Speech', 'Oracle', 'Scribe'],
  'VISION': ['Vision', 'Scanner', 'Canvas'],
  
  // Games related
  'GAME': ['PointClick', 'MemoryGame', 'Snake', 'TicTacToe'],
  'PLAY': ['PointClick', 'MemoryGame', 'Snake'],
  
  // Utility related
  'SCAN': ['Scanner', 'Translator', 'Writer'],
  'QR': ['Sigil', 'Runic'],
  'NEWS': ['Dashboard', 'EventReport', 'Prophecy'],
  'SPORTS': ['Teams', 'Upcoming', 'Top']
};

interface Feature {
  name: string;
  value: boolean;
}

export default function Laboratory({ closeModal }: ContentProps) {
  const [redbar, setRedbar] = useState(0);
  const [bluebar, setBluebar] = useState(0);
  const [greenbar, setGreenbar] = useState(0);
  const [appName, setAppName] = useState('');
  
  const [features, setFeatures] = useState<Feature[]>([
    { name: 'AUTO', value: false },
    { name: 'YOUTUBE DOWNLOADER', value: false },
    { name: 'NORMAL MODEL', value: false },
    { name: 'CITY GUESSER API', value: true },
    { name: 'WEATHER API', value: true },
    { name: 'STOCKS API', value: false },
    { name: 'VIDEO/AUDIO API', value: false },
    { name: 'BLOCKCHAIN TOKEN API', value: true },
    { name: 'TOKEN PRICE API', value: false },
    { name: 'SPEECH TO TEXT API', value: false },
    { name: 'MAPS API', value: false },
    { name: 'CURRENCY API', value: false },
    { name: 'OCR ANALYZER', value: false },
    { name: 'NEWS API', value: false },
    { name: 'GAMES API', value: false },
    { name: 'IMAGE API', value: false },
    { name: 'QR API', value: false },
    { name: 'SPORTS API', value: false }
  ]);

  const addApp = useItemStore(state => state.addApp);
  const finishAddingApp = useItemStore(state => state.finishAddingApp);

  useEffect(() => {
    const interval = setInterval(() => {
      setRedbar(Math.floor(Math.random() * 100));
      setBluebar(Math.floor(Math.random() * 100));
      setGreenbar(Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const findMatchingAppsByKeyword = (inputText: string): string[] | null => {
    // Convert input to uppercase for case-insensitive matching
    const upperInput = inputText.toUpperCase();
    
    // Find the first matching keyword
    for (const [keyword, apps] of Object.entries(keywordToAppsMap)) {
      if (upperInput.includes(keyword)) {
        return apps;
      }
    }
    
    return null;
  };

  const generateRandomApp = () => {
    const id = Date.now().toString();
    let availableApps: string[] = [];
    
    // First priority: Check for keyword matches in the app name
    const keywordMatchedApps = findMatchingAppsByKeyword(appName);
    
    if (keywordMatchedApps) {
      availableApps = keywordMatchedApps;
    } else {
      // Second priority: Use feature selection
      const enabledFeatures = features.filter(f => f.value);
      
      if (enabledFeatures.length === 0) {
        console.warn('No features enabled');
        return;
      }

      // If AUTO is enabled, select from all apps
      if (enabledFeatures.find(f => f.name === 'AUTO')) {
        availableApps = Object.keys(AppComponents);
      } else {
        // Get apps from enabled features
        availableApps = enabledFeatures.flatMap(feature => 
          featureToAppsMap[feature.name] || []
        );
      }
    }
    
    if (availableApps.length === 0) {
      console.warn('No apps available for selection');
      return;
    }
    
    // Select random app from available apps
    const randomAppKey = availableApps[Math.floor(Math.random() * availableApps.length)];
    const selectedApp = AppComponents[randomAppKey];
    
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    
    addApp(
      id,
      appName || 'New App', // Provide default name if appName is empty
      `/assets/images/app${randomNumber}.svg`,
      randomAppKey,
      selectedApp.width,
      selectedApp.height
    );

    setTimeout(() => {
      finishAddingApp(id);
    }, 5000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative z-30">
          <div className="absolute h-[524px] w-[875px]">
            <Image
              src={modalbody}
              alt="modalbody"
              width={875}
              className="absolute inset-0 select-none"
            />
            <div className="relative -inset-[14px] flex w-full items-center justify-center">
              <Image
                src={modalheader}
                alt="modalheader"
                width={338}
                className="absolute select-none"
              />
              <p className="text-gradient relative select-none font-[family-name:var(--font-junkyard-calibo)] text-2xl">
                LABORATORY
              </p>
            </div>
            <div
              className="relative -inset-y-6 inset-x-6 flex w-full items-center justify-end hover:cursor-pointer"
              onClick={closeModal}
            >
              <Image
                src={modalclose}
                alt="modalclose"
                width={80}
                className="absolute select-none"
              />
            </div>
          </div>
          <div className="relative top-[60px] flex h-[524px] w-[875px] items-start justify-between px-[40px]">
            <div className="flex w-[403px] flex-col justify-between gap-6">
              <textarea
                placeholder="Forge World with Vulcan AI"
                value={appName}
                onChange={e => setAppName(e.target.value)}
                className="min-h-[349px] select-none border-[4px] border-[#8B98B8] bg-[#080F1A] p-6 font-silkscreen text-[16px] text-white placeholder-white outline-none"
              />

              <CustomFeature features={features} setFeatures={setFeatures} />
            </div>
            <div className="flex min-h-[429px] flex-col justify-between">
              <NormalModePopover />
              <Brewing redbar={redbar} bluebar={bluebar} greenbar={greenbar} />
              <Image
                src={forgebutton}
                alt="forgebutton"
                width={379}
                className="select-none hover:scale-95 hover:cursor-pointer"
                onClick={() => {
                  generateRandomApp();
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}