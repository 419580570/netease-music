<template>
  <div class="menuList">
    <div class="menuListGroup" v-for="(list, index) in menuList" :key="index">
      <span class="groupTitle" v-if="list.title" @click="openGroup(list)"
        >{{ list.title
        }}<Icon
          :type="list.icon"
          :size="8"
          :style="{
            transform: `rotateZ(${list.open ? 90 : 0}deg) `,
          }"
        ></Icon
      ></span>
      <div
        class="groupItem hover"
        :class="{ active: activeLabel == item.label }"
        v-for="(item, index) in list.groupItem"
        v-show="list.icon ? list.open : true"
        :key="index"
        @click="changeActiveLabel(item)"
      >
        <Icon :type="item.icon" :size="17"></Icon>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const menuList = reactive([
  {
    title: null,
    groupItem: [
      { label: "发现音乐", icon: null, url: "/discover" },
      { label: "播客", icon: null, url: "/broadcast" },
      { label: "视频", icon: null, url: "/video" },
      { label: "关注", icon: null, url: "/interest" },
      { label: "直播", icon: null, url: "/live" },
      { label: "私人FM", icon: null, url: "/private" },
    ],
  },
  {
    title: "我的音乐",
    groupItem: [
      {
        label: "我喜欢的音乐",
        icon: "xihuan",
      },
      {
        label: "本地与下载",
        icon: "xiazai",
      },
      {
        label: "最近播放",
        icon: "recentlyplay",
      },
    ],
  },
  {
    title: "创建的歌单",
    icon: "youjiantou",
    open: false,
  },
  {
    title: "收藏的歌单",
    icon: "youjiantou",
    open: false,
  },
]);
const activeLabel = ref("发现音乐");
const activeUrl = ref("/discover");

const openGroup = (list: any) => {
  list.open = !list.open;
};
const changeActiveLabel = (item: any) => {
  activeLabel.value = item.label;
  item.url && (activeUrl.value = item.url);
  item.url && router.push(item.url);
};

onMounted(() => {
  router.push(activeUrl.value);
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.menuList {
  height: 100%;
  padding: 12px 2px 0 12px;
  box-sizing: border-box;
  border-right: 1px solid rgb(225, 225, 225);
  @include split-line("border-color");
  // background-color: red;
  .menuListGroup {
    display: flex;
    flex-direction: column;
    .groupTitle {
      @include font-color-desc();
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      padding-left: 8px;
      display: flex;
      .n-icon {
        margin-left: 5px;
      }
    }
    .groupItem {
      @include font-color();
      height: 36px;
      display: flex;
      align-items: center;
      border-radius: 3px;
      font-size: 15px;
      padding-left: 8px;
      margin-bottom: 2px;
      cursor: pointer;
      &:hover {
        @include hover-menuList();
        // background-color: rgb(246, 246, 247);
      }
      &.active {
        @include hover-menuList();
        font-size: 16px;
        font-weight: bold;
      }
      .n-icon {
        padding-right: 5px;
      }
    }
  }
}
</style>
