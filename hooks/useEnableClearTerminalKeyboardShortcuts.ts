import { useState, useEffect } from "react";

export const useEnableClearTerminalKeyboardShortcuts = () => {
  const [willDisableInput, setWillDisableInput] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) {
        setWillDisableInput(true);

        if (event.key === "r" || event.key === "k") {
          window.location.reload();
        }
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) {
        setWillDisableInput(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return willDisableInput;
};
