<template>
  <div class="playbutton" v-bind="$attrs">
    <span class="button" @click="addAll(true)">
      <Icon type="bofang"></Icon>
      <span class="playall">播放全部</span>
    </span>
    <span class="button plus" @click="addAll(false)">
      <Icon type="jiahao"></Icon>
    </span>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["addAll", "addOne"]);
const addAll = (bool: boolean) => {
  emit("addAll", bool);
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.playbutton {
  @include red-custom();
  width: 143px;
  box-sizing: border-box;
  // height: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &:hover {
    .button::after {
      opacity: 0.1;
    }
  }
  .button {
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      display: inline-block;
      position: absolute;
      background-color: rgb(0, 0, 0);
      opacity: 0;
      top: 0;
      left: 0;
      z-index: 0;
    }
    &:first-child {
      width: 100px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover::after {
      opacity: 0.15;
    }
    .bofang {
      margin-left: 4px;
      position: absolute;
      font-size: 17px;
      left: 8px;
      z-index: 1;
    }
    .playall {
      margin-left: 5px;
      color: #fff;
      font-size: 14px;
      position: absolute;
      right: 10px;
      z-index: 1;
    }
  }
  .plus {
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 0.1px solid rgba(255, 255, 255, 0.1);
    .jiahao {
      position: absolute;
      z-index: 1;
    }
  }
  .n-icon {
    color: #fff;
  }
}
</style>
