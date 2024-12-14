import Image, { StaticImageData } from 'next/image';
import React from 'react';


const FeatureCard = ({
  title,
  image,
}: {
  title: string;
  image: StaticImageData;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[220px] w-[219px] shadow-[-3.745px_0px_0px_0px_#A9ACB8,0px_-3.745px_0px_0px_#A9ACB8,0px_3.745px_0px_0px_#000,3.745px_0px_0px_0px_#000]">
        {/* Background and shadow container */}
        <div className="absolute inset-0 bg-[rgba(36,47,50,0.46)]" />

        {/* SVG Frame */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="2.81055" width="2.80851" height="214.383" fill="#D9D9D9" />
          <rect
            x="2.80859"
            y="8.42761"
            width="2.80851"
            height="211.574"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            x="213.445"
            y="8.42761"
            width="2.80851"
            height="208.766"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            x="216.254"
            y="2.81055"
            width="2.80851"
            height="214.383"
            fill="#D9D9D9"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(-1 0 0 1 213.445 2.81055)"
            fill="#D9D9D9"
          />
          <rect
            x="2.80859"
            y="2.81042"
            width="2.8085"
            height="213.447"
            transform="rotate(-90 2.80859 2.81042)"
            fill="#D9D9D9"
          />
          <rect
            x="8.42578"
            y="5.61902"
            width="2.8085"
            height="202.213"
            transform="rotate(-90 8.42578 5.61902)"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            x="2.80859"
            y="5.61902"
            width="2.80851"
            height="2.80851"
            fill="#D9D9D9"
          />
          <rect
            x="5.61719"
            y="5.61902"
            width="2.80851"
            height="2.80851"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(-1 0 0 1 216.254 5.61902)"
            fill="#D9D9D9"
          />
          <rect
            x="5.61719"
            y="2.81042"
            width="2.80851"
            height="2.80851"
            fill="#D9D9D9"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(-1 0 0 1 213.445 5.61902)"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            x="2.80859"
            y="220.002"
            width="2.8085"
            height="213.447"
            transform="rotate(-90 2.80859 220.002)"
            fill="#D9D9D9"
          />
          <rect
            width="2.8085"
            height="202.213"
            transform="matrix(-4.37114e-08 1 1 4.37114e-08 8.42578 214.385)"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(1 0 0 -1 2.80859 214.385)"
            fill="#D9D9D9"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(1 0 0 -1 5.61719 214.385)"
            fill="black"
            fillOpacity="0.16"
          />
          <rect
            x="216.254"
            y="214.385"
            width="2.80851"
            height="2.80851"
            transform="rotate(180 216.254 214.385)"
            fill="#D9D9D9"
          />
          <rect
            x="213.445"
            y="217.193"
            width="2.80851"
            height="2.80851"
            transform="rotate(180 213.445 217.193)"
            fill="#D9D9D9"
          />
          <rect
            width="2.80851"
            height="2.80851"
            transform="matrix(1 0 0 -1 5.61719 217.193)"
            fill="#D9D9D9"
          />
          <rect
            x="213.445"
            y="214.385"
            width="2.80851"
            height="2.80851"
            transform="rotate(180 213.445 214.385)"
            fill="black"
            fillOpacity="0.16"
          />
        </svg>

        {/* Image container */}
        <div className="relative h-full p-3">
          <div className="relative h-[195px] w-[194px]">
            <Image src={image} alt="test" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>

      <span className="font-silkscreen text-sm text-white">
        {title}
      </span>
    </div>
  );
};

export default FeatureCard;
