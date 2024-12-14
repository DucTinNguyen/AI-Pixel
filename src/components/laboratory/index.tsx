import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import forgebutton from '@/assets/images/forge-button.svg';
import modalbody from '@/assets/images/modal-body-laboratory.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import NormalModePopover from '@/components/laboratory/normal-model-popover';
import useItemStore from '@/stores/use-item-store';
import { ContentProps } from '@/types';

import Brewing from './brewing';
import CustomFeature from './custom-feature';
import { AppComponents, getApps } from '../projects/app-store/apps';

export default function Laboratory({ closeModal }: ContentProps) {
  const [redbar, setRedbar] = useState(0);
  const [bluebar, setBluebar] = useState(0);
  const [greenbar, setGreenbar] = useState(0);

  const [appName, setAppName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setRedbar(Math.floor(Math.random() * 100));
      setBluebar(Math.floor(Math.random() * 100));
      setGreenbar(Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  });

  const addApp = useItemStore(state => state.addApp);
  const finishAddingApp = useItemStore(state => state.finishAddingApp);


  /* integrate attempt 01 */
  const generateRandomApp = () => {
    const id = Date.now().toString();
    
    // Get all component keys from the registry
    const componentKeys = Object.keys(AppComponents);
    
    // Select a random component
    const randomComponentKey = componentKeys[Math.floor(Math.random() * componentKeys.length)];
    const selectedApp = AppComponents[randomComponentKey];
    
    const randomNumber = Math.floor(Math.random() * 8) + 1

    addApp(
      id,
      appName,
      `/assets/images/app${randomNumber}.svg`, 
      randomComponentKey, // Store the component key for persistence
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
                placeholder="GREETINGS, WELCOME TO THE ALCHEMIST AI"
                value={appName}
                onChange={e => setAppName(e.target.value)}
                className="min-h-[349px] select-none border-[4px] border-[#8B98B8] bg-[#080F1A] p-6 font-silkscreen text-[16px] text-white placeholder-white outline-none"
              ></textarea>

              <CustomFeature />
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
