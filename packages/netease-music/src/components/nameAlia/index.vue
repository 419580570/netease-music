<template>
  <div class="name" v-bind="$attrs">
    {{ name }}
    <span class="desc" v-if="alia && alia.length"> （{{ alia[0] }}） </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ name: string; alia: string[] }>();
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.name {
  display: inline;
  font-size: 13px;
  margin-bottom: 2px;
  @include font-color();
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .desc {
    @include font-color-desc();
  }
}
</style>
