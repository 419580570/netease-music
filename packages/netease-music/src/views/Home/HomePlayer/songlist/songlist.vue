<template>
  <div class="songlist" @click.stop>
    <div class="songlist-top">
      <div class="songlist-top__currentPlay">当前播放</div>
      <div class="songlist-top__title">
        <div class="total">总{{ playList.length || 0 }}首</div>
        <div class="operate">
          <div class="collect hover">
            <Icon type="xinjianwenjian"></Icon>
            <span>收藏全部</span>
          </div>
          <div class="clean hover" @click="cleanPlayList">清空列表</div>
        </div>
      </div>
    </div>
    <div class="songlist-table">
      <TableList
        v-if="hasPlayList"
        :data="playList"
        :format="format"
        :max="0"
        @handleDbclick="handleDbclick"
      ></TableList>
      <div class="no-playlist" v-else>
        <div class="no-add">你还没有添加任何歌曲!</div>
        <div class="go-find">
          去首页<span class="hover" @click="goDiscover">发现音乐</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableList from "@/components/tableList/index.vue";
// import { getCurrentSong, hasPlayList } from "@/hooks/store";
// import { useMusicStore } from "@/store";
import { songDetail } from "@/types";
import { musicGetters, musicActions } from "@/hooks/store";
const { currentSong, hasPlayList, playList } = musicGetters();
const { changeSong, cleanPlayList } = musicActions();

// const musicStore = useMusicStore();
const router = useRouter();
const format = [
  { title: "", slotName: "play", width: "7px", key: ["id"] },
  {
    title: "",
    slotName: "name",
    width: "44%",
    key: ["name", "alia", "plLevel", "fee", "mv"],
  },
  { title: "", slotName: "singer", width: "20.5%", key: ["ar"] },
  { title: "", slotName: "jump", width: "18px", key: ["from"] },
  { title: "", slotName: "time", width: "40px", key: ["dt"] },
];

const handleDbclick = (item: songDetail) => {
  changeSong(item.id);
};

// const cleanList = () => {
//   musicStore.hasPlayList() && musicStore.replacePlaylist([]);
// };

const goDiscover = () => {
  router.push("/discover/recommend");
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.songlist {
  position: absolute;
  visibility: hidden;
  bottom: calc(100% + 1px);
  right: 0;
  z-index: 998;
  height: calc(100vh - 133px);
  width: 419px;
  box-shadow: 0 0 5px 0 rgb(18, 18, 18, 0.15);
  overflow: auto;
  @include scrollbar();
  @include themeify {
    background-color: themed("popover_bg");
    box-shadow: themed("popover_bs");
  }
  &-top {
    margin: 19px 20px 0;
    height: 67px;
    border-bottom: 1px solid;
    @include split-line("border-color");
    &__currentPlay {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
      @include font-color();
    }
    &__title {
      position: relative;
      .total {
        font-size: 12px;
        @include font-color-number();
      }
      .operate {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        font-size: 13px;
        .clean {
          cursor: pointer;
          margin-left: 20px;
          @include font-color-blue();
        }
        .collect {
          cursor: pointer;
          display: flex;
          align-items: center;
          @include font-color();
          .xinjianwenjian::before {
            @include font-color-dark();
            display: inline-block;
            font-size: 19px;
            transform: scaleX(85%);
            margin-right: 5px;
          }
        }
      }
    }
  }
  &-table {
    :deep(.n-table) {
      .n-table-content__line {
        [data-theme="coDark"] & {
          &:nth-child(2n - 1) {
            background-color: rgb(58, 58, 58);
          }
          &.active {
            background-color: rgb(75, 75, 75) !important;
          }
          &:hover {
            background-color: rgb(62, 62, 62);
            .name,
            .nameGroup-item,
            .nameGroup-split,
            .time {
              color: #fff;
              &:hover {
                color: #fff;
              }
            }
          }
        }
        &:hover {
          .name,
          .nameGroup-item,
          .nameGroup-split,
          .time {
            color: #000;
            &:hover {
              color: #000;
            }
          }
        }
        &__item {
          .name {
            font-size: 12px;
          }
        }
        &.playing {
          .name {
            @include red_custom("color");
          }
          .nameGroup-item {
            @include red_custom("color");
          }
        }
      }
    }
    .no-playlist {
      height: 285px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .no-add {
        font-size: 14px;
        margin-bottom: 26px;
        @include font-color-desc();
      }
      .go-find {
        font-size: 12px;
        margin-right: 60px;
        @include font-color-desc();
        span {
          cursor: pointer;
          text-decoration: underline;
          @include font-color();
        }
      }
    }
  }
  &.show {
    visibility: visible;
  }
}
</style>
