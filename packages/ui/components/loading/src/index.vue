<template>
  <div class="n-loading" v-if="isLoading">
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
        stroke-width="2px"
        :style="{ '--i': item }"
      ></line>
    </svg>
    <div>加载中</div>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts">
export default {
  name: "Loading",
  props: { isLoading: { type: Boolean, default: false } },
  // setup(props) {
  //   return {
  //     isLoading: props.isLoading,
  //   };
  // },
};
</script>
