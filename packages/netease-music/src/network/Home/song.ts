import { get } from "../axios";

export function getSongDetail(data: Number[]) {
  return get("/song/detail", {
    ids: data.join(","),
  });
}
