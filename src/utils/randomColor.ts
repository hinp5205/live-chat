const SATURATION_BOUND = {
  min: 0,
  max: 100,
};
const LIGHTNESS_BOUND = {
  min: 0,
  max: 100,
};
const DEFAULT_SATURATION = [50, 55];
const DEFAULT_LIGHTNESS = [50, 60];
const pad2 = (str: string) => `${str.length === 1 ? '0' : ''}${str}`;
const clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min);
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const hashCode = (str: string): number => {
  const len = str.length;
  let hash = 0;

  for (let i = 0; i < len; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
  }

  return hash;
};

const boundHashCode = (num: number, range: number | Array<number>): number => {
  if (typeof range === 'number') {
    return range;
  }

  return (num % Math.abs(range[1] - range[0])) + range[0];
};

const sanitizeRange = (
  range: number | Array<number>,
  min: number,
  max: number,
) => {
  if (typeof range === 'number') {
    return clamp(Math.abs(range), min, max);
  }

  if (range.length === 1 || range[0] === range[1]) {
    return clamp(Math.abs(range[0]), min, max);
  }

  return [
    Math.abs(clamp(range[0], min, max)),
    clamp(Math.abs(range[1]), min, max),
  ];
};

const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) {
    t += 1;
  } else if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }

  return p;
};

const hslToRgb = (h: number, s: number, l: number) => {
  let r;
  let g;
  let b;

  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    // achromatic
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbFormat = (r: number, g: number, b: number) => {
  return `#${pad2(r.toString(16))}${pad2(g.toString(16))}${pad2(
    b.toString(16),
  )}`;
};

export function randomColor(value: string) {
  const hash = Math.abs(hashCode(value));
  const h = boundHashCode(hash, [0, 360]);
  const s = boundHashCode(
    hash,
    sanitizeRange(
      DEFAULT_SATURATION,
      SATURATION_BOUND.min,
      SATURATION_BOUND.max,
    ),
  );
  const l = boundHashCode(
    hash,
    sanitizeRange(DEFAULT_LIGHTNESS, LIGHTNESS_BOUND.min, LIGHTNESS_BOUND.max),
  );
  const [r, g, b] = hslToRgb(h, s, l);

  return rgbFormat(r, g, b);
}
