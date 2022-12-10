<script lang="ts">
import { computed, h, onMounted, ref } from "vue";

export default {
  name: "List",
  props: {
    data: Array,
    minWidth: {
      type: Number,
      default: 200,
    },
    gaph: {
      type: Number,
      default: 18,
    },
    gapv: {
      type: Number,
      default: 30,
    },
    fixed: {
      type: Number,
      validator(value: number) {
        return value >= 0;
      },
      default: 0,
    },
    maxLine: {
      type: Number,
      default: 0,
    },
    fall: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots }) {
    if (!props.data || !props.data.length || !slots.listItem) {
      return () => null;
    }
    const wrapper = ref<HTMLElement | null>(null);
    const numInLine = ref(props.fixed);

    /* 计算一行中可以包含几个item */
    const computeNumInline = () => {
      numInLine.value = Math.floor(
        (wrapper.value?.clientWidth! + props.gaph) /
          (props.minWidth + props.gaph)
      );
    };

    onMounted(() => {
      if (props.fixed) return;
      computeNumInline();
      let oldwidth = document.body.offsetWidth;
      window.onresize = e => {
        if (document.body.offsetWidth !== oldwidth) {
          oldwidth = document.body.offsetWidth;
          computeNumInline();
        }
      };
    });

    const list = computed(() => {
      const res: [][] = [];
      if (!numInLine.value) return [];
      const data = props.data! as any;
      for (var i = 0; i < data.length; i += numInLine.value) {
        if (props.maxLine && i >= props.maxLine * numInLine.value) {
          break;
        }
        const line = data.slice(i, i + numInLine.value);
        let gap;
        if ((gap = numInLine.value - line.length)) {
          for (let i = 0; i < gap; i++) {
            line.push({ hide: true });
          }
        }
        res.push(line);
      }

      return res;
    });
    return () =>
      h(
        "div",
        { class: "n-list", ref: wrapper },
        list.value.map(line =>
          h(
            "div",
            { class: "n-list-line", style: { "--gapv": `${props.gapv}px` } },
            line.map(item =>
              h(
                "div",
                {
                  class: "n-list-item",
                  style: {
                    "--gaph": `${props.gaph}px`,
                    visibility: (item as any).hide ? "hidden" : "visible",
                  },
                },
                [
                  slots.listItem &&
                    h(
                      "div",
                      {
                        class: `n-list-item__content${
                          (item as any).copywriter ? " fall" : ""
                        }`,
                        "data-fall": (item as any).copywriter,
                      },
                      slots.listItem(item)
                    ),
                  slots.title &&
                    h(
                      "div",
                      { class: "n-list-item__title" },
                      slots.title(item)
                    ),
                  slots.other &&
                    h(
                      "div",
                      { class: "n-list-item__other" },
                      slots.other(item)
                    ),
                ]
              )
            )
          )
        )
      );

    // slots.listItem!(item)
  },
};
</script>
