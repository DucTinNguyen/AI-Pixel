'use client';

import React, { useRef, useState } from 'react';
import useItemStore from "@/stores/use-item-store";
import useWindowStore from "@/stores/use-window-store";
import { Item } from "@/types";
import folderHeader from '@/assets/images/folder-header.svg';
import folderClose from '@/assets/images/folder-close.svg';
import folderSave from "@/assets/images/folder-save.svg";
import folderShare from "@/assets/images/folder-share.svg";
import folderChat from "@/assets/images/folder-chat.svg";
import folderScreen from "@/assets/images/folder-screen.svg";
import folderMinimize from "@/assets/images/folder-minimize.svg";
import ChatPopup from './chat';
import MarketplacePopup from './marketplace';

interface GameWindowProps {
  game: Item;
  closeGame: () => void;
  windowId: number;
}

const GameWindow: React.FC<GameWindowProps> = ({ game, closeGame, windowId }) => {
  const [showChat, setShowChat] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  
  const minimizeWindow = useWindowStore(state => state.minimizeWindow);
  const getComponent = useItemStore(state => state.getComponent);
  
  const GameComponent = game.componentKey ? getComponent(game.componentKey) : undefined;

  if (useWindowStore(state => state.windows.find(w => w.id === windowId)?.isMinimized)) {
    return null;
  }

  const captureWindow = async () => {
    if (!windowRef.current) return;
    
    try {
      setIsCapturing(true);
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(windowRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        windowWidth: windowRef.current.scrollWidth,
        windowHeight: windowRef.current.scrollHeight,
      });
      
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      setShowMarketplace(true);
    } catch (err) {
      console.error('Failed to capture window:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleChat = () => setShowChat(!showChat);
  const handleShare = () => {};
  const handleScreen = () => captureWindow();
  const handleSave = () => {};

  const windowWidth = Math.max(game.width ?? 700, 400);

  return (
    <>
      {/* Loading Overlay - Outside capture area */}
      {isCapturing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        style={{ 
          width: windowWidth + 40,
          height: Math.max((game.height ?? 700), 540) + 56
        }}
        >
          <div className="bg-purple-900/90 px-4 py-2 rounded-lg text-white font-silkscreen">
            Capturing App...
          </div>
        </div>
      )}

      {/* Main Window - Capture Area */}
      <div 
        className="relative"
        style={{ width: windowWidth + 40 }}
        ref={windowRef}
        id={`game-window-${windowId}`}
      >
        {/* Chat Popup */}
        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

        {/* Marketplace Popup */}
        {showMarketplace && (
          <MarketplacePopup 
            onClose={() => {
              setShowMarketplace(false);
              setCapturedImage(null);
            }} 
            capturedImage={capturedImage}
          />
        )}
        
        {/* Main Game Window */}
        <div 
          style={{ 
            width: windowWidth + 40,
            height: Math.max((game.height ?? 700), 540) + 56
          }}
          className="relative"
        >
          {/* Header - Made entirely draggable */}
          <div className="relative flex h-[56px] w-full drag-handle">
            <div className="absolute inset-0 w-full h-[56px] overflow-hidden pointer-events-none">
              <div className='relative w-full h-full'>
                <img
                  src={folderHeader.src}
                  alt="window header"
                  className="min-w-full min-h-full block"
                  draggable={false}
                />
              </div>
            </div>

            <div className="relative w-full flex items-center justify-between px-[18px] h-full">
              <div className="select-none text-[#ffd700] font-silkscreen truncate max-w-[calc(100%-300px)] pointer-events-none">
                {game.name}
              </div>

              <div className="flex items-center gap-[8px] h-full py-[5px] pointer-events-auto">
                <button className="w-[40px] h-[40px] flex items-center justify-center" onClick={handleChat}>
                  <img src={folderChat.src} alt="chat" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
                <button className="w-[40px] h-[40px] flex items-center justify-center" onClick={handleShare}>
                  <img src={folderShare.src} alt="share" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
                <button 
                  className="w-[40px] h-[40px] flex items-center justify-center" 
                  onClick={handleScreen}
                  disabled={isCapturing}
                >
                  <img src={folderScreen.src} alt="screen" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
                <button className="w-[40px] h-[40px] flex items-center justify-center" onClick={handleSave}>
                  <img src={folderSave.src} alt="save" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
                <button 
                  className="w-[40px] h-[40px] flex items-center justify-center" 
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(windowId);
                  }}
                >
                  <img src={folderMinimize.src} alt="minimize" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
                <button 
                  className="w-[40px] h-[40px] flex items-center justify-center" 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeGame();
                  }}
                >
                  <img src={folderClose.src} alt="close" className="select-none hover:cursor-pointer" draggable={false} />
                </button>
              </div>
            </div>
          </div>

          <div 
            className="w-full border-x-2 flex items-center justify-center 
            border-b-2 border-[#8b98b8] bg-[#192539] overflow-y-auto magical-scroll"
            style={{ height: Math.max((game.height ?? 700), 540) }}
          >
            {GameComponent ? (
              <GameComponent />
            ) : (
              <div className="flex items-center justify-center h-full text-[#99a0ae]">
                Game content will go here
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWindow;