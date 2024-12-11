import React from 'react';
import test from '@/assets/images/test-card.png';
import Image from 'next/image';

const PixelFrame = () => {
  return (
    <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full">
      <Image
        src={test}
        alt="pixel"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-full w-full"
        >
          <path
            d="M30.9311 11.7215V9.58787H29.8659V7.45429H28.8008V5.30554H27.7318V4.2558H26.6667V3.1909H24.5326V2.12222H22.3985V1.05732H20.2644V0H11.7318V1.06869H9.60152V2.12222H7.46743V3.1909H5.33334V4.2558H4.26818V5.30554H3.19924V7.43913H2.13409V9.58787H1.06515V11.7215H0V20.252H1.06515V22.3856H2.13409V24.5154H3.19924V26.649H4.26818V27.7177H5.33334V28.8015H7.46743V29.8664H9.60152V30.9351H11.7318V32H20.2644V30.9351H22.3985V29.8664H24.5326V28.8015H26.6667V27.7366H27.7318V26.6679H28.8008V24.5343H29.8659V22.4045H30.9311V20.271H32V11.7215H30.9311ZM28.8008 20.252V22.3856H27.7318V24.5154H26.6667V25.5841H25.5977V26.649H24.5326V27.7177H22.3985V28.8015H20.2644V29.8664H11.7318V28.8015H9.60152V27.7366H7.46743V26.6679H6.39849V25.603H5.33334V24.5343H4.26818V22.4045H3.19924V20.271H2.13409V11.7215H3.19924V9.58787H4.26818V7.45429H5.33334V6.38939H6.39849V5.30554H7.46743V4.2558H9.60152V3.1909H11.7318V2.12222H20.2644V3.1909H22.3985V4.2558H24.5326V5.30554H25.5977V6.37423H26.6667V7.43913H27.7318V9.58787H28.8008V11.7215H29.8659V20.252H28.8008Z"
            fill="#ED8A1C"
          />
        </svg>
      </div>
    </div>
  );
};

export default PixelFrame;
