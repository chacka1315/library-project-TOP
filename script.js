const MyLibrary = [];

function BookObjConstructor(author, title, page, readState) {
    if (!new.target) {
        throw Error("Make sure you have call me with New key")
    }
    this.author = author;
    this.title = title;
    this.page = page;
    this.readState = readState;
    this.id = crypto.randomUUID();
}

//toggle read status
BookObjConstructor.prototype.toggleReadState = function () {
    this.readState = !this.readState;
}


function addBookToMyLibrary(author, title, page, readState ) {
    const newBook = new BookObjConstructor(author, title, page, readState );
    MyLibrary.push(newBook);
}

//some initial books
addBookToMyLibrary("Napoleon Hill", "Think and grow rich", 450, true);
addBookToMyLibrary("David Deutsch", "The Begining of infinity", 500, false);
addBookToMyLibrary("Felix Dennis", "How to Get Rich", 400, false);
addBookToMyLibrary("Nassim Taleb", "Skin in the Game", 580, false);
addBookToMyLibrary("Mj DeMarco", "The millionaire Fastlane", 502, true);


// books displayer
const container = document.querySelector(".content");
function displayBook(Array) {
    for (const book of Array) {
        const cardDiv = document.createElement("div");
        const paraAuthor = document.createElement("p");
        paraAuthor.classList.toggle("author");
        const paraTitle = document.createElement("p");
        paraTitle.classList.toggle("title");
        const paraPage = document.createElement("p");
        paraPage.classList.toggle("page");
        const spanReadState = document.createElement("span");
        spanReadState.classList.toggle("spanReadState");

        //delete book button
        const deletBtn = document.createElement("button");
        deletBtn.setAttribute("data-id", book.id);
        deletBtn.setAttribute("id", "deleteBtn");
        deletBtn.type = "button";
        deletBtn.textContent = "Delete";

        //change reade state button
        const setReadStatetBtn = document.createElement("button");
        setReadStatetBtn.setAttribute("data-id", book.id);
        setReadStatetBtn.setAttribute("id", "setReadStateBtn");
        setReadStatetBtn.type = "button";
        if (book.readState) {
            setReadStatetBtn.textContent = "Read";
        }else{
            setReadStatetBtn.textContent = "Not Read"
        }
 
        paraAuthor.textContent = book.author;
        paraTitle.textContent = book.title;
        paraPage.textContent = `${book.page} P`;
        cardDiv.appendChild(paraAuthor);
        cardDiv.appendChild(paraTitle);
        cardDiv.appendChild(paraPage);
        cardDiv.appendChild(spanReadState);
        cardDiv.appendChild(deletBtn);
        cardDiv.appendChild(setReadStatetBtn);
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

//delete a book
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

//set read state
content.addEventListener("click", (e) => {
    if(e.target.matches("button[id=setReadStateBtn]")){
       const bookId = e.target.dataset.id; 
       const book = MyLibrary.find(book => book.id === bookId);
       if (book) {
        book.toggleReadState();
        content.textContent = "";
        displayBook(MyLibrary);
       }  
    }  
})

//confirm the book add
confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!formDialog.querySelector("form").checkValidity()) {
        formDialog.querySelector("form").reportValidity();
        return;
    }
    const inputValueTab = Array.from(inputs, input => input.value);
    addBookToMyLibrary(...inputValueTab);
    const NewBook = MyLibrary.slice(MyLibrary.length-1, MyLibrary.length);
    displayBook(NewBook);
    inputs.forEach(input => input.value ="");
    formDialog.close();
} )