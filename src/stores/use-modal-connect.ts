import { create } from 'zustand';

interface ConnectState {
  connectModal: boolean;
  setConnectModal: (value: boolean) => void;
}

export const useConnectStore = create<ConnectState>(set => ({
  connectModal: false,
  setConnectModal: value => set({ connectModal: value }),
}));
