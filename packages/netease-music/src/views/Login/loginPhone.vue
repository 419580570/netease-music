<template>
  <div class="phonelogin">
    <div class="phonelogin-top">
      <img :src="plogin" />
      <div class="changeLogin" @click="changeLogin"></div>
    </div>
    <div class="phonelogin-login">
      <div class="phonelogin-login-input">
        <div class="phonelogin-login-input__phone">
          <Droppdown :data="countryCode" @dropdownClick="handleClick">
            <template #default>
              <div class="phonelogin-login-input__phone__region">
                <Icon type="shouji"></Icon>
                <span class="countryCode">+{{ countryNum }}</span>
                <Icon type="htmal5icon03"></Icon>
              </div>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="phone"
                @click.stop
              />
            </template>
            <template #dropDownItem="item">
              <span class="name">{{ item.name }}</span>
              <span class="num">{{ item.num }}</span>
            </template>
          </Droppdown>
        </div>
        <div class="phonelogin-login-input__password">
          <div class="phonelogin-login-input__password__lock">
            <Icon type="jiesuo"></Icon>
          </div>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
      </div>
      <div class="phonelogin-login-button">
        <div
          class="phonelogin-login-button__tip"
          :style="{ display: isCorrect ? 'none' : 'block' }"
        >
          <Icon type="31tishi"></Icon>
          <span> 用户名或密码错误</span>
        </div>
        <div class="phonelogin-login-button__another">
          <span class="another" @click="noService">忘记密码</span>
          <span class="split">|</span>
          <span class="another" @click="noService">验证码登录</span>
        </div>
        <Button @click="Login" theme="ofRed">登 录</Button>
        <div class="phonelogin-login-button__register" @click="noService">
          注 册
        </div>
      </div>
    </div>

    <div class="phonelogin-bottom">
      <div class="phonelogin-bottom__loginway">
        <Icon
          type="weixin1"
          style="--i: rgb(104, 182, 51)"
          @click="noService"
        ></Icon>
        <Icon
          type="QQ2"
          style="--i: rgb(52, 160, 223)"
          @click="noService"
        ></Icon>
        <Icon
          type="weibo"
          style="--i: rgb(234, 75, 75)"
          @click="noService"
        ></Icon>
        <Icon
          type="netease"
          style="--i: rgb(234, 75, 75)"
          @click="noService"
        ></Icon>
      </div>
      <div class="phonelogin-bottom__protocal">
        <input type="checkbox" v-model="checkState" />
        <span>同意</span>
        <span
          class="external"
          @click="
            openExternal('https://st.music.163.com/official-terms/service')
          "
          >《服务条款》</span
        >
        <span
          class="external"
          @click="
            openExternal('https://st.music.163.com/official-terms/privacy')
          "
          >《隐私政策》</span
        >
        <span
          class="external"
          @click="
            openExternal('https://st.music.163.com/official-terms/children')
          "
          >《儿童隐私政策》</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserDetail, phonelogin } from "@/network/methods";
import { openExternal } from "@/util";
import { ipcRenderer } from "electron";
import countryCode from "./countryCode.js";
import { NNotify as Notify } from "ui";
import plogin from "@/assets/img/plogin.png";

const router = useRouter();
const phone = ref();
const password = ref();
const isCorrect = ref(true);
const countryNum = ref(86);
const checkState = ref(false);
const reload = inject("reload", () => null);
const changeLogin = () => {
  router.push("/login/qrcode");
};
const handleClick = (item: { name: string; num: number }) => {
  countryNum.value = item.num;
};
const Login = () => {
  if (!checkState.value) {
    Notify({
      message: "请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》",
      position: "center",
      duration: 3000,
      size: 14,
    });
    return;
  }
  if (!phone.value || !password.value) return;
  phonelogin(
    phone.value,
    password.value,
    countryNum.value !== 86 ? countryNum.value : undefined
  ).then((res: any) => {
    if (res.code === 200) {
      getUserDetail(res.profile.userId).then((detail: any) => {
        //根据用户id获取用户详情
        ipcRenderer.send("dialog-close");
        ipcRenderer.send("login", { cookie: res.cookie, ...detail });
        reload();
      });
    } else {
      isCorrect.value = false;
    }
  });
};

const noService = () => {
  Notify({
    message: "暂不支持该功能",
    position: "center",
    duration: 2000,
    size: 14,
  });
};
</script>

<style scoped lang="scss">
.phonelogin {
  &-top {
    width: 305px;
    height: 197px;
    -webkit-app-region: drag;
    img {
      width: 100%;
      height: 100%;
    }
    .changeLogin {
      -webkit-app-region: no-drag;
      width: 47px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
    }
  }
  &-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    /* height: 200px; */
    &-input {
      border: 1px solid rgb(216, 216, 216);
      width: 75%;
      height: 75px;
      margin: 0 auto;
      border-radius: 5px;
      box-sizing: border-box;
      &__phone {
        height: 50%;
        border-bottom: 1px solid rgb(216, 216, 216);
        display: flex;
        position: relative;
        &__region {
          width: 30%;
          height: 100%;
          border-right: 1px solid rgb(216, 216, 216);
          display: flex;
          align-items: center;
          .n-icon {
            width: 30px;
            text-align: center;
          }
          .htmal5icon03 {
            right: 0px;
            font-size: 11px;
            color: rgb(153, 153, 153);
          }
          .countryCode {
            font-size: 12px;
          }
        }
        .num {
          position: absolute;
          right: 10px;
        }
        .name {
          padding-left: 10px;
        }
      }
      &__password {
        display: flex;
        height: 49%;
        &__lock {
          display: flex;
          align-items: center;
          width: 30px;
          justify-content: center;
        }
        input {
          padding-left: 0;
        }
      }
    }
    &-button {
      width: 75%;
      text-align: center;
      &__tip {
        position: absolute;
        text-align: start;
        margin: 5px 0;
        font-size: 12px;
        color: rgb(255, 58, 58);
      }
      &__another {
        text-align: end;
        margin-bottom: 5px;
        .another {
          cursor: pointer;
          font-size: 12px;
          color: rgb(80, 125, 175);
        }
        .split {
          margin: 0 10px;
          font-size: 12px;
          color: rgb(221, 223, 230);
        }
      }
      .n-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 100%;
        border-radius: 5px;
        background-color: rgb(255, 58, 58) !important;
        &:hover {
          background-color: rgb(229, 52, 52) !important;
        }
      }
      &__register {
        margin-top: 15px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  &-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__loginway {
      margin: 28px 0 40px;
      width: 75%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .n-icon {
        &::before {
          cursor: pointer;
          padding: 7px;
          font-size: 23px;
          border-radius: 50%;
          border: 1px solid rgb(201, 201, 201);
          color: var(--i);
        }
        &:hover::before {
          color: #fff;
          background-color: var(--i);
          border-color: var(--i);
        }
      }
    }
    &__protocal {
      width: 85%;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .external {
        color: rgb(80, 125, 175);
      }
      input {
        position: relative;
        top: 3px;
      }
    }
  }
}
input {
  border: 0;
  font-size: 12px;
  outline: none;
  padding-left: 10px;
}
input::-webkit-input-placeholder {
  color: rgb(177, 169, 187);
}
</style>
