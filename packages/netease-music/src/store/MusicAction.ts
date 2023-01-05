import { songDetail } from "@/types";
import type { MusicActions, THIS } from "./music.type";
const o: Record<string, boolean> = {};
let obj: MusicActions & THIS = {
  /* 替换播放列表 */
  replacePlaylist(arr) {
    this.playlist = arr.filter(item => item.noCopyrightRcmd === null);
    this.changeSong(0, true);
  },
  /* 添加单曲到歌单中 */
  addPlayList(song) {
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
  changeSong(id, index = false) {
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
  togglePlayState(state) {
    this.playing = state;
  },
  toggleCutSongWay(way) {
    this.cutway = way;
  },
  end() {
    this.currentIndex = null;
  },
  changeVolume(v) {
    this.volume = v;
  },
  changeProgress(val) {
    this.progress = val;
  },
  changeDuration(val) {
    this.duration = val;
  },
  toggleMute(val) {
    this.isMute = val;
  },
  toggleLyric(val) {
    this.lyric = val;
  },
};
export default obj as MusicActions;
