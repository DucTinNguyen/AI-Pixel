export interface ContentProps {
  closeModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export type Window = {
  id: number;
  zIndex: number;
  itemId: string;
  type: 'FOLDER' | 'GAME';
};

export type Folder = {
  id: number;
  name: string;
  apps: App[];
};

export type App = {
  id: string;
};

export type Item = {
  id: string;
  appIcon?: string;
  name: string;
  type: 'FOLDER' | 'GAME';
  apps?: Item[];
  isCooking?: boolean;
};
