import Toast from "@/components/ui/toast";
import { createRoot } from "react-dom/client";

export function appendToast(containerId: string, theme: string, text: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const toastWrapper = document.createElement('div');
  container.appendChild(toastWrapper);

  const root = createRoot(toastWrapper);
  root.render(<Toast theme={theme} text={text} />);

  setTimeout(() => {
    root.unmount();
    container.removeChild(toastWrapper);
  }, 5000);
}


