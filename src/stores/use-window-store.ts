import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Window } from '@/types';

import useItemStore from './use-item-store';

interface WindowDimensions {
  width: number;
  height: number;
}

interface WindowStore {
  windows: Window[];
  dimensions: { [key: number]: WindowDimensions };
  updateWindowDimensions: (id: number, dimensions: WindowDimensions) => void;
  openGame: (id: string) => void;
  openFolder: (id: string) => void;
  handleFocus: (id: number) => void;
  closeWindow: (id: number) => void;
  minimizeWindow: (id: number) => void;
  restoreWindow: (id: number) => void;
}

const useWindowStore = create(
  persist<WindowStore>(
    (set, get) => ({
      windows: [],
      dimensions: {},
      updateWindowDimensions: (id: number, dimensions: WindowDimensions) => {
        set(state => ({
          dimensions: {
            ...state.dimensions,
            [id]: dimensions
          }
        }));
      },
      
      openGame: (id: string) => {
        // look for item in both open desktop and folder apps 
        let item = useItemStore.getState().items.find(item => item.id === id);

        if (!item) {
          const folders = useItemStore.getState().items.filter(item => item.type === 'FOLDER');

          for (const folder of folders) {
            const foundApp = folder.apps?.find(app => app.id === id);
            if (foundApp) {
              item = foundApp;
              break;
            }
          }
        }
      
        if (!item || item.type !== 'GAME') {
          console.log("Item not found or not a game");
          return;
        }

        // restore window if minimized, create new window otherwise
      
        const windows = get().windows;
        const minimizedWindow = windows.find(
          w => w.itemId === id && w.isMinimized
        );
        if (minimizedWindow) {
          set({
            windows: windows.map(w =>
              w.id === minimizedWindow.id
                ? { ...w, isMinimized: false, zIndex: getNextZIndex(windows) }
                : w
            ),
          });
          return;
        }
      
        const newWindow: Window = {
          id: Date.now(),
          type: 'GAME',
          zIndex: getNextZIndex(windows),
          itemId: id,
          isMinimized: false,
        };

        set({
          windows: [...windows, newWindow],
        });
      },


      openFolder: (id: string) => {
        const item = useItemStore.getState().items.find(item => item.id === id);
        if (!item || item.type !== 'FOLDER') return;
        const windows = get().windows;
        // Check for minimized instance first
        const minimizedWindow = windows.find(
          w => w.itemId === id && w.isMinimized
        );
        if (minimizedWindow) {
          set({
            windows: windows.map(w =>
              w.id === minimizedWindow.id
                ? { ...w, isMinimized: false, zIndex: getNextZIndex(windows) }
                : w
            ),
          });
          return;
        }
        // Create new window if none exists
        if (!windows.some(w => w.itemId === id)) {
          const newWindow: Window = {
            id: Date.now(),
            type: 'FOLDER',
            zIndex: getNextZIndex(windows),
            itemId: id,
            isMinimized: false,
          };
          set({
            windows: [...windows, newWindow],
          });
        }
      },
      handleFocus: (id: number) => {
        const windows = get().windows;
        set({
          windows: windows.map(w =>
            w.id === id ? { ...w, zIndex: getNextZIndex(windows) } : w
          ),
        });
      },
      closeWindow: (id: number) => {
        const windows = get().windows;
        set({
          windows: windows.filter(w => w.id !== id),
        });
      },
      minimizeWindow: (id: number) => {
        const windows = get().windows;
        set({
          windows: windows.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
        });
      },
      restoreWindow: (id: number) => {
        const windows = get().windows;
        set({
          windows: windows.map(w =>
            w.id === id
              ? { ...w, isMinimized: false, zIndex: getNextZIndex(windows) }
              : w
          ),
        });
      },
    }),
    {
      name: 'windows',
    }
  )
);

const getNextZIndex = (windows: Window[]) =>
  Math.max(0, ...windows.map(w => w.zIndex)) + 1;

export default useWindowStore;