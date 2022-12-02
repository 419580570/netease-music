<script lang="ts">
import { h, ref } from "vue";
import { dropdownProps } from "./dropdown";
import Popover from "ui/components/popover/src/index.vue";

export default {
  name: "Droppdown",
  props: dropdownProps,
  setup(props, { slots, emit }) {
    if (!slots.default || !slots.dropDownItem) {
      console.warn("未传入default或dropDownItem插槽");
      return () => null;
    }
    const popover: any = ref(null);
    const dropdownClick = item => {
      popover.value.showPopover = false;
      emit("dropdownClick", item);
    };
    return () =>
      h(
        Popover,
        {
          height: props.height,
          class: "n-dropdown",
          ref: popover,
        },
        {
          reference: () => slots.default!(),
          default: () =>
            h(
              "ul",
              { class: "dropdown-wrapper" },
              props.data &&
                props.data.map(item =>
                  h(
                    "li",
                    {
                      class: "dropdown-item",
                      onClick: () => dropdownClick(item),
                    },
                    slots.dropDownItem!(item)
                  )
                )
            ),
        }
      );
  },
};
</script>
