'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import normalModelIcon from '@/assets/images/normal-model.png';
import normalmodelbutton from '@/assets/images/normal-model-button.svg';
import questionCoin from '@/assets/images/question-coin.png';

export default function NormalModelButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('NORMAL MODEL');
  const options = [
    {
      value: 'NORMAL MODEL',
      icon: normalModelIcon,
    },
    {
      value: 'PAID MODEL',
      icon: questionCoin,
    },
  ];
  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    // Check if the click is outside both the button and the popover
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const chooseOption = (value: string) => {
    setOption(value);
    setIsOpen(false);
  };
  return (
    <div className="relative h-[56px] w-[297px]">
      <Image
        src={normalmodelbutton}
        alt="normalmodelbutton"
        height={56}
        className="absolute select-none"
      />
      <div
        ref={buttonRef}
        className="relative flex h-full items-center justify-center gap-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
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

        <p className="select-none font-silkscreen text-[16px] text-white">
          {option}
        </p>

        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
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
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-1 mt-4 flex flex-col border-[4px] border-[#8B98B8] bg-[#080F1A] p-[6px] font-silkscreen text-sm"
        >
          {options.map(option => (
            <div
              key={option.value}
              className="flex items-center gap-2 p-2 hover:bg-[#272D3D]"
              onClick={() => chooseOption(option.value)}
            >
              <Image
                src={option.icon}
                alt="option.icon"
                className="select-none"
              />
              <div className="select-none">{option.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
