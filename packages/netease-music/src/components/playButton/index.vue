<template>
  <span class="play-button" v-bind="$attrs" @click="handleClick"
    ><Icon type="you"></Icon
  ></span>
</template>

<script lang="ts" setup>
const emit = defineEmits(["playAllButtonClick"]);
const handleClick = () => {
  emit("playAllButtonClick");
};
</script>

<style scoped lang="scss">
.play-button {
  width: 30px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(245, 245, 244);
  transition: all 0.8s ease-out;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .you::before {
    color: rgb(236, 65, 65);
    font-size: 13px;
    text-align: center;
    position: relative;
    left: 1.5px;
  }
}
</style>
