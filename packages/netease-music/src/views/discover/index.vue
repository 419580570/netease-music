<template>
  <nav-bar :list="discoverList"></nav-bar>
  <div class="discover">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import NavBar from "@/components/navBar/index.vue";
interface listType {
  title: string;
  path: string;
}
const discoverList: Array<listType> = [
  { title: "个性推荐", path: "/discover/recommend" },
  { title: "专属定制", path: "/discover/customized" },
  { title: "歌单", path: "/discover/playlist" },
  { title: "排行榜", path: "/discover/rankinglist" },
  { title: "歌手", path: "/discover/singer" },
  { title: "最新音乐", path: "/discover/latestmusic" },
];
</script>

<style scoped lang="scss">
.discover {
  padding: 30px 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
