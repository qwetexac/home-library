import { Component } 	from '../core/';
import Handlebars 		from 'handlebars';
import formTemplate 	from '../templates/form.html';
import messages 		from '../etc/messages';

const events = {
	'change|keyup|keydown input': 'onInputChanged',
	'click button.primary'      : 'save',
	'click button.cancel'       : 'cancel'
};

const initialState = {
	id: 0,
	name: '',
	author: '',
	year: '',
	pages: ''
};

const rules = {
	name: {
		minlength: 3,
		maxlength: 30
	},
	author: {
		minlength: 3,
		maxlength: 30
	},
	year: {
		regexp: '^[12][0-9]{3}$'
	},
	pages: {
		regexp: '^[1-9][0-9]{0,3}$'
	}
};

class Form extends Component {

	onInit() {
		this.el = '#form';
		this.update();

		this.listenTo(this, 'updated', this.rerender);
	}

	render(errors) {
		const template = Handlebars.compile(formTemplate);

		Handlebars.registerHelper('message', (message) => {
			const errorMessages = [];

			for (const rule in message) {
				errorMessages.push(messages[rule].replace('{length}', message[rule]));
			}

			return errorMessages.join('<br>');
		});

		return template({
			...this.state,
			errors
		});
	}

	rerender(errors = []) {
		this.$el.innerHTML = this.render(errors);
		this.events = events;
		this.delegateEvents();
	}

	onInputChanged(e) {
		if (e.keyCode == 13) {
			this.save();
			e.preventDefault();
			return;
		}

		const key = e.target.getAttribute('name');

		this.setState({
			[key] : e.target.value
		}, true);
	}

	save() {
		this.errors = {};

		const { result, errors } = this.validate();

		if (!result) {
			this.rerender(errors);
			return;
		}

		const book = {
			...this.state,
			id : this.state.id > 0 ? this.state.id : +new Date()
		};

		store.saveBook(book);
		this.update();
	}

	cancel() {
		this.update();
	}

	update(book) {
		const state = book || initialState;

		this.events = events;
		this.delegateEvents();
		this.setState(state);
	}

	validate() {
		let isValid = true,
			errors = {};

		for (const key in rules) {
			for (const rule in rules[key]) {
				switch (rule) {
					case 'minlength': {
						if (this.state[key].length < rules[key][rule]) {
							isValid = false;
							errors[key] = {
								[rule] : rules[key][rule]
							};
						}
						break;
					}

					case 'maxlength': {
						if (this.state[key].length > rules[key][rule]) {
							isValid = false;
							errors[key] = {
								[rule] : rules[key][rule]
							};
						}
						break;
					}

					case 'regexp': {
						const pattern = new RegExp(rules[key][rule], 'g');

						if (!this.state[key].match(pattern)) {
							isValid = false;
							errors[key] = {
								[rule] : rules[key][rule]
							};
						}
						break;
					}

					default: {
						break;
					}
				}
			}
		}

		return {
			result: isValid,
			errors
		};
	}
}

export default Form;
