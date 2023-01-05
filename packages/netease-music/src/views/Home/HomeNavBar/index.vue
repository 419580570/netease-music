<!--eslint-disable vue/multi-word-component-names */ -->
<template>
  <div class="nav-bar">
    <div class="left no-drag">
      <img src="@/assets/img/netease0.png"/>
    </div>
    <NavBarCenter class="center"></NavBarCenter>
    <NavBarRight class="right"></NavBarRight>

    <div class="darkThemeStripe"></div>
  </div>
</template>

<script setup lang="ts">
import NavBarRight from "./right/NavBarRight.vue";
import NavBarCenter from "./center/index.vue";
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.nav-bar {
  @include basic_color();
  display: flex;
  line-height: 60px;
  height: 60px;
  position: relative;
  -webkit-app-region: drag;
  .darkThemeStripe {
    position: absolute;
    z-index: 1002;
    bottom: 1px;
    height: 1.5px;
    width: 100%;
    @include navbar_stripe()
  }
  .left {
    img {
      cursor: pointer;
      width: 170px;
      height: 60px;
    }
  }
  .right {
    margin-right: 15px;
  }
  &::after {
    content: "";
    position: absolute;
    z-index: 1001;
    bottom: 0;
    height: 5px;
    width: 100%;
    @include basic_color();
  }
}
</style>
