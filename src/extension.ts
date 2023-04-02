import * as vscode from 'vscode';
import { Pomodoro } from './pomodoro';

const START_TIMER = 'pomodoro.start';
const STOP_TIMER = 'pomodoro.stop';
let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(START_TIMER, () => {
		vscode.window.showInformationMessage('Start Pomodoro!');
	}));

	subscriptions.push(vscode.commands.registerCommand(STOP_TIMER, () => {
		vscode.window.showInformationMessage('Stop Pomodoro!');
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	myStatusBarItem.command = START_TIMER;
	subscriptions.push(myStatusBarItem);

	const pomodoro = new Pomodoro(myStatusBarItem, {
		onFinish: (s) => vscode.window.showInformationMessage(s),
	});

	pomodoro.start();
}

export function deactivate() {}
