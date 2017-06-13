import { Component } 	from '../core/';
import Book 			from './Book';
import Handlebars 		from 'handlebars';
import grid 			from '../templates/books.html';

class BooksGrid extends Component {

	constructor() {
		super();
		this.el = '.books';
	}

	onInit() {
		$(store).on('updated', this.rerender.bind(this));
		this.addListeners();
		this.rendered = true;
	}

	addListeners() {
		this.books.map(book => {
			if (this.rendered) {
				book.onInit();
			}
			this.listenTo(book, 'edit', (e) => this.dispatch('editBook', e.detail));
			this.listenTo(book, 'delete', (e) => this.dispatch('deleteBook', e.detail));
		});
	}

	render() {
		this.books = store.getBooks().map(book => new Book(book, store.state.query));

		const template = Handlebars.compile(grid);

		return template({
			books: this.books
		});
	}

	rerender() {
		this.$el.innerHTML = this.render();
		this.addListeners();
	}

}

export default BooksGrid;

