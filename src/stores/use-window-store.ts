import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Window } from '@/types';

<<<<<<< HEAD
import useItemStore from './use-item-store';

interface WindowStore {
  windows: Window[];
  openFolder: (id: string) => void;
=======
interface WindowStore {
  windows: Window[];
  openWindow: (type: 'FOLDER' | 'GAME') => void;
>>>>>>> new-ver
  handleFocus: (id: number) => void;
  closeWindow: (id: number) => void;
}

const useWindowStore = create(
  persist<WindowStore>(
    (set, get) => ({
      windows: [],
<<<<<<< HEAD
      openFolder: (id: string) => {
        const item = useItemStore.getState().items.find(item => item.id === id);
        if (!item || item.type !== 'FOLDER') return;
        const windows = get().windows;
        if (windows.some(w => w.itemId === id)) {
          set({
            windows: windows.map(w =>
              w.itemId === id ? { ...w, zIndex: getNextZIndex(windows) } : w,
            ),
          });
          return;
        }
        const newWindow: Window = {
          id: Date.now(),
          type: 'FOLDER',
          zIndex: getNextZIndex(windows),
          itemId: id,
        };
        set({
          windows: [...windows, newWindow],
=======
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
>>>>>>> new-ver
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
<<<<<<< HEAD
  Math.max(0, ...windows.map(w => w.zIndex)) + 1;
=======
  Math.max(...windows.map(w => w.zIndex)) + 1;
>>>>>>> new-ver

export default useWindowStore;
