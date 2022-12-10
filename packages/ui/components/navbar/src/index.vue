<template>
  <ul class="n-navbar" :style="{ fontSize: size + 'px' }">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{
        currentRoute: currentRoute === item,
        enlargeActive: enlargeActive,
      }"
      @click="changeRoute(item, index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
export default defineComponent({
  name: "Navbar",
});
</script>
<script lang="ts" setup>
import { defineComponent, ref, withDefaults } from "vue";

const props = defineProps<{
  list: String[];
  size?: Number;
  enlargeActive?: Boolean;
}>()
const emits = defineEmits(["NavbarClick"]);
const currentRoute = ref(props.list[0]);

const changeRoute = (item: any, index: number) => {
  currentRoute.value = item;
  emits("NavbarClick", index);
};
</script>
