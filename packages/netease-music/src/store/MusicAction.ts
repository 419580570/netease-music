import { songDetail } from "@/types";
import type { MusicActions, THIS } from "./music.type";
const o: Record<string, number> = {};
let obj: MusicActions & THIS = {
  /* 替换播放列表 */
  replacePlaylist(arr, index = 0) {
    this.playlist = arr.filter(item => item.noCopyrightRcmd === null);
    this.changeSong(index, true);
  },
  /* 添加歌单到歌单中 */
  addPlayList(song) {
    if (this.playlist && this.playlist.length) {
      let arr: songDetail[] = [];
      this.playlist &&
        this.playlist.forEach((item, index) => {
          o[item.id] = index;
        });
      song.forEach(item => {
        if (!(o[item.id] === undefined && item.noCopyrightRcmd === null)) {
          this.playlist.splice(o[item.id], 1);
        }
      });
      if (this.isEnd) {
        this.playlist.push(...song);
      } else {
        this.playlist.splice(this.currentIndex!, 0, ...song);
      }
    } else {
      this.playlist = song;
    }
  },
  /* 添加单曲到歌单中 */
  addSong(song) {
    const _song = { ...song };
    const index = this.playlist.findIndex(item => item.id === song.id);
    if (index !== -1) {
      this.currentIndex = index;
      return;
    }
    if (this.currentIndex === null || !this.hasPlayList) {
      this.playlist.push(song);
      this.currentIndex = this.playlist.length - 1;
    } else {
      this.playlist.splice(this.currentIndex + 1, 0, _song);
      this.currentIndex++;
    }
    _song.index = this.currentIndex;
  },
  /* 切换播放歌曲 */
  changeSong(id, index = false) {
    let oindex = this.currentIndex || 0;
    if (typeof id === "number") {
      oindex = index ? id : this.playlist.findIndex(item => item.id === id);
    } else {
      if (this.isEnd) {
        if (id === "last") {
          oindex = this.playlist.length - 2;
        }
      } else if (id === "next") {
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
      this.progress = 0
      this.duration = 0
      this.replacePlaylist([]);
    }
  },
  /* 添加喜欢列表 */
  addLikeList(list) {
    this.likeList = list;
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
