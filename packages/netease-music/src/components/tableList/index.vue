<template>
  <Table
    v-bind="$attrs"
    class="table-wrapper"
    @dbclick="handleDbclick"
    :data="filterData"
    :currentPlay="currentId"
  >
    <template #play="item">
      <Icon
        :type="playState ? 'bofang' : 'zanting'"
        v-if="item.id && currentId === item.id"
      ></Icon
    ></template>
    <template #operate="item">
      <Icon type="xihuan" class="hover"></Icon>
      <Icon type="xiazai" class="hover"></Icon>
    </template>
    <template #name="item">
      <NameAlia :name="item.name" :alia="item.alia"></NameAlia>
      <SongTag :song="item" class="songTag"></SongTag>
    </template>
    <template #singer="{ ar }">
      <div class="namegroupWrapper">
        <NameGroup :ar="ar" class="namegroup"></NameGroup>
      </div>
    </template>
    <template #album="{ al }">
      <NameAlia
        :name="al.name"
        :alia="al.tns"
        class="namealia hover"
      ></NameAlia>
    </template>
    <template #jump="{ from }">
      <Icon type="lianjie" class="hover" @click="toDetail(from.id)"></Icon>
    </template>
    <template #time="{ dt }">
      <span class="time">{{ convertTime(dt) }}</span>
    </template>
  </Table>
  <Pagination
    :max="max"
    :total="data.length"
    @handlePagination="handlePagination"
  ></Pagination>
</template>

<script lang="ts" setup>
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import NameAlia from "@/components/nameAlia/index.vue";
import { songDetail } from "@/types";
// import { useMusicStore } from "@/store";
import { musicGetters } from "@/hooks/store";
const { playState, currentId } = musicGetters();
const router = useRouter();

// const musicStore = useMusicStore();
const props = withDefaults(
  defineProps<{ data: songDetail[]; max?: number }>(),
  {
    max: 50,
  }
);

const emit = defineEmits(["handleDbclick"]);

const currentPage = ref(0);
const filterData = computed(() => {
  if (!props.max) return props.data;
  return (
    props.data &&
    props.data.slice(
      props.max * currentPage.value,
      props.max * (currentPage.value + 1)
    )
  );
});

function addZero(num: number) {
  if (num < 10) return "0" + num;
  return num;
}
function convertTime(dt: number) {
  const time = dt / 1000;
  var min = parseInt(String(time / 60));
  var sec = parseInt(String(time - 60 * min));
  return addZero(min) + ":" + addZero(sec);
}

const handlePagination = (page: number) => {
  currentPage.value = page;
};

const handleDbclick = (item: songDetail) => {
  emit("handleDbclick", item);
};

const toDetail = (from: string) => {
  router.push(`/songlist/${from}`);
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.table-wrapper {
  :deep(.index) {
    @include font-color-desc();
  }
  .xihuan,
  .xiazai {
    cursor: pointer;
    margin-left: 6px;
    @include font-color-desc();
  }
  .xiazai {
    font-size: 16px;
  }
  .bofang,
  .zanting {
    font-size: 11px;
    @include red_custom("color");
  }
  .lianjie {
    font-size: 12px;
    margin-top: 3px;
    cursor: pointer;
    @include font-color-desc();
  }
  .namegroupWrapper {
    width: calc(100% - 10px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @include font-color-dark();
    :deep(.nameGroup) {
      .nameGroup-item {
        @include font-color-dark();
      }
    }
  }
  .songTag {
    margin-left: 5px;
    line-height: 0%;
  }
  .namealia {
    @include font-color-dark();
    cursor: pointer;
  }
  .time {
    font-size: 12px;
    // letter-spacing: 0.5px;
    @include font-color-number();
  }
}
.n-pagination {
  margin-top: 20px;
}
</style>
