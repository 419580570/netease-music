import { ExtractPropTypes } from "vue";
export const notifyProps = {
  duration: { type: Number, default: 2000 },
  position: { type: String, default: "center" },
  size: { type: Number, default: 16 },
  offsetX: { type: Number },
  offsetY: { type: Number },
  appendTo: { type: String },
  style: { type: Object, default: {} },
};

export type NotifyProps = ExtractPropTypes<typeof notifyProps>;
