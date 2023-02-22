<template>
  <Loading :isLoading="loading">
    <div class="comment" ref="comment">
      <div class="title" v-if="hotComments">全部评论({{ total }})</div>
      <CommentList :data="hotComments" v-if="hotComments"></CommentList>
      <div class="more" v-if="moreHot">
        <div class="moreButton hover">更多精彩评论 ></div>
      </div>
      <div class="title">最新评论({{ total }})</div>
      <CommentList
        :data="newComments"
        :total="more ? total : undefined"
        :max="20"
        @handlePagination="handlePagination"
        @deleteComment="getData()"
      ></CommentList>
    </div>
  </Loading>
</template>

<script lang="ts" setup>
import { getMusicComment } from "@/network/methods";
import { CommentItem } from "@/types";
import { extractFromComment } from "@/util";
import CommentList from "./commentList.vue";

const loading = ref(true);
const hotComments = ref<CommentItem[] | null>(null);
const newComments = ref<CommentItem[]>([]);
const total = ref(0);
const moreHot = ref(0);
const more = ref(0);
const comment = ref<HTMLElement | null>(null);
let offset = 0;

const props = defineProps<{
  id: number;
  type: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7;
}>();
const emit = defineEmits(["handlePagination"]);

function getData(pagination?: boolean) {
  switch (props.type) {
    case 0:
      getMusicComment({ id: props.id, offset }).then((res: any) => {
        if (res.code === 200) {
          hotComments.value = res.hotComments
            ? extractFromComment(res.hotComments).slice(0, 10)
            : null;
          newComments.value = extractFromComment(res.comments);
          total.value = res.total;
          moreHot.value = res.moreHot;
          more.value = res.more;
          loading.value = false;
          pagination && emit("handlePagination");
        }
      });
      break;
  }
}

function handlePagination(val: number) {
  offset = val * 20;
  getData(true);
}

watch(
  () => props.id,
  () => {
    getData();
  },
  { immediate: true }
);

// Promise.allSettled([getComment(hotquery), getComment(newquery)]).then(
//   (res: any) => {
//     if (res[0].status !== "fulfilled" || res[1].status !== "fulfilled") return;
//     if (res[0].value.code !== 200 || res[1].value.code !== 200) return;
//     loading.value = false;
//     console.log(res);
//   }
// );
defineExpose({
  getData,
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.comment {
  width: 100%;
  .title {
    font-size: 16px;
    font-weight: 600;
    @include font-color();
  }
  .more {
    width: 100%;
    text-align: center;
    margin: 20px 0 15px;
    .moreButton {
      background-color: transparent;
      display: inline-block;
      padding: 5px 18px;
      font-size: 13px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      [data-theme="coDark"] & {
        border-color: rgb(75, 75, 75);
      }
      border-radius: 30px;
      cursor: pointer;
      @include font-color();
    }
  }
}
</style>
