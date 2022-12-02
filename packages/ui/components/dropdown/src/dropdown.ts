import { ExtractPropTypes } from "vue";
export const dropdownProps = {
  data: {
    type: Array,
    require: true,
  },
  height: {
    type: String,
    default: "200px",
  },
};

export type IconProps = ExtractPropTypes<typeof dropdownProps>;
