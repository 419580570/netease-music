<script lang="ts">
import { h, ref } from "vue";
import { NIcon as Icon } from "ui/components";

export default {
  name: "Table",
  emits: ["dbclick"],
  props: {
    data: Array,
    format: Array<{
      title: string;
      slotName: string;
      width: string;
      key?: Array<string>;
    }>,
    lineIndex: {
      type: Boolean,
      default: () => false,
    },
    showTitle: {
      type: Boolean,
      default: () => false,
    },
    currentPlay: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, emit }) {
    if (!props.data || !slots) return () => null;
    const activeLine = ref(0);
    const lineClick = id => {
      activeLine.value = id;
    };
    const lineDblclick = item => {
      emit("dbclick", item);
    };

    const extractKeyFromData = (keys, item) => {
      if (!keys) return undefined;
      const res = {};
      keys.forEach(key => {
        res[key] = item[key];
      });

      return res;
    };
    /* 统一索引格式 */
    const unifiedIndex = item => {
      if (props.currentPlay === item.id) {
        return h(Icon, { type: "laba", size: 15 });
      }
      const index = item.index + 1;
      if (index < 10) {
        return `0${index}`;
      }
      return `${index}`;
    };

    return () =>
      h("div", { class: "n-table" }, [
        props.showTitle &&
          h("div", { class: "n-table-head" }, [
            props.lineIndex && h("span", { class: "index" }),
            ...props.format?.map(format =>
              h(
                "span",
                {
                  class: "n-table-head__item",
                  style: { width: format.width },
                },
                format.title
              )
            )!,
          ]),
        h(
          "div",
          { class: "n-table-content" },
          props.data?.map((item: any, index: number) =>
            h(
              "div",
              {
                class: `n-table-content__line${
                  item.id === activeLine.value ? " active" : ""
                }${props.currentPlay === item.id ? " playing" : ""}`,
                onClick: () => lineClick(item.id),
                onDblclick: () => lineDblclick(item),
                key: index,
              },
              [
                props.lineIndex &&
                  h("span", { class: "index" }, unifiedIndex(item)),
                ...props.format?.map(format =>
                  h(
                    "div",
                    {
                      class: "n-table-content__line__item",
                      style: { width: format.width },
                    },
                    slots[format.slotName] &&
                      slots[format.slotName]!(
                        extractKeyFromData(format.key, item)
                      )
                  )
                )!,
              ]
            )
          )
        ),
      ]);
  },
};
</script>
