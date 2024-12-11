export interface ContentProps {
  closeModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export type Window = {
  id: number;
  zIndex: number;
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
