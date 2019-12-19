/**
 * 设置 CSS 变量
 * @param color 主色调
 * @param textColor 文字主色调
 */
export function setCssVariable(color: string, textColor: string) {
  let cssText = '';
  for (let i = 0; i <= 10; i++) {
    const hue =
      `--primary-color-${i}: rgba(${color}, ${i / 10});` +
      `--primary-color-${i}_5: rgba(${color}, ${(i + 0.5) / 10});` +
      `--primary-text-color-${i}: rgba(${textColor}, ${i / 10});`;
    cssText += hue;
  }
  document.documentElement.style.cssText += cssText;
}
