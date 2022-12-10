export default function () {
  const dataFormat = (originVal: string) => {
    const date = new Date(originVal);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 + "").padStart(2, "0");
    const day = (date.getDate() + "").padStart(2, "0");
    const hh = (date.getHours() + "").padStart(2, "0");
    const mm = (date.getMinutes() + "").padStart(2, "0");
    const ss = (date.getSeconds() + "").padStart(2, "0");
    // return `${year}-${month}-${day}`
    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
  };

  const SimpleDataFormat = (originVal: string | number | Date) => {
    const date = new Date(originVal);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 + "").padStart(2, "0");
    const day = (date.getDate() + "").padStart(2, "0");
    // const hh = (date.getHours() + '').padStart(2,'0')
    // const mm = (date.getMinutes() + '').padStart(2,'0')
    // const ss = (date.getSeconds() + '').padStart(2,'0')
    return `${year}-${month}-${day}`;
    // return `${year}-${month}-${day} ${hh}:${mm}:${ss}
  };

  const simpNum = (num: number, numlength = 6) => {
    const numStr = num + "";
    if (numStr.length < numlength) {
      return num;
    } else if (numStr.length > numlength - 1) {
      return parseInt(num / 10000 + "") + "万";
    } else if (numStr.length > 8) {
      return parseInt(num / 10 ** 8 + "") + "亿";
    }
  };

  const simString = (str: string, strlength = 7) => {
    try {
      return str.substring(0, strlength - 1) + "...";
    } catch (e) {
      console.log(e);
    }
  };

  const conName = (ar: any) => {
    const arr = [];
    for (const item in ar) {
      arr.push(ar[item].name);
    }
    return arr.join("/");
  };

  const addZero = (num: number) => {
    if (num < 10) return "0" + num;
    return num;
  };

  const parsePlayTime = (dt: number) => {
    const time = parseInt(dt / 1000 + "");
    const min = addZero(parseInt(time / 60 + ""));
    const sec = addZero(parseInt(time - 60 * Number(min) + ""));
    return min + ":" + sec;
  };

  const addStorage = (key: string, value: string) => {
    return localStorage.setItem(key, value);
  };

  const getStorage = (key: string) => {
    return localStorage.getItem(key) || "";
  };

  const removeStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  const debounce = (fn: Function, timeout: number) => {
    let timer: NodeJS.Timeout | null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, timeout);
    };
  };

  return {
    dataFormat,
    SimpleDataFormat,
    simpNum,
    simString,
    conName,
    addZero,
    parsePlayTime,
    addStorage,
    getStorage,
    removeStorage,
    debounce,
  };
}
