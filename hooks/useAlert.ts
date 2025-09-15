import { useAlertStore } from '@/stores/alert';

export const useAlert = (): {
  showAlert: (
    title?: string,
    message?: string,
    buttons?: AlertButton[],
    content?: React.ReactNode,
  ) => void;
  hideAlert: () => void;
} => {
  const showAlert = useAlertStore((s) => s.show);
  const hideAlert = useAlertStore((s) => s.hide);
  return { showAlert, hideAlert };
};
