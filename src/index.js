const {app, BrowserWindow} = require("electron")
const path = require("path")
const fs = require("fs-extra")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow
let settingsFile = path.join(__dirname, "app-settings.json")

function loadSettings () {
  let settings

  try {
    settings = JSON.parse(fs.readFileSync(settingsFile, "utf8"))
  } catch (err) {
    settings = {
      window: {
        width: 800,
        height: 600
      }
    }
  }

  settings.title = "Doogie MD Editor"

  return settings
}

function saveSettings (window) {
  let settings = loadSettings() || {}
  let bounds = window.getBounds()

  settings.window.width = bounds.width
  settings.window.height = bounds.height
  settings.window.x = bounds.x
  settings.window.y = bounds.y

  fs.writeFileSync(settingsFile, JSON.stringify(settings), "utf8")
}


function createWindow () {
  let settings = loadSettings()

  // Create the browser window.
  mainWindow = new BrowserWindow(settings.window)

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  // if (settings.window && settings.window.devTools) {
  //   mainWindow.webContents.openDevTools()
  // }

  mainWindow.on('resize', () => { saveSettings(mainWindow) })
  mainWindow.on('move', () => { saveSettings(mainWindow) })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.