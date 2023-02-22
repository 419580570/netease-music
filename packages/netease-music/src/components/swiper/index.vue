<template>
  <Carousel :carouselData="carouselData" v-bind="$attrs">
    <template #carouselItem="item">
      <img :src="item.pic" @click="imgClick(item)" />
      <div
        class="text"
        :style="{
          backgroundColor:
            item.titleColor === 'red' ? 'rgb(204,74,74)' : 'rgb(74,121,204)',
        }"
      >
        {{ item.typeTitle }}
      </div>
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
import { musicStore } from "@/hooks/store";
import { getSongDetail } from "@/network/methods";
import type { carouselData } from "@/types/index";
import { extractFromSongDetail } from "@/util";
defineProps<{
  carouselData: Array<carouselData>;
}>();
const router = useRouter();

async function imgClick(item: carouselData) {
  if (item.url) {
    window.open(item.url);
  } else {
    if (item.typeTitle == "新歌首发" || item.typeTitle == "热歌推荐") {
      getSongDetail([item.targetId]).then((res: any) => {
        const song = extractFromSongDetail(
          res.songs,
          res.privileges,
          "",
          "banner"
        )[0];
        musicStore.addSong(song);
      });
    } else if (item.typeTitle == "歌单") {
      router.push(`/songlist/${item.targetId}`);
    }
  }
}
</script>
