// components/PopupHeader.tsx
import React from 'react';
import folderHeader from '@/assets/images/folder-header.svg';
import folderClose from '@/assets/images/folder-close.svg';

interface PopupHeaderProps {
  title: string;
  onClose: () => void;
  width: number;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ title, onClose, width }) => (
  <div className="relative flex h-[56px]" style={{ 
    width:width,
    height:56 
    }}>

    <div className="absolute inset-0 w-full h-[56px]">
      <img
        src={folderHeader.src}
        alt="window header"
        className="min-w-full min-h-full"
        style={{
          objectFit: 'fill',  // This forces the image to stretch
          width: '100%',
          height: '100%',
          minWidth: '100%',
          minHeight: '100%',
        }}
        draggable={false}
      />
    </div>


    <div className="relative w-full flex items-center justify-between px-[18px] h-full">
      <div className="select-none text-[#ffd700] font-silkscreen text-center flex-1">
        {title}
      </div>
      <button 
        className="w-[40px] h-[40px] flex items-center justify-center absolute right-[18px]" 
        onClick={onClose}
      >
        <img src={folderClose.src} alt="close" className="select-none hover:cursor-pointer" draggable={false} />
      </button>
    </div>
  </div>
);

export default PopupHeader;