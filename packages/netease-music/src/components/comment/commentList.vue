<template>
  <ul class="commentList">
    <commentItem
      :data="item"
      v-for="item in data"
      @deleteComment="$emit('deleteComment')"
    ></commentItem>
  </ul>
  <Pagination
    v-if="total"
    :max="max"
    :total="total"
    @handlePagination="handlePagination"
  ></Pagination>
</template>

<script lang="ts" setup>
import type { CommentItem } from "@/types";
import commentItem from "./commentItem.vue";

defineProps<{ data: CommentItem[]; total?: number; max?: number }>();
const emit = defineEmits(["handlePagination", "deleteComment"]);

const handlePagination = (val: number) => {
  emit("handlePagination", val);
};
</script>

<style scoped lang="scss">
.n-pagination {
  margin-top: 20px;
}
</style>
