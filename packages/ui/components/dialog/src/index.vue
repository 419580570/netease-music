<template>
  <teleport to="body">
    <div class="n-dialog" v-if="props.show">
      <div
        class="n-dialog-content"
        :style="{
          width: props.width,
          height: props.height,
        }"
        ref="dialog"
      >
        <span @click="closeDialog" class="closeButton" title="关闭窗体">
          <span style="--r: -45deg"></span>
          <span style="--r: 45deg"></span>
        </span>
        <slot></slot>
        <div class="move" @mousedown="handleMouseDown"></div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
export default {
  name: "Dialog",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["update:show"]);
interface Props {
  width?: string;
  height?: string;
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "500px",
  height: "250px",
  show: false,
});

const dialog: any = ref(null);

const closeDialog = () => {
  emit("update:show", false);
};

const handleMouseDown = (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  const left = Number(dialog.value.style.left.slice(0, -2));
  const top = Number(dialog.value.style.top.slice(0, -2));
  document.onmousemove = (ev: MouseEvent) => {
    let moveX;
    let moveY;
    if (ev.clientX <= e.offsetX) {
      moveX = e.offsetX - x;
    } else if (
      document.body.clientWidth - ev.clientX <=
      Number(props.width.slice(0, -2)) - e.offsetX
    ) {
      moveX =
        document.body.clientWidth -
        Number(props.width.slice(0, -2)) +
        e.offsetX -
        x;
    } else {
      moveX = ev.clientX - x;
    }
    if (ev.clientY <= e.offsetY + 60) {
      moveY = e.offsetY + 60 - y;
    } else if (
      document.body.clientHeight - ev.clientY <=
      Number(props.height.slice(0, -2)) - e.offsetY
    ) {
      moveY =
        document.body.clientHeight -
        Number(props.height.slice(0, -2)) +
        e.offsetY -
        y;
    } else {
      moveY = ev.clientY - y;
    }
    dialog.value.style.left = `${left + moveX}px`;
    dialog.value.style.top = `${top + moveY}px`;
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
</script>
