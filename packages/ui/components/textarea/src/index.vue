<template>
  <div class="n-textarea">
    <textarea
      spellcheck="false"
      placeholder="快来说点什么吧"
      @input="handleInput"
      ref="textarea"
    ></textarea>
    <div class="bottom" :class="{ overstep: surplusLength < 0 }">
      {{ surplusLength }}
    </div>
    <div class="special-word">
      <Icon type="jinhao" :size="19" @click="addPound()"></Icon>
      <Icon type="aite" :size="19" @click="addEite()"></Icon>
      <span>
        <Popover width="370px" :style="{ left: '70px', borderRadius: '5px' }">
          <template #reference>
            <Icon type="xiaolian" :size="16" #reference></Icon>
          </template>
          <EmojiList @handle-choose="addEmoji"></EmojiList>
        </Popover>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { NPopover as Popover } from "ui/components";
import EmojiList from "./emoji.vue";

export default {
  name: "Textarea",
  props: {
    maxLength: {
      type: Number,
      default: () => 140,
    },
  },
  emits: ["handleInput"],
  components: { EmojiList },
  setup(props, { emit }) {
    const contentLength = ref(0);
    const textarea = ref<HTMLTextAreaElement | null>(null);
    const handleInput = (e: any) => {
      emit("handleInput", e.target.value);
      if (!e.target.value) {
        contentLength.value = 0;
        return;
      }
      contentLength.value = Number(e.target.value.length);
    };

    const surplusLength = computed(() => {
      return props.maxLength - contentLength.value;
    });

    /* 添加话题 */
    const addPound = () => {
      if (!textarea.value) return;
      insertAtCaret(textarea.value, "#输入想说的话题#", 8, 1);
    };

    /* 添加@ */
    const addEite = () => {
      if (!textarea.value) return;
      insertAtCaret(textarea.value, "@");
    };

    /* 添加表情 */
    const addEmoji = (key: string) => {
      if (!textarea.value) return;
      insertAtCaret(textarea.value, `[${key}]`);
    };

    const insertAtCaret = (
      areaElement: HTMLInputElement | HTMLTextAreaElement,
      textFeildValue: string,
      startOffset: number = 0,
      endOffset: number = 0
    ) => {
      const textObj = areaElement;
      let start = 0;
      let end = 0;
      if (textObj.selectionStart && textObj.selectionEnd) {
        start = textObj.selectionStart!;
        end = textObj.selectionEnd!;
        var tempStr1 = textObj.value.substring(0, start);
        var tempStr2 = textObj.value.substring(end);
        textObj.value = tempStr1 + textFeildValue + tempStr2;
        var len = textFeildValue.length;
        start += len;
        end += len;
      } else {
        textObj.value += textFeildValue;
        start = end = textFeildValue.length;
        textObj.setSelectionRange(textFeildValue.length, textFeildValue.length);
      }
      textObj.focus();
      textObj.setSelectionRange &&
        textObj.setSelectionRange(start - startOffset, end - endOffset); // 移动光标到添加内容之后

      emit("handleInput", textObj.value);
      return true;
    };

    return {
      surplusLength,
      textarea,
      handleInput,
      addEite,
      addPound,
      addEmoji,
    };
  },
};
</script>
