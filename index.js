const myLibrary = [];
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementById("close-dialog");
const form = dialog.querySelector("form");

class Book {
  constructor(title, author, isRead, id) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.id = id;
  }

  set title(newTitle) {
    if (typeof newTitle === "string" && newTitle.length > 0) {
      this._title = newTitle;
    } else {
      throw new Error("Title must be a non-empty string!");
    }
  }

  set author(newAuthor) {
    if (typeof newAuthor === "string" && newAuthor.length > 0) {
      this._author = newAuthor;
    } else {
      throw new Error("Author must be a non-empty string!");
    }
  }

  set isRead(newIsRead) {
    this._isRead = Boolean(newIsRead);
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get isRead() {
    return this._isRead;
  }

  get readStatus() {
    return this._isRead ? "Read" : "Not read yet";
  }

  toggleRead() {
    this._isRead = !this._isRead;
  }
}

function addBookToLibrary(title, author, readValue) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, readValue, id);
  myLibrary.push(book);
}

function displayBooks() {
  document.querySelector(".books").innerHTML = myLibrary
    .map(
      (book) =>
        `
        <div class="book" data-id=${book.id}>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p class="read-toggle" data-id=${book.id}>${book.readStatus}</p>
            <a class="remove">X</a>
        </div>
        `
    )
    .join("");
}

showBtn.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener("click", () => {
  dialog.close();
  dialog.querySelector("form").reset();
});

//Handle add book
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = form.querySelector("#title").value.trim();
  const author = form.querySelector("#author").value.trim();
  const readValue = form.querySelector("#read").value;

  const isRead = readValue === "Read";
  addBookToLibrary(title, author, isRead);

  dialog.close();
  form.reset();
  displayBooks();
});

//Handle remove
document.querySelector(".books").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const bookId = e.target.closest(".book").dataset.id;
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  }

  //Handle toggle read
  if (e.target.classList.contains("read-toggle")) {
    const bookId = e.target.dataset.id;
    const book = myLibrary.find((book) => book.id === bookId);
    if (book) {
      book.toggleRead();
      displayBooks();
    }
  }
});
