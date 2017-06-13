import { Component } from '../core/';
import Handlebars from 'handlebars';
import modalTemplate from '../templates/modal.html';

const events = {
	'click .primary' : 'onClickedYes',
	'click .cancel'	 : 'close'
};

class Modal extends Component {

	constructor(book) {
		super();
		this.el = '#modal';
		this.book = book;
	}

	render() {
		let template = Handlebars.compile(modalTemplate),
			elem = document.createElement('div');

		elem.setAttribute('id', 'modal');
		elem.innerHTML = template({book: this.book});

		document.documentElement.appendChild(elem);

		this.events = events;
		this.delegateEvents();
	}

	onClickedYes(e) {
		this.dispatch('submitted');
		this.close();
	}

	close() {
		document.documentElement.removeChild(this.$el);
	}
}

export default Modal;
