<template>
  <div class="newsong">
    <div v-for="item in data" class="newsong-item" @click="addSong(item)">
      <div class="album">
        <!-- 限制图片大小，防止滚动卡 -->
        <ImgLoad
          :src="item.picUrl + '?param=49y49'"
          class="album-img"
        ></ImgLoad>
        <PlayButton class="button"></PlayButton>
      </div>
      <div class="info">
        <NameAlia :name="item.name" :alia="item.alia"></NameAlia>
        <div class="q-ar">
          <SongTag class="q" :song="item"></SongTag>
          <NameGroup :ar="item.ar"></NameGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { songDetail } from "@/types";
import PlayButton from "@/components/playButton/index.vue";
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import NameAlia from "@/components/nameAlia/index.vue";
import ImgLoad from "@/components/imgload/index.vue";
import { musicStore } from "@/hooks/store";

defineProps<{ data: songDetail[] }>();
const addSong = (item: songDetail) => {
  musicStore.addSong(item);
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.newsong {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 240px;
  position: relative;
  &-item {
    // flex-basis: 49px;
    width: calc(100% / 3 - 12px);
    display: flex;
    align-items: flex-start;
    margin-right: 12px;
    border-radius: 5px;
    &:hover {
      @include hover-default();
    }
    .album {
      position: relative;
      height: 100%;
      .button {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        left: 50%;
        transform: translateX(-52%) translateY(-55%);
      }
      :deep(.album-img) {
        display: block;
        width: 49px;
        height: 49px;
        border-radius: 5px;
      }
    }
    .info {
      padding: 2px 10px;
      height: 49px;
      width: calc(100% - 49px);
      box-sizing: border-box;
      .name {
        width: 100%;
      }
      .q-ar {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        @include font-color-desc();
        .q {
          margin-right: 7px;
        }
      }
    }
  }
  // }
}
</style>
