const MyLibrary = [];

function BookObjConstructor(title, author, page) {
    if (!new.target) {
        throw Error("Make sure you have call me with New key")
    }
    this.title = title;
    this.author = author;
    this.page = page;
    this.id = crypto.randomUUID();
}

function addBookToMyLibrary(title, author, page) {
    const newBook = new BookObjConstructor(title, author, page);
    MyLibrary.push(newBook);
}

addBookToMyLibrary("Think and grow rich", "Napoleon Hill", 450);
addBookToMyLibrary("The Begining of infinity", "David Deutsch", 500);
addBookToMyLibrary("How to Get Rich", "Felix Dennis", 400);

// books displayer
const container = document.querySelector(".container");
for (book of MyLibrary) {
    const cardDiv = document.createElement("div");
    cardDiv.textContent = `${book.title}, by ${book.author}; ${book.page} pages.`;
    cardDiv.classList.toggle("card");
    container.appendChild(cardDiv);
}
