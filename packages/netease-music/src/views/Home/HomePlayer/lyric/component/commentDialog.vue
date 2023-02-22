<template>
  <Button class="bgButton button-bj" size="12px" @click="toggleDialog"
    ><Icon type="bianji" :size="14"></Icon>快来说点什么吧</Button
  >
  <Dialog v-model:show="showdialog" width="471px" height="305px">
    <div class="commentContent">
      <div class="title">歌曲：{{ currentSong?.name }}</div>
      <div class="content">
        <Textarea @handleInput="handleInput"></Textarea>
      </div>
      <Button
        class="publish"
        theme="ofRed"
        :disabled="disabled"
        @handleClick="handleClick"
        >发布</Button
      >
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { musicGetters } from "@/hooks/store";
import { comment } from "@/network/methods";

const { currentSong } = musicGetters();
const showdialog = ref(false);
const disabled = ref(true);
const emit = defineEmits(["handlePublish"]);
let content = "";
const toggleDialog = () => {
  showdialog.value = !showdialog.value;
};

const handleInput = (val: string) => {
  if (val) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
  content = val;
};

const handleClick = () => {
  comment({
    t: 1,
    type: 0,
    id: currentSong.value?.id || 0,
    content,
  }).then((res: any) => {
    console.log(res);

    if (res.code === 200) {
      emit("handlePublish");
      showdialog.value = false;
    }
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.button-zd {
  position: absolute;
  bottom: 20px;
  right: 8%;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px 0px 10px;
  opacity: 1;
  i::before {
    display: inline-block;
    transform: scaleY(1.2) scaleX(0.9);
  }
}
.bianji {
  margin-right: 7px;
}
.commentContent {
  .title {
    padding: 0 35px;
    box-sizing: border-box;
    padding-top: 8px;
    height: 68px;
    line-height: 68px;
    text-align: center;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @include font-color();
  }
  .content {
    width: 430px;
    height: 160px;
    margin: 0 auto;
  }
  .publish {
    display: block;
    width: 150px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px auto;
    letter-spacing: 5px;
  }
}
</style>
