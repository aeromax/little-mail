// const breakpoint = '600',
// 	fontName = 'Open Sans',
// 	fontUrl = 'href="https://fonts.googleapis.com/css?family=Open+Sans"',
// 	preview = 'Preview text shows below the subject line',
// 	styles = '',
// 	body = '',
// 	buttonText = 'Button',
// 	accordionTitleText = 'Accordion title',
// 	accordionBodyText = 'Accordion body text',
// 	textBlock = moduleLibrary._module('text'),
// 	button = moduleLibrary._module('button'),
// 	section = moduleLibrary._module('section'),
// 	image = moduleLibrary._module('image');

export const JSONtoHTML = json => {
	// create a fragment
	let fragment = document.createDocumentFragment();
	if (Array.isArray(json)) {
		// convert each entry of array to DOM element
		for (let entry of json) {
			// create the element
			const element = document.createElement(entry.tagName);
			// if attributes available
			// set them
			if (entry.attributes) {
				for (let key in entry.attributes) {
					element.setAttribute(key, entry.attributes[key]);
				}
			}

			// if array of children
			if (Array.isArray(entry.children)) {
				// recursively convert the children to DOM
				// and assign them
				for (let child of entry.children) {
					element.appendChild(JSONtoHTML(child));
				}
			}
			// if children is string / text
			else {
				element.innerText = entry.children;
			}

			// add the element back to the fragment
			fragment.appendChild(element);
		}
	}
	// if not array recursively call the same function
	// pass the entry as an array.
	else {
		return JSONtoHTML([json]);
	}

	return fragment;
};

export const fragmentToString = function (fragment) {
	const serializer = new XMLSerializer();
	const string = serializer.serializeToString(fragment);
	return string;
};

// export const listTags = function (obj, indent = '') {
// 	const count = '—';
// 	for (let key in obj) {
// 		if (typeof obj[key] === 'object') {
// 			if (Array.isArray(obj[key])) {
// 				for (let i = 0; i < obj[key].length; i++) {
// 					listTags(obj[key][i]);
// 				}
// 				count + '—';
// 			} else {
// 				listTags(obj[key]);
// 			}
// 		} else {
// 			console.log(indent + obj[key]);
// 		}
// 	}
// };
export const listTags = function (obj, indent = '') {
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			listTags(obj[key], `${indent} `);
		} else {
			console.log(`${indent} ${obj[key]}`);
		}
	}
};
