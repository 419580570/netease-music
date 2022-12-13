<template>
  <Table v-bind="$attrs" class="table-wrapper">
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
    <template #time="{ dt }">
      <span class="time">{{ convertTime(dt) }}</span>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import SongTag from "@/components/songTag/index.vue";
import NameGroup from "@/components/nameGroup/index.vue";
import NameAlia from "@/components/nameAlia/index.vue";

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

  .namegroupWrapper {
    width: calc(100% - 10px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    font-size: 13px;
    letter-spacing: 0.5px;
    @include font-color-desc();
  }
}
</style>
