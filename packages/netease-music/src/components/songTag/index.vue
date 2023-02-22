<template>
  <div class="content" v-if="tags.length" v-bind="$attrs">
    <span
      :class="item"
      v-for="item in tags"
      :data-desc="song.noCopyrightRcmd?.typeDesc"
      >{{ item }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { songDetail } from "@/types";

const props = defineProps<{ song: songDetail; group?: string[] }>();

const tags = computed(() => {
  const res: string[] = [];
  if (props.song.noCopyrightRcmd) {
    res.push("无音源");
    return res;
  }
  if (props.song.fee === 1) {
    res.push("VIP");
  }
  switch (props.song.plLevel) {
    case "lossless":
      res.push("SQ");
      break;
    case "hires":
      res.push("Hi-Res");
      break;
  }
  if (props.song.mv) {
    res.push("MV");
  }
  if (props.group) {
    res.forEach((item, index) => {
      if (!props.group!.includes(item)) {
        res.splice(index, 1);
      }
    });
  }

  return res;
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.content {
  display: inline-block;
  padding: 2px;
  > span {
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    border-color: var(--color);
    color: var(--color);
    font-size: 11px;
    display: inline-block;
    height: 10px;
    line-height: 11px;
    padding: 0px 1px;
    text-shadow: 0px 0px 0.8px var(--color);
    box-shadow: 0px 0px 0.8px var(--color);
    // transform: scaleX(1.1);
    &:not(:last-child) {
      margin-right: 7px;
    }
  }
  > span:not(.VIP) {
    @include red-custom("--color");
  }
  > .SQ {
    transform: scaleX(1.1);
    // letter-spacing: 0.5px;
  }
  .VIP {
    --color: rgb(254, 112, 59);
  }
  .MV {
    cursor: pointer;
    &::after {
      content: "▶";
      font-size: 5.5px;
      display: inline-block;
      transform: scaleX(90%);
      margin-left: 1px;
      position: relative;
      bottom: 1.5px;
    }
  }
  .无音源 {
    position: relative;
    text-shadow: none;
    box-shadow: none;
    padding: 1px;
    @include themeify {
      color: themed("font-color-disable");
      border: 1px solid themed("font-color-disable");
    }
    &::after {
      content: attr(data-desc);
      position: absolute;
      margin-left: 3px;
    }
  }
}
</style>
