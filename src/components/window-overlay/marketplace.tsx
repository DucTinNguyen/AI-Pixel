import React from 'react';
import PopupHeader from './app-header';

interface MarketplacePopupProps {
  onClose: () => void;
}

const MarketplacePopup: React.FC<MarketplacePopupProps> = ({ onClose }) => (
  <div className="w-[400px] absolute right-[-320px] top-0 h-full">
    <PopupHeader title="Marketplace" onClose={onClose} width={400}/>
    <div className="w-full border-x-2 border-b-2 border-[#8b98b8] bg-[#192539] h-[calc(100%-56px)]">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="bg-[#0f172a] p-4 rounded border border-[#8b98b8]">
            <h3 className="text-[#ffd700] mb-2">Item Name</h3>
            <p className="text-[#99a0ae]">Item description goes here</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-[#ffd700]">Price: 100</span>
              <button className="px-4 py-2 bg-[#8b98b8] text-white rounded">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MarketplacePopup;