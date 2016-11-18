const App = require("./js/application")
const fileManager = require("./js/file_manager")
const menuManager = require("./js/menu")
const split = require("split.js")
// const _ = require("lodash")

module.exports = (win) => {
	let app = new App()

	fileManager.init(app)
	menuManager.init(app)

	split(["#editor", "#renderer"], {
		sizes: [50, 50],
		onDragEnd: () => {
			app.ace.editor.resize()
		}
	})
}