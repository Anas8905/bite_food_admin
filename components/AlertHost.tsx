import { useAlertStore } from '@/stores/alert';
import { CustomAlert } from './ui/CustomAlert';

export const AlertHost = (): React.JSX.Element => {
  const visible = useAlertStore((s) => s.visible);
  const title   = useAlertStore((s) => s.title);
  const message = useAlertStore((s) => s.message);
  const buttons = useAlertStore((s) => s.buttons);
  const content = useAlertStore((s) => s.content);
  const hide    = useAlertStore((s) => s.hide);

  return (
    <CustomAlert
      visible={visible}
      title={title}
      message={message}
      buttons={buttons}
      content={content}
      onDismiss={hide}
    />
  );
};
