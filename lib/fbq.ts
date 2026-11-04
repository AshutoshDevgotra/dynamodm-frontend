export type FbqParams = Record<string, string | number | boolean>;

function send(command: 'track' | 'trackCustom', eventName: string, params?: FbqParams) {
  if (typeof window === 'undefined' || !window.fbq) return;
  if (params && Object.keys(params).length > 0) window.fbq(command, eventName, params);
  else window.fbq(command, eventName);
}

export function track(eventName: string, params?: FbqParams) {
  send('track', eventName, params);
}

export function trackCustom(eventName: string, params?: FbqParams) {
  send('trackCustom', eventName, params);
}
