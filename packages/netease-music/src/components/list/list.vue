<template>
  <div class="list">
    <div v-for="(item, index) in props.data" :key="index">
      <ListItem :item="item" @click="emit('toDetail', item.id)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { recommendData } from "@/types/index";
import ListItem from "./listItem.vue";

const emit = defineEmits(["toDetail"]);
let props = defineProps<{ data: Array<recommendData> }>();
</script>

<style scoped lang="scss">
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .ListItem {
    box-sizing: content-box;
    margin-top: 15px;
    /* margin-right: 18px; */
    display: flex;
    flex-direction: column;

    max-width: 205px;
    min-width: 200px;
    // width: auto;
    max-height: 245px;
    cursor: pointer;
    /* margin-right: 20px; */
    position: relative;
    margin-bottom: 18px;
    border-radius: 5px;
    /* display: flex; */

    font-size: 15px;
    color: rgb(88, 91, 91);
  }
}
</style>
