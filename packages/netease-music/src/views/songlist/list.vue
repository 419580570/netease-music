<template>
  <div class="tableList">
    <Loading :isLoading="isLoading">
      <!-- 搜索 -->
      <div class="search">
        <Icon type="sousuo"></Icon>
        <input type="text" v-model="searchValue" placeholder="搜索歌单音乐" />
      </div>
      <TableList
        :data="data"
        :format="format"
        :lineIndex="true"
      ></TableList>
    </Loading>
    <!-- <el-table
      style="width: 100%"
      stripe
      :border="false"
      size="mini"
      class="song-table"
    >
      <el-table-column label=" " type="index" width="38%"> </el-table-column>
      <el-table-column width="38%">
        <template #default="scope">
          <!- <span>{{islike}}</span> ->
          <i
            class="iconfont"
            :class="!scope.row.islike ? 'icon-dan-like-outline' : 'icon-xihuan'"
            style="color: var(--netease-color)"
          ></i>
          <!- <i class="iconfont icon-xihuan icon-dan-like-outline" @click="changeLike(scope)" v-else></i> ->
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
        <!- <template #default="scope">
          <span>{{ conName(scope.row.ar) }}</span>
        </template> ->
      </el-table-column>
      <el-table-column label="专辑" prop="al.name" width="330%">
      </el-table-column>
      <el-table-column width="100%" label="时长">
        <!- <template #default="scope">
          <span style="color: rgb(155, 155, 155)">
            {{ playTime(scope.row) }}</span
          >
        </template> ->
      </el-table-column>
    </el-table> -->
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
import TableList from "@/components/tableList/index.vue";
import { getAllTrack } from "@/network/methods";
import { songDetail } from "@/types";
import { extractFromSongDetail } from "@/util";
// import { key } from "./project";
const data = ref<songDetail[]>([]);
const searchValue = ref("");
const isLoading = ref(true);
const route = useRoute();
const format = [
  { title: "操作", slotName: "operate", width: "50px" },
  {
    title: "标题",
    slotName: "name",
    width: "35.5%",
    key: ["name", "alia", "plLevel", "fee", "mv"],
  },
  { title: "歌手", slotName: "singer", width: "16%", key: ["ar"] },
  { title: "专辑", slotName: "album", width: "22.8%", key: ["al"] },
  { title: "时间", slotName: "time", width: "40px", key: ["dt"] },
];

getAllTrack(route.params.id as string).then((res: any) => {
  if (res.code === 200) {
    data.value = extractFromSongDetail(res.songs, res.privileges);

    isLoading.value = false;
  }
});

// const filterData = computed(() => {
//   const val = searchValue.value;
//   if (!val) return data.value;
//   const res = data.value.filter((item, index) => {
//     let findRes = false;
//     const _include = (item: any, key: string) => {
//       // const index = item[key].include(val);
//       return item[key].includes(val);
//       // if (index === -1) return false;
//       // item[key] = item[key].replace(
//       //   item[key][index],
//       //   `<span style='color: red'>${item[key][index]}</span>`
//       // );
//       // return true;
//     };
//     const _some = (arr: any) => {
//       return arr.some(
//         (item: any) =>
//           _include(item, "name") ||
//           (item.alias.length && _include(item.alias, "0"))
//       );
//     };
//     if (
//       _include(item, "name") ||
//       (item.alia.length && _include(item.alia, "0")) ||
//       _some(item.ar) ||
//       _include(item.al, "name") ||
//       (item.al!.tns.length && _include(item.al!.tns, "0"))
//     ) {
//       findRes = true;
//     }
//     return findRes;
//   });
//   return res;
// });
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.search {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -40px;
  right: 30px;
  i {
    position: absolute;
    right: 5px;
    padding-top: 2px;
    @include font-color();
    &:before {
      font-size: 18px;
    }
  }
  input {
    outline: none;
    border: 0;
    border-radius: 30px;
    letter-spacing: 0.3px;
    width: 200px;
    height: 23px;
    margin-left: 8px;
    padding-left: 11px;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: 12px;
    @include hover-menuList();
    @include font-color("caret-color");
    &::-webkit-input-placeholder {
      opacity: 0.5;
      @include font-color-desc("caret-color");
      // color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
