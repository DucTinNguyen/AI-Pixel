import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Window } from '@/types';

interface WindowStore {
  windows: Window[];
  openWindow: (type: 'FOLDER' | 'GAME') => void;
  handleFocus: (id: number) => void;
  closeWindow: (id: number) => void;
}

const useWindowStore = create(
  persist<WindowStore>(
    (set, get) => ({
      windows: [],
      openWindow: (type: 'FOLDER' | 'GAME') => {
        const windows = get().windows;
        const newWindow = {
          id: Date.now(),
          type,
        };
        set({
          windows: [
            ...windows,
            { ...newWindow, zIndex: getNextZIndex(windows) },
          ],
        });
      },
      handleFocus: (id: number) => {
        const folders = get().windows;
        set({
          windows: folders.map(w =>
            w.id === id ? { ...w, zIndex: getNextZIndex(folders) } : w,
          ),
        });
      },
      closeWindow: (id: number) => {
        const folders = get().windows;
        set({
          windows: folders.filter(w => w.id !== id),
        });
      },
    }),
    {
      name: 'windows', // name of the item in the storage (must be unique)
    },
  ),
);

const getNextZIndex = (windows: Window[]) =>
  Math.max(...windows.map(w => w.zIndex)) + 1;

export default useWindowStore;
