<script lang="ts">
import { h, ref } from "vue";

export default {
  name: "Table",
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
  },
  setup(props, { slots }) {
    if (!props.data || !slots) return () => null;
    const activeLine = ref(0);
    const lineClick = id => {
      activeLine.value = id;
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
    const unifiedIndex = index => {
      if (index < 10) {
        return `0${index}`;
      }
      return `${index}`;
    };
    return () =>
      h("div", { class: "n-table" }, [
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
                }`,
                onClick: () => lineClick(item.id),
              },
              [
                props.lineIndex &&
                  h("span", { class: "index" }, unifiedIndex(index + 1)),
                ...props.format?.map(format =>
                  h(
                    "div",
                    {
                      class: "n-table-content__line__item",
                      style: { width: format.width },
                    },
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

<style scoped lang="scss"></style>
