import { defineStore } from "pinia";
import _userProfileStore from "./userProfileStore";

const _userMusicStore = defineStore("music", {
  state: () => ({}),
});

export const userProfileStore = _userProfileStore;

export const userMusicStore = _userMusicStore;

export default {
  userProfileStore: _userProfileStore,
  userMusicStore: _userMusicStore,
};
