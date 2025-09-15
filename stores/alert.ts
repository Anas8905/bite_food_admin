import { create } from 'zustand';

export const useAlertStore = create<AlertState>()((set) => ({
  visible: false,
  buttons: [],
  show: (
    title?: string,
    message?: string,
    buttons: AlertButton[] = [{ text: 'OK', style: 'default' }],
    content?: React.ReactNode
  ) =>
    set({
      visible: true,
      title,
      message,
      buttons,
      content,
    }),
  hide: () => set({ visible: false, title: undefined, message: undefined, buttons: [], content: undefined })
}));
