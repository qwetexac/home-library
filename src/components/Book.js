import { Component } 	from '../core/';
import Modal 			from './Modal';
import Handlebars 		from 'handlebars';
import bookTemplate 	from '../templates/book.html';

const events = {
	'click .edit' : 'edit',
	'click .delete' : 'delete'
};

class Book extends Component {

	constructor(state, query = '') {
		super();
		this.query = query.toLowerCase();
		this.el = `.book[data-key="${state.id}"]`;
		this.state = state;
	}

	onInit() {
		this.events = events;
		this.delegateEvents();
	}

	render() {
		const template = Handlebars.compile(bookTemplate);

		Handlebars.registerHelper('marked', (text) => {
			const index = text.toLowerCase().indexOf(this.query);

			if (index > -1) {
				return `${text.substring(0, index)}<span class="highlight">${text.substring(index, index + this.query.length)}</span>${text.substring(index + this.query.length)}`;
			}

			return text;
		});

		return template(this.state);
	}

	edit() {
		if (document.documentElement.clientWidth < 769) {
			window.scroll(0, 0);
		}

		this.dispatch('edit', this.state);
	}

	delete() {
		if (!this.submitted) {
			this.showModal();
			return;
		}

		this.dispatch('delete', this.state);
	}

	showModal() {
		this.modal = new Modal(this.state.name);
		this.modal.render();
		this.listenTo(this.modal, 'submitted', () => {
			this.submitted = true;
			this.delete();
		});
	}

}

export default Book;
