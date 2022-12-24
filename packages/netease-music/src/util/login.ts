import { useProfileStore } from "@/store/index";
const profileStore = useProfileStore();
export function login(profile: any) {
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
        document.documentElement.dataset.theme === "coDark"
          ? "/src/assets/img/avatar-coDark.png"
          : "/src/assets/img/avatar-ofRed.png",
      nickname: "未登录",
    },
    isLogin: false,
  };
}
