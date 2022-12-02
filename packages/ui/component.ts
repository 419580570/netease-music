import { NIcon } from "ui/components/icon";
import { NPopover } from "ui/components/popover";
import { Nnavbar } from "ui/components/navbar";
import { NButton } from "ui/components/button";
import { NDialog } from "ui/components/dialog";
import { NDropdown } from "ui/components/dropdown";
import { NNotify } from "ui/components/notify";
import { NLoading } from "ui/components/loading";
import type { Plugin } from "vue";

export default [
  NIcon,
  NPopover,
  Nnavbar,
  NButton,
  NDialog,
  NDropdown,
  NNotify,
  NLoading,
] as Plugin[];
