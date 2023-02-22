<template>
  <transition @after-leave="$emit('destroy')">
    <div class="n-notify" v-if="visible" :style="positionStyle">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, CSSProperties, onMounted, ref } from "vue";
import { notifyProps } from "./notification";

export default {
  name: "Notify",
  props: notifyProps,
  setup(props) {
    const visible = ref(true);
    const timer = ref();

    function startTimer() {
      timer.value ?? clearTimeout(timer.value);
      if (props.duration > 0) {
        timer.value = setTimeout(() => {
          if (visible.value) close();
        }, props.duration);
      }
    }
    function close() {
      visible.value = false;
    }
    const horizontalClass = computed(() =>
      props.position.endsWith("right") ? "right" : "left"
    );

    const verticalProperty = computed(() =>
      props.position.startsWith("top") ? "top" : "bottom"
    );

    const positionStyle = computed<CSSProperties>(() => {
      let style = {};
      if (props.appendTo) {
        style = {
          top: `${props.offsetY}px`,
          left: `${props.offsetX}px`,
        };
      }
      if (props.position.indexOf("-") === -1) {
        switch (props.position) {
          case "center":
            /* center */
            style = {
              top: `calc(50% + ${props.offsetY}px)`,
              left: `calc(50% + ${props.offsetX}px)`,
              transform: "translateX(-50%) translateY(-50%)",
            };
            break;
          case "top":
          case "bottom":
            style = {
              [props.position]: `${props.offsetY}px`,
              left: `calc(50% + ${props.offsetX}px)`,
              transform: "translateX(-50%)",
            };
            break;
          case "left":
          case "right":
            style = {
              [props.position]: `${props.offsetX}px`,
              top: `calc(50% + ${props.offsetY}px)`,
              transform: "translateY(-50%)",
            };
            break;
          default:
            style = {};
        }
      } else {
        style = {
          [verticalProperty.value]: `${props.offsetY}px`,
          [horizontalClass.value]: `${props.offsetX}px`,
        };
      }

      return { ...style, fontSize: props.size + "px", ...props.style };
    });

    onMounted(() => {
      startTimer();
    });

    return {
      visible,
      close,
      positionStyle,
    };
  },
};
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
