
export {
	xhr,
	entries,
	bind,
	ajax,
	serialize,
	css,
}



/**
 * Serializes an object to key=value&key2=value2
 * @param {Object} obj
 */
function serialize( data, prefix = false ) {
	if ( ! data ) return false;
	const array = [];

	if (data.constructor.name == 'Object') {
		for(let [key, value] of entries(data)) {
			if (value.constructor.name == 'Object') {
				array.push(serialize(value, key));
			} else if (Array.isArray(value)) {
				array.push(serialize(value, key));
			} else {
				let string = '';
				if (prefix !== false) {
					string = encodeURIComponent(`${prefix}[${key}]`) + `=` + encodeURIComponent(value);
				} else {
					string = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				}
				array.push(string)
			}
		}
	} else if (Array.isArray(data)) {
		data.forEach((item, i) => {
			array.push(serialize(item, prefix + `[${i}]`));
		});
	} else {
		return encodeURIComponent(data);
	}

	return array.join('&');
}

/**
 * Used with forof
 *
 * ex. (let [key, value] of entries(object)) {}
 *
 * @param {Object} obj
 */
function* entries(obj) {
	for (let key of Object.keys(obj)) {
		yield [key, obj[key]];
	}
}

/**
 * Bind functions
 *
 * @param {any} self
 * @param {string} functions
 */
function bind(self, ...functions) {
	functions.forEach((name) => {
		self[name] = self[name].bind(self);
	})
}


/**
 * Set CSS values on element
 *
 * @param {any} el
 * @param {any} styles
 * @returns
 */
function css(el, styles) {
	if (!el) return;
	if (Array.isArray(el) || el instanceof NodeList) {
		el.forEach((n) => {
			utils.css(n, styles);
		});
	} else {
		for (let [key, value] of entries(styles)) {
			el.style[key] = value;
		}
	}
}


/**
 * AJAX call
 * Works as the normal fetch(),
 * but with some modifications to simplify it's use
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * ex.
 * ajax({
 *  method: 'POST',
 *  body: {
 *   acton: 'subscribe',
 *   userID: 1,
 *  },
 * });
 *
 * @param {Object} options
 * @return {promise} fetch
 */
function ajax(options) {
	return new Promise((resolve, reject) => {
		if (!options.method) return console.error('method is required. ex. method: \'post\'');

		/**
		 * Set default headers if none where set.
		 * Send your own headers-object if you don't want this
		 */
		if (!options.headers) {
			options.headers = {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			};
		}

		/* Needed for cookies to be set */
		if (!options.credentials) {
			options.credentials = 'same-origin';
		}

		/* Set url to BIA.AJAX_URL as default */
		let url = options.url || BIA.AJAX_URL;

		if (options.body) {
			/* converts body to: "key=value&key2+value2" */
			const params = typeof options.body == 'object' ? serialize(options.body) : options.body;

			/* Allows the method to be send case-insensitive */
			const method = options.method.toLowerCase();

			if (method === 'post') {
				if (options.body.constructor.name === 'FormData') {
					// Removes default header and lets the browser decide
					options.headers = {};
				} else {
					// Add the serialized string as the body
					options.body = params;
				}
			} else if (method === 'get') {
				/**
				 * Body is not allowed to be send with a GET method
				 * Instead we add it to the url as string params
				 */
				delete options.body;

				/**
				 * Looks in the url for a query
				 * Adds the new params
				 */
				if (url.includes('?')) {
					url += url.endsWith('&') || url.endsWith('?') ? '' : '&';
				} else if (params.indexOf('?') !== 0) {
					url += '?';
				}
				url += params;
			}
		}

		/**
		 * The AJAX request, using es6 fetch.
		 */
		fetch(url, options).then((response) => {
			const contentType = response.headers.get('content-type');

			/* Function to make the code look cleaner */
			const has = (text) => contentType.indexOf(text) !== -1;

			/* Was the response successful */
			if (response.ok && contentType) {
				/**
				 * Check content types
				 * and handles them accordingly
				 */
				if (has('application/json')) {
					resolve(response.json());
				} else if (has('text/')) {
					/* Parses text and html */
					resolve(response.text());
				} else if (has('form-data')) {
					resolve(response.formData());
				} else if (has('image/')) {
					resolve(response.blob());
				} else if (has('audio/') || has('video/') || has('application/ogg')) {
					resolve(response.arrayBuffer());
				} else {
					resolve(response);
				}
			} else {
				// reject only print an error in the console
				// We can use resolve instead and handle the error in the function that called ajax
				console.log('ajax response not ok: ', response);
				reject(response);
			}
		}).catch((err) => {
			/* Catch error */
			console.log('ajax catch: ', err);
			reject(err);
		});
	});
}

function xhr(config) {
	const xhr = new XMLHttpRequest();
	let data = config.body;

	const method = config.method || 'POST';
	const url = config.url || BIA.AJAX_URL;
	const contentType = config.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';


	// Convert object to formdata
	if ( data && data.constructor.name === 'Object') { // REVIEW: Reliable?
		data = serialize(data);
		// data = new FormData();
		// for(let [key, value] of entries(config.body)) {
		// 	data.append(key, value);
		// }
	}
	xhr.open(method, url, true);

	if ( config.headers ) {
		for (const key in config.headers) {
			console.log(key, config.headers[key]);
			xhr.setRequestHeader( key, config.headers[key]);
        }
	} else {
		xhr.setRequestHeader('Content-Type', contentType);
	}

	// xhr.withCredentials = false;

	xhr.onload = onload;
	xhr.onerror = onerror;
	xhr.onabort = onabort;

	xhr.send(data);

	const onload = (e) => {
		let response = false;
		if ((xhr.status).toString()[0] == '2') {
			if (xhr.responseType === 'json') {
				response = JSON.parse(xhr.responseText);
			} else {
				response = xhr.response;
			}
		} else {
			console.warn(xhr.statusText);
		}
		return xhr;
	};

	const onerror = (e) => {
		console.error('Failed to fetch', e);
	};

	const onabort = () => {
		console.log('XHR was aborted');
	};

	xhr.done = (fn) => {
		xhr.addEventListener('load', () => {
			const result = onload();
			fn(result);
		});
		return xhr;
	};

	return xhr;
}

