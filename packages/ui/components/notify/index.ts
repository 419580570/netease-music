import Notify from "./src/notify";
import { withInstallFunction } from "ui/utils/with-install";

const NNotify = withInstallFunction(Notify, "$notify");
export { NNotify };
