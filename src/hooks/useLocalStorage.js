import { useCallback, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [currentValue, setCurrentValue] = useState(() => {
    try {
      const value = global.localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      } else if (defaultValue) {
        global.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const setValueToLocalStorage = useCallback(
    (value) => {
      try {
        global.localStorage.setItem(key, JSON.stringify(value));
        setCurrentValue(value);
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  return [currentValue, setValueToLocalStorage];
};
