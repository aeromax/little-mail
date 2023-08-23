import View from './view.js';
import {JSONtoHTML} from '../helpers.js';

class canvasView extends View {
	_parentElement = document.querySelector('.builder__canvas-panel--inner--email-body');
	_errorMessage = 'Sorry– there was an error rendering the canvas!';

	_generateMarkup = function (data) {
		const markup = JSONtoHTML(data);
		return markup;
	};

	renderEventHandler(handler) {
		window.addEventListener('load', handler);
	}
}

export default new canvasView();
