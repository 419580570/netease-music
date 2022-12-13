<template>
  <span
    class="nameGroup"
    :class="{ blue: blue }"
    v-for="(item, index) in ar"
    v-bind="$attrs"
  >
    <span class="nameGroup-item hover">{{ item.name }}</span>
    <span class="nameGroup-split" v-if="index !== ar.length - 1">/</span>
  </span>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    ar: { id: number; name: string }[];
    blue?: boolean;
  }>(),
  {
    blue: false,
  }
);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.nameGroup {
  &.blue {
    .nameGroup-item {
      @include font-color-blue();
    }
  }
  &-item {
    font-size: 12px;
    cursor: pointer;
    @include font-color-desc();
  }
  &-split {
    @include font-color-dark();
    display: inline-block;
    font-size: 10px;
    margin: 0 5px;
    transform: translateY(-1px);
  }
}
</style>
