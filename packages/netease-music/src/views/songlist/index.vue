<template>
  <Loading :isLoading="isLoading">
    <div class="outside">
      <div class="top">
        <div class="img">
          <img :src="playlistDetailData.coverImgUrl" />
        </div>
        <div class="detail">
          <div class="top-detail">
            <span class="tag">歌单</span>
            <span class="name">{{ playlistDetailData.name }}</span>
          </div>
          <div class="creator">
            <img :src="playlistDetailData.creator.avatarUrl" />
            <span class="nickname hover">{{
              playlistDetailData.creator.nickname
            }}</span>
            <span class="createTime"
              >{{ SimpleDataFormat(playlistDetailData.createTime) }}创建</span
            >
          </div>
          <div class="button">
            <play-all-button @add-all="addAll"></play-all-button>
            <Button class="buttonitem">
              <Icon type="xinjianwenjian"></Icon>
              <span
                >收藏({{
                  simpNum(playlistDetailData.subscribedCount, 5)
                }})</span
              >
            </Button>
            <Button class="buttonitem">
              <Icon type="fenxiang"></Icon>
              分享({{ simpNum(playlistDetailData.shareCount, 5) }})
            </Button>
            <Button class="buttonitem">
              <Icon type="xiazai1"></Icon>
              下载全部
            </Button>
          </div>
          <div class="bottom-detail">
            <div class="bottom-detail__title">
              标签 :
              <NameGroup :ar="getTags" :blue="true"></NameGroup>
            </div>
            <div class="bottom-detail__title">
              歌曲 :
              <span class="trackCount">{{
                playlistDetailData.trackCount
              }}</span>
              播放 :
              <span class="playCount">{{
                simpNum(playlistDetailData.playCount, 5)
              }}</span>
            </div>
            <div class="desc bottom-detail__title">
              <span :class="{ shouldfold: !isfold, intro: true }"
                >简介 :
                <span class="description">{{
                  playlistDetailData.description
                }}</span></span
              >
              <Icon
                type="htmal5icon03"
                :style="{ transform: `rotateZ(${isfold ? 180 : 0}deg)` }"
                @click="isfold = !isfold"
              ></Icon>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <Navbar
          :list="tabList"
          :size="15"
          :enlargeActive="true"
          @NavbarClick="handleClick"
        ></Navbar>
        <keep-alive>
          <component :is="activeLabel" ref="songlist" :id="route.params.id" />
        </keep-alive>
      </div>
    </div>
  </Loading>
</template>

<script lang="ts" setup>
// import { request } from "network/request";
// import { SimpleDataFormat, simpNum } from "common/filter";
// import Tabs from "components/common/tabs/Tabs";
// import SongList from "./childComps/SongList";
// import Comment from "./childComps/Comment";
// import Collector from "./childComps/Collector";
// import playAllButton from "components/common/button";
// import Dialog from "components/common/replaceDialog";
// export default {
//   name: "playListDetail",
//   data() {
//     return {
//       id: null,
//       playlists: {
//         coverImgUrl: null,
//         creator: { avatarUrl: "" },
//       },
//       isfold: true,
//       labels: ["歌曲列表", "评论()", "收藏者"],
//       routes: [true, false, false],
//       // dialogVisible:false,
//       type: 0,
//       album: null,
//     };
//   },
//   components: {
//     Tabs,
//     Collector,
//     Comment,
//     SongList,
//     playAllButton,
//     Dialog,
//     // ishowDialog
//   },

//   methods: {
//     fold() {
//       this.isfold = !this.isfold;
//     },
//     handleClick(tab) {
//       this.routes = [false, false, false];
//       this.routes[tab.index] = true;
//     },
//     addplaylist() {
//       this.$store.commit("addPlayList", this.playlists.tracks);
//       this.$refs.dialog.dialogVisible = false;
//     },
//     GoProfile() {
//       this.$router.push("/profile/" + this.playlists.creator.userId);
//     },
//   },
//   computed: {
//     getTags() {
//       let arr = this.playlists.tags;
//       let tagstr = "";
//       if (arr) {
//         tagstr = arr.length == 1 ? arr.toString() : arr.join("／");
//       }
//       return tagstr;
//     },
//   },
//   async created() {
//     this.id = this.$route.params.id;
//     this.type = this.$route.params.type;
//     if (this.type == 0) {
//       const data = await request("GET", "/playlist/detail", { id: this.id });
//       this.playlists = data.playlist;
//       this.$set(
//         this.labels,
//         1,
//         `评论(${data.playlist.commentCount | simpNum})`
//       );
//     } else if (this.type == 1) {
//       const data = await request("GET", "album", { id: this.id });
//       this.playlists = data.album;
//     }
//   },
//   filters: {
//     SimpleDataFormat,
//     simpNum,
//   },
// };

import { getSongListDetail } from "@/network/methods";
import { songDetail, songListDetailData } from "@/types/index";
import { useMusicStore } from "@/store/index";
import { computed } from "vue";
import NameGroup from "@/components/nameGroup/index.vue";
import PlayAllButton from "@/components/playAllButton/index.vue";
import List from "./list.vue";
import Comment from "./comment.vue";
import Collector from "./collector.vue";
import util from "@/hooks/util";
// import { key } from "./project";

const route = useRoute();
const router = useRouter();
const oldId = ref("");
const activeLabel = shallowRef<any>(List);
const musicStore = useMusicStore();
const songlist = ref<{ list: songDetail[] }>();
const { SimpleDataFormat, simpNum } = util();
let data = reactive<{
  isfold: boolean;
  isLoading: boolean;
  tabList: Array<string>;
  playlistDetailData: songListDetailData;
}>({
  isfold: false /* 简介是否折叠 */,
  isLoading: true /* 加载 */,
  tabList: ["歌曲列表", `评论()`, "收藏者"],
  playlistDetailData: {
    coverImgUrl: "",
    name: "",
    createTime: 0,
    subscribedCount: 0,
    shareCount: 0,
    trackCount: 0,
    playCount: 0,
    description: "",
    subscribers: [],
    tags: [],
    creator: {
      avatarUrl: "",
      nickname: "",
    },
  },
});

const getData = () => {
  const id = route.params.id;
  if (!id || id === oldId.value) {
    nextTick(() => (data.isLoading = false));
    return;
  }
  oldId.value = id as string;
  data.isLoading = true;
  getSongListDetail(id as string).then((res: any) => {
    const playlist = res.playlist;
    playlist.tracks.forEach((item: any, index: number) => {
      item.plLevel = res.privileges[index].plLevel;
    });
    data.playlistDetailData = {
      coverImgUrl: playlist.coverImgUrl,
      name: playlist.name,
      createTime: playlist.createTime,
      subscribedCount: playlist.subscribedCount,
      shareCount: playlist.shareCount,
      trackCount: playlist.trackCount,
      playCount: playlist.playCount,
      description: playlist.description,
      subscribers: playlist.subscribers,
      tags: playlist.tags,
      creator: {
        avatarUrl: playlist.creator.avatarUrl,
        nickname: playlist.creator.nickname,
      },
    };
    data.tabList[1] = `评论(${playlist.commentCount})`;
    data.isLoading = false;
  });
};

onActivated(() => {
  console.log("activated");
  getData();
});

const getTags = computed(() => {
  return data.playlistDetailData.tags.map((item, index) => ({
    id: index,
    name: item,
  }));
});

// provide(key, filterData);

const addAll = (bool: boolean) => {
  /* 替换播放列表 */
  if (!songlist.value) return;
  bool
    ? musicStore.replacePlaylist(songlist.value.list)
    : musicStore.addPlayList(songlist.value.list);
};

const handleClick = (index: number) => {
  switch (index) {
    case 0:
      activeLabel.value = List;
      break;
    case 1:
      activeLabel.value = Comment;
      break;
    case 2:
      activeLabel.value = Collector;
      break;
  }
};

// const

const { isfold, isLoading, playlistDetailData, tabList } = toRefs(data);

// let playlistData = reactive<any>({});
// playlistData = data.playlist;

// this.$set(
//   this.labels,
//   1,
//   `评论(${data.playlist.commentCount | simpNum})`
// );
// } else if (this.type == 1) {
//   const data = await request("GET", "album", { id: this.id });
//   this.playlists = data.album;
// }
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.outside {
  padding: 5px;
  .top {
    display: flex;
    img {
      width: 185px;
      height: 185px;
      border-radius: 5px;
    }
    .detail {
      margin-left: 20px;
      position: relative;
      flex: 1;
      .top-detail {
        display: flex;
        align-items: center;
        .tag {
          font-size: 13px;
          min-width: 35px;
          box-sizing: border-box;
          @include red_custom("color");
          padding: 0 3px 0.5px 4px;
          border: 1px solid;
          @include red_custom("border-color");
          border-radius: 2px;
          margin-right: 10px;
        }
        .name {
          font-size: 22px;
          font-weight: 800;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          @include font-color();
        }
      }
      .creator {
        display: flex;
        align-items: center;
        margin: 8px 0 15px;
        justify-content: flex-start;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          margin-right: 5px;
        }
        .nickname {
          font-size: 12px;
          cursor: pointer;
          @include font-color-blue();
          padding-right: 15px;
        }
        .createTime {
          font-size: 12px;
          @include font-color-dark();
        }
      }
      .button {
        display: flex;
        .buttonitem {
          height: 30px;
          font-size: 14px;
          margin-left: 15px;
          .n-icon {
            @include font-color-dark();
            margin-right: 1px;
            font-size: 21px;
            line-height: 10px;
            position: relative;
            top: 2px;
          }
          .xinjianwenjian {
            top: 1.5px;
            margin-right: 7px;
            font-size: 18px;
          }
        }
      }
      .bottom-detail {
        margin-top: 17px;
        display: flex;
        flex-direction: column;
        @include font-color();
        .tag {
          @include font-color-blue();
          cursor: pointer;
        }
        &__title {
          font-size: 12.5px;
          margin-bottom: 6px;
          .trackCount {
            margin-right: 9px;
            @include font-color-dark();
          }
          .playCount {
            @include font-color-dark();
          }
          &.desc {
            display: flex;
            vertical-align: top;
            margin-top: -4px;
            .intro {
              // width: 1010px;
              &.shouldfold {
                height: 20px;
                overflow: hidden;
              }
              .description {
                @include font-color-dark();
                line-height: 25px;
              }
            }
            .htmal5icon03 {
              color: rgb(153, 153, 153);
              font-size: 13px;
              margin-left: 15px;
              margin-top: 5px;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .bottom {
    margin-top: 35px;
    position: relative;
    .n-navbar {
      margin-bottom: 19px;
    }
    .tableList {
      width: calc(100% + 60px);
      transform: translateX(-30px);
    }
  }
}
// .icon-mv::before,
// .icon-VIP::before {
//   font-size: 23px;
// }
// .icon-mv:hover::before {
//   color: rgb(251, 103, 103);
// }
// .icon-mv {
//   position: relative;
//   bottom: -2.5px;
// }
</style>
