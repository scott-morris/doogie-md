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
				} else {
					resolve({
						fileName: dialogResp,
						contents
					})
				}
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
			} else {
				resolve({
					fileName,
					contents
				})
			}
		})
	})
}

const saveHTML = (el) => {
	let ele = document.querySelection(el)
	let html = ele.innerHTML

	saveFile(html)
}

module.exports = {
	openFile,
	saveFile,
	saveFileAs,
	saveHTML
}