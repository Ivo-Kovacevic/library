const dialog = document.querySelector("dialog");
const form = document.getElementById("myForm");

const newBookDiv = document.querySelector(".newBook");
newBookDiv.addEventListener('click', openForm);

const cancel = document.getElementById("cancel");
cancel.addEventListener('click', () => {
    dialog.close();
});

const myLibrary = [];

function openForm() {
    dialog.showModal();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    addBookToLibrary();

    form.reset();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = JSON.parse(document.querySelector('input[name="read"]:checked').value);

    const book = new Book(title, author, pages, read);

    myLibrary.push(book);
    dialog.close();
    
    updateTable();
}

function deleteBookFromLibrary() {
    const bookId = parseInt(this.parentElement.id, 10);
    myLibrary.splice(bookId, 1);
    updateTable();
}

function changeReadStatus() {
    const bookId = parseInt(this.parentElement.id, 10);
    const book = myLibrary[bookId];
    book.read = !book.read;
    updateTable();
}

function addBookButton(books) {

    const newBook = document.createElement("div");
    newBook.classList.add("newBook");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-book");

    const addBook = document.createElement("p");
    addBook.textContent = "+ add book";

    newBook.appendChild(icon);
    newBook.appendChild(addBook);

    books.appendChild(newBook);

    const newBookDiv = document.querySelector(".newBook");
    newBookDiv.addEventListener('click', openForm);
}

function updateTable() {
    const books = document.querySelector(".books");
    let index = 0;

    books.innerHTML = "";

    myLibrary.forEach((book) => {

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute("id", index);

        const titleElement = document.createElement("div");
        titleElement.textContent = `${book.title}`;
        titleElement.classList.add("title")
    
        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;
    
        const pagesElement = document.createElement("p");
        pagesElement.textContent = `Pages: ${book.pages}`;

        const deleteElement = document.createElement("div");
        deleteElement.textContent = "Delete";
        deleteElement.classList.add("action");
        deleteElement.setAttribute("id", "delete");
        deleteElement.addEventListener('click', deleteBookFromLibrary);

        const readElement = document.createElement("div");
        readElement.classList.add("action");
        if (book.read === true) {
            readElement.textContent = "Read";
            readElement.setAttribute("id", "read");
        } else {
            readElement.textContent = "Read";
            readElement.setAttribute("id", "notRead");
        }
        readElement.addEventListener('click', changeReadStatus);

        bookDiv.appendChild(titleElement);
        bookDiv.appendChild(authorElement);
        bookDiv.appendChild(pagesElement);
        bookDiv.appendChild(deleteElement);
        bookDiv.appendChild(readElement);

        books.appendChild(bookDiv);
        index++;
    });

    addBookButton(books);
}