<template>
  <Navbar :list="nav" @NavbarClick="handleClick" :enlargeActive="true"></Navbar>
  <div class="discover">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const discoverList: Record<string, string> = {
  个性推荐: "/discover/recommend",
  专属定制: "/discover/customized",
  歌单: "/discover/playlist",
  排行榜: "/discover/rankinglist",
  歌手: "/discover/singer",
  最新音乐: "/discover/latestmusic",
};

const nav: string[] = Object.keys(discoverList);

const handleClick = (index: number) => {
  router.push(discoverList[nav[index]]);
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.n-navbar {
  @include main_color();
  position: sticky;
  top: -30px;
  z-index: 10;
  height: 50px;
  padding-top: 10px;
  margin-top: -40px;
}
.discover {
  display: flex;
  justify-content: center;
  padding: 30px 0 0;
  height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
</style>
