<template>
  <div class="n-player">
    <Info></Info>
    <Player></Player>
    <Options ref="options"></Options>
    <SongList :class="{ show: options?.showPlaylist }"></SongList>
  </div>
</template>

<script lang="ts" setup>
import Player from "./player.vue";
import Info from "./info.vue";
import Options from "./options.vue";
import SongList from "./songlist.vue";
const options = ref<any>(null);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.n-player {
  height: 73px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid;
  position: relative;
  z-index: 1000;
  @include player-bg();
  @include split-line("border-color");
}
</style>
