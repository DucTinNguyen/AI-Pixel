import React from 'react';
import PopupHeader from './app-header';
import Image from 'next/image';
import styles from './chat.module.css';
import addButton from "@/assets/images/add-button-mkp.png";

interface MarketplacePopupProps {
  onClose: () => void;
  capturedImage: string | null;
}

const MarketplacePopup: React.FC<MarketplacePopupProps> = ({ onClose, capturedImage }) => (
  <div className="w-[318px] absolute -right-[340px] top-0 h-full">
    <PopupHeader title="Marketplace" onClose={onClose} width={318}/>
    <div 
      className="w-full border-x-[5px] border-b-[5px] border-[#A9ACB8] bg-[#192539] 
      h-[calc(100%-56px)] px-[18px] py-4 flex flex-col items-center gap-4 text-[#747474]
      text-[14px] leading-[150%] font-silkscreen tracking-[-0.2px] relative
      "
    >    
        {capturedImage && <Image src={capturedImage} alt="game capture" width={170} height={170} />}

        <div className='w-full px-6 py-4 bg-[#24262D] border-[3px] border-[#606576]'>
          Author
        </div>

        <div className='w-full px-6 py-4 flex items-start justify-start h-[95px] 
        bg-[#24262D] border-[3px] border-[#606576]'>
          Description
        </div>

        <div className='w-full px-6 py-4 bg-[#24262D] border-[3px] border-[#606576]'>
          Price ($symbol)
        </div>

        <button>
          <Image src={addButton} alt="add button" width={282} height={64} />
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Coming Soon */}
        <div className="absolute w-full flex items-center justify-center top-12">
          <div className={`w-fit p-[10px] bg-[#2A3854] text-sm text-slate-300 
            font-silkscreen rounded ${styles.comingSoon}`}>
            COMING SOON!
          </div>
        </div>
    </div>
  </div>
);

export default MarketplacePopup;