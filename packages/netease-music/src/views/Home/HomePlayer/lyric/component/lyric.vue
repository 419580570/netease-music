<template>
  <div class="lr" ref="lyricRoot">
    <!-- 歌词 -->
    <div class="lr-main" ref="lyricWrapper" @mousewheel.passive="handleWheel">
      <Loading :isLoading="loading">
        <ul class="lyric-wrapper">
          <li class="lyric-item" v-if="!canScroll">"改歌词不支持自动滚动"</li>
          <li
            class="lyric-item"
            v-for="(item, key, index) in lyricMap"
            :class="{
              hover:
                key === hoverLyric && showJumpLine && !key.includes('User'),
              active: key === activeLyric || key === 'InfinityUser',
              bold: translate,
            }"
            :data-time="key"
            ref="lyricRefs"
          >
            <span v-if="key === 'InfinityUser' || !key.includes('User')"
              >{{ item }}
              <div
                class="translate"
                v-if="translate && tlyricMap && tlyricMap[key]"
              >
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
    <!-- 右侧按钮 -->
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
    <!-- 跳转线 -->
    <div
      class="lr-hover"
      v-show="canScroll && showJumpLine"
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
import { useObserve } from "../hooks/useObserve";
import { useLyric } from "../hooks/useLyric";
import { getLyric } from "@/network/methods";
import { musicGetters } from "@/hooks/store";
import util from "@/hooks/util";

const loading = ref(true);
const lyricWrapper = ref<HTMLElement | null>(null);
const lyricRoot = ref<HTMLElement | null>(null);
const lyricRefs = ref<HTMLElement[]>([]);
const { parsePlayTime } = util();
const { currentId } = musicGetters();
const {
  hoverLyric,
  activeLyric,
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
} = useLyric(lyricWrapper, lyricRoot, lyricRefs);
const { stopObserve, addObserve } = useObserve(
  lyricRefs,
  hoverLyric,
  lyricRoot
);

/* 监听当前歌曲ID，加载对应歌词 */
watch(
  () => currentId.value,
  val => {
    if (!val) return;
    loading.value = true;
    const audio = document.querySelector("audio");
    audio && audio.pause(); //坑 切歌时暂停，要不进度会更新
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
onBeforeUnmount(() => {
  stopObserve();
});

defineExpose(currentLyric);
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
      // position: relative;
      // .noScroll {
      //   position: absolute;
      //   @include font-color-lyric();
      // }
      .lyric-item {
        font-size: 14px;
        line-height: 26px;
        padding: 5px 0;
        min-height: 26px;
        @include font-color-lyric();
        &.active {
          font-size: 16px;
          font-weight: 800;
          .translate {
            font-size: 14px;
            font-weight: normal;
          }
          // &.bold {
          //   font-weight: 800;
          // }
        }
        &.hover {
          font-weight: 800;
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
