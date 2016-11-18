const flowchart = require("flowchart.js")

const flowchartClass = "flowchart"
let flowchartIndex
let settings = {
	"x": 0,
	"y": 0,
	"line-width": 3,
	"line-length": 50,
	"text-margin": 10,
	"font-size": 14,
	"font-color": "black",
	"line-color": "black",
	"element-color": "black",
	"fill": "white",
	"yes-text": "yes",
	"no-text": "no",
	"arrow-end": "block",
	"scale": 1,
	// style symbol types
	"symbols": {
		"start": {
			"font-color": "red",
			"element-color": "green",
			"fill": "yellow"
		},
		"end": {
			"class": "end-element"
		}
	},
	"flowstate": {
		"past": { "fill": "#cccccc", "font-size": 12 },
		"current": { "fill": "yellow", "font-color": "red", "font-weight": "bold" },
		"future": { "fill": "#ffff99" },
		"request": { "fill": "blue" },
		"invalid": { "fill": "#444444" },
		"approved": { "fill": "#58c4a3", "font-size": 12, "yes-text": "APPROVED", "no-text": "n/a" },
		"rejected": { "fill": "#c45879", "font-size": 12, "yes-text": "n/a", "no-text": "REJECTED" }
	}
}

const init = (options) => {
	flowchartIndex = 0
	settings = Object.assign({}, settings, options)
}

const parse = (code) => {
	let id = "flowchart_" + (++flowchartIndex)
	return `<div id="${id}" class="${flowchartClass}">${code}</div>`
}

const render = () => {
	let flowcharts = document.getElementsByClassName(flowchartClass)

	if (flowcharts.length === 0) {
		return
	}

	Array.from(flowcharts).forEach((fc) => {
		let code = fc.textContent
		let diagram = flowchart.parse(code, settings)

		fc.innerHTML = ""
		diagram.drawSVG(fc.id)
	})
}

module.exports = {
	init,
	parse,
	render
}
