<script lang="ts">
import {
  defineComponent,
  h,
  ref,
  computed,
  onMounted,
  watch,
  reactive,
} from "vue";
import { carouselProps } from "./carousel";
import { NIcon as Icon } from "ui/components";

export default defineComponent({
  name: "Carousel",
  props: carouselProps,
  setup(props, { slots }) {
    if (!props.carouselData || !props.carouselData.length) return null;
    const carouselData = props.carouselData!;
    const currentIndex = ref(0);
    const length = carouselData.length - 1;

    const link: { item: any; prev: any; next: any }[] = new Array(length + 1)
      .fill(undefined)
      .map(() => ({ item: undefined, prev: undefined, next: undefined }));

    carouselData.forEach((item, index) => {
      link[index]["item"] = item;
      link[index]["prev"] = index === 0 ? link[length] : link[index - 1];
      link[index]["next"] = index === length ? link[0] : link[index + 1];
    });
    /* 生成最终显示列表 */
    const showLink = computed(() => [
      link[currentIndex.value].prev.prev.item,
      link[currentIndex.value].prev.item,
      link[currentIndex.value].item,
      link[currentIndex.value].next.item,
      link[currentIndex.value].next.next.item,
    ]);

    /* currentIndex变化时，控制li的销毁创建，使其transition生效 */
    const diffMap = reactive([0, 1, 2, 3, 4]);
    const increase = () => {
      for (let index = 0; index < 5; index++) {
        diffMap[index]++;
      }
    };
    const decrease = () => {
      for (let index = 0; index < 5; index++) {
        diffMap[index]--;
      }
    };

    watch(
      () => currentIndex.value,
      (newValue, oldValue) => {
        if (newValue == 0 && oldValue == length) {
          increase();
        } else if (newValue == length && oldValue == 0) {
          decrease();
        } else if (newValue < oldValue) {
          decrease();
        } else {
          increase();
        }
      }
    );

    const handlePrev = () => {
      currentIndex.value > 0
        ? currentIndex.value--
        : (currentIndex.value = length);
    };
    const handleNext = () => {
      currentIndex.value < length
        ? currentIndex.value++
        : (currentIndex.value = 0);
    };

    let time;
    const startInterval = () => {
      if (time) return;
      time = setInterval(() => {
        handleNext();
      }, props.interval);
    };

    const stopInterval = () => {
      time && clearInterval(time);
      time = null;
    };

    const transferActive = index => {
      currentIndex.value = index;
    };

    onMounted(() => {
      startInterval();
    });
    return () =>
      h(
        "div",
        {
          class: "n-carousel",
          onMouseout: () => startInterval(),
          onMouseover: () => stopInterval(),
        },
        h("div", { class: "n-carousel-wrapper" }, [
          h(
            "div",
            { class: "prev-button", onClick: () => handlePrev() },
            h(Icon, { type: "forward", size: 12 })
          ),
          h(
            "div",
            { class: "next-button", onClick: () => handleNext() },
            h(Icon, { type: "prev", size: 12 })
          ),
          h(
            "div",
            { class: "carousel-container" },
            slots.carouselItem &&
              showLink.value.map((item, index) =>
                h(
                  "li",
                  {
                    class: `carousel-item${index === 2 ? " active" : ""}`,
                    key: diffMap[index],
                  },
                  slots.carouselItem!(item)
                )
              )
          ),
          h(
            "div",
            { class: "button-group" },
            carouselData.map((_, index) =>
              h("div", {
                class: `button-group-item${
                  index === currentIndex.value ? " active" : ""
                }`,
                onMouseover: () => transferActive(index),
              })
            )
          ),
        ])
      );
  },
});
</script>
