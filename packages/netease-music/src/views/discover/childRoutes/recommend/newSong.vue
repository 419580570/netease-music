<template>
  <div class="newsong">
    <div v-for="item in data" class="newsong-item">
      <div class="album">
        <img :src="item.picUrl" />
        <PlayButton class="button"></PlayButton>
      </div>
      <div class="info">
        <div class="name">
          {{ item.name }}
          <span class="desc" v-if="item.alia && item.alia.length">
            （{{ item.alia[0] }}）
          </span>
        </div>
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

defineProps<{ data: songDetail[] }>();
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.newsong {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 240px;
  // &-line {
  &-item {
    flex-basis: 49px;
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
      img {
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
        font-size: 13px;
        margin-bottom: 2px;
        @include font-color();
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .desc {
          @include font-color-desc();
        }
      }
      .q-ar > .q {
        margin-right: 7px;
      }
    }
  }
  // }
}
</style>
