import { MarkdownPostProcessorContext } from "obsidian";
import LatexHeadingsPlugin from "./main";

export function readingViewLatexHeadings(element: HTMLElement, context: MarkdownPostProcessorContext, plugin: LatexHeadingsPlugin) {
	let hcount = [0, 0, 0]
	console.log(element.matchParent(".markdown-preview"))
	for (const el of (Array.from(context.containerEl.querySelectorAll("h1, h2, h3") as Array<HTMLElement>))) {
		console.log(el)
		let numberText
		if (el.tagName === "H1") {
			hcount[0] += 1
			hcount[1] = 0
			hcount[2] = 0
			numberText = `${hcount[0]} `
		} else if (el.tagName === "H2") {
			hcount[1] += 1
			hcount[2] = 0
			numberText = `${hcount[0]}.${hcount[1]} `
		} else if (el.tagName === "H3") {
			hcount[2] += 1
			numberText = `${hcount[0]}.${hcount[1]}.${hcount[2]} `
		}
		if (!el.innerText.startsWith(numberText))
			el.innerText = numberText+el.innerText
	}
}
