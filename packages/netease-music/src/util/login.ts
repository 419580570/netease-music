import { useProfileStore } from "@/store/index";
import coDark from "@/assets/img/avatar-coDark.png";
import ofRed from "@/assets/img/avatar-ofRed.png";
import util from "@/hooks/util";
const { getStorage, addStorage } = util();
const profileStore = useProfileStore();
export function login(profile: any) {
  if (profile.cookie) {
    addStorage("cookie", profile.cookie);
  }
  let _profile = profile.profile;
  delete profile.profile;
  _profile = { ..._profile, ...profile };
  profileStore.$state = {
    profile: _profile,
    isLogin: true,
  };
}
export function logout() {
  profileStore.$reset();
  profileStore.$state = {
    profile: {
      avatarUrl:
        document.documentElement.dataset.theme === "coDark" ? coDark : ofRed,
      nickname: "未登录",
    },
    isLogin: false,
  };
}
