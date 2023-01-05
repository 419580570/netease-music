<template>
  <div class="lr" ref="lyricRoot">
    <div class="lr-main" ref="lyricWrapper" @mousewheel="handleWheel">
      <Loading :isLoading="loading">
        <ul class="lyric-wrapper">
          <li
            class="lyric-item"
            v-for="(item, key) in lyricMap"
            :class="{
              hover:
                key === hoverLyric && showJumpLine && !key.includes('User'),
              active: key === activeLyric || key === 'InfinityUser',
            }"
            :data-time="key"
            ref="lyricRefs"
          >
            <span v-if="key === 'InfinityUser' || !key.includes('User')"
              >{{ item }}
              <div class="translate" v-if="translate && tlyricMap">
                {{ tlyricMap[key] }}
              </div></span
            >
            <span v-else-if="key === 'lyricUser'"
              >滚动歌词贡献者：<span class="user">{{
                item.nickname
              }}</span></span
            >
            <span v-else
              >翻译贡献者：<span class="user">{{ item.nickname }}</span></span
            >
          </li>
        </ul>
      </Loading>
    </div>
    <div class="lr-buttons">
      <div class="add button" title="后退0.5s" @click="reduce">
        <Icon type="prev" :size="10"></Icon>
      </div>
      <div class="reduce button" title="前进0.5s" @click="add">
        <Icon type="prev" :size="10"></Icon>
      </div>
      <div
        class="translate button"
        title="翻译"
        @click="showTranslate"
        v-if="tlyricMap"
      >
        译
      </div>
      <div class="more button" title="报错">...</div>
    </div>
    <div
      class="lr-hover"
      v-show="showJumpLine"
      :class="{ disable: hoverLyric.includes('User') }"
    >
      <div class="time">
        {{ parsePlayTime(Number(hoverLyric) * 1000) }}
      </div>
      <div class="line"></div>
      <div class="play" @click="jump">
        <Icon type="bofang" :size="14"></Icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicGetters, musicStore } from "@/hooks/store";
import { getLyric } from "@/network/methods";
import { NNotify as notify } from "ui";
import util from "@/hooks/util";
import { useObserve } from "./useObserve";

const loading = ref(true);
const lyricMap = ref<Record<string, any>>({}); /* 歌词 */
const tlyricMap = ref<Record<string, any> | null>(null); /* 翻译 */
const activeLyric = ref("0"); /* 当前播放歌词 */
const hoverLyric = ref("0"); /* 可跳转歌词（滚动） */
const lyricWrapper = ref<HTMLElement | null>(null);
const lyricRoot = ref<HTMLElement | null>(null);
const lyricRefs = ref<HTMLElement[]>([]);
const deviation = ref(0); /* 歌词跟随偏移时间 */
const showJumpLine = ref(false); /* 是否显示跳转线 */
const translate = ref(true); /* 是否开启歌词翻译 */
const { currentId } = musicGetters();
const { parsePlayTime } = util();
const { stopObserve, addObserve } = useObserve(
  lyricRefs,
  hoverLyric,
  lyricRoot
);
let scrollTimer: NodeJS.Timeout; /* 歌词滚动 */
let waitTimer: NodeJS.Timeout; /* 歌词定位滚动延迟 */
let jumpLineTimer: NodeJS.Timeout; /* 滚动歌词跳转线显示-隐藏延迟 */

/* 歌词解析 */
const parseLyric = (res: any) => {
  const lyric: string = res.lrc.lyric;
  lyricMap.value = {};
  if (lyric) {
    const parse = (lyric: string, map: any) => {
      const lyricArr = (lyric || "").split("[").slice(1);
      lyricArr.forEach(item => {
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
      });
    };

    parse(lyric, lyricMap.value);
    if (res.tlyric && res.tlyric.lyric) {
      tlyricMap.value = {};
      parse(res.tlyric.lyric, tlyricMap.value);
      if (res.transUser) {
        tlyricMap.value["transUser"] = res.transUser;
      }
    } else {
      tlyricMap.value = null;
    }

    if (res.lyricUser) {
      lyricMap.value["lyricUser"] = res.lyricUser;
    }
  } else {
  }
};

/* 歌词滚动动画 */
const scrollAnimation = () => {
  nextTick(() => {
    if (!lyricWrapper.value) return;
    if (scrollTimer) clearInterval(scrollTimer);
    if (waitTimer) clearTimeout(waitTimer);
    const lyricItem: any = lyricWrapper.value.querySelector(".active");
    if (!lyricItem) return;
    let newTop =
      lyricItem.offsetTop -
      lyricItem.offsetParent.offsetHeight / 2 +
      lyricItem.offsetHeight / 2;
    newTop = newTop >= 0 ? newTop : 0;
    const oldTop = Math.round(lyricWrapper.value.scrollTop);
    const gap = (newTop - oldTop) / 50;

    waitTimer = setTimeout(() => {
      scrollTimer = setInterval(() => {
        if (gap > 0) {
          if (lyricWrapper.value!.scrollTop > newTop) {
            lyricWrapper.value!.scrollTop = newTop;
            clearInterval(scrollTimer);
            return;
          }
          lyricWrapper.value!.scrollTop += gap >= 1 ? gap : 1;
        } else {
          if (lyricWrapper.value!.scrollTop < newTop) {
            lyricWrapper.value!.scrollTop = newTop;
            clearInterval(scrollTimer);
            return;
          }
          lyricWrapper.value!.scrollTop += gap <= -1 ? gap : -1;
        }
      }, 5);
    }, 300);
  });
};

/* 增加歌词跟随偏移时间 */
const add = () => {
  deviation.value += 0.5;
  notify({
    duration: 1000,
    position: "center",
    size: 18,
    message: `${
      deviation.value > 0 ? "+" + deviation.value : deviation.value
    }S`,
    style: {
      padding: "12px 20px",
      borderRadius: "25px",
      letterSpacing: "3px",
    },
  });
};

/* 减小歌词跟随偏移时间 */
const reduce = () => {
  deviation.value -= 0.5;
  notify({
    duration: 1000,
    position: "center",
    size: 18,
    message: `${
      deviation.value > 0 ? "+" + deviation.value : deviation.value
    }S`,
    style: {
      padding: "12px 20px",
      borderRadius: "25px",
      letterSpacing: "3px",
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

/* 监听当前歌曲ID，加载对应歌词 */
watch(
  () => currentId.value,
  val => {
    loading.value = true;
    // lyricWrapper.value && (lyricWrapper.value.scrollTop = 0);
    // console.log(lyricWrapper.value);
    getLyric(val).then((res: any) => {
      if (res.code === 200) {
        loading.value = false;
        stopObserve();
        parseLyric(res);
        addObserve();
      }
    });
  },
  { immediate: true }
);

/* 更新当前播放歌词 */
watch(
  [
    () => musicStore.progress,
    lyricMap /* 监听歌词的变化，刚载入时更新当前歌词位置 */,
  ],
  ([newl, newm], [oldl, oldm]) => {
    if (!Object.keys(lyricMap.value).length) return;
    if (newm !== oldm && Object.keys(oldm).length) return;
    let val = Math.round(musicStore.progress * 2) / 2 + deviation.value;
    while (lyricMap.value[val.toFixed(1)] === undefined && val > 0) {
      val -= 0.5;
    }
    activeLyric.value = val.toFixed(1);
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

onBeforeUnmount(() => {
  stopObserve();
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.lr {
  height: 100%;
  width: 100%;
  padding: 14px 25px 7px 0;
  box-sizing: border-box;
  position: relative;
  &:hover {
    .lr-buttons {
      display: block;
    }
    .lr-hover {
      display: flex;
    }
  }
  // &::after {
  //   content: "";
  //   position: absolute;
  //   bottom: 39%;
  //   width: 100%;
  //   background-color: red;
  //   height: 45px;
  // }
  // mask-position: top;
  // display: flex;
  &-main {
    height: 100%;
    overflow-y: scroll;
    position: relative;
    @include scrollbar();
    -webkit-mask-image: linear-gradient(
      transparent 0%,
      rgba(0, 0, 0, 1) 5%,
      rgba(0, 0, 0, 1) 95%,
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    &::-webkit-scrollbar-thumb {
      display: none;
      background-color: #0002 !important;
      &:hover {
        background-color: #0003 !important;
      }
      [data-theme="coDark"] & {
        background-color: rgb(64, 64, 64) !important;
        &:hover {
          background-color: rgb(74, 74, 74) !important;
        }
      }
    }
    &:hover::-webkit-scrollbar-thumb {
      display: block;
    }
    .lyric-wrapper {
      padding: 154px 0 166px;
      .lyric-item {
        font-size: 14px;
        line-height: 26px;
        padding: 5px 0;
        min-height: 26px;
        @include font-color-lyric();
        &.active {
          font-size: 16px;
          font-weight: bold;
          .translate {
            font-size: 14px;
            font-weight: normal;
          }
        }
        &.hover {
          font-weight: bold;
          .translate {
            font-weight: normal;
          }
        }
        .user {
          text-decoration: underline;
          cursor: pointer;
        }
        .translate {
          padding: 5px 0 13px;
          font-size: 12px;
        }
      }
    }
  }
  &-buttons {
    display: none;
    width: 15px;
    height: 100%;
    position: absolute;
    right: 4px;
    top: 13px;
    .button {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      margin-bottom: 5px;
      text-align: center;
      line-height: 17px;
      background-color: rgba(0, 0, 0, 0.05);
      [data-theme="coDark"] & {
        background-color: rgba(255, 255, 255, 0.07);
      }
      @include font-color-lyric-hover();
    }
    .add {
      .prev::before {
        display: inline-block;
        transform: translateY(-3.5px) translateX(1px) rotateZ(-90deg);
      }
    }
    .reduce {
      .prev::before {
        display: inline-block;
        transform: translateY(-3.5px) rotateZ(90deg);
      }
    }
    .more {
      position: absolute;
      bottom: 15px;
      transform-origin: 50% 50%;
      line-height: 30%;
      transform: rotateZ(90deg);
      text-align: center;
    }
    .translate {
      width: 17px;
      height: 17px;
      position: absolute;
      bottom: 45px;
      font-size: 12px;
      cursor: pointer;
      @include font-color-dark();
    }
  }
  &-hover {
    width: 370px;
    height: 15px;
    position: absolute;
    top: 49.5%;
    left: -36px;
    display: none;
    // justify-content: space-between;
    align-items: center;
    pointer-events: none;
    .time {
      position: absolute;
      left: 0;
      font-size: 13.5px;
      letter-spacing: 0.2px;
      @include font-color-lyric-active();
    }
    .line {
      position: absolute;
      left: 38px;
      margin-top: 2px;
      width: 314px;
      height: 2px;
      --color: rgb(0, 0, 0, 0.2);
      background-image: linear-gradient(
        to right,
        var(--color) 10%,
        transparent 15%,
        transparent 85%,
        var(--color) 90%
      );
      [data-theme="coDark"] & {
        --color: rgb(255, 255, 255, 0.2);
      }
    }
    .play {
      pointer-events: all;
      position: absolute;
      right: 0;
      cursor: pointer;
      @include font-color-lyric-active();
    }
    &.disable {
      .time {
        opacity: 0;
      }
      .play:hover {
        cursor: not-allowed;
      }
    }
  }
}
</style>
