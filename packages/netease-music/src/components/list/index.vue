<template>
  <List v-bind="$attrs">
    <template #listItem="item">
      <div class="wrapper">
        <svg width="70" height="82" v-if="item.id === 1">
          <rect x="2.5" y="10" rx="12" ry="12" class="rect1"></rect>
          <rect class="rect2" x="17" y="4" rx="2" ry="2" />
          <rect class="rect2" x="50" y="4" rx="2" ry="2" />
          <rect class="rect3" x="10" y="23" rx="2" ry="2" />
          <text class="text" x="35" y="55" text-anchor="middle">
            {{ new Date().getDate() }}
          </text>
        </svg>
        <ImgLoad
          :src="item.picUrl"
          class="listItemImg"
          @click="$emit('contentClick', item)"
        />
        <span class="playcount" v-if="item.playCount"
          >▷&nbsp;{{ simpNum(item.playCount, 7) }}</span
        >
        <PlayButton class="icon" v-if="playButton"
          ><Icon type="you"></Icon
        ></PlayButton>
        <slot></slot>
      </div>
    </template>
    <template #title="item">
      <div>{{ item.name }}</div>
    </template>
    <template #other="item">
      <slot name="other" :item="item"></slot>
    </template>
  </List>
</template>

<script lang="ts" setup>
import ImgLoad from "@/components/imgload/index.vue";
import util from "@/hooks/util";
import PlayButton from "@/components/playButton/index.vue";
const { simpNum } = util();
defineProps(["playButton"]);
</script>

<style scoped lang="scss">
.n-list {
  :deep(.n-list-item__content) {
    border-radius: 6px;
    &.fall:hover {
      .playcount {
        opacity: 0;
      }
    }
  }
  .wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .rect1 {
        width: 65px;
        height: 57px;
        stroke: #fff;
        fill: transparent;
        stroke-width: 3px;
        border-radius: 10px;
      }
      .rect2 {
        width: 3px;
        height: 12px;
        fill: #fff;
      }
      .rect3 {
        width: 50px;
        height: 3px;
        fill: #fff;
      }
      .text {
        font-size: 26px;
        font-weight: bold;
        fill: #fff;
      }
    }
    :deep(.listItemImg) {
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
    .playcount {
      position: absolute;
      text-shadow: 0 0px 1px rgba(0, 0, 0, 0.5);
      top: 0;
      right: 0;
      color: #fff;
      z-index: 9;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      padding-right: 7px;
      opacity: 1;
      transition-delay: 0.5s;
    }
    .icon {
      position: absolute;
      bottom: 15px;
      right: 10px;
      opacity: 0;
    }
    &:hover .icon {
      opacity: 1;
    }
  }
}
</style>
