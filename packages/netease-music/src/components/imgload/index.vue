<template>
  <img v-bind="$attrs" ref="ImgLoad" v-show="!isLoad" />
  <img
    src="@/assets/img/placeholder.png"
    v-show="isLoad"
    :class="$attrs.class"
  />
</template>

<script lang="ts" setup>
import useImgLoad from "@/hooks/imgload";
let ImgLoad = ref<HTMLElement | undefined>();
const { isLoad } = useImgLoad(ImgLoad);
</script>

<style scoped lang="less"></style>
