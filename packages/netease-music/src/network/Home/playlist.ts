import { get } from "../axios";
import { playListDetailData } from "@/types/index";

export function getPlayListDetail(id: string) {
  return get<{ playlist: playListDetailData }>("playlist/detail", {
    id,
  });
}
