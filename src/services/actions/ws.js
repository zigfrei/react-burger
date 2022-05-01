export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_START_INIT = 'WS_CONNECTION_START_INIT';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_FINISH = 'WS_CONNECTION_FINISH';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_GET_MESSAGE_INIT = 'WS_GET_MESSAGE_INIT';
export function wsConnectionStart() {
  return { type: WS_CONNECTION_START }
}
export function wsUserConnectionStart() {
  return { type: WS_CONNECTION_START_INIT }
}
export function wsConnectionFinish() {
  return { type: WS_CONNECTION_FINISH }
}
export function wsGetMessage() {
  return { type: WS_GET_MESSAGE }
}
export function wsUserGetMessage() {
  return { type: WS_GET_MESSAGE_INIT }
}
