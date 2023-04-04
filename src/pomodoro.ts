import * as vscode from 'vscode';
import { DISPLAY_FORMAT, FINISH_HINT, LONG_BREAK_INTERVAL_KEY, LONG_BREAK_TIME_KEY, MINUTE, SECOND, SHORT_BREAK_TIME_KEY, WORK_TIME_KEY } from "./constants";
import { TimeType } from "./types";
import { getConfiguration, padWithZero } from './utils';

type Callback = {
  onFinish: (s: string) => void,
};

export class Pomodoro {
  private timeType: TimeType = TimeType.work;
  private timeLast: number = 0;
  private interval = 0;
  private statusBar: vscode.StatusBarItem;
  private callbacks: Callback;
  private activate = false;

  constructor(statusBar: vscode.StatusBarItem, callbacks: Callback) {
    this.statusBar =  statusBar;
    this.callbacks = callbacks;
    this.updateTimeLast();
  }

  public startWith = (timeType: TimeType = TimeType.work) => {
    this.activate = true;
    this.updateTimeTypeAndTimeLast(timeType);
    this.start();
  };

  public resume = () => {
    this.activate = true;
    this.start();
  };

  public stop = () => {
    this.activate = false;
    this.updateStatusBar();
  };

  public toggle() {
    if (this.activate) {
      this.activate = false;
      this.updateStatusBar();
    } else {
      this.activate = true;
      this.start();
    }
	}

  private start = () => {
    if (!this.activate) {
      return;
    }

		if (this.timeLast < 0) {
      this.callbacks?.onFinish(FINISH_HINT[this.timeType]);
			this.next();
		} else {
      this.updateStatusBar();
      this.timeLast -= SECOND;
    }

		setTimeout(() => {
			this.start();
		}, SECOND);
  };

  private next = () => {
    switch (this.timeType) {
      case 'work':
        this.interval += 1;
        if (this.interval === this.getLongBreakInterval()) {
          this.updateTimeTypeAndTimeLast(TimeType.longBreak);
        } else {
          this.updateTimeTypeAndTimeLast(TimeType.shortBreak);
        }
        break;
      case 'short-break':
        this.updateTimeTypeAndTimeLast(TimeType.work);
        break;
      case 'long-break':
        this.interval = 0;
        this.updateTimeTypeAndTimeLast(TimeType.work);
        break;
      default:
        this.updateTimeTypeAndTimeLast(TimeType.work);
    }
  };

  private updateTimeTypeAndTimeLast = (timeType: TimeType) => {
    this.timeType = timeType;
    this.updateTimeLast();
  };

  private updateTimeLast = () => {
    switch (this.timeType) {
      case 'work':
        this.timeLast = this.getWorkTime();
        break;
      case 'short-break':
        this.timeLast = this.getShortBreakTime();
        break;
      case 'long-break':
        this.timeLast = this.getLongBreakTime();
        break;
    }
  };

  private updateStatusBar = () => {
    const minute = padWithZero(Math.floor(this.timeLast / MINUTE), 2);
    const second = padWithZero(Math.floor(this.timeLast % MINUTE) / SECOND, 2);
		this.statusBar.text = DISPLAY_FORMAT[this.timeType]
      .replace('$time', `${minute}:${second}`)
      .replace('$icon', this.getStatusIcon());

		this.statusBar.show();
  };

  private getStatusIcon = () => this.activate ? '$(rocket)' : '$(stop-circle)';

  private getWorkTime = () => getConfiguration(WORK_TIME_KEY, 25) * MINUTE;

  private getShortBreakTime = () => getConfiguration(SHORT_BREAK_TIME_KEY, 5) * MINUTE;

  private getLongBreakTime = () => getConfiguration(LONG_BREAK_TIME_KEY, 15) * MINUTE;

  private getLongBreakInterval = () => getConfiguration(LONG_BREAK_INTERVAL_KEY, 4);
}
