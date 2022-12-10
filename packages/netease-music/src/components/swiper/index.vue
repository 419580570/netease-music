<template>
  <Carousel :carouselData="carouselData">
    <template #carouselItem="item">
      <img :src="item.pic" />
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
import type { carouselData } from "@/types/index";
const props = defineProps<{
  carouselData: Array<carouselData>;
}>();

async function imgClick(item: carouselData) {
  if (item.url === null) {
    // var id = item.encodeId;
    // const musicDetail = await request("GET", "song/detail", { ids: id });
    // if (item.typeTitle == "新歌首发") {
    //   this.$store.commit("addMusic", musicDetail.songs[0]);
    // } else if (item.typeTitle == "歌单") {
    //   this.$router.push("/playlistdetail/" + id + "/" + 0);
    // }
    return;
  }
  window.open(item.url);
}
// data() {
//   return {
//     result: [],
//   };
// },
// methods: {
//   async getbanner() {
//     const data = await request("GET", "homepage/block/page", {
//       refresh: true,
//     });
//     this.result = data.data.blocks[0].extInfo.banners;
//   },
// },
// computed: {
//   isred() {
//     return "rgb(204,74,74)";
//   },
//   isblue() {
//     return "rgb(74,121,204)";
//   },
// },
// }
</script>
