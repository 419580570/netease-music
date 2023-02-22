<template>
  <Icon
    :type="islike ? 'xihuan-fill' : 'xihuan'"
    v-bind="$attrs"
    @click="handleClick"
  ></Icon>
</template>

<script lang="ts" setup>
import { musicStore } from "@/hooks/store";
import { like } from "@/network/methods";
const props = defineProps<{ id: number }>();

const islike = computed(() => {
  return musicStore.getLikeList.includes(props.id);
});

const handleClick = () => {
  like(props.id, !islike.value).then((res: any) => {
    if (res.code === 200) {
      if (islike.value) {
        const index = musicStore.likeList.indexOf(props.id);
        musicStore.likeList.splice(index, 1);
        /* 弹框 */
      } else {
        musicStore.likeList.push(props.id);
      }
    }
  });
};
</script>

<style scoped lang="scss"></style>
