<template>
  <div class="NavBarRight" :class="{ isLyric: musicStore.lyric }">
    <!-- <el-popover
      placement="top"
      ref="popover"
      title="标题"
      width="250"
      trigger="click"
      :virtual-ref="buttonRef"
    >
    </el-popover> -->
    <!-- <div v-else></div> -->
    <!-- <el-popover placement="bottom" :width="280" trigger="click">
      <template #reference> -->
    <!--</template>
      <profilePopover v-if="isLogin" />
    </el-popover> -->

    <!-- 登录 -->
    <span class="popoverWrapper">
      <Popover trigger="click" width="280px" height="332px" :disable="!isLogin">
        <template #reference>
          <span @click="toLogin" class="leftspan no-drag">
            <img :src="profile.avatarUrl" class="avatar" />
            <a>{{ profile.nickname }}</a>
            <span class="cvip" v-if="vipList.iconUrl"
              ><img :src="vipList.dynamicIconUrl || vipList.iconUrl" />
              <!-- {{3}}天到期 -->
            </span>
            <Icon type="htmal5icon03" :size="14"></Icon>
          </span>
        </template>
        <profilePopover :vipLevel="vipLevel" />
      </Popover>
    </span>

    <!-- 皮肤 -->
    <span class="popoverWrapper">
      <Popover trigger="click" width="320px" height="275px">
        <template #reference>
          <Icon type="clothes" :size="17"></Icon>
        </template>
        <SkinPopover></SkinPopover>
      </Popover>
    </span>

    <Icon type="shezhi" :size="17"></Icon>
    <!-- 设置 -->

    <Icon type="youxiang" :size="16"></Icon>
    <!-- 消息 -->

    <span class="split no-drag">|</span>
    <!-- 分割线 -->

    <Icon type="minimize" @click="windowMinimize" :size="15"></Icon>
    <span v-show="isFullScreen">
      <Icon type="restore" @click="windowMaximize"></Icon>
    </span>
    <span v-show="!isFullScreen"
      ><Icon type="maximize" @click="windowMaximize"></Icon
    ></span>
    <Icon type="exit" @click="windowClose"></Icon>
    <!-- <LoginDialog ref="Login"></LoginDialog> -->
  </div>
</template>

<script lang="ts" setup>
// import LoginDialog from "@/views/Login/index.vue";
import profilePopover from "./profilePopover.vue";
import { useProfileStore } from "@/store/index";
import { musicStore } from "@/hooks/store";
import { ipcRenderer } from "electron";
import SkinPopover from "./skin.vue";
import { getVIP } from "@/network/User";
import { VIPList } from "@/types";
import { CreateChildWindows } from "@/util";
import { NNotify as Notify } from "ui/components/notify";
let isFullScreen = ref<boolean>(false);

const profileStore = useProfileStore();
// const Login: any = ref(null);
const vipList = reactive<VIPList>({
  dynamicIconUrl: null,
  expireTime: 0,
  iconUrl: "",
  isSign: false,
  isSignDeduct: false,
  isSignIap: false,
  isSignIapDeduct: false,
  vipCode: 100,
  vipLevel: 0,
});

const profile = computed(() => {
  return profileStore.profile;
});

const isLogin = computed(() => {
  return profileStore.isLogin;
});

const vipLevel = computed(() => {
  const gap = vipList.expireTime - Date.now();
  return Math.ceil(gap / 86400000);
});

/* 登录 */
const toLogin = () => {
  if (isLogin.value) return;
  CreateChildWindows("login", 350, 530);
};

/* 最小化窗口 */
const windowMinimize = () => {
  ipcRenderer.send("window-min"); // 通知主进程我要进行窗口最小化操作
};

/* 全屏/恢复 */
const windowMaximize = () => {
  ipcRenderer.invoke("window-max").then(res => {
    isFullScreen.value = res;
  });
};

/* 关闭 */
const windowClose = () => {
  ipcRenderer.send("window-close");
};

getVIP().then(res => {
  Object.keys(res.data.associator).forEach(key => {
    (vipList as any)[key] = (res.data.associator as any)[key];
  });
});
</script>

<style lang="scss" scoped>
.NavBarRight {
  --color: rgb(255, 255, 255, 0.7);

  &.isLyric {
    .n-icon,
    .split {
      transition-delay: 0.3s;
    }
    --color: rgb(0, 0, 0, 0.5);
    [data-theme="coDark"] & {
      --color: rgb(255, 255, 255, 0.25);
    }
    .n-icon,
    .leftspan {
      &:hover {
        color: var(--color);
      }
    }
  }
  .n-icon,
  .split {
    position: relative;
    margin: 0 10px;
    color: var(--color);
    transition: color 0s 0s linear;
  }
  .n-icon:not(.clothes, .htmal5icon03),
  .split {
    z-index: 1101;
  }
  .n-icon,
  .leftspan {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
  .split {
    font-weight: 100;
    position: relative;
    top: -2px;
  }
  .leftspan {
    position: relative;
    top: -3px;
    font-size: 12px;
    margin: 0 5px;
    color: $font-color;
    .htmal5icon03 {
      margin: 0;
      margin-left: 3px;
      &:before {
        display: inline-block;
        transform: scaleX(70%) scaleY(60%) translateY(2px);
      }
    }
    .avatar {
      height: 28px;
      width: 28px;
      margin-right: 7px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .cvip {
      color: rgb(189, 169, 166);
      font-size: 8px;
      padding: 1.5px 0px 1.5px 4px;
      img {
        position: relative;
        top: 3px;
        width: 37px;
        height: 13.5px;
      }
    }
  }
  .popoverWrapper {
    display: inline-block;
    position: relative;
    height: 100%;
  }
  .maximize::before {
    display: inline-block;
    transform: scaleY(85%);
  }
}
.profilePopper {
  :deep(.el-popper) {
    top: 7px;
  }
}
</style>
