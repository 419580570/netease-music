<template>
  <img v-bind="$attrs" ref="ImgLoad" v-show="!isLoad" :src="src" />
  <img
    src="@/assets/img/placeholder.png"
    v-show="isLoad"
    :class="$attrs.class"
    :style="styleObj"
  />
</template>

<script lang="ts" setup>
import useImgLoad from "@/hooks/imgload";
let ImgLoad = ref<HTMLElement | undefined>();
const props = defineProps(["src"]);
const styleObj = computed(() => {
  if (!props.src) return {};
  const style = props.src.match(/(?:\?param=(.*?)y(.*?))$/);
  if (!style) return {};
  return { width: style[1] + "px", height: style[2] + "px" };
});
const { isLoad } = useImgLoad(ImgLoad);
</script>
