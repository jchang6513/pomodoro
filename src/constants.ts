import { TimeType } from "./types";

export const START_TIMER = 'pomodoro.start';
export const STOP_TIMER = 'pomodoro.stop';
export const RESUME_TIMER = 'pomodoro.resume';
export const RESET_TIMER = 'pomodoro.reset';

export const SECOND = 1000;
export const MINUTE = 60 * 1000;
export const WORK_TIME_KEY = 'conf.pomodoro.work';
export const SHORT_BREAK_TIME_KEY = 'conf.pomodoro.shortBreak';
export const LONG_BREAK_TIME_KEY = 'conf.pomodoro.longBreak';
export const LONG_BREAK_INTERVAL_KEY = 'conf.pomodoro.longBreakInterval';

export const DISPLAY_FORMAT: Record<TimeType, string> = {
  [TimeType.work]: '$icon $time [WORK]',
  [TimeType.shortBreak]: '$icon $time [SHORT BREAK]',
  [TimeType.longBreak]: '$icon $time [LONG BREAK]',
};

export const FINISH_HINT: Record<TimeType, string> = {
  [TimeType.work]: 'End of Work!',
  [TimeType.shortBreak]: 'End of Short Break!',
  [TimeType.longBreak]: 'End of Long Break!',
};
