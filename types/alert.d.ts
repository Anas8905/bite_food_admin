interface AlertButton {
  text: string;
  onPress?: () => void;
  keepOpen?: boolean;
  style?: 'default' | 'cancel' | 'destructive';
}

type AlertState = {
  visible: boolean;
  title?: string | undefined;
  message?: string | undefined;
  buttons: AlertButton[];
  content?: React.ReactNode;

  show: (title?: string, message?: string, buttons?: AlertButton[], content?: React.ReactNode) => void;
  hide: () => void;
};

interface CustomAlertProps {
  visible: boolean;
  title?: string | undefined;
  message?: string | undefined;
  buttons?: AlertButton[];
  onDismiss?: () => void;
  type?: 'default' | 'destructive';
  content?: React.ReactNode;
}

interface AlertConfig {
  visible: boolean;
  title?: string | undefined;
  message?: string | undefined;
  buttons: AlertButton[];
  content?: React.ReactNode;
}

interface UseCustomAlertReturn {
  showAlert: (title?: string, message?: string, buttons?: AlertButton[], content?: React.ReactNode) => void;
  hideAlert: () => void;
  AlertComponent: () => React.JSX.Element;
}

type showInputAlertProps = { showInputAlert: (
  title: string,
  message: string,
  options: {
    placeholder?: string;
    submitText?: string;
    submitStyle?: "default" | "cancel" | "destructive";
    onSubmit: (value: string) => void;
    onCancel?: () => void;
  }
) => void }
