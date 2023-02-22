<template>
  <div class="player" :class="{ no: !hasPlayList }">
    <div class="player-button">
      <Icon :type="cutway" @click="togglePlayMode"></Icon>
      <Icon type="shangyishou" @click="last"></Icon>
      <Icon
        :type="isplay ? 'zanting' : 'bofang'"
        @click="toggle(undefined)"
      ></Icon>
      <Icon type="xiayishou" @click="next"></Icon>
      <span class="ci">词</span>
    </div>
    <div class="player-progress">
      <div class="currentTime">{{ loading ? "00:00" : time.playTime }}</div>
      <div class="progress" @mousedown="jump">
        <div
          class="progress-loading"
          :style="{ '--loaded': !hasPlayList ? '100%' : loaded }"
        ></div>
        <div
          class="progress-done"
          :style="{ '--width': loading || !hasPlayList ? '0%' : sper }"
        ></div>
        <audio
          :src="url"
          :loop="loop"
          :muted="musicStore.isMute"
          preload="auto"
          @timeupdate="update"
          @ended="ended"
          @progress="progress"
          @playing="playing"
          @error="error"
          ref="audio"
        ></audio>
      </div>
      <div class="totalTime">{{ time.totalTime }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicGetters, musicStore } from "@/hooks/store";
import useCutSong from "./useCutSong";
import usePlay from "./usePlay";
const { hasPlayList } = musicGetters();
const { cutway, togglePlayMode, last, next, loop } = useCutSong();
const {
  url,
  isplay,
  audio,
  time,
  sper,
  loaded,
  loading,
  toggle,
  update,
  ended,
  jump,
  progress,
  playing,
  error,
} = usePlay(next, cutway);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.player {
  flex-basis: 420px;
  height: 100%;
  &-button {
    display: flex;
    height: 55px;
    width: 225px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    @include font-color();
    .liebiaoxunhuan {
      font-size: 14px;
    }

    .danquxunhuan {
      font-size: 14px;
    }
    .suijibofang {
      font-size: 14px;
    }
    .shunxubofang {
      transform: scaleY(90%);
      &::before {
        display: inline-block;
        font-size: 14px;
      }
    }

    .shangyishou,
    .xiayishou {
      font-size: 20px;
    }
    .ci {
      font-size: 13px;
    }
    .liebiaoxunhuan,
    .shangyishou,
    .xiayishou,
    .danquxunhuan,
    .suijibofang,
    .shunxubofang,
    .ci {
      &:hover {
        cursor: pointer;
        @include red_custom("color");
      }
    }
    .bofang,
    .zanting {
      font-size: 21px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      @include themeify {
        background-color: themed("play-button-bg");
      }
      &:hover {
        @include themeify {
          background-color: themed("carousel-button");
        }
      }
      &::before {
        display: inline-block;
        transform: translateX(1px);
      }
    }
    .zanting {
      font-size: 20px;
      &::before {
        display: inline-block;
        transform: translateX(-0.5px);
      }
    }
  }
  &-progress {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    .currentTime {
      width: 27px;
    }
    .currentTime,
    .totalTime {
      @include font-color-desc();
      font-size: 11.5px;
      transform: translateY(-30%);
    }
    .progress {
      width: 350px;
      height: 2.5px;
      position: relative;
      cursor: pointer;
      &:hover {
        height: 5px;
        transform: translateY(-25%);
        border-radius: 3px;
        .progress-loading,
        .progress-done {
          border-radius: 3px;
        }
        // overflow: hidden;
        .progress-done::after {
          display: inline-block;
        }
      }
      @include themeify {
        background-color: themed("carousel-button");
      }
      &-loading {
        pointer-events: none;
        width: var(--loaded);
        height: 100%;
        @include themeify {
          background-color: themed("play-progress-do");
        }
      }
      &-done {
        pointer-events: none;
        width: var(--width);
        height: 100%;
        position: absolute;
        top: 0;
        @include red_custom();
        &::after {
          pointer-events: all;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%) translateX(50%);
          display: none;
          @include red_custom();
        }
      }
    }
  }
  &.no {
    pointer-events: none;
    opacity: 0.5;
    .currentTime,
    .totalTime {
      visibility: hidden;
    }
  }
}
</style>
