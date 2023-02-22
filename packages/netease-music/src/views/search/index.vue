<template>
  <div class="search">
    <div class="search-title">搜索 {{ route.params.keyword }}</div>
    <div class="search-category">
      <Navbar :list="nav" size="15"></Navbar>
    </div>
    <div class="search-song">
      <div class="search-song__top">
        <PlayAllButton @addAll="addAll"></PlayAllButton>
        <Button class="buttonitem">
          <Icon type="xiazai1"></Icon>
          下载全部
        </Button>
      </div>
      <div class="search-song__table">
        <TableList
          :data="data"
          :max="100"
          :total="total"
          :format="searchFormat"
          :lineIndex="true"
          :showTitle="true"
          :isLoading="isLoading"
          :keyword="(route.params.keyword as string)"
          @handleDbclick="handleDbclick"
          @handlePagination="handlePagination"
        ></TableList>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { search } from "@/network/methods";
import PlayAllButton from "@/components/playAllButton/index.vue";
import TableList from "@/components/TableList/index.vue";
import { songDetail } from "@/types";
import { extractFromSongDetail } from "@/util";
import { musicStore } from "@/hooks/store";

const route = useRoute();
const data = ref<songDetail[]>([]);
const isLoading = ref(true);
const offset = ref(0);
const total = ref(0);
const nav = [
  "单曲",
  "歌手",
  "专辑",
  "视频",
  "歌单",
  "歌词",
  "播客",
  "声音",
  "用户",
];
const searchFormat = [
  { title: "", slotName: "operate", width: "50px", key: ["id"] },
  {
    title: "音乐标题",
    slotName: "name",
    width: "33%",
    key: ["name", "alia", "plLevel", "fee", "mv"],
  },
  { title: "歌手", slotName: "singer", width: "13.5%", key: ["ar"] },
  { title: "专辑", slotName: "album", width: "16%", key: ["al"] },
  { title: "时间", slotName: "time", width: "6%", key: ["dt"] },
  { title: "热度", slotName: "pop", width: "80px", key: ["pop"] },
];

const handleDbclick = (item: songDetail) => {
  musicStore.addSong(item);
};
const handlePagination = (page: number) => {
  offset.value = page * 100;
};

const handleSearch = () => {
  isLoading.value = true;
  search(route.params.keyword as string, 1, 100, offset.value).then(
    (res: any) => {
      if (res.code === 200) {
        data.value = extractFromSongDetail(
          res.result.songs,
          {},
          route.params.keyword as string,
          "搜索页"
        );
        data.value.forEach(item => {
          item.index += offset.value;
        });
        total.value = res.result.songCount;
        isLoading.value = false;
      }
    }
  );
};

const addAll = (bool: boolean) => {
  /* 替换播放列表 */
  if (!data.value || !data.value.length) return;
  bool
    ? musicStore.replacePlaylist(data.value)
    : musicStore.addPlayList(data.value);
};

watchEffect(() => {
  handleSearch();
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.search {
  &-title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 30px;
    @include font-color();
  }
  &-song {
    padding-top: 25px;
    &__top {
      display: flex;
      justify-content: space-between;
      width: 260px;
      margin-bottom: 15px;
    }
    &__table {
      :deep(.n-table) {
        .n-table-content__line {
          &.playing {
            .name {
              @include red_custom("color");
            }
          }
        }
      }
    }
  }
}
</style>
