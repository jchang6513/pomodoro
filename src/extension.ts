import * as vscode from 'vscode';
import { Pomodoro } from './pomodoro';
import { TimeType } from './types';
import { RESET_TIMER, RESUME_TIMER, START_TIMER, STOP_TIMER } from './constants';

let statusBar: vscode.StatusBarItem;
let pomodoro: Pomodoro;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(START_TIMER, () => {
		vscode.window.showInformationMessage('Start Pomodoro!');
	}));

	subscriptions.push(vscode.commands.registerCommand(STOP_TIMER, () => {
		vscode.window.showInformationMessage('Stop Pomodoro!');
		pomodoro?.stop();
	}));

	subscriptions.push(vscode.commands.registerCommand(RESUME_TIMER, () => {
		vscode.window.showInformationMessage('Resume Pomodoro!');
		pomodoro?.resume();
	}));

	subscriptions.push(vscode.commands.registerCommand(RESET_TIMER, () => {
		vscode.window.showInformationMessage('Reset Pomodoro!');
		pomodoro.startWith(TimeType.work);
	}));

	statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	statusBar.command = START_TIMER;
	subscriptions.push(statusBar);

	pomodoro = new Pomodoro(statusBar, {
		onFinish: (s) => vscode.window.showWarningMessage(s)
	});

	pomodoro.startWith(TimeType.work);
}

export function deactivate() {}
