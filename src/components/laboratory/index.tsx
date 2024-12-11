import Image from 'next/image';
import { useEffect, useState } from 'react';

import forgebutton from '@/assets/images/forge-button.svg';
import modalbody from '@/assets/images/modal-body-laboratory.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import NormalModePopover from '@/components/laboratory/normal-model-popover';
import { ContentProps } from '@/types';

import Brewing from './brewing';
import CustomFeature from './custom-feature';

export default function Laboratory({ closeModal }: ContentProps) {
  const [redbar, setRedbar] = useState(0);
  const [bluebar, setBluebar] = useState(0);
  const [greenbar, setGreenbar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRedbar(Math.floor(Math.random() * 100));
      setBluebar(Math.floor(Math.random() * 100));
      setGreenbar(Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div>
        <div className="relative">
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
          <div className="relative flex h-[524px] w-[875px] items-start justify-between px-[40px] pt-[60px]">
            <div className="flex w-[403px] flex-col justify-between gap-6">
              <textarea
                placeholder="GREETINGS, WELCOME TO THE ALCHEMIST AI"
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
