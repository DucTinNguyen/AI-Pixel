import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import modalbody from '@/assets/images/modal-body-marketplace.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import skull from '@/assets/images/skull.svg';
import skullbutton from '@/assets/images/skull-button.svg';
import { ContentProps } from '@/types';

import FeatureCard from './feature-card';
import { games } from '@/constants/game';
import { useState } from 'react';

export default function Marketplace({
  closeModal,
  setCurrentTab,
}: ContentProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); 
  const filteredGames = games.filter(
    game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-30 w-[1143px]"
      >
        <div className="absolute h-[524px] w-[1143px]">
          <Image
            src={modalbody}
            alt="modalbody"
            width={1143}
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
              Marketplace
            </p>
          </div>
          <div className="relative -inset-y-6 inset-x-6 z-20 flex w-full items-center justify-end hover:cursor-pointer">
            <Image
              src={modalclose}
              alt="modalclose"
              width={80}
              height={80}
              onClick={closeModal}
              className="absolute select-none hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="relative flex h-[524px] w-full flex-col gap-6 overflow-hidden px-[40px] pt-[60px]">
          <div className="flex items-center gap-6">
            <input
              type="text"
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Searh...( use @ tosearch by author or for category"
              className="h-[56px] flex-1 border-4 border-[#8B98B8] bg-transparent px-6 py-[19px] text-sm text-white placeholder:text-white"
            />
            <button className="relative flex h-16 w-16 items-center justify-center hover:scale-95">
              <Image
                src={skullbutton}
                alt="addcustombutton"
                layout="fill"
                objectFit="cover"
              />
              <Image
                src={skull}
                alt="skull"
                width={32}
                height={42}
                className="z-10"
              />
            </button>
          </div>
          <h1 className="font-junkyard text-base text-white">Feature app</h1>
          <div className="no-scrollbar grid grid-cols-4 justify-between gap-y-10 overflow-auto overflow-y-auto">
            {filteredGames.map((game, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentTab('Feature');
                  router.push(`?feature=${game.id}`);
                }}
              >
                <FeatureCard title={game.title} image={game.image} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
