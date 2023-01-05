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
import { getLoginStatus, getUserDetail } from "@/network/methods";
import HomeNavBar from "./HomeNavBar/index.vue";
import { ipcRenderer } from "electron";
import { login, logout } from "@/util";
import HomeMenuList from "./HomeMenuList/index.vue";
import HomePlayer from "./HomePlayer/index.vue";
import { useMusicStore } from "@/store/index";
import util from "@/hooks/util";
const { getStorage, addStorage } = util();
const router = useRouter();
const musicStore = useMusicStore();
musicStore.$state = JSON.parse(getStorage("music") || "{}");

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

// 每次初始化页面获取一次用户数据
getLoginStatus().then((res: any) => {
  if (res.data.code === 200 && res.data.profile) {
    getUserDetail(res.data.profile.userId).then((detail: any) => {
      login(detail);
    });
  } else {
    logout();
  }
});

// 刷新页面
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});

/* 接收从登录页发来的登录请求 */
ipcRenderer.on("login-send", (_, detail) => {
  login(detail);
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
