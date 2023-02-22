export function random(start: number, end: number, fixed: number = 0): number {
  let differ = end - start;
  let random = Math.random();
  return Number((start + differ * random).toFixed(fixed));
}

export const addZero = (num: number) => {
  if (num < 10) return "0" + num;
  return num;
};

export function parseTimeStamp(timeStamp: number) {
  const time = new Date(timeStamp);
  const now = new Date();
  const Y = time.getFullYear();
  const M = time.getMonth() + 1;
  const D = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const _M = addZero(M);
  const _D = addZero(D);
  const _h = addZero(h);
  const _m = addZero(m);
  let gap;
  if (Y !== now.getFullYear()) {
    return `${Y}年${_M}月${_D}日 ${_h}:${_m}`;
  }
  if (M !== now.getMonth() + 1) {
    return `${_M}月${_D}日 ${_h}:${_m}`;
  }
  if (D === now.getDate() - 1) {
    return `昨天 ${_h}:${_m}`;
  }
  if (D !== now.getDate()) {
    return `${_M}月${_D}日 ${_h}:${_m}`;
  }
  if (h !== now.getHours()) {
    return `${_h}:${_m}`;
  }
  if ((gap = now.getMinutes() - m)) {
    return `${gap}分钟前`;
  }
  return "刚刚";
}
