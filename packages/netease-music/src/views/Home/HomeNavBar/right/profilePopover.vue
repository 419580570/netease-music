<template>
  <div class="profile">
    <div class="profileTop">
      <div class="profileTopItem">
        <span>{{ profile.eventCount }}</span>
        <div>动态</div>
      </div>
      <div class="profileTopItem">
        <span>{{ profile.follows }}</span>
        <div>关注</div>
      </div>
      <div class="profileTopItem">
        <span>{{ profile.followeds }}</span>
        <div>粉丝</div>
      </div>
    </div>

    <div class="profile_sign">
      <Button @click="signUp" :disabled="!!isSign">
        <Icon type="qiandao" :size="21" v-if="!isSign"></Icon
        >{{ isSign ? "已签到" : "签到" }}</Button
      >
    </div>

    <div class="splitLine"></div>

    <div class="profileItem">
      <Icon type="member" :size="21"></Icon>
      <span class="title">我的会员</span>
      <span class="level-num"
        >{{ vipLevel && vipLevel > 0 ? `剩余${vipLevel}天` : "未订购" }}
      </span>
      <Icon type="prev" :size="12" class="icon-prev"></Icon>
    </div>
    <div
      class="profileItem"
      @click="openExternal('https://music.163.com/#/user/level')"
    >
      <Icon type="dengji" :size="21"></Icon>
      <span class="title">等级</span>
      <span class="level-num">Lv.{{ profile.level || 1 }} </span>
      <Icon type="prev" :size="12" class="icon-prev"></Icon>
    </div>
    <div
      class="profileItem"
      @click="openExternal('https://music.163.com/store/product')"
    >
      <Icon type="shopmall" :size="18"></Icon>
      <span class="title">商品</span>
      <Icon type="prev" :size="12" class="icon-prev"></Icon>
    </div>
    <div class="splitLine"></div>
    <div class="profileItem">
      <Icon type="gerenxinxi" :size="19"></Icon>
      <span class="title">个人信息设置</span>
      <Icon type="prev" :size="12" class="icon-prev"></Icon>
    </div>

    <div class="splitLine"></div>

    <div class="profileItem logout" @click="logout">
      <Icon type="guanbi"></Icon>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from "@/store/index";
import { logOut, signIn } from "@/network/methods";
import { openExternal } from "@/util/electron";
import { logout as _logout } from "@/util";
import utils from "@/hooks/util";

const { addStorage, getStorage, removeStorage } = utils();

const isSign = ref(JSON.parse(getStorage("sign-in") || "false"));
if (isSign.value && new Date().getDay() !== isSign.value) {
  removeStorage("sign-in");
  isSign.value = false;
}
const profileStore = useProfileStore();

const profile = computed(() => {
  const profile = profileStore.profile!;
  return profile;
});

const { vipLevel } = defineProps(["vipLevel"]);
const reload = inject("reload", () => null);
const logout = () => {
  logOut().then((res: any) => {
    if (res.code === 200) {
      _logout();
    }
  });
};
const signUp = () => {
  !isSign.value &&
    signIn().then(() => {
      isSign.value = true;
      addStorage("sign-in", JSON.stringify(new Date().getDay()));
    });
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.profile {
  line-height: 100%;
  .profileTop .profileItem {
    /* height: 200px; */
    cursor: pointer;
    width: 100%;
    position: relative;
    display: flex;
    /* justify-content:space-evenly; */
    align-items: center;
  }
  .splitLine {
    width: 90%;
    height: 0.8px;
    @include split-line();
    margin: 0 auto;
  }
  .profileTop {
    height: 80px;
    font-size: 12px;
    @include font-color();
    display: flex;
    .profileTopItem {
      width: 33.3%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      span {
        font-size: 17px;
        @include font-color();
        margin-bottom: 3px;
        font-weight: 600;
      }
    }
  }
  &_sign {
    height: 30px;
    text-align: center;
    margin: 2px 0 7px;
    .qiandao::before {
      position: relative;
      top: 3px;
    }
  }
  .profileItem {
    cursor: pointer;
    height: 40px;
    font-size: 12px;
    display: flex;
    padding: 0 16px;
    align-items: center;
    @include font-color();
    div {
      margin: 20px 0;
    }
    &:hover {
      @include hover-default();
    }
    .title {
      padding-left: 7px;
      font-size: 13px;
    }
    .shopmall {
      margin: 3px 2px 0 1px;
    }
    .level-num {
      position: absolute;
      right: 30px;
      @include font-color-number();
    }
    .prev {
      font-size: 13px;
      position: absolute;
      right: 15px;
    }
  }
  .logout {
    height: 50px;
    display: flex;
    justify-content: center;
    span {
      padding-left: 7px;
      font-size: 14px;
    }
  }
}
</style>
