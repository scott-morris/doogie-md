require("../../node_modules/ace-builds/src-noconflict/ace")
/* global ace */
ace.config.set("basePath", "../node_modules/ace-builds/src-noconflict")

const _ = require("lodash")

class Editor {
	constructor (settings) {
		let aceSettings = _.get(settings, "aceConfig", false)

		if (aceSettings) {
			Object.keys(aceSettings).forEach((key) => {
				ace.config.set(key, aceSettings[key])
			})
		}

		this.editor = ace.edit(settings.ele)
		this.session = this.editor.getSession()

		this.editor.setTheme("ace/theme/monokai")
		this.session.setMode("ace/mode/markdown")
	}

	onChange (fn) {
		this.editor.on("change", fn)
	}
}

module.exports = Editor