import Image from 'next/image';
import React from 'react';

import buttonSelected from '@/assets/images/button-selected.png';
import button from '@/assets/images/button.png';
interface Props {
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isOpen?: boolean;
  modalElement?: React.ReactNode;
  title: string;
}
export default function TabButton({
  onClick,
  isOpen,
  isActive,
  title,
}: Props) {

  return (
    <>
      <div
        className={`relative inline-flex h-[49px] w-[208px] items-center justify-center hover:cursor-pointer`}
        onClick={onClick}
      >
        {isOpen ? (
          <Image
            src={buttonSelected}
            alt={title}
            width={208}
            className="absolute select-none"
          />
        ) : (
          <Image
            src={button}
            alt={title}
            width={208}
            className="absolute select-none"
          />
        )}
        <div
          className={`tab-text relative select-none font-junkyard text-xl ${isOpen ? 'text-[#FDC840]' : isActive ? 'text-[#DD831A]' : 'text-[#747474]'}`}
        >
          {title}
        </div>
      </div>
    </>
  );
}
