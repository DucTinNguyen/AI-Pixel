import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Item } from '@/types';

interface ItemStore {
  items: Item[];
  createFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
  addAppToFolder: (folderId: string, appId: string) => void;
  removeAppFromFolder: (folderId: string, appId: string) => void;
  moveItemToLatest: (id: string) => void;
  addApp: (appId: string, name: string, appIcon: string) => void;
  finishAddingApp: (appId: string) => void;
  // removeApp: (appId: string) => void;
}
const useItemStore = create(
  persist<ItemStore>(
    (set, get) => ({
      items: [],
      createFolder: (name: string) => {
        const items = get().items;
        const newFolder: Item = {
          id: Date.now().toString(),
          name,
          type: 'FOLDER',
          apps: [],
        };
        set({
          items: [...items, newFolder],
        });
      },
      deleteFolder: (id: string) => {
        const items = get().items;
        const folder = items.find(
          item => item.id === id && item.type === 'FOLDER',
        );
        if (!folder) return;
        const apps = folder.apps!;
        set({
          items: [...items.filter(item => item.id !== id), ...apps],
        });
      },
      addAppToFolder: (folderId: string, appId: string) => {
        const items = get().items;
        const folder = items.find(
          item => item.id === folderId && item.type === 'FOLDER',
        );
        const app = items.find(
          item => item.id === appId && item.type === 'GAME',
        );
        if (!folder || !app) return;
        if (folder) {
          folder.apps!.push(app);
        }
        set({
          items: items.filter(item => item.id !== appId),
        });
      },
      removeAppFromFolder: (folderId: string, appId: string) => {
        const items = get().items;
        const folder = items.find(item => item.id === folderId);
        if (!folder) return;
        const app = folder.apps!.find(app => app.id === appId);
        if (!app) return;
        folder.apps = folder.apps!.filter(app => app.id !== appId);
        console.log('app', app);
        set({
          items: [
            ...items.filter(item => item.id !== folderId),
            app,
            {
              ...folder,
              apps: folder.apps!.filter(app => app.id !== appId),
            },
          ],
        });
      },
      moveItemToLatest: (id: string) => {
        const items = get().items;
        const item = items.find(item => item.id === id);
        if (!item) return;
        set({
          items: [...items.filter(item => item.id !== id), item],
        });
      },
      addApp: (appId: string, name: string, appIcon: string) => {
        const items = get().items;
        const newApp: Item = {
          id: appId,
          name,
          type: 'GAME',
          appIcon,
          isCooking: true,
        };
        set({
          items: [...items, newApp],
        });
      },
      finishAddingApp(appId: string) {
        const items = get().items;
        const app = items.find(item => item.id === appId);
        if (!app) return;
        app.isCooking = false;
        set({
          items: [...items.filter(item => item.id !== appId), app],
        });
      },
    }),
    {
      name: 'items', // name of the item in the storage (must be unique)
    },
  ),
);

export default useItemStore;
