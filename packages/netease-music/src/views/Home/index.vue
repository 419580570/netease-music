<template>
  <div class="common-layout" v-if="isRouterActive">
    <HomeNavBar></HomeNavBar>
    <div class="container">
      <MenuList />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <!--</el-header>
      <el-container>
        <el-aside width="200px">
        </el-aside>
        <el-main
          >
        </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script lang="ts" setup>
import { getLoginStatus, getUserDetail } from "@/network/methods";
import HomeNavBar from "@/views/Home/HomeNavBar/index.vue";
import { ipcRenderer } from "electron";
import { login, logout } from "@/util";
import MenuList from "./HomeMenuList/index.vue";
// profileStore.$subscribe((mutation, state) => {
//   state.profile.profile &&
//     // 每当它发生变化时，将用户状态持久化到本地存储
//     localStorage.setItem("userId", `${state.profile.profile.userId}`);
// });

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
    height: 100%;
    .menuList {
      width: 200px;
    }
  }
}
</style>
