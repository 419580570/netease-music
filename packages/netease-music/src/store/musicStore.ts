import { songDetail } from "@/types";
import { defineStore } from "pinia";
import { MusicState } from "./music.type";
import getters from "./MusicGetter";
import actions from "./MusicAction";

export const useMusicStore = defineStore("music", {
  state: (): MusicState => ({
    playing: false,
    currentIndex: 0,
    playlist: [],
    cutway: "liebiaoxunhuan",
    volume: 50,
    progress: 0,
    duration: 0,
    isMute: false,
    lyric: false,
    likeList: [],
  }),
  actions: actions,
  getters: getters,
});
