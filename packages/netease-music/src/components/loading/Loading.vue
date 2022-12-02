<template>
  <div class="loadingWrapper" v-if="prop.isLoading">
    <svg width="20" height="20">
      <line
        class="loadingLine"
        v-for="(item, index) in 8"
        :key="index"
        x1="10"
        y1="1"
        x2="10"
        y2="6"
        rx="2"
        ry="2"
        stroke="#000"
        stroke-width="2px"
        :style="{ '--i': item }"
      ></line>
    </svg>
    <div>加载中</div>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts" setup>
const prop = defineProps(["isLoading"]);
</script>

<style scoped lang="scss">
.loadingWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $font-color-grey;
  font-size: 14px;
  svg {
    animation: rotate 1s linear 0s infinite;
    margin-right: 10px;
  }
  .loadingLine {
    transform-origin: 50% 50%;
    transform: rotateZ(calc(45deg * var(--i)));
    opacity: calc(0.125 * var(--i));
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
</style>
