/* eslint-disable prettier/prettier */
import localFont from 'next/font/local';
import Image from 'next/image';

import addcustombutton from '@/assets/images/add-custom-feature-button.svg';
import brewingsomething from '@/assets/images/brewing-something.svg';
import forgebutton from '@/assets/images/forge-button.svg';
import modalbody from '@/assets/images/modal-body.svg';
import modalclose from '@/assets/images/modal-close.svg';
import modalheader from '@/assets/images/modal-header.svg';
import normalmodelbutton from '@/assets/images/normal-model-button.svg';

export default function Laboratory() {
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
          <p className="font-[family-name:var(--font-junkyard-calibo)] text-gradient z-10 text-2xl">
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
            <div className="min-h-[470px] border-[4px] border-[#8B98B8] bg-[#080F1A] p-6 font-silkscreen text-2xl">
              GREETINGS, WELCOME TO THE ALCHEMIST AI
            </div>
            <div className="h-[80px] w-[576px] hover:cursor-pointer">
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
                <p className="font-silkscreen text-2xl">ADD CUSTOM FEATURE</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="h-[80px] w-[424px] hover:cursor-pointer">
              <Image
                src={normalmodelbutton}
                alt="normalmodelbutton"
                height={80}
                className="absolute select-none"
              />
              <div className="relative z-10 flex h-full items-center justify-center gap-4 p-8">
                <svg
                  width="31"
                  height="24"
                  viewBox="0 0 31 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.51"
                    d="M16.4226 -8.29049e-06L14.0703 0.00585938L14.0778 1.85124L16.4301 1.84538L16.4226 -8.29049e-06Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M21.1667 9.2167L18.8145 9.22257L18.807 7.37719L16.4538 7.38306L16.4389 3.6916L14.0866 3.69747L14.1016 7.38892L11.7484 7.39479L11.7559 9.24018L9.40363 9.24605L9.41112 11.0921L4.7057 11.1038L4.71318 12.9492L9.4186 12.9375L9.42608 14.7836L11.7783 14.7777L11.7858 16.6231L14.139 16.6172L14.1539 20.3087L16.5062 20.3028L16.4912 16.6113L18.8444 16.6055L18.8369 14.7601L21.1892 14.7542L21.1817 12.9082L25.8871 12.8964L25.8796 11.051L21.1742 11.0628L21.1667 9.2167Z"
                    fill="#FFFFC3"
                  />
                  <path
                    opacity="0.51"
                    d="M2.35227 11.1096L0 11.1155L0.00747938 12.9609L2.35975 12.955L2.35227 11.1096Z"
                    fill="#FFFFC3"
                  />
                  <path
                    opacity="0.51"
                    d="M30.5866 11.0393L28.2344 11.0452L28.2419 12.8905L30.5941 12.8847L30.5866 11.0393Z"
                    fill="#FFFFC3"
                  />
                  <path
                    opacity="0.51"
                    d="M16.5124 22.1489L14.1602 22.1548L14.1676 24.0002L16.5199 23.9943L16.5124 22.1489Z"
                    fill="#FFFFC3"
                  />
                </svg>

                <p className="font-silkscreen text-2xl">NORMAL MODEL</p>

                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.26875 6.74463L10.4688 6.74463L10.4687 4.23419L7.26875 4.23419L7.26875 6.74463Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M10.468 9.25513L13.668 9.25513L13.668 6.74469L10.468 6.74469L10.468 9.25513Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M10.468 11.7656L13.668 11.7656L13.668 9.25519L10.468 9.25519L10.468 11.7656Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M13.6672 11.7656L16.8672 11.7656L16.8672 9.25519L13.6672 9.25519L13.6672 11.7656Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M7.26875 11.7656L10.4688 11.7656L10.4687 9.25519L7.26875 9.25519L7.26875 11.7656Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M7.26875 9.25513L10.4688 9.25513L10.4687 6.74469L7.26875 6.74469L7.26875 9.25513Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M4.06562 9.25513L7.26562 9.25513L7.26562 6.74469L4.06562 6.74469L4.06562 9.25513Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M4.06562 11.7656L7.26562 11.7656L7.26562 9.25519L4.06562 9.25519L4.06562 11.7656Z"
                    fill="#FFFFC3"
                  />
                  <path
                    d="M0.866405 11.7656L4.06641 11.7656L4.06641 9.25519L0.866405 9.25519L0.866405 11.7656Z"
                    fill="#FFFFC3"
                  />
                </svg>
              </div>
            </div>

            <div>
              <Image
                src={brewingsomething}
                alt="brewingsomething"
                width={480}
                className="select-none"
              />
            </div>

            <div>
              <Image
                src={forgebutton}
                alt="forgebutton"
                width={480}
                className="select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
