const dialog = require("electron").remote.dialog
const fs = require("fs")

const openFile = () => {
	return new Promise((resolve, reject) => {
		let dialogResp = dialog.showOpenDialog({
			properties: ['openFile']
		})

		if (dialogResp) {
			let fileName = dialogResp[0]
			let contents = fs.readFileSync(fileName, "utf8")

			resolve({
				fileName,
				contents
			})
		} else {
			reject("Dialog cancelled")
		}
	})
}

const saveFileAs = (contents) => {
	return new Promise((resolve, reject) => {
		let dialogResp = dialog.showSaveDialog({
			title: "Save File As..",
			buttonLabel: "Save"
		})

		if (dialogResp) {
			fs.writeFileSync(dialogResp, contents, "utf8", (err) => {
				if (err) {
					reject(err)
				}
			})

			resolve({
				fileName: dialogResp,
				contents
			})
		} else {
			reject("Dialog cancelled")
		}
	})
}

const saveFile = (contents, fileName = "") => {
	if (fileName === "") {
		return saveFileAs(contents)
	}

	return new Promise((resolve, reject) => {
		fs.writeFileSync(fileName, contents, "utf8", (err) => {
			if (err) {
				reject (err)
			}
		})

		resolve({
			fileName,
			contents
		})
	})
}

const saveHTML = (el) => {
	let ele = document.querySelection(el)
	let html = ele.innerHTML

	saveFile(html)
}

const init = (app) => {
	app.on("open-file", () => {
		openFile().then((results) => {
			app.fileName = results.fileName
			app.editorContents = results.contents
		})
	})

	app.on("save-file", () => {
		saveFile(app.editorContents, app.fileName).then((results) => {
			app.fileName = results.fileName
		})
	})

	app.on("save-file-as", () => {
		saveFileAs(app.editorContents).then((results) => {
			app.fileName = results.fileName
		})
	})

	app.on("close-file", () => {
		app.fileName = app.editorContents = ""
	})
}

module.exports = {
	init,
	openFile,
	saveFile,
	saveFileAs,
	saveHTML
}