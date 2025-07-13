const MyLibrary = [];

function BookObjConstructor(author, title, page, readState) {
    if (!new.target) {
        throw Error("Make sure you have call me with New key")
    }
    this.author = author;
    this.title = title;
    this.page = page;
    this.readState = readState==="yes"? "Already read" : "Not read yet";
    this.id = crypto.randomUUID();
}

function addBookToMyLibrary(author, title, page, readState ) {
    const newBook = new BookObjConstructor(author, title, page, readState );
    MyLibrary.push(newBook);
}

//some initial books
addBookToMyLibrary("Napoleon Hill", "Think and grow rich", 450, "yes");
addBookToMyLibrary("David Deutsch", "The Begining of infinity", 500, "no");
addBookToMyLibrary("Felix Dennis", "How to Get Rich", 400, "No");


// books displayer
const container = document.querySelector(".content");
function displayBook(Array) {
    for (const book of Array) {
        const cardDiv = document.createElement("div");
        const paraAuthor = document.createElement("p");
        const paraTitle = document.createElement("p");
        const ParaPage = document.createElement("p");
        const spanReadState = document.createElement("span");

        //delete book button
        const deletBtn = document.createElement("button");
        deletBtn.setAttribute("data-id", book.id);
        deletBtn.setAttribute("id", "deleteBtn");
        deletBtn.type = "button";
        deletBtn.textContent = "Delete";

        //change reade state button
        paraAuthor.textContent = book.author;
        paraTitle.textContent = book.title;
        ParaPage.textContent = `${book.page} P`;
        spanReadState.textContent = book.readState;
        cardDiv.appendChild(paraAuthor);
        cardDiv.appendChild(paraTitle);
        cardDiv.appendChild(ParaPage);
        cardDiv.appendChild(spanReadState);
        cardDiv.appendChild(deletBtn);
        cardDiv.classList.toggle("card");
        container.appendChild(cardDiv);    
    }
}
displayBook(MyLibrary);

//Modal for adding new book
const showFormDialog = document.querySelector("#showFormDialog");
const formDialog = document.querySelector("#formDialog");
const confirmBtn = document.querySelector("#confirmBtn");
const outputBox = document.querySelector("output");
const inputs = formDialog.querySelectorAll("input");
const cancelBtn = formDialog.querySelector("button[type='button']");
const content = document.querySelector(".content");
showFormDialog.addEventListener( "click", () => {
    formDialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    inputs.forEach(input => input.value ="");
    formDialog.close();
} )

content.addEventListener("click", (e) => {
    if (e.target.matches("button[id=deleteBtn]")){
        const bookId = e.target.dataset.id;
        const bookIndex = MyLibrary.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            MyLibrary.splice(bookIndex, 1);
            container.textContent = "";
            displayBook(MyLibrary);
        }
    }
})


confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValueTab = Array.from(inputs, input => input.value);
    addBookToMyLibrary(...inputValueTab);
    const NewBook = MyLibrary.slice(MyLibrary.length-1, MyLibrary.length);
    displayBook(NewBook);
    inputs.forEach(input => input.value ="");
    formDialog.close();
} )