<template>
  <div class="searchWrapper">
    <div class="searchPop" v-show="!prop.searchValue.length">
      <div class="searchHistory" v-show="historyList.length">
        <div class="title">
          <span>搜索历史</span>
          <Icon type="lajitong" :size="14" @click="cleanHistory"></Icon>
          <div class="all" @click="fold(false)" v-show="isFold">查看全部</div>
          <div class="all" @click="fold(true)" v-show="!isFold">收起</div>
        </div>
        <div class="historyList" :class="{ isFold: isFold }">
          <div class="historyItem" v-for="(item, index) in historyList">
            <Button size="12px"
              >{{ item }}
              <Icon type="exit" :size="10" @click="deleteHistory(index)"></Icon
            ></Button>
            <div class="appendix"></div>
          </div>
        </div>
      </div>
      <div class="search-hot">
        <div class="title">热搜榜</div>
        <ul class="search-hotlist">
          <li class="search-hotlist__item" v-for="(item, index) in hotList">
            <div class="index">{{ index + 1 }}</div>
            <div class="content">
              <div class="head">
                <span class="searchWord">{{ item.searchWord }}</span>
                <span class="score">{{ item.score }}</span>
                <img :src="item.iconUrl" class="iconUrl" />
              </div>

              <div class="description" v-show="item.content">
                {{ item.content }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="searchSuggest"
      v-show="prop.searchValue.length"
      v-if="suggestData"
    >
      <div class="group" v-show="suggestData!.songs">
        <Icon type="musicalnote" :size="25"></Icon>
        <span class="title">单曲</span>
        <ul class="list">
          <li v-for="item in suggestData!.songs">{{ parseItem(item) }}</li>
        </ul>
      </div>
      <div class="group" v-show="suggestData!.artists">
        <Icon type="geshou" :size="25"></Icon>
        <span class="title">歌手</span>
        <ul class="list">
          <li v-for="item in suggestData!.artists">{{ parseItem(item) }}</li>
        </ul>
      </div>
      <div class="group" v-show="suggestData!.albums">
        <Icon type="zhuanji"></Icon>
        <span class="title">专辑</span>
        <ul class="list">
          <li v-for="item in suggestData!.albums">{{ parseItem(item) }}</li>
        </ul>
      </div>
      <div class="group" v-show="suggestData!.playlists">
        <Icon type="liebiao"></Icon>
        <span class="title">歌单</span>
        <ul class="list">
          <li v-for="item in suggestData!.playlists">{{ parseItem(item) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSearchList, getSearchSuggest } from "@/network/methods";
import util from "@/hooks/util";

export type hotListData = {
  alg: string;
  content: string;
  iconType: number;
  iconUrl: string;
  score: number;
  searchWord: string;
  source: number;
  url: string;
};

export type suggestList = {
  albums: { name: string; artist: { name: string } }[];
  artists: { name: string }[];
  playlists: { name: string; artist: { name: string } }[];
  songs: { name: string; artists: { name: string }[] }[];
};

const { getStorage, addStorage, debounce } = util();

const historyList = ref(JSON.parse(getStorage("historyList") || "[]"));

const hotList = ref<hotListData[]>([]);
const suggestData = ref<suggestList>();
const isFold = ref(true);

const prop = defineProps(["searchValue"]);
/* 获取搜索热词 */
getSearchList().then((res: any) => {
  if (res.code === 200) {
    hotList.value = res.data as hotListData[];
  }
});

/* 获取搜索建议 */
const getSuggest = debounce(() => {
  getSearchSuggest(prop.searchValue).then((res: any) => {
    if (res.code === 200) {
      suggestData.value = res.result;
    }
  });
}, 300);

/* 展开折叠搜索历史 */
const fold = (isfold: boolean) => {
  isFold.value = isfold;
};

/* 删除单条历史记录 */
const deleteHistory = (index: number) => {
  historyList.value.splice(index, 1);
};

/* 删除所有历史记录 */
const cleanHistory = () => {
  historyList.value.length = 0;
};

const parseItem = (item: any) => {
  let res = item.name;

  if (item.artist) {
    return res + " - " + item.artist.name;
  } else if (item.artists) {
    return item.artists.reduce((pre: string, _item: { name: string }) => {
      return pre + " " + _item.name;
    }, res + " - ");
  } else {
    return res;
  }
};

watch(historyList.value, value => {
  addStorage("historyList", JSON.stringify(value));
});

watchEffect(() => {
  const value = prop.searchValue;
  if (!value) return;
  getSuggest();
});

defineExpose({
  historyList,
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.searchWrapper {
  line-height: 100%;
  padding: 18px;
  .searchPop {
    .title {
      color: rgb(144, 144, 144);
      font-size: 14px;
      margin-bottom: 16px;
      position: relative;
    }
    .searchHistory {
      .title {
        .lajitong {
          margin-left: 2px;
          cursor: pointer;
        }
        .all {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .historyList {
        overflow: hidden;
        padding-top: 2px;
        &.isFold {
          height: 69px;
        }
        .historyItem {
          margin-right: 10px;
          white-space: pre;
          display: inline-block;
          position: relative;
          .appendix {
            height: 18px;
          }
          .exit {
            display: none;
            position: absolute;
            right: -9px;
            top: 3.5px;
            @include font-color-number();
          }
          .n-button:hover {
            .exit {
              display: block;
            }
          }
        }
      }
    }
    .search-hot {
      &list {
        &__item {
          display: flex;
          font-size: 12px;
          height: 50px;
          width: calc(100% + 36px);
          transform: translateX(-18px);
          cursor: pointer;
          @include font-color();
          &:hover {
            @include hover-default();
          }
          .index {
            height: 100%;
            width: 50px;
            font-size: 17px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: lighter;
            @include font-color-number();
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: calc(100% - 50px - 18px);
            .head {
              display: flex;
              align-items: center;
              .score {
                @include font-color-number();
                font-weight: lighter;
                margin-left: 10px;
              }
              .iconUrl {
                height: 1em;
                margin-left: 7px;
              }
            }
            .description {
              @include font-color-desc();
              width: calc(100%);
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          &:nth-child(-n + 3) {
            .index {
              color: rgb(255, 58, 58) !important;
              font-weight: 600;
            }
            .content > .head > .searchWord {
              font-weight: 600;
            }
          }
        }
      }
    }
  }
  .searchSuggest {
    margin-top: -18px;
    .group {
      .title,
      .n-icon {
        display: inline-block;
        @include font-color-desc();
        height: 35px;
        line-height: 35px;
      }
      // color: rgb(144, 144, 144);
      font-size: 14px;
      // margin-bottom: 16px;
      .n-icon {
        margin-right: 10px;
      }
      .musicalnote,
      .geshou {
        margin-right: 1px;
        position: relative;
        top: 5px;
        left: -5px;
      }
      .list {
        @include font-color();
        li {
          width: calc(100% - 18px);
          transform: translateX(-18px);
          height: 35px;
          line-height: 35px;
          padding-left: 45px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          &:hover {
            @include hover-default();
          }
        }
      }
    }
  }
}
</style>
