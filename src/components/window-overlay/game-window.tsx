import React from 'react';
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
import Image from 'next/image';

const GameWindow = ({ game, closeGame, windowId }: { 
  game: Item; 
  closeGame: () => void; 
  windowId: number 
}) => {
  const minimizeWindow = useWindowStore(state => state.minimizeWindow);
  const getComponent = useItemStore(state => state.getComponent);
  
  const GameComponent = game.componentKey ? getComponent(game.componentKey) : undefined;

  if (useWindowStore(state => state.windows.find(w => w.id === windowId)?.isMinimized)) {
    return null;
  }

  const handleChat = () => {};
  const handleShare = () => {};
  const handleScreen = () => {};
  const handleSave = () => {};

  // Calculate the width, ensuring minimum width
  const windowWidth = Math.max(game.width ?? 700, 400);

  return (
    <div 
      style={{ 
        width: windowWidth+40,
        height: (game.height ?? 700) + 56
      }}
      className="relative"
    >
      {/* Header - Made entirely draggable */}
      <div className="relative flex h-[56px] w-full drag-handle">
        {/* Background image container */}
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

        {/* Title and buttons container */}
        <div className="relative w-full flex items-center justify-between px-[18px] h-full">
          {/* Title */}
          <div className="select-none text-[#ffd700] font-silkscreen truncate max-w-[calc(100%-300px)] pointer-events-none">
            {game.name}
          </div>

          {/* Buttons container - Override drag behavior */}
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

      {/* Content area */}
      <div 
        className="w-full border-x-2 border-b-2 border-[#8b98b8] bg-[#192539] overflow-y-auto"
        style={{ 
          height: (game.height ?? 700)+40
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
  );
};

export default GameWindow;