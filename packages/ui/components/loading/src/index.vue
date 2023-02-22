<script lang="ts">
import { h } from "vue";

export default {
  name: "Loading",
  props: { isLoading: { type: Boolean, default: false } },
  inheritAttrs: false,
  setup(props, { slots }) {
    if (!slots.default) return () => null;
    return () =>
      props.isLoading
        ? h("div", { class: "n-loading" }, [
            h(
              "svg",
              { width: "20", height: "20" },
              [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) =>
                h("line", {
                  class: "loadingLine",
                  key: index,
                  x1: "10",
                  y1: "1",
                  x2: "10",
                  y2: "6",
                  rx: "2",
                  ry: "2",
                  "stroke-width": "2px",
                  style: `--i: ${item}`,
                })
              )
            ),
            h("div", null, "加载中"),
          ])
        : slots.default!();
  },
};
</script>
