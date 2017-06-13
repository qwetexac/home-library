import { Component } from '../core/';
import Handlebars from 'handlebars';
import headerTemplate from '../templates/header.html';

const events = {
	'keyup input' : 'onInputChanged'
};

class Header extends Component {

	constructor() {
		super();
		this.el = 'header';
	}

	onInit() {
		this.events = events;
		this.delegateEvents();
	}

	render() {
		const template = Handlebars.compile(headerTemplate);

		return template({});
	}

	onInputChanged(e) {
		this.dispatch('queryChanged', e.target.value);
	}
}

export default Header;
