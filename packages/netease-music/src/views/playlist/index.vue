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
            <span class="nickname">{{
              playlistDetailData.creator.nickname
            }}</span>
            <span class="createTime"
              >{{ SimpleDataFormat(playlistDetailData.createTime) }}创建</span
            >
          </div>
          <div class="button">
            <!-- <play-all-button @showDialog="showDialog"></play-all-button> -->
            <div class="buttonitem">
              <i class="iconfont icon-xinjianwenjian"></i>
              <span
                >收藏({{
                  simpNum(playlistDetailData.subscribedCount, 5)
                }})</span
              >
            </div>
            <div class="buttonitem">
              <i class="iconfont icon-fenxiang"></i>
              分享({{ simpNum(playlistDetailData.shareCount, 5) }})
            </div>
            <div class="buttonitem">
              <i class="iconfont icon-xiazai1"></i>
              下载全部
            </div>
          </div>
          <div class="bottom-detail">
            <div>
              标签 :
              <span class="tag">{{ getTags }}</span>
            </div>
            <div>
              歌曲 :
              <span style="margin-right: 9px">{{
                playlistDetailData.trackCount
              }}</span>
              播放 : {{ simpNum(playlistDetailData.playCount, 5) }}
            </div>
            <div class="description">
              <span style="flex: 1">简介 : </span>
              <span
                style="color: rgb(103, 103, 103); flex: 28; width: 1010px"
                :class="{ shouldfold: !isfold }"
                >{{ playlistDetailData.description }}</span
              >
              <i
                class="iconfont icon-htmal5icon03"
                style="transform: rotateZ(180deg)"
                v-show="!isfold"
                @click="isfold = !isfold"
              ></i>
              <i
                class="iconfont icon-htmal5icon03"
                v-show="isfold"
                @click="isfold = !isfold"
              ></i>
            </div>
          </div>
          <!-- <div class="bottom-detail" v-show="type == 1">
          <div>
            歌手 :
            <span style="color: rgb(80, 125, 175); cursor: pointer">{{
              getTags
            }}</span>
          </div>
          <div>
            时间 :
            <span style="margin-right: 9px">{{
              playlistDetailData.trackCount
            }}</span>
          </div>
        </div> -->
        </div>
      </div>
      <div class="bottom">
        <nav-bar :list="tabList"></nav-bar>
        <router-view></router-view>
        <!-- <song-list
          v-show="routes[0]"
          :songlist="playlistDetailData.tracks"
        ></song-list>
        <comment v-show="routes[1]" :type="2" :id="this.id"></comment>
        <collector
          v-show="routes[2]"
          :subscribers="playlistDetailData.subscribers"
        ></collector> -->
      </div>
      <!-- <Dialog ref="dialog" @addplaylist="addplaylist"></Dialog> -->
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
//     showDialog() {
//       this.$refs.dialog.dialogVisible = true;
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

import { getPlayListDetail } from "@/network/methods";
import { playListDetailData } from "@/types/index";
import util from "@/hooks/util";
import { computed } from "@vue/reactivity";

const route = useRoute();
const { SimpleDataFormat, simpNum } = util();
let data = reactive<{
  isfold: boolean;
  isLoading: boolean;
  tabList: Array<{
    title: string;
    name: string;
  }>;
  playlistDetailData: playListDetailData;
}>({
  isfold: false /* 简介是否折叠 */,
  isLoading: true /* 加载 */,
  tabList: [
    { title: "歌曲列表", name: "list" },
    { title: "评论()", name: "comment" },
    { title: "收藏者", name: "collector" },
  ],
  playlistDetailData: {
    coverImgUrl: "",
    name: "",
    createTime: 0,
    subscribedCount: 0,
    shareCount: 0,
    trackCount: 0,
    playCount: 0,
    description: "",
    tracks: [],
    subscribers: [],
    tags: [],
    creator: {
      avatarUrl: "",
      nickname: "",
    },
  },
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
getPlayListDetail(route.params.id as string).then((res: any) => {
  const playlist = res.playlist;
  data.playlistDetailData = {
    coverImgUrl: playlist.coverImgUrl,
    name: playlist.name,
    createTime: playlist.createTime,
    subscribedCount: playlist.subscribedCount,
    shareCount: playlist.shareCount,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount,
    description: playlist.description,
    tracks: playlist.tracks,
    subscribers: playlist.subscribers,
    tags: playlist.tags,
    creator: {
      avatarUrl: playlist.creator.avatarUrl,
      nickname: playlist.creator.nickname,
    },
  };
  data.isLoading = false;
});

const getTags = computed(() => {
  let arr = data.playlistDetailData.tags;
  let tagstr = "";
  if (arr) {
    tagstr = arr.length == 1 ? arr.toString() : arr.join("／");
  }
  return tagstr;
});

const { isfold, isLoading, playlistDetailData, tabList } = toRefs(data);

defineExpose({ playlistDetailData });

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
.top {
  margin-top: 20px;
  display: flex;
  img {
    width: 185px;
    height: 185px;
    border-radius: 5px;
  }
  .detail {
    margin-left: 20px;
    position: relative;
    /* margin-top: 5px; */
    /* display: flex; */
    .top-detail {
      display: flex;
      align-items: center;
      .tag {
        font-size: 13px;
        color: rgb(236, 65, 65);
        padding: 0 3px 0.5px 4px;
        border: 1px solid rgb(242, 140, 140);
        border-radius: 2px;
        margin-right: 10px;
      }
      .name {
        font-size: 22px;
        font-weight: 800;
      }
    }
    .creator {
      display: flex;
      align-items: center;
      margin: 8px 0;
      justify-content: flex-start;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        padding-right: 5px;
      }
      .nickname {
        font-size: 5px;
        cursor: pointer;
        color: rgb(11, 88, 176);
        padding-right: 15px;
      }
      .createTime {
        font-size: 5px;
        color: rgb(103, 103, 103);
      }
    }
    .button {
      display: flex;
      div {
        box-sizing: border-box;
        height: 32px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin-top: 13px;
      }
      .buttonitem {
        border: 1px solid rgb(216, 216, 216);
        font-size: 14px;
        padding: 0 14px;
        color: rgb(52, 52, 52);
        margin-left: 15px;
        &:hover {
          cursor: pointer;
          background-color: rgb(242, 242, 242);
        }
        .icon-xinjianwenjian {
          font-size: 17px;
        }
        i {
          color: rgb(101, 101, 101);
          margin-right: 3px;
          font-size: 20px;
        }
      }
    }
    .bottom-detail {
      margin-top: 17px;
      display: flex;
      flex-direction: column;
      .tag {
        color: rgb(80, 125, 175);
        cursor: pointer;
      }
      div {
        font-size: 12.5px;
        color: rgb(55, 55, 55);
        margin-bottom: 6px;
      }
    }
    .description {
      display: flex;
      justify-content: center;
      vertical-align: top;
      .shouldfold {
        height: 20px;
        overflow: hidden;
      }
      i {
        color: rgb(153, 153, 153);
        font-size: 13px;
        margin-left: 15px;
        height: 100%;
      }
    }
  }
}
.bottom {
  margin-top: 16px;
}
::v-deep .detail-tabs .el-tabs__nav .is-active {
  font-size: 15px;
  color: rgb(55, 55, 55);
}
.icon-mv::before,
.icon-VIP::before {
  font-size: 23px;
}
.icon-mv:hover::before {
  color: rgb(251, 103, 103);
}
.icon-mv {
  position: relative;
  bottom: -2.5px;
}
</style>
