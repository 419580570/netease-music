<template>
  <div class="simi" :class="{ hidden: !hidden }">
    <div class="simi-playlist">
      <div class="simi-title">包含这首歌的歌单</div>
      <div
        class="simi-item"
        v-for="item in simiPlaylist"
        @click="JumpPlayList(item)"
      >
        <div class="simi-item_img">
          <img :src="item.coverImgUrl + '?param=30y30'" />
        </div>
        <div class="simi-item_info">{{ item.name }}</div>
      </div>
    </div>
    <div class="simi-song">
      <div class="simi-title">喜欢这首歌的人也听</div>
      <div class="simi-item" v-for="item in simiSong" @click="JumpMusic(item)">
        <div class="simi-item_img">
          <img :src="item.coverImgUrl + '?param=30y30'" />
        </div>
        <div class="simi-item_info">
          {{ item.name }}{{ item.artist ? "-" + item.artist : "" }}
        </div>
      </div>
    </div>
    <Button @handleClick="handleClick"
      ><Icon type="youfanye" :size="12"></Icon
    ></Button>
  </div>
</template>

<script lang="ts" setup>
import { getSimiPlaylist, getSimiSong, getSongDetail } from "@/network/methods";
import { musicGetters, musicStore } from "@/hooks/store";
import { extractFromSongDetail } from "@/util";
const { currentId } = musicGetters();
interface SimiData {
  coverImgUrl: string;
  id: number;
  name: string;
  artist?: string;
}
const hidden = ref(true);
const simiPlaylist = ref<SimiData[]>([]);
const simiSong = ref<SimiData[]>([]);
const router = useRouter();

const handleClick = () => {
  hidden.value = !hidden.value;
};

const getSimi = () => {
  getSimiPlaylist(currentId.value).then((res: any) => {
    if (res.code !== 200) return;
    simiPlaylist.value = res.playlists.map((item: any) => ({
      coverImgUrl: item.coverImgUrl,
      id: item.id,
      name: item.name,
    }));
  });
  getSimiSong(currentId.value).then((res: any) => {
    if (res.code !== 200) return;
    simiSong.value = res.songs.map((item: any) => ({
      coverImgUrl: item.album.picUrl,
      id: item.id,
      name: item.name,
      artist: item.artists[0]?.name,
    }));
  });
};

const JumpMusic = (item: SimiData) => {
  getSongDetail([item.id]).then((res: any) => {
    const song = extractFromSongDetail(
      res.songs,
      res.privileges,
      item.name, // 这里应该是专辑
      "搜索页"
    )[0];
    musicStore.addSong(song);
  });
};
const JumpPlayList = (item: SimiData) => {
  router.push(`/songlist/${item.id}`);
  musicStore.toggleLyric(false);
};

watch(
  currentId,
  () => {
    getSimi();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.simi {
  width: 100%;
  padding-left: 70px;
  box-sizing: border-box;
  position: relative;
  &-title {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    position: relative;
    @include font-color();
  }
  &-playlist {
    margin-bottom: 25px;
  }
  &-item {
    padding: 6px 4px;
    width: 100%;
    display: flex;
    border-radius: 5px;
    &_img {
      width: 30px;
      height: 30px;
      img {
        border-radius: 5px;
      }
    }
    &_info {
      @include font-color();
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      padding-left: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.05);
      [data-theme="coDark"] & {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  }
  &.hidden {
    width: auto !important;
    padding-left: 140px;
    .simi-playlist,
    .simi-song {
      display: none;
    }
    .youfanye::before {
      display: inline-block;
      transform: rotateZ(180deg);
    }
  }

  .n-button {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-25%);
    border: none;
    height: auto;
    padding: 11px 3.5px;
    line-height: 1;
    background-color: rgb(0, 0, 0, 0.06);
    color: rgb(0, 0, 0, 0.3);
    i::before {
      display: inline-block;
      transform: scaleX(0.9);
    }
    &:hover {
      background-color: rgb(0, 0, 0, 0.15);
    }
    @include darkTheme {
      background-color: rgb(255, 255, 255, 0.06);
      color: rgb(255, 255, 255, 0.3);
      &:hover {
        background-color: rgb(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
