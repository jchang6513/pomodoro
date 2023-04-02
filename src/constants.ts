import { TimeType } from "./types";

export const SECOND = 1000;
export const MINUTE = 60 * 1000;
export const WORK_TIME = 0.2 * MINUTE;
export const SHORT_BREAK_TIME = 0.1 * MINUTE;
export const LONG_BREAK_TIME = 0.15 * MINUTE;
export const LONG_BREAK_INTERVAL = 2;

export const DISPLAY_FORMAT: Record<TimeType, string> = {
  [TimeType.work]: '$time [WORK]',
  [TimeType.shortBreak]: '$time [SHORT BREAK]',
  [TimeType.longBreak]: '$time [LONG BREAK]',
};

export const FINISH_HINT: Record<TimeType, string> = {
  [TimeType.work]: 'End of Work!',
  [TimeType.shortBreak]: 'End of Short Break!',
  [TimeType.longBreak]: 'End of Long Break!',
};
