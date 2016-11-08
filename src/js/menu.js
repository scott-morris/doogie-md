const Menu = require('electron').remote.Menu

const updateMenuForMac = (template) => {
	const name = require('electron').remote.app.getName()

	template.unshift({
		label: name,
		submenu: [
			{
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit'
			}
		]
	})

	// Window menu.
	template[3].submenu = [
		{
			label: 'Close',
			accelerator: 'CmdOrCtrl+W',
			role: 'close'
		},
		{
			label: 'Minimize',
			accelerator: 'CmdOrCtrl+M',
			role: 'minimize'
		},
		{
			label: 'Zoom',
			role: 'zoom'
		},
		{
			type: 'separator'
		},
		{
			label: 'Bring All to Front',
			role: 'front'
		}
	]

	return template
}

const getMenuOptions = (app) => {
	return [
		{
			label: 'File',
			submenu: [
			{
				label: 'New File',
				accelerator: 'CmdOrCtrl+N',
				click () {
					app.trigger("new-file")
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Open File',
				accelerator: 'CmdOrCtrl+O',
				click () {
					app.trigger("open-file")
				}
			},
			{
				label: 'Close File',
				accelerator: 'CmdOrCtrl+W',
				click () {
					app.trigger("close-file")
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Save File',
				accelerator: 'CmdOrCtrl+S',
				click () {
					app.trigger("save-file")
				}
			},
			{
				label: 'Save File As..',
				accelerator: 'CmdOrCtrl+Shift+S',
				click () {
					app.trigger("save-file-as")
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Save HTML',
				click () {
					app.trigger("save-html")
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				role: 'quit'
			}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					role: 'undo'
				},
				{
					role: 'redo'
				},
				{
					type: 'separator'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				},
				{
					role: 'pasteandmatchstyle'
				},
				{
					role: 'delete'
				},
				{
					role: 'selectall'
				}
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Toggle Developer Tools',
					accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
					click (item, focusedWindow) {
						if (focusedWindow) {
							focusedWindow.webContents.toggleDevTools()
						}
					}
				},
				{
					type: 'separator'
				},
				{
					role: 'togglefullscreen'
				}
			]
		},
		{
			role: 'window',
			submenu: [
				{
					role: 'minimize'
				},
				{
					role: 'close'
				}
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click () { require('electron').shell.openExternal('http://electron.atom.io') }
				}
			]
		}
	]
}

module.exports = (app) => {
	let template = getMenuOptions(app)

	if (process.platform === 'darwin') {
		template = updateMenuForMac(template)
	}

	let menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	return menu
}