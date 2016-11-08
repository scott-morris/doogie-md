const App = require("./js/application")
const fileManager = require("./js/file_manager")
const split = require("split.js")
// const _ = require("lodash")

module.exports = (win) => {
	let app = new App()

	app.on("open-file", () => {
		fileManager.openFile().then((results) => {
			app.fileName = results.fileName
			app.editorContents = results.contents
		})
	})

	app.on("save-file", () => {
		fileManager.saveFile(app.editorContents, app.fileName)
	})

	app.on("save-file-as", () => {
		fileManager.saveFileAs(app.editorContents)
	})

	app.on("close-file", () => { app.fileName = app.editorContents = "" })

	app.on("file-name-change", () => {
		let header = document.querySelector(".toolbar .toolbar-actions .title")
		header.innerHTML = app.fileName
	})

	let appBtns = document.querySelectorAll("button[app-action]")
	appBtns.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			let target = event.target
			if (target.tagName !== "BUTTON" && target.parentElement.tagName === "BUTTON") {
				target = target.parentElement
			}

			if (target.tagName === "BUTTON") {
				app.trigger(target.getAttribute("app-action"))
			}
		})
	})

	require("./js/menu")(app)

	split(["#editor", "#renderer"], {
		sizes: [50, 50]
	})
}