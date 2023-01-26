import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITimer {
  isRunning: boolean;
  timeLeft: number;
  start: () => void;
  stop: () => void;
  setTimeLeft: (time: number) => void;
}

const useTimer = create<ITimer>()(
  persist(
    set => {
      return {
        isRunning: false,
        timeLeft: 20,
        start: () =>
          set((state: any) => {
            return { ...state, timeLeft: 20, isRunning: true };
          }),
        stop: () =>
          set((state: any) => {
            return { ...state, timeLeft: -2, isRunning: false };
          }),
        setTimeLeft: (time: number) => set(state => ({ ...state, timeLeft: time })),
      };
    },
    {
      name: "bookingCountdownTimer", // name of the item in the storage (must be unique)
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);

const toMinutesAndSeconds = (duration: number) => {
  let minutes = Math.floor(duration / 60);
  let seconds = parseInt((duration % 60).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const useSessionTimer = () => {
  const { start, stop, setTimeLeft } = useTimer();
  const isRunning = useTimer(state => state.isRunning);
  const timeLeft = useTimer(state => state.timeLeft);

  useEffect(() => {
    if (timeLeft <= 0) {
      stop();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isRunning) {
      stop();
      return;
    }
  }, [isRunning, timeLeft]);

  const countdownTime = toMinutesAndSeconds(timeLeft);

  return { start, stop, isRunning, countdownTime, timeLeft };
};

export default useSessionTimer;
