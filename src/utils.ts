import * as vscode from 'vscode';

export const padWithZero = (n: number, pad: number) => ('00' + n).slice(-pad);

export const getConfiguration = <T extends unknown>(key: string, defaultValue: T): T => {
  return vscode.workspace.getConfiguration().get(key) || defaultValue;
};
