import { defineStore } from "pinia";
import coDark from "@/assets/img/avatar-coDark.png";
import ofRed from "@/assets/img/avatar-ofRed.png";

interface profile {
  cookie: string;
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
    document.documentElement.dataset.theme === "coDark" ? coDark : ofRed,
  nickname: "未登录",
};

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile,
    isLogin: false,
  }),
});
