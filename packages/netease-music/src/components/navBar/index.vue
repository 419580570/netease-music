<template>
  <ul class="navbar">
    <li
      v-for="item in list"
      :key="item.route"
      :class="{ currentRoute: currentRoute === item.path }"
      @click="changeRoute(item)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const router = useRouter();
const props = defineProps(["list"]);
const currentRoute = ref(props.list[0].path);

const changeRoute = (item: any) => {
  currentRoute.value = item.path || item.name;
  router.push(item.path ? { path: item.path } : { name: item.name, path: "" });
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  li {
    padding: 0 10px;
    color: $font-color-normal;
    cursor: pointer;
    &.currentRoute {
      font-size: 19px;
      font-weight: 600;
      position: relative;
      &::after {
        content: "";
        width: 62%;
        height: 2.5px;
        background-color: $nav-bar-bottom-color;
        position: absolute;
        bottom: -8px;
        left: 19%;
      }
    }
  }
}
</style>
