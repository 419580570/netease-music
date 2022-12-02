interface carouselData {
  pic: string;
  titleColor: string;
  url: string | null;
  encodeId: string;
  typeTitle: string;
  targetId: string | number;
}

export interface recommendData {
  highQuality: boolean;
  id: number | string;
  name: string;
  picUrl: string;
  playCount: number;
}

export type homeDataType = {
  HomepageBanner: Array<carouselData>;
  HomepageBlockPlaylistRcmd: Array<recommendData>;
};

export type playListDetailData = {
  coverImgUrl: string;
  name: string;
  createTime: number;
  subscribedCount: number;
  shareCount: number;
  trackCount: number;
  playCount: number;
  description: string;
  tags: Array<string>;
  tracks: Array<any>;
  subscribers: Array<any>;
  creator: { avatarUrl: string; nickname: string };
};

export type VIPList = {
  dynamicIconUrl: string | null;
  expireTime: number;
  iconUrl: string | null;
  isSign: boolean;
  isSignDeduct: boolean;
  isSignIap: boolean;
  isSignIapDeduct: boolean;
  vipCode: number;
  vipLevel: number;
};
