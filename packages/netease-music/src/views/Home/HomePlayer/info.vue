<template>
  <div class="info">
    <div class="info-wrapper" v-if="info && haveSong && !isEnd">
      <div class="avatar">
        <img :src="info.picUrl" />
      </div>
      <div class="information">
        <div class="namealia">
          <div class="nameWrapper" ref="nameAlia">
            <NameAlia
              :name="info.name"
              :alia="info.alia"
              :hover="true"
            ></NameAlia>
          </div>
          <!-- <div v-if="info.fee === 1" class="vip">VIP</div> -->
          <div class="vip">VIP</div>
          <Icon type="xihuan" class="hover"></Icon>
        </div>
        <div class="ar">
          <NameGroup :ar="info.ar"></NameGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NameAlia from "@/components/nameAlia/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import { musicGetters } from "@/hooks/store";
const { currentSong: info, hasPlayList: haveSong, isEnd } = musicGetters();
// const info = getCurrentSong();
// const haveSong = hasPlayList();
const nameAlia = ref<HTMLElement | null>(null);

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
  .info-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    box-sizing: border-box;
  }
  .avatar {
    height: 48px;
    width: 48px;
    margin-right: 12px;
    img {
      width: 100%;
      border-radius: 5px;
      height: 100%;
      cursor: pointer;
    }
  }
  .information {
    display: flex;
    height: 85%;
    flex-direction: column;
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
        line-height: 9px;
        padding: 0 1px;
        text-shadow: 0px 0px 0.8px rgb(254, 112, 59);
        box-shadow: 0px 0px 0.8px rgb(254, 112, 59);
        transform: scaleX(1.1);
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
      .xihuan {
        cursor: pointer;
        font-size: 19px;
        margin-left: 8px;
        transform: translateY(1px);
        @include font-color();
      }
    }
  }
  .ar {
    :deep(.nameGroup) {
      font-size: 13.5px;
      .nameGroup-item {
        cursor: pointer;
        @include font-color();
      }
    }
  }
}
</style>
