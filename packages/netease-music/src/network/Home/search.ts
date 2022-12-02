import { get } from "../axios";

/* 热搜列表 */
export function getSearchList() {
  return get("/search/hot/detail");
}

/* 搜索建议 */
export function getSearchSuggest(keywords: string) {
  return get("/search/suggest", { keywords });
}

/* 默认搜索关键词 */
export function getSearchDefault() {
  return get("/search/default");
}
