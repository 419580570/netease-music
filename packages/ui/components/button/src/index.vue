<template>
  <span
    class="n-button"
    :class="{ disabled: disabled, 'red-theme': theme === 'ofRed' }"
    :style="{ fontSize: size }"
    @click="handleClick"
  >
    <span class="n-button__content"><slot></slot></span>
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
      default: "default",
    },
  },
  setup(props, { emit }) {
    const handleClick = () => {
      !props.disabled && emit("handleClick");
    };

    return {
      handleClick,
    };
  },
};
</script>
