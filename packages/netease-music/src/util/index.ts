import { songDetail } from "@/types";

export * from "./electron";
export * from "./login";
export * from "./util";

export function extractFromSongDetail(
  song: any,
  privileges: any,
  id?: string,
  name?: string
): songDetail[] {
  return song.map(
    (item: any, index: number): songDetail => ({
      index: index,
      id: item.id,
      fee: item.fee,
      ar: item.ar,
      al: item.al,
      dt: item.dt,
      alia: item.alia,
      name: item.name,
      picUrl: item.al.picUrl,
      plLevel: privileges[index].plLevel,
      mv: item.mv,
      from: { id: id!, name: name! },
      noCopyrightRcmd: item.noCopyrightRcmd,
    })
  );
}
