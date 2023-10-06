const newBookDiv = document.querySelector(".newBook");
newBookDiv.addEventListener('click', openForm);

const cancel = document.getElementById("cancel");
cancel.addEventListener('click', closeForm);

const dialog = document.querySelector("dialog");

const form = document.getElementById("myForm");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function updateTable() {
    const books = document.querySelector(".books");

    books.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

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

        const readElement = document.createElement("div");
        readElement.classList.add("action");
        readElement.addEventListener("click", changeReadStatus);
        if (book.read === true) {
            readElement.textContent = "Read";
            readElement.setAttribute("id", "read");
        } else {
            readElement.textContent = "Read";
            readElement.setAttribute("id", "notRead");
        }

        bookDiv.appendChild(titleElement);
        bookDiv.appendChild(authorElement);
        bookDiv.appendChild(pagesElement);
        bookDiv.appendChild(deleteElement);
        bookDiv.appendChild(readElement);

        books.appendChild(bookDiv);
    }

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

function changeReadStatus(read) {
    if (read === true) {}
}

function openForm() {
    dialog.showModal();
}

function closeForm() {
    dialog.close();
}

function addBookToLibrary() {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const selectedRadio = document.querySelector('input[name="read"]:checked');
    const read = JSON.parse(selectedRadio.value);

    const book = new Book(title, author, pages, read);

    myLibrary.push(book);
    dialog.close();
    
    updateTable();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    addBookToLibrary();
});

