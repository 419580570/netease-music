import { get } from "../axios";
import { songListDetailData } from "@/types/index";

export function getSongListDetail(id: string) {
  return get<{ songlist: songListDetailData }>("playlist/detail", {
    id,
  });
}

export function getAllTrack(id: string, limit?: number, offset?: number) {
  return get("playlist/track/all", {
    id,
    limit,
    offset,
  });
}
