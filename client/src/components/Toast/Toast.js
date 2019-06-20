import { Toaster, Intent, Position } from '@blueprintjs/core';

function getMsg(message) {
  const defaultErrorMsg = 'Something went wrong';

  if (!message) {
    return defaultErrorMsg;
  }
  if (typeof message === 'string') {
    return message;
  }

  let convertedMsg;
  try {
    convertedMsg = message.toString();
  } catch (e) {
    return defaultErrorMsg;
  }
  return convertedMsg;
}

export const errorToast = msg =>
  Toaster.create({ position: Position.TOP }).show({
    message: getMsg(msg),
    intent: Intent.DANGER,
    timeout: 3000,
  });

export const successToast = msg =>
  Toaster.create({ position: Position.TOP }).show({
    message: getMsg(msg),
    intent: Intent.SUCCESS,
    timeout: 3000,
  });

export const warningToast = msg =>
  Toaster.create({ position: Position.TOP }).show({
    message: getMsg(msg),
    intent: Intent.WARNING,
    timeout: 3000,
  });
