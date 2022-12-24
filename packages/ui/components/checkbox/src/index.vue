<template>
  <div class="n-checkbox">
    <label>
      <span class="n-checkbox__input">
        <input
          class="n-checkbox__original"
          @change="handleChange"
          type="checkbox"
          :checked="modelValue"
        />
        <span
          class="n-checkbox__inner"
          :class="{ 'is-checked': modelValue }"
        ></span>
      </span>
      <span class="n-checkbox__label">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: "Checkbox",
  props: {
    label: String,
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  // emits: ["update:modelValue"],
  setup(props, { emit }) {
    const handleChange = e => {
      emit("update:modelValue", e.target.checked);
    };

    return {
      handleChange,
    };
  },
};
</script>
