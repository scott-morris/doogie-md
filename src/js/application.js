const Editor = require("./editor")
const MDRenderer = require("./md_render")

class App {
	constructor () {
		this.renderer = new MDRenderer({ ele: "#renderer" })
		this.ace = new Editor({ ele: "editor" })
		this.events = {}
		this.editorFileName = ""

		this.ace.onChange((event, editor) => {
			this.renderer.render(editor.getValue())
		})
	}

	get fileName () { return this.editorFileName }
	set fileName (fileName) {
		this.editorFileName = fileName
		this.trigger("file-name-change", this.editorFileName)
	}

	get editorContents () {
		return this.ace.editor.getValue()
	}

	set editorContents (newContents) {
		this.ace.editor.setValue(newContents)
		this.ace.editor.clearSelection()
	}

	on (eventName, handler) {
		if (!this.events.hasOwnProperty(eventName)) {
			this.events[eventName] = []
		}
		this.events[eventName].push(handler)
	}

	trigger (eventName, data) {
		if (this.events.hasOwnProperty(eventName)) {
			this.events[eventName].forEach((handler) => { handler.call(this, data) })
		}
	}
}

module.exports = App