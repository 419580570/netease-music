import { musicGetters, musicActions, musicStore } from "@/hooks/store";
import util from "@/hooks/util";
import { random } from "@/util";
import { NNotify as notify } from "ui";
const { getStorage, addStorage } = util();
const { changeSong, toggleCutSongWay } = musicActions();
export default function cutSong() {
  const cutway = ref(getStorage("cutway") || "liebiaoxunhuan");
  const loop = ref(false);
  interface chain {
    prev: chain | null;
    val: number;
    next: chain | null;
  }
  let chain: chain | null = null;
  const togglePlayMode = () => {
    switch (cutway.value) {
      case "liebiaoxunhuan":
        cutway.value = "danquxunhuan";
        notify({
          duration: 1000,
          position: "bottom",
          message: "单曲循环",
          size: 12,
          offsetX: -105,
          offsetY: 60,
          style: {
            padding: "7px 32px",
            borderRadius: "15px",
          },
        });
        break;
      case "danquxunhuan":
        cutway.value = "suijibofang";
        notify({
          duration: 1000,
          position: "bottom",
          message: "随机播放",
          size: 12,
          offsetX: -105,
          offsetY: 60,
          style: {
            padding: "7px 32px",
            borderRadius: "15px",
          },
        });
        break;
      case "suijibofang":
        cutway.value = "shunxubofang";
        notify({
          duration: 1000,
          position: "bottom",
          message: "顺序播放",
          size: 12,
          offsetX: -105,
          offsetY: 60,
          style: {
            padding: "7px 32px",
            borderRadius: "15px",
          },
        });
        break;
      case "shunxubofang":
        cutway.value = "liebiaoxunhuan";
        notify({
          duration: 1000,
          position: "bottom",
          message: "列表循环",
          size: 12,
          offsetX: -105,
          offsetY: 60,
          style: {
            padding: "7px 32px",
            borderRadius: "15px",
          },
        });
        break;
    }
  };
  const last = () => {
    if (cutway.value === "suijibofang") {
      if (chain!.prev) {
        chain = chain!.prev;
      } else {
        let ran = random(0, musicStore.playlist.length);
        while (ran === chain!.val) {
          ran = random(0, musicStore.playlist.length);
        }
        const o = {
          prev: null,
          val: ran,
          next: chain,
        };
        chain!.prev = o;
        chain = o;
      }
      changeSong(chain.val, true);
    } else {
      changeSong("last");
    }
  };
  const next = () => {
    if (cutway.value === "suijibofang") {
      if (chain!.next) {
        chain = chain!.next;
      } else {
        let ran = random(0, musicStore.playlist.length);
        while (ran === chain!.val) {
          ran = random(0, musicStore.playlist.length);
        }
        const o = {
          prev: chain,
          val: ran,
          next: null,
        };
        chain!.next = o;
        chain = o;
      }
      changeSong(chain.val, true);
    } else {
      changeSong("next");
    }
  };
  watch(
    cutway,
    (val, oval) => {
      if (val !== oval) {
        toggleCutSongWay(val);
        addStorage("cutway", val);
        if (cutway.value === "suijibofang") {
          chain = {
            prev: null,
            val: musicStore.currentIndex!,
            next: null,
          };
          loop.value = false;
        } else if (cutway.value === "danquxunhuan") {
          loop.value = true;
          chain = null;
        } else {
          loop.value = false;
          chain = null;
        }
      }
    },
    { immediate: true }
  );

  return {
    cutway,
    loop,
    togglePlayMode,
    last,
    next,
  };
}
