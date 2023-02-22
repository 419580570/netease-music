import { CommentData } from "@/types";
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

export function getLyric(id: string | number) {
  return get("/lyric", { id });
}
/**
 * @param data 
 * id : 资源 id, 如歌曲 id,mv id

 * type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 *   0: 歌曲
 *   1: mv
 *   2: 歌单
 *   3: 专辑
 *   4: 电台节目
 *   5: 视频
 *   6: 动态
 *   7: 电台

 * pageNo:分页参数,第 N 页,默认为 1

 * pageSize:分页参数,每页多少条数据,默认 20

 * sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序

 * cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time

 * @returns 
 */

export function getComment(data: CommentData) {
  return get("/comment/new", data);
}

export function getMusicComment(data: {
  id: number;
  limit?: number;
  offset?: number;
}) {
  return get("/comment/music", data);
}
/* 
  id : 资源 id, 如歌曲 id,mv id

  cid : 评论 id

  t : 是否点赞 , 1 为点赞 ,0 为取消点赞

  type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
*/
export function commentLike(data: {
  id: number;
  cid: number;
  t: 1 | 0;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}) {
  return get("/comment/like", data);
}

export function getSimiPlaylist(id: number) {
  return get("/simi/playlist", { id });
}
export function getSimiSong(id: number) {
  return get("/simi/song", { id });
}

/**
 * t:1 发送, 2 回复
 * type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 *  0: 歌曲
 *  1: mv
 *  2: 歌单
 *  3: 专辑
 *  4: 电台
 *  5: 视频
 *  6: 动态
 *
 * id:对应资源 id
 * content :要发送的内容
 * commentId :回复的评论 id (回复评论时必填)
 */
export function comment(data: {
  t: 1 | 2;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  id: number;
  content: string;
  commentId?: number;
}) {
  return get("/comment", data);
}

export function deleteComment(data: {
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  id: number;
  commentId: number;
}) {
  return get("/comment", { t: 0, ...data });
}

/* 喜欢音乐 */
export function like(id: number, like: boolean = true) {
  return get("/like", { id, like });
}

/* 喜欢列表 */
export function getLikelist(uid: number) {
  return get("/likelist", { uid });
}

/* 搜索 */
export function search(
  keywords: string,
  type: number = 1,
  limit: number = 100,
  offset: number = 0
) {
  return get(`/cloudsearch`, { keywords, limit, type, offset });
}
