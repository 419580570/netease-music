import { ExtractPropTypes } from "vue";
export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  type: {
    type: String
  }
};

export type IconProps = ExtractPropTypes<typeof iconProps>;
