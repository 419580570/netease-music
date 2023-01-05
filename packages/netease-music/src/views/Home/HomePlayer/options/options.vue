<template>
  <div class="options">
    <div class="optionsWrapper" v-if="hasPlayList">
      <div class="quality">极高</div>
      <div class="options-item whale"></div>
      <div
        class="options-item"
        :class="{ mute: isMute, volume: !isMute }"
        @click="mute"
        @mouseover="handleMouseover"
        @mouseout="handleMouseout"
      >
        <div class="popoverWrapper" v-show="show">
          <div class="popover" ref="progress">
            <div class="progress">
              <div
                class="progress-done"
                :style="{ '--percent': volume + '%' }"
                @mousedown="handleDragVolume($event)"
              ></div>
            </div>
          </div>
          <div class="append"></div>
        </div>
      </div>
      <div class="options-item together"></div>
      <div class="options-item list" @click="toggleSonglist($event)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicGetters, musicActions } from "@/hooks/store";
const { hasPlayList, volume, isMute } = musicGetters();
const { changeVolume, toggleMute } = musicActions();

const progress = ref<HTMLElement | null>(null);
const dragLength = ref(0);
const show = ref(false);
const keep = ref<number | null>(null);
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const mute = (e: Event) => {
  if ((e.target as any).className.includes("options-item")) {
    if (!isMute.value) {
      keep.value = volume.value;
      changeVolume(0);
    } else if (keep.value) {
      changeVolume(keep.value);
    }
    toggleMute(!isMute.value);
  }
};

watchEffect(() => {
  if (!progress.value || !show.value) return;
  nextTick(() => {
    dragLength.value = Number(
      (100 / (progress.value!.firstChild! as any).offsetHeight).toFixed(2)
    );
  });
});

const toggleSonglist = (e: Event) => {
  let val = props.modelValue;
  emit("update:modelValue", !val);
  // showPlaylist.value = !showPlaylist.value;
  function close(_e: Event) {
    const player = document.querySelector(".n-player");
    if (player?.contains(_e.target as any)) return;

    emit("update:modelValue", false);
    // showPlaylist.value = false;
    document.removeEventListener("click", close);
  }
  if (!val) {
    document.addEventListener("click", close);
  } else {
    document.removeEventListener("click", close);
  }
};

const handleDragVolume = (e: MouseEvent) => {
  if (!e.target) return;
  function drag(ed: any) {
    let percent = volume.value;
    keep.value = null;
    percent += -(0.8 * ed.movementY) * dragLength.value;
    if (percent < 0) {
      percent = 0;
    }
    if (percent > 100) {
      percent = 100;
    }
    toggleMute(percent ? false : true);
    changeVolume(percent);
  }
  function nodrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", nodrag);
  }
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", nodrag);
};

const handleMouseover = () => {
  show.value = true;
};
const handleMouseout = () => {
  show.value = false;
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
@mixin filter() {
  [data-theme="coDark"] & {
    &::after {
      filter: invert(0.88) brightness(115%);
    }

    &:not(.together, .whale) {
      &:hover::after {
        filter: invert(0.92) brightness(155%);
      }
    }
  }
}
.options {
  flex: 1;
  padding: 12px;
  .optionsWrapper {
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    .quality {
      border: 1px solid;
      border-radius: 2px;
      font-size: 13px;
      height: 16px;
      line-height: 14px;
      margin-right: 20px;
      padding: 0px 3px 0 2px;
      @include red_custom("color");
      @include red_custom("border-color");
    }
    .options-item {
      @include filter();
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
      }
      margin-right: 21px;
      cursor: pointer;
      position: relative;
      .popoverWrapper {
        // pointer-events: none;
        width: 50px;
        height: 115px;
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        transform: translateY(-100%) translateX(-35%);
        .popover,
        .append {
          background-color: rgb(255, 255, 255);
        }
        [data-theme="coDark"] & {
          .popover,
          .append {
            background-color: rgb(37, 37, 37);
            border: 1px solid rgb(59, 59, 59);
            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0, 0.5);
          }
          .append {
            box-shadow: none;
          }
        }
        .popover {
          width: 30px;
          height: 87%;
          margin: 0 auto;
          border-radius: 3px;
          // pointer-events: fill;
          box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: default;
          .progress {
            width: 4px;
            height: 75px;
            border-radius: 4px;
            position: relative;
            display: flex;
            @include themeify {
              background-color: themed("carousel-button");
            }
            &-done {
              position: relative;
              align-self: flex-end;
              width: 4px;
              height: var(--percent);
              border-radius: 4px;
              pointer-events: none;
              @include red_custom();
              &::after {
                --percent: inherit;
                pointer-events: visible;
                cursor: pointer;
                content: "";
                width: 10px;
                height: 10px;
                border-radius: 50%;
                position: absolute;
                z-index: 10;
                top: 0;
                transform: translateX(-50%) translateY(-50%);
                left: 50%;
                @include red_custom();
              }
            }
          }
        }
        .append {
          width: 10px;
          height: 10px;
          margin: 0 auto;
          border-radius: 3px;
          transform: translateY(-55%) rotateZ(45deg);
          border-left: none !important;
          border-top: none !important;
          box-shadow: 2px 2px 7px 0px rgb(0, 0, 0, 0.1);
        }
      }
    }
    .list {
      width: 16px;
      height: 16px;
      margin-right: 12px;
      &::after {
        background-image: url("/src/assets/img/list.png");
      }
    }
    .together {
      width: 21px;
      height: 19px;
      &::after {
        background-image: url("/src/assets/img/together.png");
      }
    }
    .volume {
      width: 15px;
      height: 20px;
      margin-right: 24px;
      &::after {
        background-image: url("/src/assets/img/volume.png");
      }
    }
    .mute {
      width: 18px;
      height: 20px;
      // .progress-done {
      //   height: 0% !important;
      // }
      &::after {
        background-image: url("/src/assets/img/mute.png");
      }
    }
    .whale {
      width: 20px;
      height: 18px;
      &::after {
        background-image: url("/src/assets/img/whale.png");
      }
    }
  }
}
</style>
