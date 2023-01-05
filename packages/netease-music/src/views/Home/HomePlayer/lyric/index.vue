<template>
  <div
    class="lyric"
    :class="{ collapse: musicStore.lyric }"
    ref="lyric"
    :style="{ '--color': color }"
  >
    <div class="lyric-supply">
      <div class="down" @click="toggleLyric"></div>
      <div class="fullScreen"><Icon type="quanping"></Icon>全屏纯享</div>
    </div>
    <div class="lyric-content">
      <div class="record">
        <div class="avatar" ref="record">
          <img :src="currentSong?.picUrl" />
        </div>
        <Stylus></Stylus>
      </div>
      <div class="contents">
        <div class="head">
          <div class="name">
            {{ currentSong?.name }}
            <SongTag :song="currentSong!" :group="['VIP', 'MV']"></SongTag>
          </div>
          <div class="other">
            <div class="singer">
              歌手：<NameGroup :ar="currentSong?.ar!"></NameGroup>
            </div>
            <div class="album">
              专辑：<span class="blue" :title="currentSong?.al!.name">{{
                currentSong?.al!.name
              }}</span>
            </div>
            <div class="source">
              来源：<span class="blue" :title="currentSong?.from?.name">{{
                currentSong?.from?.name
              }}</span>
            </div>
          </div>
          <div class="alia" v-if="currentSong?.alia.length">
            {{ currentSong?.alia[0] }}
          </div>
        </div>
        <div class="main">
          <Lyric></Lyric>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicGetters, musicStore } from "@/hooks/store";
import Stylus from "./stylus.vue";
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import Lyric from "./lyric.vue";

const { currentSong, currentId } = musicGetters();
const lyric = ref<HTMLElement | null>(null);
const record = ref<HTMLElement | null>(null);
const deg = ref(0);
const timer = ref(0);
const color = ref("rgb(227, 222, 221)");

const toggleLyric = () => {
  musicStore.toggleLyric(!musicStore.lyric);
};

/* 根据音乐头像改变播放页面背景 */
const getImageColor = () => {
  if (!currentSong.value) return;
  const canvas = document.createElement("canvas");
  const image = document.createElement("img");
  const ctx = canvas.getContext("2d");
  image.crossOrigin = "Anonymous";
  image.src = currentSong.value.picUrl;
  image.onload = () => {
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, 10, 10);
    const data = ctx.getImageData(0, 0, 10, 10).data;
    let r = 0;
    let g = 0;
    let b = 0;
    for (var i = 0; i < 400; i++) {
      switch (i % 4) {
        case 0:
          r += data[i];
          break;
        case 1:
          g += data[i];
          break;
        case 2:
          b += data[i];
          break;
        case 3:
          break;
      }
    }
    r = Math.round(r / 100);
    g = Math.round(g / 100);
    b = Math.round(b / 100);
    color.value = `rgb(${r}, ${g}, ${b}, 0.3)`;
  };
};

/* 唱片转动动画 */
watch(
  () => musicStore.playing,
  val => {
    cancelAnimationFrame(timer.value);
    if (val) {
      nextTick(() => {
        if (!record.value) return;
        function rotate() {
          record.value!.style.transform = `rotateZ(${(deg.value += 0.15)}deg)`;
          timer.value = window.requestAnimationFrame(rotate);
        }
        rotate();
      });
    }
  }
);

/* 歌词界面显示动画 */
watch(
  () => musicStore.lyric,
  val => {
    if (!lyric.value) return;
    if (val) {
      lyric.value.style.transition = `height 0.3s ease-out`;
      setTimeout(() => {
        lyric.value!.style.transition = "none";
      }, 300);
    } else {
      lyric.value.style.transition = `height 0.1s linear`;
      setTimeout(() => {
        lyric.value!.style.transition = "none";
      }, 100);
    }
  }
);

watch(
  currentId,
  () => {
    getImageColor();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.lyric {
  position: absolute;
  bottom: 73px;
  left: 0;
  height: 0;
  width: 100vw;
  background-image: linear-gradient(var(--color) 15%, rgb(255, 255, 255) 70%);
  background-color: #fff;
  box-sizing: border-box;
  [data-theme="coDark"] & {
    background-image: linear-gradient(rgb(43, 43, 43), rgb(43, 43, 43));
  }
  overflow: hidden;
  &.collapse {
    height: calc(100vh - 73px);
    .lyric-supply {
      visibility: visible;
    }
  }
  &-supply {
    visibility: hidden;
    position: relative;
    height: 60px;
    line-height: 60px;
    transition: visibility 0s 0.3s linear;
    .down {
      height: 20px;
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 11px;
      position: absolute;
      top: 23px;
      left: 34px;
      cursor: pointer;
      &::after {
        content: "";
        width: 9px;
        height: 9px;
        border: 1px solid;
        border-left: none;
        border-top: none;
        transform: translateY(-5px) rotateZ(45deg);
        @include font-color("border-color");
      }
    }
    .fullScreen {
      cursor: pointer;
      position: absolute;
      right: 225px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      .quanping::before {
        display: inline-block;
        transform: translateY(2px) translateX(-2px);
      }
      [data-theme="coDark"] & {
        color: rgb(255, 255, 255, 0.4);
        .quanping::before {
          color: rgb(255, 255, 255, 0.15);
        }
      }
    }
  }
  &-content {
    display: flex;
    width: 850px;
    height: 470px;
    margin: 0 auto;
    position: relative;
    .record {
      width: 56%;
      height: 100%;
      .stylus {
        position: absolute;
        left: 165px;
        top: -30px;
      }
      .avatar {
        margin-top: 115px;
        margin-left: 60px;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        outline: 15px solid rgba(0, 0, 0, 0.12);
        [data-theme="coDark"] & {
          outline-color: rgba(255, 255, 255, 0.05);
        }
        background-image: url("@/assets/img/record.png");
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 216px;
          height: 216px;
          border-radius: 50%;
        }
      }
    }
    .contents {
      width: 44%;
      height: 100%;
      display: flex;
      // justify-content: flex-start;
      flex-direction: column;
      .head {
        width: 100%;
        // display: flex;
        // align-items: baseline;
        padding-top: 10px;
        // height: 78px;
        .name {
          word-break: break-word;
          font-size: 25px;
          font-weight: normal;
          position: relative;
          margin-bottom: 3px;
          // display: flex;
          align-items: baseline;
          // vertical-align: baseline;
          @include font-color();
          .content {
            margin-left: 7px;
          }
        }
        .other {
          display: flex;
          font-size: 13px;
          @include font-color-dark();
          opacity: 0.8;
          .blue:hover {
            cursor: pointer;
            color: rgb(35, 93, 157);
          }
          .singer {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 20px;
            max-width: 30%;
            :deep(.nameGroup) {
              font-size: 13px;
              .nameGroup-item {
                @include font-color-dark();
              }
              .nameGroup-item:hover {
                color: rgb(35, 93, 157) !important;
              }
            }
          }
          .album {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 20px;
            max-width: 30%;
          }
          .source {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 30%;
          }
        }
        .alia {
          margin-top: 5px;
          font-size: 13px;
          @include font-color-dark();
          opacity: 0.8;
        }
      }
      .main {
        flex: 1;
        min-height: 0;
      }
    }
  }
}
</style>
