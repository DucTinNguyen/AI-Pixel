export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface App {
  id: number;
  title: string;
  icon: string;
  component: React.ComponentType;
}

export interface Window extends Omit<App, 'icon' | 'component'> {
  position: Position;
  zIndex: number;
}