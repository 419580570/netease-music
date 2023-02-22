<template>
  <Loading :isLoading="isLoading">
    <Table
      v-bind="$attrs"
      class="table-wrapper"
      @dbclick="handleDbclick"
      :data="filterData"
      :currentPlay="currentId"
      ref="tableContent"
    >
      <template #play="item">
        <Icon
          :type="playState ? 'bofang' : 'zanting'"
          v-if="item.id && currentId === item.id"
        ></Icon
      ></template>
      <template #operate="{ id }">
        <likeIcon class="hover" :id="id"></likeIcon>
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
        <Icon type="lianjie" class="hover" @click="toDetail(from)"></Icon>
      </template>
      <template #time="{ dt }">
        <span class="time">{{ convertTime(dt) }}</span>
      </template>
      <template #pop="{ pop }">
        <div class="pop" :style="{ '--pop': pop + '%' }"></div>
      </template>
    </Table>
  </Loading>
  <Pagination
    :max="max"
    :total="total || data.length"
    @handlePagination="handlePagination"
    v-show="!isLoading"
  ></Pagination>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script lang="ts" setup>
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import NameAlia from "@/components/nameAlia/index.vue";
import likeIcon from "@/components/likeIcon/index.vue";
import { songDetail } from "@/types";
import { musicGetters } from "@/hooks/store";
const { playState, currentId } = musicGetters();
const router = useRouter();

// const musicStore = useMusicStore();
const props = withDefaults(
  defineProps<{
    data: songDetail[];
    total?: number;
    max?: number;
    isAll?: boolean;
    isLoading?: boolean;
    keyword?: string;
  }>(),
  {
    total: 0,
    max: 50,
    isAll: false,
    isLoading: false,
    keyword: "",
  }
);

const emit = defineEmits(["handleDbclick", "handlePagination"]);
const currentPage = ref(0);
const tableContent = ref<any>(null);
const filterData = computed(() => {
  if (!props.max || !props.isAll) return props.data;
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
  emit("handlePagination", currentPage.value);
};

const handleDbclick = (item: songDetail) => {
  emit("handleDbclick", item);
};

const toDetail = (from: { id: string; name: string }) => {
  if (from.name === "搜索页") {
    router.push(`/search/${from.id}`);
  } else if (from.name === "banner") {
    router.push("/discover/recommend");
  } else {
    router.push(`/songlist/${from.id}`);
  }
};

/* 替换关键词 */
const replaceKeyword = () => {
  nextTick(() => {
    const dom1 = tableContent.value!.$el.querySelectorAll(".name");
    const dom2 = tableContent.value!.$el.querySelectorAll(".nameGroup-item");
    console.log(dom1, dom2);
    [...dom1, ...dom2].forEach(item => {
      item.innerHTML = item.innerHTML.replaceAll(
        props.keyword,
        `<span class="keyword">${props.keyword}</span>`
      );
    });
    // if (!dom) return;
  });
};

watch(
  [() => props.isLoading, () => props.keyword],
  ([load, keyword]) => {
    if (!load && keyword) {
      replaceKeyword();
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.table-wrapper {
  :deep(.index) {
    @include font-color-desc();
  }
  :deep(.keyword) {
    @include font-color-blue();
  }
  .xihuan,
  .xihuan-fill,
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
  .pop {
    height: 5px;
    border-radius: 3px;
    width: 100%;
    @include themeify {
      background-color: themed("carousel-button");
    }
    position: relative;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      height: 100%;
      width: var(--pop);
      background-color: rgb(202, 202, 202);
      @include darkTheme {
        background-color: rgb(68, 68, 68);
      }
    }
  }
}
.n-pagination {
  margin-top: 20px;
}
</style>
