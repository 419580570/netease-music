import { AppContext, createVNode, isVNode, Ref, render } from "vue";
import { isElement } from "ui/utils/vnode";
import { isString } from "@vue/shared";
import NotificationConstructor from "./index.vue";

const notifications = {
  top: [],
  left: [],
  right: [],
  bottom: [],
  center: [],
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": [],
};

const notify: any = function (
  options: any = {},
  context: AppContext | null = null
) {
  if (typeof options === "string" || isVNode(options)) {
    options = { message: options };
  }
  const position = options.position || "center";
  let horizontalOffset = options.offsetX || 0;
  let verticalOffset = options.offsetY || 0;

  notifications[position].forEach(({ vm }) => {
    vm.props.onDestroy();
  });

  const props = {
    ...options,
    position,
    offsetY: verticalOffset,
    offsetX: horizontalOffset,
  };

  let appendTo: HTMLElement | null = document.body;
  if (isElement(options.appendTo)) {
    appendTo = options.appendTo;
  } else if (isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo);
  }

  const container = document.createElement("div");

  const vm = createVNode(
    NotificationConstructor,
    props,
    props.message
      ? {
          default: () => props.message,
        }
      : null
  );
  vm.appContext = context ?? notify._context;
  vm.props!.onDestroy = () => {
    render(null, container);
  };
  notifications[position].push({ vm });
  render(vm, container);
  appendTo!.appendChild(container.firstElementChild!);

  return {
    close: () => {
      // (vm.component!.exposed as { visible: Ref<boolean> }).visible.value =
      //   false;

      render(null, container);
    },
  };
};
notify._context = null;

export default notify;
