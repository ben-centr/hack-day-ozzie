import { useState, useEffect, useRef } from "react";

const STEP_VALUE = 1;
const STEP_DELAY = 350;

export const useInterpolatedState = (initialValue: number) => {
  const [state, setState] = useState(initialValue);
  const latestValueRef = useRef(state);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    latestValueRef.current = state;
  }, [state]);

  const setInterpolatedState = (newValue: number) => {
    if (typeof newValue !== "number") {
      throw new Error("Value must be a number");
    }

    if (newValue > latestValueRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setState((prevValue) => {
          const difference = newValue - prevValue;

          if (Math.abs(difference) <= STEP_VALUE) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return newValue;
          }

          return prevValue + STEP_VALUE;
        });
      }, STEP_DELAY);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  };

  return [state, setInterpolatedState] as const;
};
