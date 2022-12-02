<template>
  <div class="center">
    <!-- 后退按钮 -->
    <div class="button no-drag">
      <Icon type="forward" :size="12"></Icon>
    </div>
    <!-- 前进按钮 -->
    <div class="button no-drag">
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

getSearchDefault().then((res: any) => {
  searchDefault.value = res.data.showKeyword;
});

const addHistory = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  const list = SearchPopRef.value?.historyList;
  if (list.indexOf(value) == -1) {
    list.unshift(value);
  }
};
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
    color: $font-color;
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
        color: rgba(255, 255, 255, .4);
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