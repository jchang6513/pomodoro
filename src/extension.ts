import * as vscode from 'vscode';

const START_TIMER = 'tomatotimer.start';
const STOP_TIMER = 'tomatotimer.stop';

export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(START_TIMER, () => {
		vscode.window.showInformationMessage('Start TomatoTimer!');
	}));

	subscriptions.push(vscode.commands.registerCommand(STOP_TIMER, () => {
		vscode.window.showInformationMessage('Stop TomatoTimer!');
	}));
}

export function deactivate() {}
