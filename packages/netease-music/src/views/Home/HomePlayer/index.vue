<template>
  <div class="n-player">
    <Info></Info>
    <Player></Player>
    <Options ref="options" v-model="showPlaylist"></Options>
    <SongList :class="{ show: showPlaylist }"></SongList>
    <Lyric @click="showPlaylist = false"></Lyric>
  </div>
</template>

<script lang="ts" setup>
import Player from "./play/player.vue";
import Info from "./info/info.vue";
import Options from "./options/options.vue";
import SongList from "./songlist/songlist.vue";
import Lyric from "./lyric/index.vue";
const options = ref<any>(null);
const showPlaylist = ref(false);

// const togglePlayList = (val: boolean) => {
//   showPlaylist.value = val;
// };
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
  z-index: 1100;
  @include player-bg();
  @include split-line("border-color");
}
</style>
