<template>
  <div class="ListItem">
    <img :src="props.item.picUrl" ref="lazyImg" v-show="!isLoad" />
    <img src="@/assets/img/favicon.png" v-show="isLoad" />
    <span style="margin-top: 5px">{{ props.item.name }}</span>
    <span class="playcount">▷ {{ simpNum(props.item.playCount) }}</span>
    <span class="icon"><i class="iconfont icon-you"></i></span>
  </div>
</template>

<script lang="ts" setup>
import { recommendData } from "@/types/index";
const props = defineProps<{ item: recommendData }>();
function simpNum(num: number) {
  let numStr = num + "";
  if (numStr.length <= 6) {
    return num;
  } else if (numStr.length > 6) {
    return parseInt(num / 10000 + "") + "万";
  } else if (numStr.length > 8) {
    return parseInt(num / 10 ** 8 + "") + "亿";
  }
}
let lazyImg: any = ref(null);
let isLoad = ref<boolean>(true);

onMounted(() => {
  lazyImg.value.onload = () => {
    isLoad.value = false;
    console.log("加载完成");
  };
});
</script>

<style scoped lang="scss">
.ListItem {
  /* flex:1 */
  img {
    border-radius: 5px;
    width: 100%;
    height: 205px;
  }
  .playcount {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    z-index: 9;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding-right: 7px;
  }
  .icon {
    opacity: 0;
    position: absolute;
    bottom: 55px;
    right: 10px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgb(245, 245, 244);
    transition: all 1s ease-out;
    border-radius: 50%;
  }
  &:hover .icon {
    opacity: 1;
  }
  .icon-you::before {
    color: rgb(236, 65, 65);
    font-size: 16px;
    position: relative;
    left: 1.5px;
  }
}
</style>
