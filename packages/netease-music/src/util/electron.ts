const remote = require("@electron/remote");
const { shell } = require("electron");

export function CreateChildWindows(url: string, width: number, height: number) {
  const shared = remote.getGlobal("shared");
  if (shared.dialog !== null) return;
  // // 声明打开页面的url
  let winURL = "";
  // // /IndependentWindow这个路由是在渲染进程创建的承载外部链接的独立窗口的页面
  if (process.env.NODE_ENV === "development") {
    // 判断若为开发环境
    winURL = process.env.VITE_DEV_SERVER_URL + url;
  } else {
    winURL = `file://${__dirname}/${url}`;
  }
  const main = remote.webContents.fromId(shared.main);
  let childWindow: any = new remote.BrowserWindow({
    width,
    height,
    frame: false,
    parent: main,
    resizable: false,
    hasShadow: true,
    maximizable: false /* 禁止放大 */,
    minimizable: false /* 禁止缩小 */,
    alwaysOnTop: true /* 永远在屏幕最前面 */,
    fullscreenable: true /* 禁止全屏 */,
    webPreferences: {
      nodeIntegration: true, //在网页中集成Node
      contextIsolation: false,
      enableRemoteModule: true, // 打开remote模块
    },
  });
  remote.ipcMain.on("dialog-close", () => {
    childWindow.close();
  });
  childWindow.webContents.openDevTools();
  childWindow.on("closed", () => {
    childWindow = null;
    shared.dialog = null;
  });
  childWindow.loadURL(winURL);
  shared.dialog = childWindow.webContents.id;
  // childWindow.loadURL("winURL + url"); //打开子窗口展示的页面。
  // childWindow.loadURL(winURL + url); //打开子窗口展示的页面。
}

export function openExternal(url: string) {
  shell.openExternal(url);
}
