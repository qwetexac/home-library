class Component {
	constructor() {
		this._events = [];
		this._state = {};
		this._el = '';

		$(window).on('loaded', () => this.onInit.call(this));
		return this;
	}

	onInit() {}

	render() {
		return this;
	}

	afterRendered() {}

	toString() {
		return this.render.apply(this);
	}

	listenTo(obj, event, callback) {
		document.querySelector(obj.el).addEventListener(event, callback.bind(this));
	}

	dispatch(event, data) {
		data = data || null;

		const newEvent = new CustomEvent(event, {
			detail: data
		});

		document.querySelector(this.el).dispatchEvent(newEvent);
	}

	setState(newState, silent = false) {
		let equal = true;

		for (const key in newState) {
			if (this._state[key] !== newState[key]) {
				equal = false;
				this._state[key] = newState[key];
			}
		}

		if (!equal && !silent) {
			this.dispatch('updated');
		}
	}

	delegateEvents(template) {
		for (const eventItem in this._events) {
			const tmp = eventItem.split(' ');
			const selector = tmp.length > 1 ? document.querySelector(this.el).querySelectorAll(tmp[1]) : document.querySelectorAll(this.el);

			selector.forEach(item => {
				let events = tmp[0].split('|');

				for (let i = events.length - 1; i >= 0; i--) {
					item.addEventListener(events[i], this[this._events[eventItem]].bind(this));
				}
			});
		}
	}


	/**
	 *
	 * Setters/Getters
	 *
	 */


	get el() {
		return this._el;
	}

	get $el() {
		return document.querySelector(this._el);
	}

	set el(el) {
		this._el = el;
	}

	set events(events) {
		this._events = events;
	}

	set state(state) {
		if (state) {
			this._state = state;
		}
	}

	get state() {
		return this._state;
	}
}

export default Component;
