import { useEffect, useState } from "react";

export function useCounterAnimation(
  target: number,
  isLoading: boolean,
  speed: number = 50,
  max: number = 100
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isLoading) {
      let current = 0;
      const interval = setInterval(() => {
        current = (current + 1) % max;
        setValue(current);
      }, speed);

      return () => clearInterval(interval);
    } else {
      setValue(target);
    }
  }, [isLoading, target, speed, max]);

  return value;
}
