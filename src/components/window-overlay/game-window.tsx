import React from 'react';
import Image from 'next/image';
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

  return (
    <div 
      style={{ 
        width: (game.width ?? 700), 
        height: (game.height ?? 700) + 100
      }}
      className="relative"
    >
      {/* Header */}
      <div className="relative flex h-[56px] w-full items-center">
        <Image
          src={folderHeader}
          alt="window header"
          width={game.width ?? 700}
          draggable={false}
          className="drag-handle absolute inset-0 select-none"
        />
        <div className="folder-title drag-handle relative select-none pl-[18px]">
          {game.name}
        </div>
        <div className="absolute right-[9px] top-[9px] bottom-[5px] flex items-center gap-[8px]">
          {/* Chat Button */}
          <Image
            src={folderChat}
            alt="chat"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={handleChat}
          />
          {/* Share Button */}
          <Image
            src={folderShare}
            alt="share"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={handleShare}
          />
          {/* Screen Button */}
          <Image
            src={folderScreen}
            alt="screen"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={handleScreen}
          />
          {/* Save Button */}
          <Image
            src={folderSave}
            alt="save"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={handleSave}
          />
          {/* Minimize Button */}
          <Image
            src={folderMinimize}
            alt="minimize"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowId);
            }}
          />
          {/* Close Button */}
          <Image
            src={folderClose}
            alt="close"
            width={40}
            draggable={false}
            className="select-none hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              closeGame();
            }}
          />
        </div>
      </div>

      {/* Content area */}
      <div 
        className="w-full h-full border-x-2 border-b-2 border-[#8b98b8] bg-[#192539]"
        style={{ 
          height: game.height ?? 700,
          width: game.width ?? 700,
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