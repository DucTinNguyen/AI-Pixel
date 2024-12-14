import { ComponentType } from "react";

export interface ContentProps {
  closeModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export interface Window {
  id: number;
  type: 'FOLDER' | 'GAME';
  zIndex: number;
  itemId: string;
  isMinimized: boolean;
}
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
  component?: ComponentType;
  componentKey?: string;
  width?: number;
  height?: number;
};
