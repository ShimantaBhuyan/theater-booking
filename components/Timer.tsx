import useSessionTimer from "utils/useTimer";

export const Timer = () => {
  const { isRunning, countdownTime } = useSessionTimer();
  return isRunning && countdownTime != null ? <p className="text-sm">Seats selected for : {countdownTime}</p> : null;
};
