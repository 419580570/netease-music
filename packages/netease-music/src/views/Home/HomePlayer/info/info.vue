<template>
  <div class="info">
    <div
      class="info-wrapper"
      :class="{ hidden: musicStore.lyric }"
      v-if="info && haveSong && !isEnd"
    >
      <div class="info-buttons">
        <div class="down" @click="toggleLyric"></div>
        <div class="buttons">
          <Button> <likeIcon :size="19" :id="info.id"></likeIcon></Button>
          <Button><Icon type="tianjia" :size="19"></Icon></Button>
          <Button><Icon type="xiazai1" :size="19"></Icon></Button>
          <Button><Icon type="fenxiang1" :size="19"></Icon></Button>
        </div>
      </div>
      <div class="info-music">
        <div class="avatar" @click="toggleLyric">
          <img :src="info.picUrl" />
        </div>
        <div class="information">
          <div class="namealia">
            <div class="nameWrapper" ref="nameAlia" @click="toggleLyric">
              <NameAlia
                :name="info.name"
                :alia="info.alia"
                :hover="true"
              ></NameAlia>
            </div>
            <!-- <div v-if="info.fee === 1" class="vip">VIP</div> -->
            <div class="vip" v-if="info.fee === 1">VIP</div>
            <likeIcon class="hover" :id="info.id"></likeIcon>
            <!-- <Icon
              :type="
                musicStore.getLikeList.includes(info.id)
                  ? 'xihuan-fill'
                  : 'xihuan'
              "
            ></Icon> -->
          </div>
          <div class="ar">
            <NameGroup :ar="info.ar"></NameGroup>
          </div>
        </div>
        <div class="operate"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NameAlia from "@/components/nameAlia/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import likeIcon from "@/components/likeIcon/index.vue";
import { musicGetters, musicStore } from "@/hooks/store";
const { currentSong: info, hasPlayList: haveSong, isEnd } = musicGetters();
const nameAlia = ref<HTMLElement | null>(null);
const toggleLyric = () => {
  musicStore.toggleLyric(!musicStore.lyric);
};

const animation = () => {
  const name = nameAlia.value?.firstChild! as any;
  if (!name) return;
  if (name.offsetWidth > 150) {
    /* 鼠标移入动画展示全部歌名 */
    name.innerHTML =
      name.innerHTML +
      "<span style='width: 15px; display: inline-block'></span>" +
      name.innerHTML;
    let x = 0;
    let moving = false;
    function move() {
      if ((x -= 0.6) < -(name.offsetWidth / 2 + 7.5)) {
        x = 0;
        moving = false;
        name.style.setProperty("transform", "translateX(0px)");
        return;
      }
      if (!name.style.transform) {
        name.style.setProperty("transform", "translateX(0px)");
      }
      name.style.transform = `translateX(${x}px)`;
      window.requestAnimationFrame(move);
    }
    name.onmouseover = () => {
      if (moving) return;
      moving = true;
      move();
    };
  }
};

watch(info, (val, oldVal) => {
  if (val?.name || val?.name === "") {
    if (val.name !== oldVal?.name) {
      nextTick(animation);
    }
  }
});

onMounted(animation);

onBeforeUnmount(() => {
  const name = nameAlia.value?.firstChild! as any;
  if (!name) return;
  name.onmouseover && (name.onmouseover = null);
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.info {
  flex: 1;
  padding: 12px;
  overflow: hidden;
  &-wrapper {
    width: 100%;
    height: calc(200% + 24px);
    position: relative;
    align-items: center;
    box-sizing: border-box;
    top: calc(-100% - 24px);
    transition: top 0.4s 0.05s linear;
    &.hidden {
      top: 0px;
    }
  }
  &-buttons {
    display: flex;
    height: calc(50% - 12px);
    margin-bottom: 24px;
    .down {
      height: 100%;
      width: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 11px;
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
    .buttons {
      width: 223px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      :deep(.n-button) {
        padding: 8px;
        border-radius: 50%;
        height: auto;
      }
    }
  }
  &-music {
    display: flex;
    height: 50%;
    .avatar {
      height: 48px;
      width: 48px;
      margin-right: 12px;
      overflow: hidden;
      position: relative;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      &:hover {
        img {
          filter: blur(1.5px) brightness(70%);
        }
        &::after {
          visibility: visible;
        }
      }
      &::after {
        content: "";
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12px;
        height: 12px;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        transform: translateX(-50%) translateY(-25%) rotateZ(-45deg);
        visibility: hidden;
      }
    }
    .information {
      display: flex;
      height: 85%;
      flex-direction: column;
      justify-content: space-evenly;
      .namealia {
        display: flex;
        .nameWrapper {
          display: flex;
          max-width: 150px;
          overflow: hidden;
        }
        .vip {
          border-width: 1px;
          border-style: solid;
          border-radius: 2px;
          border-color: rgb(254, 112, 59);
          color: rgb(254, 112, 59);
          font-size: 11px;
          display: inline-block;
          height: 10px;
          line-height: 11px;
          padding: 0 1px;
          text-shadow: 0px 0px 0.8px rgb(254, 112, 59);
          box-shadow: 0px 0px 0.8px rgb(254, 112, 59);
          margin-left: 5px;
          align-self: center;
        }
        .name {
          cursor: pointer;
          overflow: visible;
          font-size: 15px;
          transform: none;
          // animation: move 3s linear 0s 1;
        }
        // @keyframes move {
        //   0% {
        //     transform: translateX(0);
        //   }
        //   100% {
        //     transform: translateX(calc(-1 * (50% + 7.5px)));
        //   }
        // }
        .xihuan,
        .xihuan-fill {
          cursor: pointer;
          font-size: 19px;
          margin-left: 8px;
          // transform: translateY(1px);
          @include font-color();
        }
      }
    }
    .ar {
      overflow: hidden;
      white-space: nowrap;
      max-width: 177px;
      :deep(.nameGroup) {
        font-size: 13.5px;
        .nameGroup-item {
          cursor: pointer;
          @include font-color();
        }
      }
    }
  }
}
</style>
