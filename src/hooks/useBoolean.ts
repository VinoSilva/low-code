import { useCallback, useState } from "react";

const useBoolean = (initialFlagValue = false) => {
  const [flag, setFlag] = useState<boolean>(initialFlagValue);

  const toggle = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  return {
    value: flag,
    toggle,
  };
};

export default useBoolean;
