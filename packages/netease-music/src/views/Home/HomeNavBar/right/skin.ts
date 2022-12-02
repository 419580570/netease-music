export function useCalcRgb(percentAll: any, percentPart: any) {
  const getRgb = (a: number, b: number, c: number) => {
    const fn = (value: number) => {
      if (value === 0) return [0, 102];
      if (value === 255) return [102, 255];
      return [(value * 0.4).toFixed(0), (value * 0.6 + 102).toFixed(0)];
    };
    const _a = fn(a);
    const _b = fn(b);
    const _c = fn(c);
    return [`${_a[0]}, ${_b[0]}, ${_c[0]}`, `${_a[1]}, ${_b[1]}, ${_c[1]}`];
  };

  const lmtrgb = computed(() => {
    let a = 1530 * percentAll.value + 0.01;
    let i = Math.ceil(a / 255);
    let j = Math.round(a % 255);
    switch (i) {
      case 1:
        return getRgb(255, j, 0);
      case 2:
        return getRgb(255 - j, 255, 0);
      case 3:
        return getRgb(0, 255, j);
      case 4:
        return getRgb(0, 255 - j, 255);
      case 5:
        return getRgb(j, 0, 255);
      case 6:
        return getRgb(255, 0, 255 - j);
      case 7:
        return getRgb(255, 0, 0);
      default:
        return ["102, 0, 0", "255, 102, 102"];
    }
  });

  watch([lmtrgb, percentPart], ([lmtrgb, percentPart]) => {

    let a = lmtrgb[0].split(",");
    let b = lmtrgb[1].split(",");
    let res = "";
    for (let i = 0; i < 3; i++) {
      res +=
        (Number(a[i]) + (Number(b[i]) - Number(a[i])) * percentPart).toFixed(
          0
        ) + ",";
    }

    document.documentElement.setAttribute("data-theme", "default");
    document.documentElement.setAttribute(
      "style",
      `--custom-theme: rgb(${res.slice(0, -1)})`
    );
  });

  return {
    lmtrgb,
  };
}
