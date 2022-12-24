<template>
  <div class="n-pagination" v-if="max && total > max">
    <div
      class="n-pagination__item prev"
      :class="{ disabled: active === 0 }"
      @click="handlePrev"
    >
      <Icon type="forward" :size="12"></Icon>
    </div>
    <div
      class="n-pagination__item"
      :class="{ active: active === item, ellipsis: item === '...' }"
      v-for="item in paginationList"
      @click="handleClick(item)"
    >
      {{ item === "..." ? item : (item as number) + 1 }}
    </div>
    <div
      class="n-pagination__item next"
      @click="handleNext"
      :class="{ disabled: active === pageNum - 1 }"
    >
      <Icon type="prev" :size="12"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";

export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 0,
    },
  },
  emits: ["handlePagination"],
  setup(props, { emit }) {
    const active = ref(0);

    const _emit = () => emit("handlePagination", active.value);

    const handleClick = item => {
      active.value = item;
      _emit();
    };

    const handlePrev = () => {
      active.value > 0 && active.value--;
      _emit();
    };

    const handleNext = () => {
      active.value < pageNum.value - 1 && active.value++;
      _emit();
    };

    const pageNum = computed(() => Math.ceil(props.total / props.max));

    const paginationList = computed(() => {
      let arr: (number | string)[] = [];
      if (pageNum.value <= 10) {
        for (let i = 0; i < pageNum.value; i++) {
          arr.push(i);
        }
      } else {
        arr[0] = 0;
        /* 页数小于5时 */
        if (active.value < 5) {
          for (let i = 1; i < 8; i++) {
            arr.push(i);
          }
          arr.push("...");
        } else if (active.value > pageNum.value - 5) {
          /* 页数是最后五页时 */
          arr.push("...");
          for (let i = pageNum.value - 8; i < pageNum.value - 1; i++) {
            arr.push(i);
          }
        } else {
          /* 页数在中间时 */
          arr.push("...");
          for (let i = active.value - 3; i <= active.value + 3; i++) {
            arr.push(i);
          }
          arr.push("...");
        }
        arr.push(pageNum.value - 1);
      }
      return arr;
    });

    return {
      paginationList,
      active,
      pageNum,
      handleClick,
      handlePrev,
      handleNext,
    };
  },
};
</script>
