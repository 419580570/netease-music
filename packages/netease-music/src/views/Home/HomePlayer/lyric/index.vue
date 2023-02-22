<template>
  <div
    class="lyric"
    :class="{ collapse: musicStore.lyric }"
    ref="lyric"
    :style="{ '--color': color }"
    v-if="currentSong && haveSong"
  >
    <div class="lyric-supply">
      <div class="down" @click="toggleLyric"></div>
      <div class="fullScreen"><Icon type="quanping"></Icon>全屏纯享</div>
      <transition name="toplyric">
        <div class="topLyric" v-show="showTopLyric">
          <div class="topLyric_title">{{ currentSong?.name }}</div>
          <div class="topLyric_lyric" v-show="currentLyric">
            {{ currentLyric }}
          </div>
        </div>
      </transition>
    </div>
    <div class="lyric-main" @scroll="handleScroll" ref="lyricMain">
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
                来源：<span
                  class="blue"
                  :title="currentSong?.from?.name"
                  @click="toDetail(currentSong?.from)"
                  >{{ currentSong?.from?.name }}</span
                >
              </div>
            </div>
            <div class="alia" v-if="currentSong?.alia.length">
              {{ currentSong?.alia[0] }}
            </div>
          </div>
          <div class="main">
            <Lyric ref="currentLyric"></Lyric>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="lyric-bottom">
        <div class="comments">
          <Comment
            :id="currentId"
            :type="0"
            ref="comment"
            @handle-pagination="handlePagination"
          ></Comment>
        </div>
        <Simi></Simi>
      </div>
    </div>
    <CommentDialog @handle-publish="handlePublish"></CommentDialog>
    <transition name="stick">
      <Button
        class="bgButton button-zd"
        size="12px"
        v-show="showStickTop"
        @click="Top"
        ><Icon type="zhiding" :size="14"></Icon
      ></Button>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { musicGetters, musicStore } from "@/hooks/store";
import Stylus from "./component/stylus.vue";
import Simi from "./component/simi.vue";
import CommentDialog from "./component/commentDialog.vue";
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import Lyric from "./component/lyric.vue";
import Comment from "@/components/comment/comment.vue";

const { currentSong, currentId, hasPlayList: haveSong } = musicGetters();
const router = useRouter();
const lyric = ref<HTMLElement | null>(null);
const currentLyric = ref();
const record = ref<HTMLElement | null>(null);
const lyricMain = ref<HTMLElement | null>(null);
const comment = ref<any>(null);
const deg = ref(0);
const timer1 = ref(0);
const timer2 = ref<NodeJS.Timeout | null>(null);
const color = ref("rgb(227, 222, 221)");
const showTopLyric = ref(false);
const showStickTop = ref(false);

const toggleLyric = () => {
  musicStore.toggleLyric(!musicStore.lyric);
  if (!musicStore.lyric) {
    lyricMain.value && (lyricMain.value.scrollTop = 0);
    showTopLyric.value = false;
  }
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
    function removeA(val: number) {
      return Math.round(255 * (3 / 4) + val / 4);
    }
    color.value = `rgb(${removeA(r)}, ${removeA(g)}, ${removeA(b)})`;
  };
};

const handleScroll = (e: any) => {
  if (!e.target) return;
  if (e.target.scrollTop >= 104) {
    showTopLyric.value = true;
    if (e.target.scrollTop >= 204) {
      showStickTop.value = true;
    } else {
      showStickTop.value = false;
    }
  } else {
    showTopLyric.value = false;
  }
};

const handlePagination = () => {
  nextTick(() => {
    lyricMain.value && (lyricMain.value.scrollTop = 510);
  });
};

const Top = () => {
  lyricMain.value && (lyricMain.value.scrollTop = 0);
};

const handlePublish = () => {
  comment.value && comment.value.getData();
};

const toDetail = (from?: { id: string; name: string }) => {
  if (!from) return;
  if (from.name === "搜索页") {
    router.push(`/search/${from.id}`);
  } else if (from.name === "banner") {
    router.push("/discover/recommend");
  } else {
    router.push(`/songlist/${from.id}`);
  }
  musicStore.toggleLyric(false);
};

/* 唱片转动动画 */
watch(
  () => musicStore.playing,
  val => {
    cancelAnimationFrame(timer1.value);
    if (val) {
      nextTick(() => {
        if (!record.value) return;
        function rotate() {
          record.value!.style.transform = `rotateZ(${(deg.value += 0.15)}deg)`;
          timer1.value = window.requestAnimationFrame(rotate);
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
      showTopLyric.value = false;
      lyric.value.style.transition = `height 0.1s linear`;
      setTimeout(() => {
        lyric.value!.style.transition = "none";
      }, 100);
    }
  }
);

/* 改变播放界面背景 */
watch(
  currentId,
  () => {
    getImageColor();
    lyricMain.value && (lyricMain.value.scrollTop = 0);
  },
  { immediate: true }
);

/* 搜索框隐藏显示动画 */
watch(
  showTopLyric,
  val => {
    const dom = document.querySelector(".center");
    if (val) {
      timer2.value && clearTimeout(timer2.value);
      timer2.value = null;
      dom?.setAttribute("style", "opacity: 0; pointer-events: none");
    } else {
      dom?.setAttribute("style", "opacity: 1; pointer-events: all");
      timer2.value = setTimeout(() => {
        dom?.removeAttribute("style");
      }, 400);
    }
  },
  { immediate: true }
);

watch(
  () => currentSong.value,
  val => {
    if (!val) {
      musicStore.toggleLyric(false);
    }
  }
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
    position: sticky;
    top: 0;
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
    .topLyric {
      position: absolute;
      top: 7px;
      left: 50%;
      transform: translateX(-50%);
      height: 80%;
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      // padding-left: 60px;
      box-sizing: border-box;
      -webkit-app-region: drag;
      &_title {
        font-size: 14px;
        line-height: 1;
        @include font-color();
      }
      &_lyric {
        width: 100%;
        min-height: 13px;
        text-align: center;
        line-height: 1.2;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: 0.7;
        @include font-color-lyric();
      }
    }

    .toplyric-enter-active,
    .toplyric-leave-active {
      transition: opacity 0.5s ease, top 0.5s ease-out;
    }

    .toplyric-enter-from,
    .toplyric-leave-to {
      opacity: 0;
      top: 30px;
    }
  }
  &-main {
    height: calc(100vh - 133px);
    overflow: auto;
    @include scrollbar();
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
  &-bottom {
    display: flex;
    width: 860px;
    margin: 37px auto 70px;
    display: flex;
    justify-content: right;
    .comments {
      width: 64%;
    }
    .simi {
      width: 36%;
    }
  }
  :deep(.bgButton) {
    border: none;
    transition: background-color 0.1s linear;
    @include hover-default();
    &:hover {
      background-color: rgb(225, 225, 225);
      [data-theme="coDark"] & {
        background-color: rgb(80, 80, 80);
      }
    }

    &.button-bj {
      position: absolute;
      bottom: 20px;
      left: 50%;
      height: auto;
      padding: 8px 15px 10px;
      transform: translateX(-50%);
    }
  }
  .stick-enter-from,
  .stick-leave-to {
    right: calc(8% + 20px);
    opacity: 0;
  }
  .stick-enter-active,
  .stick-leave-active {
    transition: right 0.1s linear, opacity 0.1s linear;
  }
}
</style>
