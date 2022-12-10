import { songDetail } from "@/types";

export * from "./electron";
export * from "./login";

export function extractFromSongDetail(song: any): songDetail[] {
  return song.songs.map(
    (item: any, index: number): songDetail => ({
      id: item.id,
      fee: item.fee,
      ar: item.ar,
      alia: item.alia,
      name: item.name,
      picUrl: item.al.picUrl,
      plLevel: song.privileges[index].plLevel,
      mv: item.mv,
      // sq: item.sq,
      // h: item.h,
      // m: item.m,
      // l: item.l,
    })
  );
}
