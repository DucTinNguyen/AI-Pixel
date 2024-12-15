import React, { useState } from 'react';
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
  
  const minimizeWindow = useWindowStore(state => state.minimizeWindow);
  const getComponent = useItemStore(state => state.getComponent);
  
  const GameComponent = game.componentKey ? getComponent(game.componentKey) : undefined;

  if (useWindowStore(state => state.windows.find(w => w.id === windowId)?.isMinimized)) {
    return null;
  }

  const handleChat = () => setShowChat(!showChat);
  const handleShare = () => {};
  const handleScreen = () => setShowMarketplace(!showMarketplace);
  const handleSave = () => {};

  const windowWidth = Math.max(game.width ?? 700, 400);

  return (
    <div className="relative">
      {/* Chat Popup */}
      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      
      {/* Main Game Window */}
      <div 
        style={{ 
          width: windowWidth+40,
          height: (game.height ?? 700) + 56
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
              <button className="w-[40px] h-[40px] flex items-center justify-center" onClick={handleScreen}>
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
          className="w-full border-x-2 border-b-2 border-[#8b98b8] bg-[#192539] overflow-y-auto magical-scroll "
          style={{ 
            height: (game.height ?? 700)
          }}
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

      {/* Marketplace Popup */}
      {showMarketplace && <MarketplacePopup onClose={() => setShowMarketplace(false)} />}
    </div>
  );
};

export default GameWindow;