<template>
  <slot name="reference"></slot>
  <div
    ref="defaults"
    class="n-popover"
    v-if="!disable"
    v-show="showPopover"
    :class="$attrs.class"
    @click.stop
    @mouseover.stop
    :style="{
      width: wrapperWidth,
      height: wrapperHeight,
      left: move,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
import { popoverProps } from "./popover";

export default defineComponent({
  name: "Popover",
  props: popoverProps,
  setup(props) {
    const {
      width: wrapperWidth,
      height: wrapperHeight,
      keepShow: keep,
      trigger,
      disable,
    } = toRefs(props);
    const reference = ref<HTMLElement | null>(null);
    const defaults = ref<HTMLElement | null>(null);

    const triggerWay = trigger.value as keyof HTMLElementEventMap;
    const showPopover = ref(false);
    const move = ref("0px");

    /* 点击切换显隐 */
    const toggle = () => {
      const close = e => {
        if (parent.contains(e.target)) return;
        showPopover.value = false;
      };
      (!keep.value || !showPopover.value) &&
        (showPopover.value = !showPopover.value);
      if (showPopover.value) {
        document.addEventListener(triggerWay, close);
      } else {
        document.removeEventListener(triggerWay, close);
      }
    };
    let parent;

    onMounted(() => {
      if (disable.value) return;
      try {
        parent = defaults.value!.parentElement!;
        move.value = `-${
          (Number(wrapperWidth.value.slice(0, -2)) || 0) / 2 -
          parent.offsetWidth / 2
        }px`;
        parent.addEventListener(triggerWay, toggle);
      } catch (e) {
        console.warn("popover使用方式错误");
      }
    });

    watch(disable, value => {
      if (value) return;
      try {
        nextTick(() => {
          parent = defaults.value!.parentElement!;
          move.value = `-${
            (Number(wrapperWidth.value.slice(0, -2)) || 0) / 2 -
            parent.offsetWidth / 2
          }px`;
          parent.addEventListener(triggerWay, toggle);
        });
      } catch (e) {
        console.warn("popover使用方式错误");
      }
    });

    onBeforeUnmount(() => {
      if (disable.value) return;
      parent.removeEventListener(triggerWay, toggle);
    });

    return {
      wrapperWidth,
      wrapperHeight,
      reference,
      defaults,
      showPopover,
      move,
    };
  },
});
</script>
