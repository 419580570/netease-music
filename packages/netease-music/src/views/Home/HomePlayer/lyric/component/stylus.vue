<template>
  <svg width="200" height="200" class="stylus">
    <circle
      class="circle"
      cx="50"
      cy="50"
      r="12"
      fill="rgba(45, 45, 45, 0.1)"
    ></circle>
    <circle
      class="circle2"
      cx="50"
      cy="50"
      r="8"
      fill="rgb(253, 253, 253)"
    ></circle>
    <circle
      class="circle2"
      cx="50"
      cy="50"
      r="2"
      fill="rgb(228, 228, 228)"
    ></circle>
    <g
      class="stylus-handler"
      :style="{ transform: `rotate(${musicStore.playing ? 35 : -3}deg)` }"
    >
      <path
        d="M 55,55 L 105,103 L 107,104.5 L 109,106 L 111,107 L 112,107.5 L 113,108 L 114,108.5 L 115,109 L 116,109.5 L 117,109.7 L 118,110 L 152, 115"
        fill="none"
        stroke="rgb(253, 253, 253)"
        stroke-width="5px"
      ></path>
      <line
        x1="145.5"
        y1="114"
        x2="150"
        y2="114.5"
        stroke="rgb(0, 0, 0)"
        stroke-width="1.5px"
      ></line>
      <polygon
        points="151,117 154,120 172,122 173,113 156,111 152,112.5"
        fill="rgb(253, 253, 253)"
      ></polygon>
      <rect
        x="174"
        y="110.5"
        width="13"
        height="14.5"
        rx="3"
        ry="3"
        fill="rgb(253, 253, 253)"
        style="
          transform: rotate(5deg) translateX(-2px);
          transform-origin: 174px 110px;
        "
      ></rect>
      <line
        x1="174"
        y1="114"
        x2="183"
        y2="115"
        stroke="rgb(183,183,183)"
        stroke-width="1.5px"
      ></line>
      <line
        x1="173"
        y1="121"
        x2="182"
        y2="122"
        stroke="rgb(183,183,183)"
        stroke-width="1.5px"
      ></line>
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { musicStore } from "@/hooks/store";
</script>

<style scoped lang="scss">
.stylus {
  .stylus-handler {
    transform-origin: 50px 50px;
    transition: all 0.25s linear 0.1s;
  }
}
</style>
