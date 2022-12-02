import { app, BrowserWindow, Menu } from "electron";
import { communication, registeShortcut } from "./util";
import path from "path";
const remote = require("@electron/remote/main");
remote.initialize();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const createWindow = () => {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1200,
    height: 777,
    minWidth: 1021,
    center: true,
    frame: false,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, "../electron-preload/index.cjs"), // 需要引用js文件
    },
  });
  remote.enable(win.webContents);

  const webContents = win.webContents;
  (global as any).shared = { main: webContents.id, dialog: null };

  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    /* 注册快捷键 */
    registeShortcut(webContents);

    /* 通信 */
    communication(win, app);
    let url = "http://localhost:5173"; // 本地启动的vue项目路径
    win.loadURL(url);
    // 加载vue扩展
    const session = win.webContents.session;
    session.loadExtension(path.resolve(__dirname, "../vue-devtool"));
  }
};

app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭窗口
// app.on("window-all-closed", () => {
// });
