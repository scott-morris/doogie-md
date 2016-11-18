const mermaid = require("mermaid")
const mermaidAPI = mermaid.mermaidAPI

const init = () => {
	mermaidAPI.initialize({ startOnLoad: false })
}

const parse = (code) => {
	let result

	if (mermaidAPI.parse(code)) {
		code = code.replace(/[\t\s]*\n+[\t\s]*/igm, "\n")
		result = `<div class="mermaid">${code}</div>`
	} else {
		result = `<pre><code>Invalid mermaid</code></pre>`
	}

	return result
}

const render = () => {
	mermaid.init()
}

module.exports = {
	init,
	parse,
	render
}