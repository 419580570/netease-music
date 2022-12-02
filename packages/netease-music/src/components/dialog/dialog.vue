<template>
  <div>
    <teleport to="body">
      <div
        class="m-dialog"
        :style="{ width: props.width, height: props.height }"
        ref="mDialog"
        v-if="props.show"
        @mousedown="handleMouseDown"
      >
        <span @click="closeDialog" class="closeButton" title="关闭窗体">
          <span style="--r: -45deg"></span>
          <span style="--r: 45deg"></span>
        </span>
        <slot></slot>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
export default {
  name: "Mdialog",
};
</script>

<script lang="ts" setup>
const emit = defineEmits(["update:show"]);
interface Props {
  width?: string;
  height?: string;
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100px",
  height: "100px",
  show: false,
});

const mDialog: any = ref(null);

const closeDialog = () => {
  emit("update:show", false);
};

const handleMouseDown = (e: MouseEvent) => {
  /* 限制拖拽区域在对话框的上方40px */
  if (e.offsetY > 40 || (e.target as Element).className !== "login-info")
    return;
  let moveX: number | null = 0;
  let moveY: number | null = 0;
  let x = mDialog.value.style.left.slice(11, -3);
  let y = mDialog.value.style.top.slice(11, -3);
  moveX = x ? x * 1 : 0;
  moveY = y ? y * 1 : 0;
  document.onmousemove = (ev: MouseEvent) => {
    moveX = (moveX as number) + ev.movementX;
    moveY = (moveY as number) + ev.movementY;
    mDialog.value.style.left = `calc(50% + ${moveX}px)`;
    mDialog.value.style.top = `calc(50% + ${moveY}px)`;
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    moveX = moveY = null;
  };
};
</script>

<style scoped lang="scss">
.m-dialog {
  box-shadow: 0 0 15px 0 rgb(185, 183, 183);
  position: absolute;
  top: calc(50% + 0px);
  left: calc(50% + 0px);
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  .closeButton {
    position: absolute;
    right: 18px;
    top: 8px;
    cursor: pointer;
    &:hover {
      span {
        background-color: rgb(36, 36, 36);
      }
    }
    span {
      width: 1px;
      height: 19px;
      background-color: rgb(130, 128, 128);
      position: absolute;
      transform: rotateZ(var(--r));
      transform-origin: 50% 50%;
    }
  }
}
</style>
