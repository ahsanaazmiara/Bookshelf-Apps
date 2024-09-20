document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');
    const checkboxIsComplete = document.getElementById('bookFormIsComplete');
    const submitButton = document.getElementById('bookFormSubmit');
    const submitButtonText = submitButton.querySelector('span');

    checkboxIsComplete.addEventListener('change', function () {
        submitButtonText.innerText = checkboxIsComplete.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
    });

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
        clearForm();
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        searchBook(searchForm.querySelector('input').value);
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
}

const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookList = document.getElementById('incompleteBookList');
    incompleteBookList.innerHTML = '';

    const completeBookList = document.getElementById('completeBookList');
    completeBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookList.append(bookElement);
        } else {
            completeBookList.append(bookElement);
        }
    }
});

function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;
    bookTitle.setAttribute('data-testid', 'bookItemTitle');

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = 'Penulis: ' + bookObject.author;
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');

    const bookYear = document.createElement('p');
    bookYear.innerText = 'Tahun: ' + bookObject.year;
    bookYear.setAttribute('data-testid', 'bookItemYear');

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('inner');
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(bookContainer);
    container.setAttribute('id', `book-${bookObject.id}`);
    container.setAttribute('data-testid', 'bookItem');
    container.setAttribute('data-bookid', bookObject.id);

    if (bookObject.isComplete) {
        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('incomplete-button');
        incompleteButton.innerText = 'Belum Selesai Dibaca';
        incompleteButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.innerText = 'Hapus Buku';
        deleteButton.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(incompleteButton, deleteButton);
    } else {
        const completeButton = document.createElement('button');
        completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        completeButton.innerText = 'Selesai Dibaca';
        completeButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.innerText = 'Hapus Buku';
        deleteButton.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(completeButton, deleteButton);
    }

    return container;
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBook(bookId) {
    return books.find(bookItem => bookItem.id === bookId) || null;
}

function removeBookFromCompleted(bookId) {
    const confirmation = confirm('Apakah Anda yakin ingin menghapus buku ini?');
    if (confirmation) {
        const bookTarget = findBookIndex(bookId);
        if (bookTarget === -1) return;

        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function findBookIndex(bookId) {
    return books.findIndex(book => book.id === bookId);
}

function searchBook(keyword) {
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    renderBooks(filteredBooks);
}

function renderBooks(bookList) {
    const incompleteBookList = document.getElementById('incompleteBookList');
    incompleteBookList.innerHTML = '';

    const completeBookList = document.getElementById('completeBookList');
    completeBookList.innerHTML = '';

    for (const bookItem of bookList) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            incompleteBookList.append(bookElement);
        } else {
            completeBookList.append(bookElement);
        }
    }
}

function clearForm() {
    document.getElementById('bookFormTitle').value = '';
    document.getElementById('bookFormAuthor').value = '';
    document.getElementById('bookFormYear').value = '';
    document.getElementById('bookFormIsComplete').checked = false;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem('bookshelf', parsed);
}

function isStorageExist() {
    return typeof(Storage) !== 'undefined';
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem('bookshelf');
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}
