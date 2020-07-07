/**
 * RGB 转 HSL
 * @param rgb RGB 数组 [R, G, B]
 */
function rgb2hsl(rgb: number[]) {
  const [red, green, blue] = rgb.map((item) => item / 255);
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const sum = max + min;
  let hue = 0;
  let saturation = 0;
  const lightness = sum / 2;

  if (max === min) {
    hue = 0;
  } else if (max === red && green >= blue) {
    // 0 ~ 60
    hue = ((green - blue) / delta) * 60;
  } else if (max === red && green < blue) {
    // 300 ~ 360
    hue = 360 + ((green - blue) / delta) * 60;
  } else if (max === green) {
    // 60 ~ 180
    hue = 120 + ((blue - red) / delta) * 60;
  } else if (max === blue) {
    // 180 ~ 300
    hue = 240 + ((red - green) / delta) * 60;
  }

  if (lightness === 0 || max === min) {
    saturation = 0;
  } else if (lightness > 0 && lightness <= 0.5) {
    saturation = delta / sum;
  } else if (lightness > 0.5) {
    saturation = delta / (2 - sum);
  }

  return [hue, saturation * 100, lightness * 100].map((item) =>
    Math.round(item)
  );
}

/**
 * 获得原始颜色的派生颜色（亮色/暗色）
 * @param color 原始颜色 RGB 字符串
 */
function getDerivedColor(color: string) {
  const rgb = color.split(',').map((item) => Number.parseInt(item.trim(), 10));
  const hsl = rgb2hsl(rgb);

  return {
    lightColor: hsl
      .map((item, idx) => {
        if (idx === 1) return `${item}%`;
        if (idx === 2) return `${Math.min(item + 20, 100)}%`;
        return item;
      })
      .join(', '),
    darkColor: hsl
      .map((item, idx) => {
        if (idx === 1) return `${item}%`;
        if (idx === 2) return `${Math.max(item - 20, 0)}%`;
        return item;
      })
      .join(', ')
  };
}

/**
 * 设置 CSS 变量
 * @param color 主色调 RGB 字符串
 * @param textColor 文字主色调 RGB 字符串
 */
export function setCssVariable(color: string, textColor: string) {
  let cssText = '';
  const { lightColor, darkColor } = getDerivedColor(color);
  for (let i = 0; i <= 10; i++) {
    const cssVariables =
      `--primary-color-${i}: rgba(${color}, ${i / 10});` +
      // `--primary-color-${i}_5: rgba(${color}, ${(i + 0.5) / 10});` +
      `--primary-light-color-${i}: hsla(${lightColor}, ${i / 10});` +
      `--primary-dark-color-${i}: hsla(${darkColor}, ${i / 10});` +
      `--primary-text-color-${i}: rgba(${textColor}, ${i / 10});`;
    cssText += cssVariables;
  }
  document.documentElement.style.cssText += cssText;
}
