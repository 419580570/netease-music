<template>
  <Loading :isLoading="isLoading" class="Loading">
    <div class="recommend">
      <HomeSwiper :carouselData="homeData.HomepageBanner"></HomeSwiper>
      <div class="recommendItem">
        <p>推荐歌单<i class="iconfont icon-prev"></i></p>
        <List :data="homeData.HomepageBlockPlaylistRcmd" @toDetail="toDetail" />
      </div></div
  ></Loading>
</template>

<script lang="ts" setup>
import HomeSwiper from "@/components/swiper/index.vue";
import List from "@/components/list/list.vue";
import { getCarouselData, getRecommendData } from "@/network/methods";
import type { homeDataType } from "@/types/index";

const router = useRouter();

const homeData: homeDataType = reactive({
  /* 首页轮播图数据 */
  HomepageBanner: [],
  /* 首页推荐数据 */
  HomepageBlockPlaylistRcmd: [],
});
/* 加载中 */
let isLoading = ref(true);

let promises = [getCarouselData(), getRecommendData({ limit: 10 })];

Promise.allSettled(promises).then((results: any) => {
  isLoading.value = false;
  results.forEach((result: any, index: number) => {
    switch (index) {
      case 0:
        homeData.HomepageBanner =
          result.value.data.blocks[0].extInfo.banners.map((item: any) => {
            return {
              pic: item.pic,
              titleColor: item.titleColor,
              url: item.url,
              encodeId: item.encodeId,
              typeTitle: item.typeTitle,
              targetId: item.targetId,
            };
          });
        break;
      case 1:
        homeData.HomepageBlockPlaylistRcmd = result.value.result.map(
          (item: any) => {
            return {
              highQuality: item.highQuality,
              id: item.id,
              name: item.name,
              picUrl: item.picUrl,
              playCount: item.playCount,
            };
          }
        );
      // console.log(homeData.HomepageBlockPlaylistRcmd);
    }
  });
});

function toDetail(id: string) {
  router.push(`/playlist/${id}`);
}
</script>

<style scoped lang="scss">
.Loading {
  height: 200px;
}
.recommend {
  display: flex;
  // justify-content: center;
  flex-direction: column;
  // align-items: center;
  max-width: 1100px;
  width: 100%;
  padding-bottom: 50px;
  .recommendItem {
    p {
      font-weight: 600;
      font-size: 20px;
      color: rgb(55, 55, 55);
      i {
        font-size: 19px;
      }
    }
  }
}
</style>
