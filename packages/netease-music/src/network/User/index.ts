import { VIPList } from "@/types";
import { get } from "../axios";
interface loginData {
  code: number;
  data: any;
}
/* 二维码登录 */
export function getQrCode() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await get("/login/qr/key");
      if (res.code === 200) {
        const data: any = await get("/login/qr/create", {
          key: res.data.unikey,
          qrimg: true,
        });
        if (data.code === 200) {
          resolve({ qrimg: data.data.qrimg, key: res.data.unikey });
        } else reject("");
      } else reject("");
    } catch (e) {
      reject(e);
    }
  });
}

export function checkLogin(key: string) {
  return get("/login/qr/check", { key });
}

/* 手机登录 */
export function phonelogin(
  phone: number,
  password: number,
  countrycode?: number
) {
  return get("/login/cellphone", {
    phone,
    password,
    countrycode,
  });
}

export function getUserAccount() {
  return get("/user/account");
}
export function getVIP(): Promise<{ data: { associator: VIPList } }> {
  return get("/vip/info");
}

export function getUserDetail(id?: number) {
  if (!id) {
    return getLoginStatus().then((res: any) => {
      if (res.data.code === 200) {
        return get("/user/detail", { uid: res.data.profile.userId });
      } else {
        return undefined;
      }
    });
  }
  return get("/user/detail", { uid: id });
}

export function getLoginStatus() {
  return get("/login/status");
}

export function logOut() {
  return get("/logout");
}

export function signIn() {
  return get("/daily_signin");
}
