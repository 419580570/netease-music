<template>
  <span
    class="n-button"
    :class="{ disabled: disabled, 'red-theme': theme === 'ofRed' }"
    :style="{ fontSize: size }"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "14px",
    },
    theme: {
      type: String,
      default: "default"
    }
  },
};
</script>
