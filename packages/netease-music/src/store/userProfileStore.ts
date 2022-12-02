import { defineStore } from "pinia";

interface profile {
  accountStatus: number;
  allSubscribedCount: number;
  artistIdentity: Array<any>;
  area: boolean;
  college: boolean;
  age: boolean;
  villageAge: boolean;
  avatarDetail: unknown;
  birthday: number;
  createTime: number;
  nickname: string;
  defaultAvatar: boolean;
  mutual: boolean;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  avatarImgId: number;
  province: number;
  city: number;
  gender: number;
  followed: boolean;
  djStatus: number;
  vipType: number;
  userType: number;
  remarkName: string | null;
  authStatus: number;
  detailDescription: string;
  experts: any;
  expertTags: unknown;
  avatarImgIdStr: string;
  description: string;
  backgroundImgIdStr: string;
  userId: number;
  signature: string;
  authority: number;
  followeds: number;
  follows: number;
  blacklist: boolean;
  eventCount: number;
  playlistBeSubscribedCount: number;
  avatarImgId_str: string;
  followTime: unknown;
  followMe: boolean;
  cCount: number;
  inBlacklist: false;
  sDJPCount: number;
  playlistCount: number;
  sCount: number;
  newFollows: number;
  level: number;
}

// export type userProfile = {
//   level?: number;
//   profile: Partial<profile>;
// };
// }

const profile: Partial<profile> = {
  avatarUrl:
    document.documentElement.dataset.theme === "coDark"
      ? "/src/assets/img/avatar-coDark.png"
      : "/src/assets/img/avatar-ofRed.png",
  nickname: "未登录",
};

export default defineStore("profile", {
  state: () => ({
    profile,
    isLogin: false,
  }),
});
