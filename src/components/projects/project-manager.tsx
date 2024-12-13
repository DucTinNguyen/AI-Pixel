"use client";

import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableWindow } from './project-window';
import { getApps } from './app-store/apps';
import type { Window, App } from '@/types/projects/window';

export const WindowManager: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<number | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<Window[]>([]);

  const apps = getApps();

  // const openWindow = (app: App) => {
  //   const windowSize = { width: 400, height: 300 };
  //   const centerX = Math.max(0, (window.innerWidth - windowSize.width) / 2);
  //   const centerY = Math.max(0, (window.innerHeight - windowSize.height) / 2);

  //   const newWindow: Window = {
  //     id: Date.now(),
  //     title: app.title,
  //     position: { x: centerX, y: centerY },
  //     size: windowSize,
  //     zIndex: windows.length,
  //   };
    
  //   setWindows([...windows, newWindow]);
  //   setActiveWindow(newWindow.id);
  // };


  const openWindow = (app: App) => {
    // Calculate initial center position
    const centerX = Math.max(0, window.innerWidth / 2 - 200); // Use minimum width as fallback
    const centerY = Math.max(0, window.innerHeight / 2 - 200);
  
    const newWindow: Window = {
      id: Date.now(),
      title: app.title,
      position: { x: centerX, y: centerY },
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
            className="flex flex-col items-center p-2 hover:bg-gray-200 rounded w-fit"
          >
            <span className="text-4xl">{app.icon}</span>
            <span className="mt-1 text-sm">{app.title}</span>
          </button>
        ))}
      </div>

      {/* Window area */}
      <DndContext onDragEnd={handleDragEnd}>
        {windows.map(window => {
          const app = apps.find(a => a.title === window.title);
          if (!app) return null;

          return (
            <DraggableWindow
              key={window.id}
              window={window}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              isActive={activeWindow === window.id}
              onClick={() => setActiveWindow(window.id)}
              AppComponent={app.component}
            />
          );
        })}
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
