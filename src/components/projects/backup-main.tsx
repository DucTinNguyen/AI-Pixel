"use client";

import React, { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface App {
  id: number;
  title: string;
  icon: string;
}

interface Window {
  id: number;
  title: string;
  position: Position;
  size: Size;
  content: string;
  zIndex: number;
}

const DraggableWindow: React.FC<{
  window: Window;
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  isActive: boolean;
  onClick: () => void;
}> = ({ window, onClose, onMinimize, isActive, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: window.id.toString(),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose(window.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMinimize(window.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'absolute',
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: isActive ? 10 : window.zIndex,
      }}
      className="bg-white rounded-lg shadow-lg"
      onClick={onClick}
    >
      {/* Title bar split into draggable and control sections */}
      <div className="bg-gray-800 text-white rounded-t-lg flex">
        {/* Draggable area */}
        <div
          {...attributes}
          {...listeners}
          className="flex-grow p-2 cursor-move"
        >
          <span>{window.title}</span>
        </div>
        
        {/* Control buttons - separate from draggable area */}
        <div className="p-2 flex gap-2">
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleMinimize}
            className="px-2 hover:bg-gray-700 rounded focus:outline-none"
          >
            -
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleClose}
            className="px-2 hover:bg-red-600 rounded focus:outline-none"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {window.content}
      </div>
    </div>
  );
};

const WindowManager: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<number | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<Window[]>([]);

  const apps: App[] = [
    { id: 1, title: 'Notes', icon: '📝' },
    { id: 2, title: 'Calculator', icon: '🧮' },
    { id: 3, title: 'Calendar', icon: '📅' },
  ];

  const openWindow = (app: App): void => {
    // Default window size
    const windowSize = {
      width: 400,
      height: 300
    };

    // Calculate center position
    const centerX = Math.max(0, (window.innerWidth - windowSize.width) / 2);
    const centerY = Math.max(0, (window.innerHeight - windowSize.height) / 2);

    // Create new window with centered position
    const newWindow: Window = {
      id: Date.now(),
      title: app.title,
      position: { 
        x: centerX,
        y: centerY
      },
      size: windowSize,
      content: `This is ${app.title} content`,
      zIndex: windows.length,
    };
    
    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (windowId: number): void => {
    setWindows(windows.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (windowId: number): void => {
    const windowToMinimize = windows.find(w => w.id === windowId);
    if (windowToMinimize) {
      setMinimizedWindows([...minimizedWindows, windowToMinimize]);
      setWindows(windows.filter(w => w.id !== windowId));
    }
  };

  const restoreWindow = (windowId: number): void => {
    const windowToRestore = minimizedWindows.find(w => w.id === windowId);
    if (windowToRestore) {
      setWindows([...windows, windowToRestore]);
      setMinimizedWindows(minimizedWindows.filter(w => w.id !== windowId));
      setActiveWindow(windowId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const windowId = parseInt(active.id as string);
    
    setWindows(windows.map(window => {
      if (window.id === windowId) {
        return {
          ...window,
          position: {
            x: window.position.x + delta.x,
            y: window.position.y + delta.y,
          },
        };
      }
      return window;
    }));
  };

  return (
    <div className="w-full h-screen bg-transparent overflow-hidden relative">
      {/* Desktop icons */}
      <div className="p-4 grid grid-cols-4 gap-4">
        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => openWindow(app)}
            className="flex flex-col items-center p-2 hover:bg-gray-200 rounded"
          >
            <span className="text-4xl">{app.icon}</span>
            <span className="mt-1 text-sm">{app.title}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      <DndContext onDragEnd={handleDragEnd}>
        {windows.map(window => (
          <DraggableWindow
            key={window.id}
            window={window}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            isActive={activeWindow === window.id}
            onClick={() => setActiveWindow(window.id)}
          />
        ))}
      </DndContext>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 flex gap-2">
        {minimizedWindows.map(window => (
          <button
            key={window.id}
            onClick={() => restoreWindow(window.id)}
            className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            {window.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WindowManager;