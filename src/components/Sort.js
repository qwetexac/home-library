import { Component } from '../core/';
import Handlebars from 'handlebars';
import sortTemplate from '../templates/sort.html';

const events = {
	'change select' : 'save'
};

const initialState = {
	sorts: {
		name: 'По названию',
		author: 'По автору',
		year: 'По году издания',
		pages: 'По объему'
	},

	direction: {
		ASC: 'По возрастанию',
		DESC: 'По убыванию'
	}
};

class Header extends Component {
	constructor(sort) {
		super();
		this.el = '#sorts';
		this.state = {
			...initialState,
			selected: sort
		};

		$(store).on('updated', this.rerender.bind(this));
	}

	onInit() {
		this.events = events;
		this.delegateEvents();
	}

	render() {
		const template = Handlebars.compile(sortTemplate);

		Handlebars.registerHelper('selected', (value, options) => {
			if (this.state.selected.order == value || this.state.selected.direction == value) {
				return 'selected';
			}

			return '';
		});

		return template(initialState);
	}

	rerender() {
		this.state.selected = store.state.sort;
		this.$el.innerHTML = this.render();
		this.onInit();
	}

	save(e) {
		const key = e.target.getAttribute('name');

		this.dispatch('editSort', {
			...this.state.selected,
			[key]: e.target.value
		});
	}
}

export default Header;
