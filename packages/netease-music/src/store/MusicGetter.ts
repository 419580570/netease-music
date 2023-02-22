import { songDetail } from "@/types";
import { MusicGetter, THIS, _MusicGetter } from "./music.type";
let obj: THIS & MusicGetter = {
  getCurrentSong(state): songDetail | null {
    return this.isEnd ? null : state.playlist[state.currentIndex!];
  },
  getPlayList(state): songDetail[] {
    return state.playlist;
  },
  getLikeList(state): number[] {
    return state.likeList;
  },
  hasPlayList(state): boolean {
    return state.playlist && state.playlist.length !== 0;
  },
  getCurrentId(): number {
    return this.getCurrentSong ? this.getCurrentSong.id : 0;
  },
  isEnd(state): boolean {
    return state.currentIndex === null;
  },
};
export default obj as MusicGetter;
