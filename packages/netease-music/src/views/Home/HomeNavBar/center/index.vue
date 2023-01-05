<template>
  <div class="center" :class="{ isLyric: musicStore.lyric }">
    <!-- 后退按钮 -->
    <div
      class="button no-drag"
      :class="{ disable: !prev }"
      @click="handlePrev()"
    >
      <Icon type="forward" :size="11"></Icon>
    </div>
    <!-- 前进按钮 -->
    <div
      class="button no-drag"
      :class="{ disable: !next }"
      @click="handleNext()"
    >
      <Icon type="prev" :size="11"></Icon>
    </div>

    <!-- 搜索 -->
    <div class="search no-drag popoverWrapper">
      <Popover
        trigger="click"
        :keep-show="true"
        width="353px"
        height="calc(100vh - 165px)"
        :disable="hidden"
      >
        <template #reference>
          <Icon type="sousuo"></Icon>
          <input
            type="text"
            @keydown.enter="addHistory($event)"
            v-model="searchValue"
            :placeholder="searchDefault"
          />
        </template>
        <SearchPop
          ref="SearchPopRef"
          :suggestData="suggestData"
          :search-value="searchValue"
        ></SearchPop>
      </Popover>
    </div>

    <!-- 听歌识曲 -->
    <div class="button mircrophone no-drag">
      <Icon type="microphone" :size="16"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSearchDefault, getSearchSuggest } from "@/network/methods";
import SearchPop from "./search.vue";
import { musicStore } from "@/hooks/store";
import util from "@/hooks/util";
export type suggestList = {
  albums: { name: string; artist: { name: string } }[];
  artists: { name: string }[];
  playlists: { name: string; artist: { name: string } }[];
  songs: { name: string; artists: { name: string }[] }[];
};
const { debounce } = util();

const SearchPopRef = ref<InstanceType<typeof SearchPop> | null>(null);
const searchValue = ref("");
const searchDefault = ref("");
const hidden = ref(false);
// console.log(window.history.state);
const prev = ref(window.history.state.back !== "/home");
const next = ref(!!window.history.state.forward);
const router = useRouter();
const suggestData = ref<suggestList>();

getSearchDefault().then((res: any) => {
  searchDefault.value = res.data.showKeyword;
});
/* 获取搜索建议 */
const getSuggest = debounce(() => {
  getSearchSuggest(searchValue.value).then((res: any) => {
    if (res.code === 200) {
      console.log(res);
      if (JSON.stringify(res.result) === "{}") {
        hidden.value = true;
      } else {
        suggestData.value = res.result;
        hidden.value = false;
      }
    } else {
      hidden.value = true;
    }
  });
}, 300);

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
  musicStore.toggleLyric(false);
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
  musicStore.toggleLyric(false);
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

watchEffect(() => {
  const value = searchValue.value;
  if (!value) return;
  getSuggest();
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
  position: relative;
  --button-bg: rgba(0, 0, 0, 0.07);
  --button-fc: rgb(255, 255, 255, 0.7);
  --button-fdc: rgb(255, 255, 255, 0.2);
  --search-i-fc: rgba(255, 255, 255, 0.6);
  --search-input-fc: rgba(255, 255, 255);
  --search-bg: rgba(0, 0, 0, 0.04);
  --search-pc: rgba(255, 255, 255, 0.5);
  --caret-color: #fff;
  --mirc-bg: rgba(0, 0, 0, 0.04);
  --mirc-fc: rgba(255, 255, 255, 0.7);
  --delay: 0s;
  [data-theme="coDark"] & {
    --search-bg: rgba(255, 255, 255, 0.04);
    --search-pc: rgba(255, 255, 255, 0.3);
    --mirc-fc: rgba(255, 255, 255, 0.6);
  }
  &.isLyric {
    z-index: 1101;
    --button-bg: rgba(0, 0, 0, 0.04);
    --button-fc: rgb(0, 0, 0);
    --button-fdc: rgb(0, 0, 0, 0.5);
    --search-i-fc: rgba(0, 0, 0, 0.4);
    --search-input-fc: rgba(0, 0, 0, 0.7);
    --search-bg: rgba(0, 0, 0, 0.04);
    --search-pc: rgba(0, 0, 0, 0.4);
    --caret-color: rgba(0, 0, 0);
    --mirc-bg: rgba(0, 0, 0, 0);
    --mirc-fc: rgba(0, 0, 0, 0.7);
    --delay: 0.3s;
    [data-theme="coDark"] & {
      --button-bg: rgba(255, 255, 255, 0.03);
      --button-fc: rgb(255, 255, 255, 0.6);
      --button-fdc: rgb(255, 255, 255, 0.3);
      --search-i-fc: rgba(255, 255, 255, 0.2);
      --search-input-fc: rgba(255, 255, 255, 0.8);
      --search-bg: rgba(255, 255, 255, 0.04);
      --search-pc: rgba(255, 255, 255, 0.3);
      --mirc-fc: rgba(255, 255, 255, 0.3);
    }
  }
  .button {
    cursor: pointer;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--button-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: var(--button-fc);
    transition: color 0s var(--delay) linear,
      background-color 0s var(--delay) linear;
    &.disable {
      color: var(--button-fdc);
      // transition: color 0s var(--delay) linear;
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
      color: var(--search-i-fc);
      transition: color 0s var(--delay) linear;
      &:before {
        font-size: 18px;
      }
    }
    input {
      outline: none;
      border: 0;
      border-radius: 30px;
      color: var(--search-input-fc);
      background-color: var(--search-bg); //
      transition: background-color 0s var(--delay) linear,
        color 0s var(--delay) linear;
      width: 160px;
      height: 32px;
      margin-left: 8px;
      padding-left: 32.5px;
      padding-right: 15px;
      box-sizing: border-box;
      font-size: 12px;
      caret-color: var(--caret-color);
      &::-webkit-input-placeholder {
        color: var(--search-pc);
        transition: color 0s var(--delay) linear;
      }
    }
  }
  .mircrophone {
    background-color: var(--mirc-bg);
    color: var(--mirc-fc);
    transition: color 0s var(--delay) linear,
      background-color 0s var(--delay) linear;
    margin-left: 8px;
    height: 32px;
    width: 32px;
    font-size: 17px;
    font-weight: normal;
  }
}
</style>
