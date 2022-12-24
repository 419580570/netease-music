<template>
  <div class="name" :class="{ hover: hover }" v-bind="$attrs" :key="name">
    {{ name }}
    <span class="desc" v-if="alia && alia.length"> （{{ alia[0] }}） </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ name: string; alia: string[]; hover?: boolean }>();
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.name {
  display: inline-block;
  font-size: 13px;
  @include font-color();
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .desc {
    @include font-color-desc();
  }
}
</style>
