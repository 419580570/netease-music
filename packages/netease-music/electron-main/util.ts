import { globalShortcut, ipcMain } from "electron";
import type { WebContents, BrowserWindow } from "electron";

export function registeShortcut(webContents: WebContents) {
  //刷新
  globalShortcut.register("F5", () => {
    webContents.reload();
  });
  // 控制台
  globalShortcut.register("alt+shift+i", () => {
    webContents.isDevToolsOpened()
      ? webContents.closeDevTools()
      : webContents.openDevTools();
  });
}

export function communication(win: BrowserWindow, app: any) {
  // 1. 窗口 最小化
  ipcMain.on("window-min", function () {
    // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
    win.minimize();
  });

  // 2. 窗口 最大化、恢复
  ipcMain.handle("window-max", function () {
    if (win.isMaximized()) {
      // 为true表示窗口已最大化
      win.restore(); // 将窗口恢复为之前的状态.
    } else {
      win.maximize();
    }

    return win.isMaximized();
  });

  // 3. 关闭窗口
  ipcMain.on("window-close", function () {
    win.close();
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  /* 登录 */
  ipcMain.on("login", function (event, arg) {
    win.webContents.send("login-send", arg)
  });
}
