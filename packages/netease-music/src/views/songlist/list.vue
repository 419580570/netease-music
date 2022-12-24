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
        :showTitle="true"
        @handleDbclick="handleDbclick"
      ></TableList>
    </Loading>
    <Dialog v-model:show="showdialog" width="471px" height="257px">
      <div class="replacePlaylist">
        <div class="title">替换播放列表</div>
        <div class="content">
          “双击播放”会用当前列表的音乐替换播放列表，是否继续？（可在
          <span class="hover">设置-播放</span> 中更改）
        </div>
        <div class="nowarn">
          <Checkbox
            label="不再提醒"
            :modelValue="dbclickwarn"
            @update:modelValue="handleDbclickwarn"
          ></Checkbox>
        </div>
        <div class="bottom">
          <Button theme="ofRed" @handleClick="handleContinue">继续</Button>
          <Button @handleClick="closeDialog">取消</Button>
        </div>
      </div>
    </Dialog>
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
import { useDialog } from "@/hooks/dialog";
import { useMusicStore } from "@/store/index";
import util from "@/hooks/util";
const props = defineProps(["id"]);

const data = ref<songDetail[]>([]);
const searchValue = ref("");
const isLoading = ref(true);
const route = useRoute();
const { showdialog } = useDialog();
const musicStore = useMusicStore();
const { getStorage, addStorage } = util();
const dbclickwarn = ref(JSON.parse(getStorage("dbclickwarn") || "false"));
// const dbclickwarn = ref(false);
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

watch(
  () => props.id,
  val => {
    if (val) {
      isLoading.value = true;
      getAllTrack(props.id as string).then((res: any) => {
        if (res.code === 200) {
          data.value = extractFromSongDetail(
            res.songs,
            res.privileges,
            route.params.id as string
          );
          isLoading.value = false;
        }
      });
    }
  },
  { immediate: true }
);

const handleDbclick = (item: songDetail) => {
  if (!dbclickwarn.value) {
    showdialog.value = true;
  } else {
    musicStore.replacePlaylist(data.value);
  }
};

const handleDbclickwarn = (val: boolean) => {
  dbclickwarn.value = val;
  addStorage("dbclickwarn", JSON.stringify(val));
};

const handleContinue = () => {
  musicStore.replacePlaylist(data.value);
  closeDialog();
};

const closeDialog = () => {
  showdialog.value = false;
};

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
defineExpose({
  list: data,
});
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
.replacePlaylist {
  .title {
    height: 85px;
    line-height: 85px;
    text-align: center;
    font-weight: bold;
    @include font-color();
  }
  .content {
    height: 25px;
    line-height: 25px;
    width: 300px;
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
    @include font-color();
    span {
      @include font-color-blue();
      cursor: pointer;
    }
  }
  .nowarn {
    text-align: center;
    margin-top: 38px;
  }

  .bottom {
    margin-top: 30px;
    text-align: center;
    .n-button {
      padding-left: 22px;
      padding-right: 22px;
      letter-spacing: 5px;
      &:first-child {
        margin-right: 13px;
      }
    }
  }
}
</style>
