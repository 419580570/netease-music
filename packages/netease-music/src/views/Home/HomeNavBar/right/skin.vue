<template>
  <div class="skin-wrapper">
    <Navbar
      class="navbar"
      :list="test"
      :size="16"
      @NavbarClick="handleClick"
    ></Navbar>
    <!-- 主题 -->
    <div v-show="!themeOrPure" class="skin-content">
      <span
        style="background-image: url(/src/assets/img/coolblack.png)"
        @click="changeTheme(0)"
        :class="{ currentPick: currentPick === 'coDark' }"
      />
      <span
        style="background-image: url(/src/assets/img/officalred.png)"
        @click="changeTheme(1)"
        :class="{ currentPick: currentPick === 'ofRed' }"
      />
    </div>

    <!-- 自定义颜色 -->
    <div v-show="themeOrPure" class="skin-content">
      <!-- 可选值 -->
      <div class="skin-content__wrapper">
        <div
          v-for="(item, index) in colorList.slice(0, 6)"
          :class="['skin-content__item', currentPick === item && 'currentPick']"
          @click="changeTheme(item)"
          :style="{
            backgroundColor: item,
            border: index === 0 ? '1px solid rgb(204,204,204)' : 'none',
          }"
        ></div>
      </div>
      <div class="skin-content__wrapper">
        <div
          v-for="item in colorList.slice(6)"
          :class="['skin-content__item', currentPick == item && 'currentPick']"
          @click="changeTheme(item)"
          :style="{ backgroundColor: item }"
        ></div>
      </div>

      <!-- 自选值 -->
      <div class="skin-customColor">
        <div class="skin-customColor__title">自定义颜色</div>
        <div class="skin-customColor__custom">
          <div
            class="skin-customColor__custom_preview"
            :class="{ currentPick: currentPick === 'custom' }"
          ></div>
          <div class="skin-customColor__custom_slider">
            <div
              @mousedown="handleClickAll"
              :style="{ '--left': pickAll + 'px' }"
            ></div>
            <div
              @mousedown="handleClickPart"
              :style="{
                '--left': pickPart + 'px',
                '--lc': lmtrgb[0],
                '--rc': lmtrgb[1],
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlideColor } from "@/hooks/useSlideColorPicker";
import { useCalcRgb } from "./skin";
import utils from "@/hooks/util";
import { userProfileStore } from "@/store/index";
const { addStorage, getStorage } = utils();

const themeOrPure = ref(0);
const currentPick = ref(getStorage("color-pick"));
const profile = userProfileStore()

const handleClick = (index: number) => {
  themeOrPure.value = index;
};

const changeTheme = (val: number | string) => {
  if (typeof val == "string") {
    document.documentElement.setAttribute("data-theme", "default");
    document.documentElement.setAttribute("style", `--custom-theme: ${val}`);
    !profile.isLogin && (profile.profile.avatarUrl = `/src/assets/img/avatar-ofRed.png`)
    currentPick.value = val;
    addStorage("color-pick", val);
  } else {
    const type = val ? "ofRed" : "coDark";
    document.documentElement.setAttribute("data-theme", type);
    !profile.isLogin && (profile.profile.avatarUrl = `/src/assets/img/avatar-${type}.png`)
    currentPick.value = type;
    addStorage("color-pick", type);
  }
};

onMounted(() => {
  const pick = getStorage("color-pick");
  const type = pick === "ofRed" || pick === "coDark" ? pick : "default";
  !profile.isLogin && (profile.profile.avatarUrl = `/src/assets/img/avatar-${pick || "ofRed"}.png`)
  document.documentElement.setAttribute("data-theme", type);
  pick !== "custom" &&
    document.documentElement.setAttribute("style", `--custom-theme: ${pick}`);
});

const colorList = [
  "rgb(255,255,255)",
  "rgb(255,92,138)",
  "rgb(255,122,158)",
  "rgb(113,127,249)",
  "rgb(71,145,235)",
  "rgb(57,175,234)",
  "rgb(43,182,105)",
  "rgb(106,204,25)",
  "rgb(226,171,18)",
  "rgb(255,143,87)",
  "rgb(253,114,109)",
  "rgb(253,84,78)",
];

const test = ["主题", "纯色"];

const {
  value: pickAll,
  slide: handleClickAll,
  percent: percentAll,
} = useSlideColor("custom-color-all", currentPick, profile);
const {
  value: pickPart,
  slide: handleClickPart,
  percent: percentPart,
} = useSlideColor("custom-color-part", currentPick, profile);

const { lmtrgb } = useCalcRgb(percentAll, percentPart);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.skin-wrapper {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  .navbar {
    height: 30px;
  }
  .skin-content {
    margin-top: 18px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    span {
      width: 92px;
      height: 92px;
      margin-right: 8px;
      border-radius: 8px;
      align-self: flex-start;
      position: relative;
      font-size: 15px;
      cursor: pointer;
      background-size: contain;
    }
    .skin-content__wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .skin-content__item {
        box-sizing: border-box;
        width: 41px;
        height: 41px;
        cursor: pointer;
        border-radius: 5px;
        position: relative;
        font-size: 13px;
      }
    }
    .skin-customColor {
      width: 100%;
      &__title {
        font-size: 13px;
        @include font-color();
        line-height: 40px;
        margin-top: 8px;
      }
      &__custom {
        display: flex;
        &_preview {
          width: 41px;
          height: 41px;
          border-radius: 5px;
          font-size: 13px;
          background: url("/src/assets/img/gradient.png");
          position: relative;
        }
        &_slider {
          flex: 1;
          margin-left: 13px;
          display: flex;
          flex-direction: column;
          div {
            margin: 7.5px 0;
            background-color: red;
            position: relative;
            height: 4px;
            border-radius: 2px;
            pointer-events: none;
            &::before {
              content: "";
              cursor: pointer;
              position: absolute;
              pointer-events: all;
              top: -120%;
              left: var(--left);
              background-color: #fff;
              border: 1px solid rgb(205, 205, 205);
              width: 12px;
              height: 12px;
              border-radius: 50%;
              box-shadow: 0 0 4px 0 rgb(205, 205, 205);
            }
            &:active::before,
            &:hover::before {
              background-color: rgb(245, 245, 247);
            }
            &:first-child {
              background: linear-gradient(
                to right,
                rgb(255, 0, 0),
                rgb(255, 255, 0),
                rgb(0, 255, 0),
                rgb(0, 255, 255),
                rgb(0, 0, 255),
                rgb(255, 0, 255),
                rgb(255, 0, 0)
              );
            }
            &:last-child {
              background: linear-gradient(
                to right,
                rgb(var(--lc)),
                rgb(var(--rc))
              );
            }
          }
        }
      }
    }
    .currentPick::before {
      content: "✔";
      color: #fff;
      position: absolute;
      bottom: -0.5em;
      right: -0.5em;
      width: 1.36em;
      height: 1.36em;
      text-align: center;
      line-height: 1.36em;
      background-color: rgb(236,65,65);
      border-radius: 50%;
      border-width: 2px;
      border-style: solid;
      @include theme_pickButton_border();
    }
  }
}
</style>
