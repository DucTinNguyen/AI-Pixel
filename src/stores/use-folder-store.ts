import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Folder } from '@/types';

interface FolderStore {
  folders: Folder[];
  createFolder: (name: string) => void;
}
const useFolderStore = create(
  persist<FolderStore>(
    (set, get) => ({
      folders: [],
      createFolder: (name: string) => {
        const folders = get().folders;
        const newFolder = {
          id: Date.now(),
          name,
          apps: [],
        };
        set({
          folders: [...folders, newFolder],
        });
      },
    }),
    {
      name: 'folders', // name of the item in the storage (must be unique)
    },
  ),
);

export default useFolderStore;
