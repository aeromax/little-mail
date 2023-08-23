import libraryView from './views/libraryView.js';
import canvasView from './views/canvasView.js';
import moduleLibrary from '../data/modules.json';
import {listTags} from './helpers.js';
import uuidv4 from 'uuid/v4';
import * as config from './config.js';

// export const state = {
// 	modules: null,
// 	canvas: {
// 		layout: [
// 			{
// 				tagName: 'mjml',
// 				children: [
// 					{
// 						tagName: 'mj-head',
// 						children: [
// 							{
// 								tagName: 'mj-attributes',
// 								children: [
// 									{
// 										tagName: 'mj-breakpoint',
// 										tagName: 'mj-font',
// 										tagName: 'mj-preview',
// 										tagName: 'mj-style',
// 									},
// 								],
// 							},
// 						],
// 					},
// 					{
// 						tagName: 'mj-body',
// 					},
// 				],
// 			},
// 		],
// 	},
// };
export const state = {
	modules: null,
	canvas: {
		layout: [
			{
				tagName: 'mjml',
				children: [
					{
						tagName: 'mj-head',
						children: [
							{
								tagName: 'mj-attributes',
								children: [
									{
										tagName: 'mj-breakpoint',
										tagName: 'mj-font',
										tagName: 'mj-preview',
										tagName: 'mj-style',
									},
								],
							},
						],
					},
					{
						tagName: 'mj-body',
					},
				],
			},
		],
	},
};

const renderLibrary = async function () {
	try {
		state.modules = moduleLibrary.data.modules;
		libraryView.render(state.modules);
	} catch (err) {
		console.error(err);
	}
};
const findModule = function (moduleName) {
	const find = state.modules.find(m => m.name === moduleName);
	return find;
};
const moduleControl = async function (target) {
	console.log('______________');
	module.id = uuidv4();
	const moduleName = target.dataset.module;
	const body = state.canvas.layout[0].children.find(obj => obj.tagName === 'mj-body');

	// if (findModule(moduleName).options[0].allowedInSection) {
	// 	let container;
	// 	const section = body.children.find(obj => obj.tagName === 'mj-section');
	// 	container = section;
	// 	if (findModule(moduleName).options[0].allowedInColumn) {
	// 		const column = section.children.find(obj => obj.tagName === 'mj-column');
	// 		container = column;
	// 	}
	// }
	container.children.push(module);

	// listTags(state.canvas.layout);
	canvasView.update(state.canvas.layout[0], true);
};

const init = function () {
	const storage = localStorage.getItem('projects');
	// This will fire when the builder screen is loaded
	libraryView.renderEventHandler(renderLibrary);
	// libraryView.clickEventHandler(moduleControl);
	libraryView._dragControl();
	canvasView.update(state.canvas.layout[0]);
};

init();

export default state;
