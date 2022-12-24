import { get } from "../axios";

/* 热搜列表 */
export function getURL(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    get("/check/music", { id })
      .then((res: any) => {
        if (res.success) {
          get("/song/url/v1", { id, level: "lossless" }).then((result: any) => {
            if (result.code === 200) {
              resolve(result.data[0].url);
            } else {
              reject();
            }
          });
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}
