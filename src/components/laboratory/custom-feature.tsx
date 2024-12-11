import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';

import addcustombutton from '@/assets/images/add-custom-feature-button.svg';
import modalbody from '@/assets/images/modal-body-custom-feature.svg';
import modalheader from '@/assets/images/modal-header.svg';
import modalclose from '@/assets/images/modal-close.svg';

export default function CustomFeature() {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(39, 39, 39, 0.60)',
    },
    content: {
      border: 'none',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };
  const [isOpen, setIsOpen] = useState(false);

  const [features, setFeatures] = useState([
    {
      name: 'AUTO',
      value: false,
    },
    {
      name: 'YOUTUBE DOWNLOADER',
      value: false,
    },
    {
      name: 'NORMAL MODEL',
      value: false,
    },
    {
      name: 'CITY GUESSER API',
      value: true,
    },
    {
      name: 'WEATHER API',
      value: true,
    },
    {
      name: 'STOCKS API',
      value: false,
    },
    {
      name: 'VIDEO/AUDIO API',
      value: false,
    },
    {
      name: 'BLOCKCHAIN TOKEN API',
      value: true,
    },
    {
      name: 'TOKEN PRICE API',
      value: false,
    },
    {
      name: 'SPEECH TO TEXT API',
      value: false,
    },
    {
      name: 'MAPS API',
      value: false,
    },
    {
      name: 'CURRENCY API',
      value: false,
    },
    {
      name: 'OCR ANALYZER',
      value: false,
    },
    {
      name: 'NEWS API',
      value: false,
    },
  ]);

  function toggleFeature(index: number) {
    const newFeatures = [...features];
    newFeatures[index].value = !newFeatures[index].value;
    setFeatures(newFeatures);
  }
  return (
    <>
      <div
        className="h-[56px] w-[403px] hover:scale-95 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={addcustombutton}
          alt="addcustombutton"
          height={56}
          className="absolute select-none"
        />
        <div className="relative flex h-full items-center justify-center gap-4">
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
          <p className="select-none font-silkscreen text-[16px]">
            ADD CUSTOM FEATURE
          </p>
        </div>
      </div>
      <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
        <div className="relative h-[545px] w-[669px]">
          <div className="absolute h-[545px] w-[669px]">
            <Image
              src={modalbody}
              alt="modalbody"
              width={669}
              className="absolute inset-0 select-none"
            />
            <div className="relative -inset-[14px] z-50 flex w-full items-center justify-center">
              <Image
                src={modalheader}
                alt="modalheader"
                width={338}
                className="absolute select-none"
              />
              <p className="text-gradient z-10 select-none font-[family-name:var(--font-junkyard-calibo)] text-2xl">
                CUSTOM FEATURE
              </p>
            </div>
            <div
              className="relative -inset-y-6 inset-x-6 z-50 flex w-full items-center justify-end hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={modalclose}
                alt="modalclose"
                width={80}
                className="absolute select-none"
              />
            </div>
          </div>
          <div className="relative grid w-[669px] grid-cols-2 gap-y-8 px-10 pt-20">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex items-center gap-4">
                <div
                  className={`flex size-6 items-center justify-center border-[3px] hover:cursor-pointer ${feature.value ? 'border-[#FDC840]' : 'border-[#696969]'} `}
                  onClick={() => toggleFeature(index)}
                >
                  {feature.value && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="14" height="14" fill="#FDC840" />
                      <path d="M14 14H0L7 6L14 14Z" fill="#CB9C24" />
                      <path
                        d="M-1.56563e-06 14L-9.53674e-07 -3.0598e-07L7 6L-1.56563e-06 14Z"
                        fill="#8B7231"
                      />
                      <path
                        d="M14 8.34742e-08L14 14L7 6L14 8.34742e-08Z"
                        fill="#FFDF8C"
                      />
                    </svg>
                  )}
                </div>
                <p
                  className="select-none font-silkscreen text-[16px] font-bold"
                  style={{
                    color: index === 0 ? '#FDC840' : '#FFFFFF',
                  }}
                >
                  {feature.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
