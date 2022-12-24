import { musicActions, musicGetters, musicStore } from "@/hooks/store";
import { getURL } from "@/network/methods";
import util from "@/hooks/util";
import { Ref } from "vue";
export default function usePlayer(next: Function, cutway: Ref<string>) {
  const { togglePlayState } = musicActions();
  const { currentId } = musicGetters();
  const { parsePlayTime } = util();
  const audio = ref<HTMLAudioElement | null>(null);
  const isplay = ref(false);
  const url = ref("");
  const first = ref(true);
  const playTime = ref(0);
  const totalTime = ref(0);
  const sper = ref("0%");
  const loaded = ref("0%");

  /* 切换播放状态 */
  const toggle = () => {
    isplay.value = !isplay.value;
    if (isplay.value) {
      /* 当处于当前列表播放完状态时，点击播放按钮跳转到第一条播放 */
      if (musicStore.isEnd) {
        next();
      } else {
        play();
      }
    } else {
      pause();
    }
  };
  const play = () => {
    /* 声音渐渐出现 */
    if (audio.value?.paused) {
      audio.value!.play();
      let volume = musicStore.volume / 100;
      let timer = setInterval(() => {
        if (audio.value!.volume < volume && audio.value!.volume < volume) {
          audio.value!.volume += volume / 10;
        } else {
          clearInterval(timer);
          audio.value!.volume = volume;
        }
      }, 100);
    }
  };

  const pause = () => {
    /* 声音渐渐消失 */
    if (!audio.value) return;
    if (!audio.value.paused) {
      let gap = audio.value.volume / 10;
      let timer = setInterval(() => {
        if (audio.value!.volume > 0 && audio.value!.volume > gap) {
          audio.value!.volume -= gap;
        } else {
          clearInterval(timer);
          audio.value!.volume = 0;
          audio.value!.pause();
        }
      }, 100);
    }
  };

  /* 当音乐播放进度变化时的回调 */
  const update = () => {
    audio.value?.currentTime && (playTime.value = audio.value?.currentTime);
  };

  /* 当音乐缓冲区变化时的回调 */
  const progress = () => {
    var timeRange = audio.value?.buffered!;
    if (!timeRange.length || !totalTime.value) return;
    loaded.value =
      (timeRange.end(timeRange.length - 1) / totalTime.value) * 100 + "%";
  };

  /* 当音乐播放完毕时回调 */
  const ended = () => {
    if (
      cutway.value === "shunxubofang" &&
      musicStore.playlist.length - 1 === musicStore.currentIndex
    ) {
      /* 当循环状态是顺序播放时，播放完最后一首切换成播放完的状态判断 */
      musicStore.end();
      isplay.value = false;
      return;
    }
    next();
  };

  /* 当音乐可以播放时的回调 */
  const ready = () => {
    totalTime.value = audio.value?.duration || 0;
    /* 页面初始化加载好的音乐不播放 */
    if (first.value) {
      first.value = false;
      return;
    }
    audio.value?.play();
    isplay.value = true;
    progress();
  };

  /* 当点击播放条时跳转播放 */
  const jump = (e: MouseEvent) => {
    if (!e.target || !audio.value) return;
    if ((e.target as any).className === "progress") {
      /* 点击 */
      audio.value!.currentTime =
        totalTime.value * (e.offsetX / (e.target as any).offsetWidth);
    } else {
      /* 拖动 */
      const offsetX = e.offsetX;
      const clientX = e.clientX;
      let width = 0;
      const move = (ed: MouseEvent) => {
        const moveX = ed.clientX - clientX;
        width = offsetX + moveX;
        if (width < 0) {
          width = 0;
        } else if (width > 350) {
          width = 350;
        }
        sper.value = width + "px";
      };
      const up = () => {
        audio.value!.currentTime = (width / 350) * totalTime.value;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  };

  const time = computed(() => {
    const playtime = playTime.value;
    const totaltime = totalTime.value;
    sper.value = ((playtime / totaltime) * 100).toFixed(2) + "%";
    return {
      playTime: parsePlayTime(playtime * 1000),
      totalTime: parsePlayTime(totaltime * 1000),
    };
  });

  watch(
    isplay,
    (val, oval) => {
      val !== oval && togglePlayState(val);
    },
    { immediate: true }
  );

  /* 监听当前音乐的ID，获取音乐的url */
  watch(
    currentId,
    (val, oldval) => {
      if (!val) return;
      /* 页面加载后处于播放完状态，点击播放切换音乐并播放 */
      if (oldval === 0) {
        first.value = false;
      }
      getURL(val)
        .then(res => {
          url.value = res;
        })
        .catch(() => {
          next();
        });
    },
    { immediate: true }
  );

  watch(
    () => musicStore.volume,
    val => {
      nextTick(() => {
        if (audio.value) {
          if (isplay.value === false) {
            audio.value.volume = 0;
          } else {
            audio.value.volume = val / 100;
          }
        }
      });
    },
    { immediate: true }
  );

  return {
    url,
    isplay,
    audio,
    time,
    sper,
    loaded,
    toggle,
    update,
    ended,
    ready,
    jump,
    progress,
  };
}
