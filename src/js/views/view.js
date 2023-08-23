import state from '../main.js';
import mjml2html from 'mjml-browser';
import {fragmentToString} from '../helpers.js';
import {Draggable} from '@shopify/draggable';

export default class View {
	// This class will apply to rendering elements in both the library panel, and the canvas panel
	render(_data) {
		if (!_data || (Array.isArray(_data) && _data.length === 0)) return this.renderError();
		const markup = this._generateMarkup(_data);
		Array.isArray(markup) ? this._parentElement.append(...markup) : this._parentElement.append(markup);
	}
	update(_data) {
		const markup = this._generateMarkup(_data);
		const html = mjml2html(fragmentToString(markup));
		if (html.errors) {
			html.errors.forEach(err => this._renderError(err.message));
		}
		this._parentElement.innerHTML = html.html;
	}

	// clickEventHandler(handler) {
	// 	this._parentElement.addEventListener('click', function (e) {
	// 		e.preventDefault();
	// 		handler(e);
	// 	});
	// }

	_clear() {
		this._parentElement.innerHTML = '';
	}
	_dragControl() {
		console.log(this._parentElement);
		console.log(this._element);
		const draggable = new Draggable(this._parentElement, {
			draggable: this._element,
		});
	}

	_renderError(message = this._errorMessage) {
		const markup = `
      <div class="error">
        <div>
          <svg>
            
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}
