import { ExtractPropTypes } from "vue";
export const carouselProps = {
  carouselData: Array,
  interval: {
    type: Number,
    default: 5000
  }
};

export type CarouselProps = ExtractPropTypes<typeof carouselProps>;
