<template>
  <div>
    <el-table
      style="width: 100%"
      stripe
      :border="false"
      size="mini"
      class="song-table"
    >
      <el-table-column label=" " type="index" width="38%"> </el-table-column>
      <el-table-column width="38%">
        <template #default="scope">
          <!-- <span>{{islike}}</span> -->
          <i
            class="iconfont"
            :class="!scope.row.islike ? 'icon-dan-like-outline' : 'icon-xihuan'"
            style="color: var(--netease-color)"
          ></i>
          <!-- <i class="iconfont icon-xihuan icon-dan-like-outline" @click="changeLike(scope)" v-else></i> -->
        </template>
      </el-table-column>
      <el-table-column label="音乐标题" width="510%">
        <template #default="scope">
          <span class="textcontent">
            <span>{{ scope.row.name }}</span>
            <span style="color: rgb(150, 150, 151)">{{
              scope.row.alia[0] === undefined
                ? ""
                : "(" + scope.row.alia[0] + ")"
            }}</span>
            <i
              class="iconfont icon-VIP"
              :class="{ noShow: scope.row.fee !== 1 }"
              style="
                margin: 0 2px;
                color: red;
                position: relative;
                bottom: -4px;
                font-size: 20px;
              "
            ></i>
            <i
              class="iconfont icon-mv"
              :class="{ noShow: scope.row.mv === 0 }"
              style="
                margin: 0 2px;
                color: red;
                font-size: 20px;
                cursor: pointer;
              "
            ></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="255%">
        <!-- <template #default="scope">
          <span>{{ conName(scope.row.ar) }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="专辑" prop="al.name" width="330%">
      </el-table-column>
      <el-table-column width="100%" label="时长">
        <!-- <template #default="scope">
          <span style="color: rgb(155, 155, 155)">
            {{ playTime(scope.row) }}</span
          >
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
// import { request } from "@/network/request";
// import { insertMusic } from "@/common/function.js";
// export default {
//   data() {
//     return {
//       islike: false,
//       song: null,
//       itemkey: "",
//     };
//   },
//   props: {
//     songlist: {
//       type: Array,
//       default() {
//         return [];
//       },
//     },
//   },
//   computed: {
//     songList: {
//       get() {
//         this.song = this.songlist;
//         for (let item of this.song) {
//           item.islike = false;
//         }
//         return this.song;
//       },
//       set(index) {
//         // console.log(this.song[index])
//         this.song[index].islike = !this.song[index].islike;
//       },
//     },
//   },
//   methods: {
//     addZero(num) {
//       if (num < 10) return "0" + num;
//       return num;
//     },
//     playTime(row) {
//       const time = parseInt(row.dt / 1000);
//       var min = this.addZero(parseInt(time / 60));
//       var sec = this.addZero(parseInt(time - 60 * min));
//       return min + ":" + sec;
//     },
//     conName(ar) {
//       let arr = [];
//       for (let item in ar) {
//         arr.push(ar[item].name);
//       }
//       return arr.join("/");
//     },
//     async changeLike(scope) {
//       const data = await request("GET", "like", {
//         id: scope.row.id,
//         like: true,
//       });
//       if (data.code === 200) {
//         this.islike = !this.islike;
//         this.songList = scope.$index;
//         this.itemkey = Math.random();
//       }
//     },
//     insertMusic,
//   },
// };
let instance = getCurrentInstance();
console.log(
  instance!.parent!.parent!.parent!.exposed!.playlistDetailData._object
    .playlistDetailData // ??????
);
</script>

<style scoped>
.song-table {
  position: relative;
  top: -12px;
  overflow: hidden;
  margin-bottom: 80px;
}

.noShow {
  display: none;
}
::v-deep .song-table .el-table__row {
  font-size: 13px;
  /* font-weight: 346; */
  color: rgb(101, 101, 101);
}
::v-deep .song-table .el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}
.icon-dan-like-outline::before {
  position: relative;
  top: 2px;
  color: rgb(194, 194, 194);
}
.icon-dan-like-outline:hover::before {
  color: #000;
}
</style>
