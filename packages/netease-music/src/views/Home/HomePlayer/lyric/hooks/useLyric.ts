import { musicStore } from "@/hooks/store";
import { NNotify as notify } from "ui";
import { Ref } from "vue";
export function useLyric(
  lyricWrapper: Ref<HTMLElement | null>,
  lyricRoot: Ref<HTMLElement | null>,
  lyricRefs: Ref<HTMLElement[]>
) {
  const lyricMap = ref<Record<string, any>>({}); /* 歌词 */
  const tlyricMap = ref<Record<string, any> | null>(null); /* 翻译 */
  const activeLyric = ref("0"); /* 当前播放歌词 */
  const hoverLyric = ref("0"); /* 可跳转歌词（滚动） */
  const deviation = ref(0); /* 歌词跟随偏移时间 */
  const showJumpLine = ref(false); /* 是否显示跳转线 */
  const translate = ref(true); /* 是否开启歌词翻译 */
  const canScroll = ref(true); /* 歌词是否可以滚动 */

  let scrollTimer: number | null; /* 歌词滚动 */
  let waitTimer: NodeJS.Timeout | null; /* 歌词定位滚动延迟 */
  let jumpLineTimer: NodeJS.Timeout; /* 滚动歌词跳转线显示-隐藏延迟 */
  let first = true;
  let waitTime = 300;
  let firstLyric = 0;

  const currentLyric = computed(() => {
    let str =
      lyricMap.value[activeLyric.value] || lyricMap.value["InfinityUser"];
    str = str.replace(/^"(.*)"$/, (_: any, val: string) => val);
    return str;
  });

  /* 歌词解析 */
  const parseLyric = (res: any) => {
    // lyricWrapper.value && (lyricWrapper.value.scrollTop = 0);
    const lyric: string = res.lrc.lyric;
    lyricMap.value = {};
    if (lyric) {
      const parse = (lyric: string, map: any) => {
        let lyricArr;
        if (lyric[0] !== "[") {
          canScroll.value = false;
          lyricArr = (lyric || "").split("\n");
          lyricArr.forEach((item, index) => {
            map[index] = item;
          });
          firstLyric = 0;
        } else {
          canScroll.value = true;
          lyricArr = (lyric || "").split("[").slice(1);
          lyricArr.forEach((item, index) => {
            const arr = (item || "").split("]");
            if (res.lrc.version === 1) {
              map["InfinityUser"] = arr[1];
              return;
            }
            const m = parseInt((arr[0] || "").split(":")[0]);
            const s = parseInt((arr[0] || "").split(":")[1]);
            let ms = parseInt((arr[0] || "").split(".")[1]);
            ms = ms >= 333 && ms <= 666 ? 0.5 : ms < 333 ? 0 : 1;
            const key = m * 60 + s + ms; /* 时间 */
            const val = arr[1] == "\n" ? "" : arr[1].slice(0, -1); /* 歌词 */

            map[key.toFixed(1)] = val;
            index === 0 && (firstLyric = key);
          });
        }
      };

      parse(lyric, lyricMap.value);

      if (res.lyricUser) {
        lyricMap.value["lyricUser"] = res.lyricUser;
      }
      if (res.tlyric && res.tlyric.lyric) {
        tlyricMap.value = {};
        parse(res.tlyric.lyric, tlyricMap.value);
        translate.value = true;
        if (res.transUser) {
          lyricMap.value["transUser"] = res.transUser;
        }
      } else {
        tlyricMap.value = null;
        translate.value = false;
      }
      // nextTick(() => {
      if (!first) {
        updateActiveLyric(0);
      } else {
        first = false;
        updateActiveLyric();
      }
      // });
    } else {
    }
  };

  const clearTime = () => {
    if (scrollTimer) {
      cancelAnimationFrame(scrollTimer);
      scrollTimer = null;
    }
    if (waitTimer) {
      clearTimeout(waitTimer);
      waitTimer = null;
      waitTime = 0;
    }
  };

  /* 歌词滚动动画 */
  const scrollAnimation = () => {
    clearTime();
    // nextTick(() => {
    waitTimer = setTimeout(() => {
      if (!lyricWrapper.value) return;
      const lyricItem: any = lyricWrapper.value!.querySelector(".active");
      if (!lyricItem) return;
      let newTop =
        lyricItem.offsetTop -
        lyricItem.offsetParent.offsetHeight / 2 +
        lyricItem.offsetHeight / 2;
      newTop = newTop >= 0 ? newTop : 0;
      const oldTop = Math.round(lyricWrapper.value!.scrollTop);
      const gap = (newTop - oldTop) / 12;
      const animation = () => {
        if (gap > 0) {
          if (
            lyricWrapper.value!.scrollTop >=
            (newTop - gap >= 0 ? newTop - gap : 0)
          ) {
            lyricWrapper.value!.scrollTop = newTop;
            cancelAnimationFrame(scrollTimer!);
            scrollTimer = null;
            return;
          }
          lyricWrapper.value!.scrollTop += gap >= 1 ? gap : 1;
        } else {
          if (lyricWrapper.value!.scrollTop <= (newTop >= 0 ? newTop : 0)) {
            lyricWrapper.value!.scrollTop = newTop;
            cancelAnimationFrame(scrollTimer!);
            scrollTimer = null;
            return;
          }
          lyricWrapper.value!.scrollTop += gap <= -1 ? gap : -1;
        }
        scrollTimer = requestAnimationFrame(animation);
      };
      scrollTimer = requestAnimationFrame(animation);
      waitTime = 300;
      waitTimer = null;
    }, waitTime);
    // });
  };

  /* 增加歌词跟随偏移时间 */
  const add = () => {
    deviation.value += 0.5;
    notify({
      duration: 1000,
      position: "center",
      size: 16,
      message: `${
        deviation.value > 0 ? "+" + deviation.value : deviation.value
      }S`,
      style: {
        padding: "12px 20px",
        borderRadius: "25px",
        letterSpacing: "2px",
      },
    });
  };

  /* 减小歌词跟随偏移时间 */
  const reduce = () => {
    deviation.value -= 0.5;
    notify({
      duration: 1000,
      position: "center",
      size: 16,
      message: `${
        deviation.value > 0 ? "+" + deviation.value : deviation.value
      }S`,
      style: {
        padding: "12px 20px",
        borderRadius: "25px",
        letterSpacing: "2px",
      },
    });
  };

  /* 滚动歌词 */
  const handleWheel = (e: MouseEvent) => {
    if (showJumpLine.value) clearTimeout(jumpLineTimer);
    if (scrollTimer) clearInterval(scrollTimer);
    showJumpLine.value = true;
    jumpLineTimer = setTimeout(() => {
      showJumpLine.value = false;
      scrollAnimation();
    }, 3000);
  };

  /* 跳转 */
  const jump = () => {
    if (hoverLyric.value.includes("User")) return;
    const audio = document.querySelector("audio");
    if (!audio) return;
    clearTimeout(jumpLineTimer);
    showJumpLine.value = false;
    audio.currentTime = Number(hoverLyric.value);
  };

  /* 切换是否翻译 */
  const showTranslate = () => {
    translate.value = !translate.value;
    scrollAnimation();
  };

  const updateActiveLyric = (index?: number) => {
    let val;
    if (index || index === 0) {
      val = firstLyric;
    } else {
      val = Math.round(musicStore.progress * 2) / 2 + deviation.value;
      while (lyricMap.value[val.toFixed(1)] === undefined && val > 0) {
        val -= 0.5;
      }
      val = val <= firstLyric ? firstLyric : val;
    }
    activeLyric.value = val.toFixed(1);
  };

  /* 更新当前播放歌词 */
  watch(
    // [
    () => musicStore.progress,
    // ],
    () => {
      updateActiveLyric();
    }
  );

  /* 监听播放歌词，执行定位跳转动画 */
  watch(
    activeLyric,
    lyric => {
      if (lyricMap.value[lyric] && !showJumpLine.value) {
        scrollAnimation();
      }
    },
    { immediate: true }
  );

  return {
    lyricRefs,
    hoverLyric,
    activeLyric,
    lyricRoot,
    currentLyric,
    canScroll,
    showJumpLine,
    tlyricMap,
    lyricMap,
    translate,
    parseLyric,
    add,
    reduce,
    handleWheel,
    jump,
    showTranslate,
  };
}
