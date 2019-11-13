import config from '@/../config/client';

export enum LocalStorageKeys {
  /** 主题名 */
  Theme = 'theme',
  /** UI 主色调 */
  PrimaryColor = 'primaryColor',
  /** 文本主色调 */
  PrimaryTextColor = 'primaryTextColor',
  /** 背景图片 */
  BackgroundImage = 'backgroundImage',
  /** 毛玻璃效果 */
  Aero = 'aero'
}

/**
 * 获取 localStorage 中的值
 * @param key 键值
 * @param defaultValue 默认值
 */
function getValue (key: string, defaultValue = 'default') {
  const value = window.localStorage.getItem(key);
  return value || defaultValue;
}

/**
 * 获取 localStorage 数据
 */
export function getLocalData () {
  const theme = getValue(LocalStorageKeys.Theme);
  const themeConfig = config.theme[theme];
  return {
    theme,
    ...themeConfig
  };
}
