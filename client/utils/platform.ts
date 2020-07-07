import Bowser from 'bowser';

const UA = navigator.userAgent;
const parser = Bowser.getParser(UA);
const browser = parser.getBrowser();
const os = parser.getOS();
const detailBrowser =
  browser.name && browser.version ? `${browser.name} ${browser.version}` : '';
const detailOS =
  os.name && os.version ? `${os.name} ${os.versionName || os.version}` : '';

export const platform = {
  browser: parser.getBrowserName(),
  os: parser.getOSName(),
  environment:
    detailBrowser && detailOS
      ? `${detailBrowser} on ${detailOS}`
      : detailBrowser || detailOS || ''
};
export const isIOS = /iPhone/i.test(UA);
export const isAndroid = /android/i.test(UA);
export const isMobile = isIOS || isAndroid;
