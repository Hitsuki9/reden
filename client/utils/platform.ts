const UA = window.navigator.userAgent;

export const isIOS = /iPhone/i.test(UA);

export const isAndroid = /android/i.test(UA);

export const isMobile = isIOS || isAndroid;
