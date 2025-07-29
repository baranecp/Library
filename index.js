const myLibrary = [];
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("close-dialog");
const form = dialog.querySelector('form');


function Book(title, author, read, id) {
    if (!new.target) {
        throw Error("Use the 'new' operator!");
    }
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = id;
}

Book.prototype.toggleRead = function () {
    this.read = this.read === 'Read' ? 'Not read yet' : 'Read';
}

function addBookToLibrary(title, author, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, read, id);
    myLibrary.push(book);
}

function displayBooks() {
    document.querySelector('.books').innerHTML = myLibrary.map(book =>
        `
        <div class="book" data-id=${book.id}>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p class="read-toggle" data-id=${book.id}>${book.read}</p>
            <a class="remove">X</a>
        </div>
        `
    ).join('')
}

showBtn.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener("click", () => {
    dialog.close();
    dialog.querySelector('form').reset();
});

//Handle add book
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const read = form.querySelector('#read').value;

  addBookToLibrary(title, author, read);

  dialog.close();
  form.reset();
  displayBooks();
});

//Handle remove
document.querySelector('.books').addEventListener('click', (e) => {
    if(e.target.classList.contains('remove')) {
        const bookId = e.target.closest('.book').dataset.id;
        const index = myLibrary.findIndex(book => book.id === bookId);
        if(index !== -1) {
            myLibrary.splice(index, 1);
            displayBooks();
        }
    }

    //Handle toggle read
    if(e.target.classList.contains('read-toggle')) {
        const bookId = e.target.dataset.id;
        const book = myLibrary.find(book => book.id === bookId);
        if(book) {
            book.toggleRead();
            displayBooks();
        }
    }
})
