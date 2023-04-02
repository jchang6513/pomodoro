import * as vscode from 'vscode';
import { DISPLAY_FORMAT, FINISH_HINT, LONG_BREAK_INTERVAL, LONG_BREAK_TIME, MINUTE, SECOND, SHORT_BREAK_TIME, WORK_TIME } from "./constants";
import { TimeType } from "./types";
import { padWithZero } from './utils';

type Callback = {
  onFinish: (s: string) => void,
};

export class Pomodoro {
  private timeType: TimeType = TimeType.work;
  private timeLast: number = WORK_TIME;
  private interval = 0;
  private statusBar: vscode.StatusBarItem;
  private callbacks: Callback;

  constructor(statusBar: vscode.StatusBarItem, callbacks: Callback) {
    this.statusBar =  statusBar;
    this.callbacks = callbacks;
    this.updateTimeLast();
  }

  public start = () => {
		if (this.timeLast < 0) {
      this.callbacks?.onFinish(FINISH_HINT[this.timeType]);
			this.next();
		}
    this.updateStatusBar();

		setTimeout(() => {
			this.start();
			this.timeLast -= SECOND;
		}, SECOND);
  };

  public startWith = (timeType: TimeType = TimeType.work) => {
    this.timeType = timeType;
    this.updateTimeLast();
    this.start();
  };

  private next = () => {
    switch (this.timeType) {
      case 'work':
        this.interval += 1;
        if (this.interval === LONG_BREAK_INTERVAL) {
          this.timeType = TimeType.longBreak;
        } else {
          this.timeType = TimeType.shortBreak;
        }
        break;
      case 'short-break':
        this.timeType = TimeType.work;
        break;
      case 'long-break':
        this.interval = 0;
        this.timeType = TimeType.work;
        break;
      default:
        this.timeType = TimeType.work;
    }
    this.updateTimeLast();
  };

  private updateTimeLast = () => {
    switch (this.timeType) {
      case 'work':
        this.timeLast = WORK_TIME;
        break;
      case 'short-break':
        this.timeLast = SHORT_BREAK_TIME;
        break;
      case 'long-break':
        this.timeLast = LONG_BREAK_TIME;
        break;
    }
  };

  private updateStatusBar = () => {
    const minute = padWithZero(Math.floor(this.timeLast / MINUTE), 2);
    const second = padWithZero(Math.floor(this.timeLast % MINUTE) / SECOND, 2);
		this.statusBar.text = DISPLAY_FORMAT[this.timeType].replace('$time', `${minute}:${second}`);
		this.statusBar.show();
  };
}
