<template>
  <div class="login">
    <div class="login-info">
      <span class="login-info-title">扫码登录</span>
      <div class="ewm">
        <div>
          <img :src="data.qrImg" class="code" ref="qrcode" />
          <span class="codespan" style="font-size: 14.5px"
            >使用<a href="https://music.163.com/#/download" tabindex="-1"
              >网易云音乐APP</a
            >扫码登录</span
          >
        </div>
        <img class="limg" src="@/assets/img/login.png" />
      </div>
      <span class="chooseLogin" @click="changeLogin">选择其它登录模式 ></span>
    </div>
    <div @click="closeDialog" class="closeButton" title="关闭窗体">
      <span style="--r: -45deg"></span>
      <span style="--r: 45deg"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Mdialog from "@/components/dialog/dialog.vue";
import { useProfileStore } from "@/store/index";
import { getQrCode, checkLogin, getUserDetail } from "@/network/methods";
import { ipcRenderer } from "electron";
import { useRouter } from "vue-router";

interface login {
  qrImg: string;
  key: any;
  QRlogin: boolean;
  anologin: boolean;
}

let data = reactive<login>({
  qrImg: "",
  key: null,
  QRlogin: true,
  anologin: false,
});

let show = ref<boolean>(true);
let key: string | null = ""; //二维码登录使用的key
const router = useRouter();
const profileStore = useProfileStore();

/* 监听show的变化 */
watchEffect(() => {
  if (show.value) {
    getQrCode()
      .then((res: any) => {
        data.qrImg = res.qrimg;
        key = res.key;
        polling();
      })
      .catch(() => {
        data.qrImg = ""; //无缩略图
      });
  } else {
    data.qrImg = "";
    key = null;
  }
});
const reload = inject("reload", () => null);
/* 轮询登录接口 */
function polling(): void {
  let time = setInterval(() => {
    if (!key || !show.value) {
      clearInterval(time);
      return;
    }
    checkLogin(key).then((res: any) => {
      if (res.code === 803) {
        show.value = false;
        getUserDetail().then((detail: any) => {
          //根据用户id获取用户详情
          ipcRenderer.send("dialog-close");
          ipcRenderer.send("login", detail);
          reload();
        });
        clearInterval(time);
      }
    });
  }, 1000);
}

const changeLogin = () => {
  router.push("/login/phonenumber");
};
onActivated(() => {
  show.value = true;
});
onDeactivated(() => {
  show.value = false;
});

const closeDialog = () => {
  ipcRenderer.send("dialog-close");
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background-color: #fff;
  .closeButton {
    -webkit-app-region: no-drag;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    right: 8px;
    text-align: center;
    cursor: pointer;
    &:hover {
      span {
        background-color: rgb(36, 36, 36);
      }
    }
    span {
      width: 1px;
      height: 19px;
      background-color: rgb(130, 128, 128);
      position: absolute;
      transform: rotateZ(var(--r));
      transform-origin: 50% 50%;
    }
  }
  .login-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    // justify-content: space-between;
    .login-info-title {
      width: 100%;
      text-align: center;
      padding-top: 95px;
      -webkit-app-region: drag;
      font-size: 28px;
    }
    .ewm {
      flex-grow: 2;
      margin-top: 33px;
      text-align: center;
      line-height: 20px;
      color: $font-color-grey;
      img {
        display: none;
      }
      /* transition: position .3s linear; */
      a {
        text-decoration: none;
        color: rgb(12, 115, 194);
      }
      .codes,
      .code {
        display: block;
        margin: 0 auto 15px;
        font-size: 17px;
        color: rgb(102, 102, 102);
        width: 170px;
        height: 170px;

        /* background-color: rgb(17, 14, 14); */
        transition: all 0.5s ease-out;
        position: relative;
        right: 0;
        top: 0;
      }
      .outcode {
        opacity: 0.2;
      }
      &:hover {
        // position: relative;
        // height: 200px;
        // right: -85px;
        // width: 40%;
        margin-bottom: 54.5px;
        .code {
          position: relative;
          transform: scale(70%, 70%);
          right: -80px;
          top: 5px;
          /* margin: 50px 0 15px 50px;  */
          /* margin-top: 32px ;
  height: 125px;
  width: 125px;*/
        }
        .codespan {
          display: block;
          position: relative;
          font-size: 50px;
          width: 140px;
          height: 50px;
          right: -95px;
          top: -10px;
        }
        .limg {
          opacity: 1;
          position: absolute;
          left: 0;
        }
      }
      .limg {
        display: inline !important;
        position: absolute;
        width: 162px;
        height: 244px;
        top: 31%;
        left: 60px;
        opacity: 0;
        transition: all 0.5s ease-out;
      }
    }
    .chooseLogin {
      font-size: 12px;
      color: rgb(102, 102, 102);
      // margin-bottom: 84px;
      position: fixed;
      bottom: 62px;
      cursor: pointer;
    }
  }
  /* .ewm:hover .code{
  position: relative;
  transform: scale(70%,70%);
  right: -80px;
  top:5px */
  /* margin: 50px 0 15px 50px;  */
  /* margin-top: 32px ;
  height: 125px;
  width: 125px;*/ /* } */
  /* .login{
    width: 50px;
    height: 50px;
    background-color:red;
  } */
}
</style>
