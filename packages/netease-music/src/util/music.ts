import { CommentItem, songDetail } from "@/types";
export function extractFromSongDetail(
  song: any,
  privileges?: any,
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
      plLevel: item.privilege
        ? item.privilege.plLevel
        : privileges[index].plLevel,
      mv: item.mv,
      from: { id: id!, name: name! },
      pop: item.pop,
      noCopyrightRcmd: item.noCopyrightRcmd,
    })
  );
}

export function extractFromComment(comment: CommentItem[]): CommentItem[] {
  return comment.map(comm => ({
    beReplied: comm.beReplied.map(rep => ({
      content: rep.content,
      user: {
        avatarUrl: rep.user.avatarUrl,
        nickname: rep.user.nickname,
        avatarDetail: rep.user.avatarDetail,
        userId: rep.user.userId,
        vipRights: rep.user.vipRights,
      },
    })),
    commentId: comm.commentId,
    content: comm.content,
    liked: comm.liked,
    likedCount: comm.likedCount,
    time: comm.time,
    user: {
      avatarUrl: comm.user.avatarUrl,
      nickname: comm.user.nickname,
      avatarDetail: comm.user.avatarDetail,
      userId: comm.user.userId,
      vipRights: comm.user.vipRights,
    },
  }));
}
