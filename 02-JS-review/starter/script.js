const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*
// Destructuring
const book = getBook(2);
const title = book.title;
const author = book.author;
console.log(title);
console.log(author);

const { pages, genres, hasMovieAdaptation, publicationDate } = book;
console.log(pages);
console.log(genres);

const [primaryGenre, secondaryGenre] = genres;
console.log(primaryGenre, secondaryGenre);

// Rest and Spread Operators
// Spread
const newGenre = [...genres, "anime", "cartoon"];
console.log(newGenre);

const updatedBook = {
  ...book,
  moviePublicationDate: '2023-06-15',
  hasMovieAdaptation: true,
}

console.log(updatedBook);

// Rest Operator
const [firstGenre, secondGenre, ...others] = newGenre;
console.log(firstGenre, secondGenre);

// Template Literals
const bookDescription = `The ${title} is written by ${author} in ${publicationDate.split("-")[0]}. `
console.log(bookDescription);

// Ternary Operator
const readingTime = book.pages >= 1000 ? "Long Read" : "Short Read";
const readingTime2 = getBook(1).pages >= 1000 ? "Long Read" : "Short Read";
console.log(readingTime);
console.log(readingTime2);

// Arrow Functions
const getYear = (publicationDate) => publicationDate.split("-")[0];
const newBookDescription = `The ${title} is written by ${author} in ${getYear(publicationDate)} and has ${hasMovieAdaptation ? "" : "not"} adopted a movie `
console.log(newBookDescription);

// Short Circuiting || && operators
console.log(true && "Some value");
console.log(false && "Some value");

console.log(hasMovieAdaptation && "This book has a movie");

console.log(true || false);
console.log(false || true);

const spanishTranslation = book.translations.spanish || "Not translated in spanish";
console.log(spanishTranslation);

// Nullish coersing Operator ??
console.log(book.reviews.librarything.reviewsCount || "No Data Available");
// Now we want 0 as result but it returning "No Data" because 0 is falsy value
// To fix this

console.log(book.reviews.librarything.reviewsCount ?? "No Data Available");

// Optional Chainig (?.)
const getTotalReviewCount = function (book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const librarything = (
    book.reviews?.librarything?.reviewsCount ?? 0
  );
  return goodreads + librarything
}

console.log(getTotalReviewCount(getBook(3)));
*/

// Map Method
const books = getBooks();
const titles = books.map(book => book.title);
console.log(titles);

const essentialData = books.map(book => ({ title: book.title, author: book.author }));
console.log(essentialData);

// Filter Method
const bigBooks = books.filter(book => book.pages > 500).filter(book => book.hasMovieAdaptation);
bigBooks.forEach(book => console.log(book.title));

const adventureBooks = books
  .filter(book => book.genres.includes('adventure'))
  .map(book => book.title);
console.log(adventureBooks);

// Reduce Method
const totalPages = books.reduce((acc, book) => acc + book.pages, 0);
console.log(totalPages);

// Sorting Arrays
const arr = [1, 6, 8, 6, 9, 2, 3, 7, 4];
// sort changes the actual array so to stop that from happening 
const sorted = arr.slice().sort((a, b) => a - b);
console.log(sorted);
console.log(arr);

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
console.log(sortedByPages);