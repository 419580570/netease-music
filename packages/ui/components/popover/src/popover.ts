export const popoverProps = {
  trigger: {
    type: String,
    validator(value) {
      return ["click", "mouseover"].includes(value);
    },
    default: () => "click",
  },
  keepShow: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
};
