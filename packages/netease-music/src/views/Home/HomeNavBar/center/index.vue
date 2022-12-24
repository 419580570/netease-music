<template>
  <div class="center">
    <!-- 后退按钮 -->
    <div
      class="button no-drag"
      :class="{ disable: !prev }"
      @click="handlePrev()"
    >
      <Icon type="forward" :size="12"></Icon>
    </div>
    <!-- 前进按钮 -->
    <div
      class="button no-drag"
      :class="{ disable: !next }"
      @click="handleNext()"
    >
      <Icon type="prev" :size="12"></Icon>
    </div>

    <!-- 搜索 -->
    <div class="search no-drag popoverWrapper">
      <Popover trigger="click" :keep-show="true" width="353px" height="615px">
        <template #reference>
          <Icon type="sousuo"></Icon>
          <input
            type="text"
            @keydown.enter="addHistory($event)"
            v-model="searchValue"
            :placeholder="searchDefault"
          />
        </template>
        <SearchPop ref="SearchPopRef" :searchValue="searchValue"></SearchPop>
      </Popover>
    </div>

    <!-- 听歌识曲 -->
    <div class="button mircrophone no-drag">
      <Icon type="microphone"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSearchDefault } from "@/network/Home";
import SearchPop from "./search.vue";

const SearchPopRef = ref<InstanceType<typeof SearchPop> | null>(null);
const searchValue = ref("");
const searchDefault = ref("");
console.log(window.history.state);
const prev = ref(window.history.state.back !== "/home");
const next = ref(!!window.history.state.forward);
const router = useRouter();

getSearchDefault().then((res: any) => {
  searchDefault.value = res.data.showKeyword;
});

const addHistory = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  if (!value) return;
  const list = SearchPopRef.value?.historyList;
  if (list.indexOf(value) == -1) {
    list.unshift(value);
  }
};

const handlePrev = () => {
  if (window.history.state.position <= 1) return;
  prev.value = true;
  next.value = true;
  router.go(-1);
  setTimeout(() => {
    if (window.history.state.position <= 1) {
      prev.value = false;
    }
  }, 500);
};
const handleNext = () => {
  if (!window.history.state.forward) return;
  prev.value = true;
  next.value = true;
  router.go(1);
  setTimeout(() => {
    if (!window.history.state.forward) {
      next.value = false;
    }
  }, 500);
};

watch(router.currentRoute, () => {
  if (window.history.state.position <= 1) {
    prev.value = false;
  } else {
    prev.value = true;
  }
  if (!window.history.state.forward) {
    next.value = false;
  } else {
    next.value = true;
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.center {
  flex: 1;
  display: flex;
  margin-left: 56px;
  height: 100%;
  display: flex;
  align-items: center;
  .button {
    cursor: pointer;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    color: rgb(255, 255, 255, 0.7);
    &.disable {
      color: rgb(255, 255, 255, 0.2);
    }
  }
  .search {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120%;
    i {
      position: absolute;
      left: 19px;
      padding-top: 2px;
      color: $font-color;
      &:before {
        font-size: 18px;
      }
    }
    input {
      outline: none;
      border: 0;
      border-radius: 30px;
      color: rgb(255, 255, 255);
      @include input-bg();
      width: 160px;
      height: 32px;
      margin-left: 8px;
      padding-left: 32.5px;
      padding-right: 10px;
      box-sizing: border-box;
      font-size: 12px;
      caret-color: #fff;
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .mircrophone {
    background-color: rgba(0, 0, 0, 0.06);
    margin-left: 8px;
    height: 32px;
    width: 32px;
    font-size: 17px;
  }
}
</style>
