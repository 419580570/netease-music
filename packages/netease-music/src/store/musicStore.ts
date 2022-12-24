import { songDetail } from "@/types";
import { defineStore } from "pinia";

const o: Record<string, boolean> = {};

export const useMusicStore = defineStore("music", {
  state: (): {
    playing: boolean;
    playlist: songDetail[];
    currentIndex: number | null;
    cutway: string;
    volume: number;
    isMute: boolean;
  } => ({
    playing: false,
    currentIndex: 0,
    playlist: [],
    cutway: "liebiaoxunhuan",
    volume: 0,
    isMute: false,
  }),
  actions: {
    /* 替换播放列表 */
    replacePlaylist(arr: songDetail[]) {
      this.playlist = arr.filter(item => item.noCopyrightRcmd === null);
    },
    /* 添加单曲到歌单中 */
    addPlayList(song: songDetail[]) {
      if (this.playlist && this.playlist.length) {
        let arr: songDetail[] = [];
        this.playlist &&
          this.playlist.forEach(item => {
            o[item.id] = true;
          });
        song.forEach(item => {
          if (!o[item.id] && item.noCopyrightRcmd === null) arr.push(item);
        });
        if (this.isEnd) {
          this.playlist.unshift(...arr);
        } else {
          this.playlist.splice(this.currentIndex!, 0, ...arr);
        }
      } else {
        this.playlist = song;
      }
    },
    /* 切换播放歌曲 */
    changeSong(id: number | string, index = false) {
      if (this.isEnd) {
        this.currentIndex = 0;
        return;
      }
      let oindex = this.currentIndex!;
      if (typeof id === "number") {
        oindex = index ? id : this.playlist.findIndex(item => item.id === id);
      } else {
        if (id === "next") {
          oindex++;
        } else if (id === "last") {
          oindex--;
        }
      }
      if (oindex > this.playlist.length - 1) oindex = 0;
      if (oindex < 0) oindex = this.playlist.length - 1;
      this.currentIndex = oindex;
    },
    /* 清空播放列表 */
    cleanPlayList() {
      if (this.hasPlayList) {
        this.currentIndex = 0;
        this.replacePlaylist([]);
      }
    },
    togglePlayState(state: boolean) {
      this.playing = state;
    },
    toggleCutSongWay(way: string) {
      this.cutway = way;
    },
    end() {
      this.currentIndex = null;
    },
    changeVolume(v: number) {
      this.volume = v;
    },
    toggleMute(val: boolean) {
      this.isMute = val;
    },
  },
  getters: {
    getCurrentSong(state): songDetail | null {
      return this.isEnd ? null : state.playlist[state.currentIndex!];
    },
    getPlayList(state): songDetail[] {
      return state.playlist;
    },
    hasPlayList(state): boolean {
      return state.playlist && state.playlist.length !== 0;
    },
    getCurrentId(): number {
      return this.getCurrentSong === null ? 0 : this.getCurrentSong.id;
    },
    isEnd(state): boolean {
      return state.currentIndex === null;
    },
  },
});
