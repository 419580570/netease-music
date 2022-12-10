<template>
  <span class="nameGroup" v-for="(item, index) in ar">
    <span class="nameGroup-item hover">{{ item.name }}</span>
    <span class="nameGroup-split" v-if="index !== ar.length - 1">/</span>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{ ar: { id: number; name: string }[] }>();

console.log(props.ar);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.nameGroup {
  &-item,
  &-split {
    @include font-color-desc();
  }
  &-item {
    font-size: 12px;
    cursor: pointer;
  }
  &-split {
    display: inline-block;
    font-size: 10px;
    margin: 0 5px;
    transform: translateY(-1px);
  }
}
</style>
