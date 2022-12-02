import type { App, Plugin } from "vue";
import { INSTALLED_KEY } from 'ui/constants'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if ((app as any)[INSTALLED_KEY]) return;

    (app as any)[INSTALLED_KEY] = true;
    components.forEach(c => app.use(c));
  };

  return {
    install,
  };
};
