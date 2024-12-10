/* eslint-disable prettier/prettier */
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import addcustombutton from '@/assets/images/add-custom-feature-button.svg';
import brewingsomething from '@/assets/images/brewing-something.svg';
import forgebutton from '@/assets/images/forge-button.svg';
import modalbody from '@/assets/images/modal-body.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import Brewing from '@/components/laboratory/brewing';
import NormalModePopover from '@/components/laboratory/normal-model-popover';

export default function Laboratory() {
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
    <div className="relative z-10 min-h-screen items-center justify-items-center pl-[370px] pr-[350px] pt-[80px] text-lg">
      <div className="relative h-full w-full">
        <Image
          src={modalbody}
          alt="modalbody"
          className="absolute inset-0 w-full select-none"
        />
        <div className="absolute -inset-[14px] z-50 flex w-full items-center justify-center">
          <Image
            src={modalheader}
            alt="modalheader"
            width={450}
            className="absolute select-none"
          />
          <p className="text-gradient z-10 select-none font-[family-name:var(--font-junkyard-calibo)] text-2xl">
            LABORATORY
          </p>
        </div>
        <div className="absolute inset-x-[30px] inset-y-4 z-50 flex w-full items-center justify-end">
          <Image
            src={modalclose}
            alt="modalclose"
            width={120}
            className="absolute select-none"
          />
        </div>
      </div>
      <div className="relative z-10 flex w-full items-center justify-center px-[54px] pt-[80px]">
        <div className="flex justify-between gap-8">
          <div className="flex w-[576px] flex-col gap-6">
            <textarea
              placeholder="GREETINGS, WELCOME TO THE ALCHEMIST AI"
              className="selscale-95 min-h-[470px] select-none border-[4px] border-[#8B98B8] bg-[#080F1A] p-6 font-silkscreen text-2xl outline-none"
            ></textarea>
            <div className="h-[80px] w-[576px] hover:scale-95 hover:cursor-pointer">
              <Image
                src={addcustombutton}
                alt="addcustombutton"
                height={80}
                className="absolute select-none"
              />
              <div className="relative z-10 flex h-full items-center justify-center gap-4 p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <g filter="url(#filter0_d_2915_17696)">
                    <path
                      d="M3.92904 11H7.85807V7.3341H11.7871V3.66589H7.85807V0H3.92904V3.66589H0V7.3341H3.92904V11Z"
                      fill="#F6EBEB"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2915_17696"
                      x="0"
                      y="0"
                      width="12.7635"
                      height="11.9783"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="0.978333" dy="0.978333" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.333333 0 0 0 0 0.0862745 0 0 0 0 0.168627 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2915_17696"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2915_17696"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <p className="select-none font-silkscreen text-2xl">
                  ADD CUSTOM FEATURE
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <NormalModePopover />

            <Brewing redbar={redbar} bluebar={bluebar} greenbar={greenbar} />

            <Image
              src={forgebutton}
              alt="forgebutton"
              width={480}
              className="select-none hover:scale-95 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
