import { songDetail } from "@/types";
import { _StoreWithGetters, _StoreWithState, _GettersTree } from "pinia";

export type MusicState = {
  playing: boolean;
  playlist: songDetail[];
  currentIndex: number | null;
  cutway: string;
  volume: number;
  progress: number;
  duration: number;
  isMute: boolean;
  lyric: boolean;
};

export type MusicGetter = {
  getCurrentSong: (state: MusicState) => songDetail | null;
  getPlayList: (state: MusicState) => songDetail[];
  hasPlayList: (state: MusicState) => boolean;
  getCurrentId: (state: MusicState) => number;
  isEnd: (state: MusicState) => boolean;
};
export type _MusicGetter = _StoreWithGetters<{
  getCurrentSong: (state: MusicState) => songDetail | null;
  getPlayList: (state: MusicState) => songDetail[];
  hasPlayList: (state: MusicState) => boolean;
  getCurrentId: (state: MusicState) => number;
  isEnd: (state: MusicState) => boolean;
}>;

export type MusicActions = {
  replacePlaylist: (arr: songDetail[]) => void;
  addPlayList: (song: songDetail[]) => void;
  changeSong: (id: number | string, index?: boolean) => void;
  cleanPlayList: () => void;
  togglePlayState: (state: boolean) => void;
  toggleCutSongWay: (way: string) => void;
  end: () => void;
  changeVolume: (v: number) => void;
  changeProgress: (val: number) => void;
  changeDuration: (val: number) => void;
  toggleMute: (val: boolean) => void;
  toggleLyric: (val: boolean) => void;
};

export type THIS = ThisType<_MusicGetter & MusicActions & MusicState>;
