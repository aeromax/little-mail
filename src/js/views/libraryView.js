import View from './view.js';
import {JSONtoHTML} from '../helpers.js';

class libraryView extends View {
	_parentElement = document.querySelector('.builder__library-panel--inner');
	_element = '.library--module';
	_errorMessage = 'Sorry– there was an error fetching the library modules!';
	_generateMarkup = function (data) {
		const builderModules = data.filter(m => m.options[0].allowedInBuilder);
		const markup = builderModules.map(element => {
			const json = {
				tagName: 'div',
				attributes: {
					class: 'library--module hover',
					'data-module': element.name,
				},
				children: [
					{
						tagName: 'div',
						attributes: {
							class: 'module--inner',
						},
						children: [
							{
								tagName: 'div',
								attributes: {
									class: 'library--module__name',
								},
								children: element.name,
							},
						],
					},
				],
			};
			return JSONtoHTML(json);
		});
		return markup;
	};

	renderEventHandler(handler) {
		window.addEventListener('load', handler);
	}
}
export default new libraryView();
