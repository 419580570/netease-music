<template>
  <Loading :isLoading="isLoading" class="Loading">
    <div class="recommend">
      <Swiper :carouselData="homeData.HomepageBanner"> </Swiper>
      <div class="recommendItem">
        <p class="hover">推荐歌单<Icon type="prev"></Icon></p>
        <List
          :data="homeData.HomepageBlockPlaylistRcmd"
          :fixed="5"
          :playButton="true"
          @contentClick="toDetail"
          @playAllButtonClick="handleClick"
        />
      </div>
      <div class="recommendItem">
        <p class="hover">独家放送<Icon type="prev"></Icon></p>
        <List
          :data="homeData.HomepagePrivateContent"
          :fixed="3"
          :playButton="false"
        >
          <Icon class="privateContent-button" type="you"></Icon>
        </List>
      </div>
      <div class="recommendItem">
        <p class="hover">最新音乐<Icon type="prev"></Icon></p>
        <NewSong :data="homeData.HomepageNewSong"></NewSong>
      </div>
      <div class="recommendItem">
        <p class="hover">推荐mv<Icon type="prev"></Icon></p>
        <List
          class="mv-list"
          :data="homeData.HomepageRCMV"
          :play-button="false"
          :minWidth="240"
          :maxLine="1"
        >
          <template #other="item">
            <NameGroup
              :ar="(item.item as unknown as rcMVData).artists"
            ></NameGroup>
          </template>
        </List>
      </div>
    </div>
  </Loading>
</template>

<script lang="ts" setup>
import List from "@/components/list/index.vue";
import Swiper from "@/components/swiper/index.vue";
import NewSong from "./newSong.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import {
  getCarouselData,
  geNewSong,
  getPrivatecontent,
  getRecommendData,
  getDailyRecommend,
  getSongDetail,
  getrcMV,
} from "@/network/methods";
import type {
  homeDataType,
  rcMVData,
  recommendData,
  songDetail,
} from "@/types/index";
import { extractFromSongDetail } from "@/util";
import { useProfileStore } from "@/store";
import daily from "@/assets/img/daily.png";

import util from "@/hooks/util";

const router = useRouter();
const profile = useProfileStore();
const { debounce } = util();

const homeData: homeDataType = reactive({
  /* 首页轮播图数据 */
  HomepageBanner: [],
  /* 首页推荐数据 */
  HomepageBlockPlaylistRcmd: [],
  /* 独家放送 */
  HomepagePrivateContent: [],
  /* 最新音乐 */
  HomepageNewSong: [],
  /* 推荐MV */
  HomepageRCMV: [],
});
/* 加载中 */
let isLoading = ref(true);

const getData = () => {
  isLoading.value = true;
  let promises = [
    getCarouselData(),
    profile.isLogin ? getDailyRecommend() : getRecommendData(10),
    getPrivatecontent(),
    geNewSong(),
    getrcMV(),
  ];

  Promise.allSettled(promises).then((results: any) => {
    try {
      results.forEach((result: any, index: number) => {
        switch (index) {
          case 0:
            if (result.value.code !== 200) return;
            homeData.HomepageBanner = result.value.banners.map((item: any) => {
              return {
                pic: item.pic || item.imageUrl,
                titleColor: item.titleColor,
                url: item.url,
                encodeId: item.encodeId,
                typeTitle: item.typeTitle,
                targetId: item.targetId,
              };
            });
            break;
          case 1:
            if (result.value.code !== 200) return;
            const res = result.value[profile.isLogin ? "recommend" : "result"]
              .slice(0, 9)
              .map((item: any) => {
                return {
                  id: item.id,
                  name: item.name,
                  picUrl: item.picUrl,
                  playCount: item.playCount || item.playcount,
                };
              });
            res.unshift({
              id: 1,
              name: "每日歌曲推荐",
              picUrl: daily,
              copywriter: "根据您的音乐口味生成每日更新",
            });
            homeData.HomepageBlockPlaylistRcmd = res;
            break;
          case 2:
            if (result.value.code === 200) {
              homeData.HomepagePrivateContent = result.value.result.map(
                (item: any) => ({
                  name: item.name,
                  picUrl: item.sPicUrl,
                })
              );
            }
            break;
          case 3:
            const data = result.value.data
              .slice(0, 12)
              .map((item: any) => item.id);
            getSongDetail(data).then((res: any) => {
              if (res.code === 200) {
                homeData.HomepageNewSong = extractFromSongDetail(
                  res.songs,
                  res.privileges
                );
              }
            });
            break;
          case 4:
            if (result.value.code === 200) {
              homeData.HomepageRCMV = result.value.result.map((item: any) => ({
                id: item.id,
                name: item.name,
                picUrl: item.picUrl + "?param=418y235",
                playCount: item.playCount,
                artists: item.artists,
                copywriter: item.copywriter,
              }));
            }
            break;
        }
      });
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
    }
  });
};

function toDetail(item: any) {
  router.push(`/songlist/${item.id}`);
}

function handleClick(item: recommendData) {
  router.push(`/songlist/${item.id}`);
  console.log(item);
}

// watch(
//   () => profile.isLogin,
//   () => {
//     getData();
//   }
// );

/* 等判断登录成功 */
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.Loading {
  height: 200px;
}
.recommend {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  .recommendItem {
    margin-bottom: 35px;
    p {
      display: inline-block;
      font-weight: 600;
      font-size: 20px;
      @include font-color();
      margin-bottom: 10px;
      i {
        margin-left: 5px;
        font-size: 17px;
      }
    }
    .privateContent-button {
      position: absolute;
      top: 7px;
      left: 7px;
      border-radius: 50%;
      text-align: center;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      height: 22px;
      width: 22px;
      font-size: 11px;
      line-height: 22px;
      border: 0.5px solid rgba(255, 255, 255, 0.5);
      color: #fff;
      &::before {
        position: relative;
        left: 1px;
        top: 1px;
      }
    }
    &:last-child {
      margin-bottom: 100px;
    }
    .mv-list {
      :deep(.n-list-item) {
        min-width: 0;
      }
      :deep(.n-list-item__title) {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 0;
      }
    }
  }
}
</style>
