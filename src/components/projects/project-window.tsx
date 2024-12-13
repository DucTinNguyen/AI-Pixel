import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import backgroundModal from '@/assets/images/modal-body-laboratory.svg';
import type { Window } from '@/types/projects/window';

const TITLE_BAR_HEIGHT = 40;

interface DraggableWindowProps {
  window: Window;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  isActive: boolean;
  onClick: () => void;
  AppComponent: React.ComponentType;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = ({
  window,
  onClose,
  onMinimize,
  isActive,
  onClick,
  AppComponent
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: window.id.toString(),
  });

  const style = {
    ...(transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined),
    position: 'absolute' as const,
    left: window.position.x,
    top: window.position.y,
    zIndex: isActive ? 10 : window.zIndex,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative p-4"
      onClick={onClick}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src={backgroundModal.src}
          alt="Modal background"
          className="w-full h-full"
          style={{
            objectFit: 'fill',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Main Window Content */}
      <div className="rounded-lg shadow-lg">
        {/* Title bar */}
        <div 
          className="text-white rounded-t-lg flex"
          style={{ height: `${TITLE_BAR_HEIGHT}px` }}
        >
          <div
            {...attributes}
            {...listeners}
            className="flex-grow p-2 cursor-move flex items-center"
          >
            <span>{window.title}</span>
          </div>
          
          <div className="p-2 flex gap-2 items-center">
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMinimize(window.id);
              }}
              className="px-2 hover:bg-gray-700 rounded focus:outline-none"
            >
              -
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose(window.id);
              }}
              className="px-2 hover:bg-red-600 rounded focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full h-full bg-black bg-opacity-70 ">
          <AppComponent />
        </div>
      </div>
    </div>
  );
};