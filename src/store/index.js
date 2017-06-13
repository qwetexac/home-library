const initialState = {
	query: '',
	books: {},
	sort: {
		order: 'name',
		direction: 'ASC'
	}
};

class Store {
	constructor() {
		this.state = localStorage.getItem('my-books') &&
			{
				...initialState,
				books: JSON.parse(localStorage.getItem('my-books'))
			} ||
			initialState;
	}

	saveState() {
		localStorage.setItem('my-books', JSON.stringify(this.state.books));

		$(this).trigger('updated');
	}

	getBooks() {
		let books = Object.values(this.state.books);

		if (this.state.query.length) {
			const pattern = new RegExp(this.state.query, 'ig');

			books = books.filter(book => book.name.match(pattern) || book.author.match(pattern));
		}

		books.sort((a, b) => {
			const param1 = isNaN(a[this.state.sort.order]) ? a[this.state.sort.order] : parseInt(a[this.state.sort.order]);
			const param2 = isNaN(b[this.state.sort.order]) ? b[this.state.sort.order] : parseInt(b[this.state.sort.order]);

			if (this.state.sort.direction == 'ASC') {
				if (param1 > param2) {
					return 1;
				}

				if (param1 < param2) {
					return -1;
				}
			} else {
				if (param1 > param2) {
					return -1;
				}

				if (param1 < param2) {
					return 1;
				}
			}

			return 0;
		});

		return books;
	}

	saveBook(book) {
		this.state.books[book.id] = book;

		this.saveState();
	}

	deleteBook(bookID) {
		delete this.state.books[bookID];

		this.saveState();
	}

	changeQuery(query) {
		this.state.query = query;
		$(this).trigger('updated');
	}

	changeSort(sort) {
		this.state.sort = sort;
		$(this).trigger('updated');
	}


}

export default Store;
