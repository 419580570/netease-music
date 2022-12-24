<template>
  <i class="n-icon" :style="style" :class="type"></i>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from "vue";
import { iconProps } from "./icon";

export default defineComponent({
  name: "Icon",
  props: iconProps,
  setup(props) {
    const style = computed<CSSProperties>(() => {
      const { size, color } = props;
      if (!size && !color) return {};

      return {
        fontSize: size ? size + "px" : undefined,
        color: color,
      };
    });

    return {
      style,
    };
  },
});
</script>
