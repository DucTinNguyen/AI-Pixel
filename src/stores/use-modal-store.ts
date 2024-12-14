import { create } from 'zustand';

interface ModalState {
  profileModal: boolean;
  setProfileModal: (value: boolean) => void;
}

export const useModalStore = create<ModalState>(set => ({
  profileModal: false,
  setProfileModal: value => set({ profileModal: value }),
}));
