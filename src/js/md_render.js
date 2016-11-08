const marked = require("marked")
const highlight = require("highlight.js").highlightAuto
const _ = require("lodash")

class MarkdownRenderer {
	constructor (settings) {
		this.settings = {
			sanitize: true,
			highlight: (code) => {
				return highlight(code).value
			}
		}

		if (settings.ele) {
			this.outputElement = document.querySelector(settings.ele)
		}

		if (settings.markdown) {
			_.assign(this.settings, settings.markdown)
		}
	}

	render (markdown) {
		if (this.outputElement) {
			this.outputElement.innerHTML = marked(markdown, this.settings)
		}
	}
}

module.exports = MarkdownRenderer