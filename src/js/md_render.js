const marked = require("marked")
const highlight = require("highlight.js").highlightAuto
const renderMermaid = require("./custom_renderer/mermaid")
const renderFlowchart = require("./custom_renderer/flowchart")

class MarkdownRenderer {
	constructor (settings) {
		renderMermaid.init();
		renderFlowchart.init();

		this.settings = {
			sanitize: true,
			highlight: (code, language, cb) => {
				switch (language) {
					case "mermaid":   return renderMermaid.parse(code)
					case "flowchart": return renderFlowchart.parse(code)
					default:          return highlight(code).value
				}
			}
		}

		if (settings.ele) {
			this.outputElementSelector = settings.ele
			this.outputElement = document.querySelector(this.outputElementSelector)
		}

		if (settings.markdown) {
			this.settings = Object.assign({}, this.settings, settings.markdown)
		}
	}

	render (markdown) {
		if (this.outputElement) {
			this.outputElement.innerHTML = marked(markdown, this.settings)
			renderMermaid.render()
			renderFlowchart.render()
		}
	}
}

module.exports = MarkdownRenderer