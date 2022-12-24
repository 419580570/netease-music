import { useMusicStore } from "@/store";

export const musicStore = useMusicStore();
const currentSong = computed(() => musicStore.getCurrentSong);
const hasPlayList = computed(() => musicStore.hasPlayList);
const playList = computed(() => musicStore.getPlayList);
const playState = computed(() => musicStore.playing);
const currentId = computed(() => musicStore.getCurrentId);
const isEnd = computed(() => musicStore.isEnd);
const volume = computed(() => musicStore.volume);
const isMute = computed(() => musicStore.isMute);

export function musicGetters() {
  return {
    currentSong,
    hasPlayList,
    playList,
    playState,
    currentId,
    isEnd,
    volume,
    isMute,
  };
  //   return computed(() => musicStore.getCurrentSong);
  // }
  // export function hasPlayList() {
  //   return computed(() => musicStore.hasPlayList);
  // }
  // export function getPlayList() {
  //   return computed(() => musicStore.getPlayList);
  // }
  // export function getPlayState() {
  //   return computed(() => musicStore.getPlayState);
}

export function musicActions() {
  return {
    replacePlaylist: musicStore.replacePlaylist,
    addPlayList: musicStore.addPlayList,
    changeSong: musicStore.changeSong,
    cleanPlayList: musicStore.cleanPlayList,
    togglePlayState: musicStore.togglePlayState,
    toggleCutSongWay: musicStore.toggleCutSongWay,
    changeVolume: musicStore.changeVolume,
    toggleMute: musicStore.toggleMute,
  };
}
