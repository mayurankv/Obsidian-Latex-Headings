import { Plugin } from "obsidian";

import { DEFAULT_SETTINGS, LatexHeadingsSettings } from "./Settings";
import { readingViewLatexHeadings } from "./ReadingView";

export default class LatexHeadingsPlugin extends Plugin {
	settings: LatexHeadingsSettings;

	async onload() {
		await this.loadSettings(); // Load Settings

		this.registerMarkdownPostProcessor(async (el,ctx) => {await readingViewLatexHeadings(el,ctx,this);});
		document.body.classList.add("latex-headings"); // Load Styles

		console.log("Loaded plugin: Latex Headings");
	}

	onunload() {
		console.log("Unloaded plugin: Latex Headings");
	}

	async loadSettings() {
		this.settings = {...structuredClone(DEFAULT_SETTINGS), ...(await this.loadData())};
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.app.workspace.updateOptions();
	}
}
