<template>
  <div class="emojiList">
    <div class="emojiItem" v-for="(item, key) in EmojiMap">
      <img
        class="emoji"
        :src="`http://s1.music.126.net/style/web2/emt/emoji_${item}.png`"
        @click="chooseEmoji(key)"
        :title="key"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EmojiMap } from "./emojiMap";
const emit = defineEmits(["handleChoose"]);

const chooseEmoji = (key: string) => {
  emit("handleChoose", key);
};
</script>

<style lang="scss">
.emojiList {
  margin: 20px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .emojiItem {
    width: 30px;
    img {
      width: 21px;
      height: 21px;
      cursor: pointer;
      border: 1px solid transparent;
      &:hover {
        border-color: rgb(61, 145, 236);
      }
    }
  }
}
</style>
