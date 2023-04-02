import * as vscode from 'vscode';

const START_TIMER = 'pomodoro.start';
const STOP_TIMER = 'pomodoro.stop';

export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(START_TIMER, () => {
		vscode.window.showInformationMessage('Start Pomodoro!');
	}));

	subscriptions.push(vscode.commands.registerCommand(STOP_TIMER, () => {
		vscode.window.showInformationMessage('Stop Pomodoro!');
	}));
}

export function deactivate() {}
