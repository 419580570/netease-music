<template>
  <div class="common-layout" v-if="isRouterActive">
    <HomeNavBar></HomeNavBar>
    <div class="container">
      <HomeMenuList />
      <div class="content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
    <HomePlayer></HomePlayer>
  </div>
</template>

<script lang="ts" setup>
import { getLikelist, getLoginStatus, getUserDetail } from "@/network/methods";
import HomeNavBar from "./HomeNavBar/index.vue";
import { ipcRenderer } from "electron";
import { login, logout } from "@/util";
import HomeMenuList from "./HomeMenuList/index.vue";
import HomePlayer from "./HomePlayer/index.vue";
import { useMusicStore, useProfileStore } from "@/store/index";
import util from "@/hooks/util";
const { getStorage, addStorage } = util();
const router = useRouter();
const musicStore = useMusicStore();
const profile = useProfileStore();
musicStore.$state = JSON.parse(getStorage("music") || "{}");
profile.$state.isLogin = JSON.parse(getStorage("isLogin") || "{}");
musicStore.$subscribe((mutation, state) => {
  // 每当它发生变化时，将用户状态持久化到本地存储
  let _state = { ...state };
  _state.playing = false;
  _state.lyric = false;
  addStorage("music", JSON.stringify(_state));
});

/* 清空window.history */
if (window.history.length > 2) {
  const position = window.history.state.position;
  if (position > 1) {
    let backlen = position - 1;
    window.history.go(-backlen);
  } else if (position == 0) {
    window.history.go(1);
  }
  // router.replace("/discover/recommend");
}

const cookie = getStorage("cookie");
cookie && (profile.profile.cookie = cookie);
// 每次初始化页面获取一次用户数据
getLoginStatus(cookie)
  .then((res: any) => {
    if (res.data.code === 200 && res.data.profile) {
      getUserDetail(res.data.profile.userId).then((detail: any) => {
        cookie && (detail = { cookie, ...detail });
        login(detail);
        /* 获取到用户信息后获取用户喜欢列表 */
        getlikelist();
      });
    } else {
      logout();
    }
  })
  .catch(() => {
    logout();
  });

// 刷新页面
const isRouterActive = ref(true);
const reload = () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
};
const getlikelist = () => {
  profile.profile.userId &&
    getLikelist(profile.profile.userId).then((res: any) => {
      if (res.code === 200) {
        musicStore.addLikeList(res.ids);
      }
    });
};
provide("reload", reload);

watch(
  () => profile.isLogin,
  val => {
    reload();
    addStorage("isLogin", JSON.stringify(val));
  }
);

/* 接收从登录页发来的登录请求 */
ipcRenderer.on("login-send", (_, detail) => {
  login(detail);
  getlikelist();
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.common-layout {
  height: 100vh;
  @include main_color();
  .container {
    display: flex;
    height: calc(100vh - 133px);
    .menuList {
      min-width: 200px;
    }
    .content {
      width: 100%;
      padding: 25px;
      overflow-y: scroll;
      @include scrollbar();
      position: relative;
    }
  }
}
</style>
