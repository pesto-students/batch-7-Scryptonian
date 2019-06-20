import { Toaster, Intent, Position } from '@blueprintjs/core';

export const errorToast = msg =>
  Toaster.create({ position: Position.TOP }).show({ message: msg, intent: Intent.DANGER, timeout: 3000 });

export const successToast = msg =>
  Toaster.create({ position: Position.TOP }).show({ message: msg, intent: Intent.SUCCESS, timeout: 3000 });
