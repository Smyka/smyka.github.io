let bookTitles = ["Beginning Javascript", "Logic with ES6", "Javascript Ojbects Made Easy"];
let bookPrices = [19.99, 29.49, 999.99];
let bookAuthor = ["Smith", "Johson-Parker", "Westin" ];

const bookA = {
	book_title: bookTitles[0],
	book_author: bookAuthor[0],
	book_price: bookPrices[0],
	studentDiscountPrice: function() {
		let calculated = this.book_price * 0.8;
		calculated = calculated.toFixed(2);
		return "$" + calculated;
	}
}

const bookB = {
	book_title: bookTitles[1],
	book_author: bookAuthor[1],
	book_price: bookPrices[1],
	studentDiscountPrice: function() {
		let calculated = this.book_price * 0.8;
		calculated = calculated.toFixed(2);
		return "$" + calculated;
	}
};

const bookC = {
	book_title: bookTitles[2],
	book_author: bookAuthor[2],
	book_price: bookPrices[2],
	studentDiscountPrice: function() {
		let calculated = this.book_price * 0.8;
		calculated = calculated.toFixed(2);
		return "$" + calculated;
	}
};

console.log(bookA);
console.log(bookB);
console.log(bookC);

const booksArrayObject = {
	books: [bookA, bookB, bookC]
};

console.log(booksArrayObject);
booksArrayObject.books.forEach(function(item) { console.log(item.studentDiscountPrice()); })

let bookAJSON = JSON.stringify(bookA);
console.log(bookA, bookAJSON);

let booksArrayJSON = JSON.stringify(booksArrayObject);
console.log(booksArrayObject, booksArrayJSON);
