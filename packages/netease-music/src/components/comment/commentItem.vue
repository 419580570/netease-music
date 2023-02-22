<template>
  <div class="commentItem" @dblclick="deletecomment">
    <div class="avatar">
      <img :src="data.user.avatarUrl" />
      <img
        class="identityIcon"
        v-if="data.user.avatarDetail"
        :src="data.user.avatarDetail?.identityIconUrl"
      />
    </div>
    <div class="info">
      <div class="content">
        <div class="name hover">
          {{ data.user.nickname }}
          <img
            class="vipIcon"
            :src="data.user.vipRights.associator.iconUrl"
            v-if="data.user.vipRights && data.user.vipRights.associator"
          />：
        </div>
        <div class="comment" v-html="parseEmoji(data.content)"></div>
      </div>
      <div class="beReplied" v-if="data.beReplied && data.beReplied.length">
        <span class="beReplied-user hover">
          @{{ data.beReplied[0].user.nickname }}：
        </span>
        <span
          class="beReplied-content"
          v-html="parseEmoji(data.beReplied[0].content)"
        >
        </span>
      </div>
      <div class="time-operate">
        <span class="time">{{ parseTimeStamp(data.time) }}</span>
        <div class="operate">
          <span class="dianzan hover" @click="like(isLike ? 0 : 1)">
            <Icon type="dianzan-fill" v-show="isLike" :size="17"></Icon>
            <Icon type="dianzan-outline" v-show="!isLike" :size="17"></Icon>
            <span class="likedCount" v-show="likeCount">{{ likeCount }}</span>
          </span>
          <span class="split">|</span>
          <Icon type="fenxiang1" :size="13" class="hover"></Icon>
          <span class="split">|</span>
          <Icon type="pinglun" :size="13" class="hover"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteComment, commentLike } from "@/network/methods";
import { musicGetters } from "@/hooks/store";
import { useProfileStore } from "@/store";
import type { CommentItem } from "@/types";
import { createLoginWindow, parseTimeStamp } from "@/util";
import { parseEmoji } from "./emojiMap";
const profile = useProfileStore();
const { currentId } = musicGetters();

const props = defineProps<{ data: CommentItem }>();
const emit = defineEmits(["deleteComment"]);
const isLike = ref(props.data.liked);
const likeCount = ref(props.data.likedCount);

const like = (t: 0 | 1) => {
  if (!profile.isLogin) {
    createLoginWindow();
    return;
  }
  commentLike({
    id: currentId.value,
    cid: props.data.commentId,
    t,
    type: 0,
  }).then((res: any) => {
    if (res.code === 200) {
      isLike.value = !!t;
      likeCount.value += !!t ? 1 : -1;
    }
  });
};

/* 暂时双击删除 */
const deletecomment = () => {
  props.data.user.userId === profile.profile.userId &&
    deleteComment({
      type: 0,
      id: currentId.value,
      commentId: props.data.commentId,
    }).then((res: any) => {
      if (res.code === 200) {
        emit("deleteComment");
      }
    });
};
</script>

<style scoped lang="scss">
@import "@/assets/css/handle";
.commentItem {
  display: flex;
  // align-items: center;
  padding: 17px 0 15px;
  &:not(:last-child) {
    border-bottom: 1px solid;
  }
  @include split-line-shallow("border-color");
  .avatar {
    height: 100%;
    width: 50px;
    position: relative;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
    }
    .identityIcon {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      position: absolute;
      bottom: 2px;
      right: 10px;
      width: 15px;
      height: 15px;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    transform: translateY(-4px);
    .content {
      margin-bottom: 7px;
      .name {
        display: inline;
        font-size: 12px;
        cursor: pointer;
        @include font-color-blue();
        .vipIcon {
          width: 42px;
          height: 16px;
          transform: translateY(25%) scale(0.95);
        }
      }
      .comment {
        display: inline;
        font-size: 12px;
        @include font-color();
      }
    }
    .beReplied {
      // display: flex;
      // align-items: center;
      font-size: 12px;
      padding: 7px;
      line-height: 1.5;
      margin-bottom: 8px;
      border-radius: 6px;
      background-color: rgb(0, 0, 0, 0.05);
      [data-theme="coDark"] & {
        background-color: rgb(255, 255, 255, 0.04);
      }
      @include font-color-dark();
      &-user {
        cursor: pointer;
        @include font-color-blue();
      }
    }
    :deep(.emoji) {
      width: 17px;
      height: 17px;
      vertical-align: bottom;
      margin-left: 2px;
    }
    .time-operate {
      width: 100%;
      font-size: 12px;
      position: relative;
      .time {
        @include font-color-lyric();
        opacity: 0.7;
        [data-theme="coDark"] & {
          opacity: 0.9;
        }
      }
      .operate {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        @mixin operateColor {
          color: rgba(0, 0, 0, 0.8);
          &:hover {
            color: rgba(0, 0, 0, 1);
          }
          [data-theme="coDark"] & {
            color: rgba(255, 255, 255, 0.5);
            &:hover {
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
        .fenxiang1,
        .pinglun {
          cursor: pointer;
          @include operateColor;
        }
        .dianzan {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 12px;
          @include operateColor;
        }
        .likedCount {
          margin-left: 2px;
        }
        .dianzan-fill {
          @include red_custom("color");
        }
        .split {
          width: 1px;
          padding-bottom: 3px;
          margin: 0 13px;
          @include font-color-lyric();
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
