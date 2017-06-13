import { Component } 	from '../core/';
import Header 			from './Header';
import Form 			from './Form';
import Sort 			from './Sort';
import BooksGrid 		from './BooksGrid';
import Store			from '../store/';
import appTemplate  	from '../templates/app.html';
import Handlebars 		from 'handlebars';

window.store = new Store();

class App extends Component {
	constructor() {
		super();
		this.store = Store;

		this.el = '#app-view';

		this.children = {
			header: new Header(),
			form: new Form(),
			sorts: new Sort(store.state.sort),
			books: new BooksGrid()
		};

		this.render();
	}

	onInit() {
		this.listenTo(this.children.books, 'editBook', this.editBook);
		this.listenTo(this.children.books, 'deleteBook', this.deleteBook);

		this.listenTo(this.children.header, 'queryChanged', this.queryChanged);

		this.listenTo(this.children.sorts, 'editSort', this.editSort);
	}

	render() {
		const template = Handlebars.compile(appTemplate);

		this.$el.innerHTML = template(this.children);

		$(window).trigger('loaded');
	}

	editBook(e) {
		const book = e.detail;

		this.children.form.update(book);
	}

	deleteBook(e) {
		const bookID = e.detail.id;

		store.deleteBook(bookID);
		this.children.form.update();
	}

	queryChanged(e) {
		const query = !!e.detail && e.detail || '';

		store.changeQuery(query);
	}

	editSort(e) {
		const sort = e.detail;

		store.changeSort(sort);
	}
}

export default App;
