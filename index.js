let myLibrary = [];
let container = document.querySelector('#container');

function book(title, author, pages, read, info) {
    this.title = title
    this.author = author
    this.pages = pages
    this.info = function() {
        readresponse = "not read yet"
        if (read === true) {
            readresponse = "has been read" 
        }
        return title + " by " + author + ", " + pages + " pages, " + readresponse
    }
}

myLibrary[0] = new book('Dune', 'Frank Herbert', 412, true)


function createRow(newBook) {
    let bookRow = document.createElement('div');
    if (newBook === undefined) {
        newBook = book;
    } 
    for (const prop in newBook) {
        let bookCell = document.createElement('div');
        bookCell.innerHTML = newBook[prop];
        bookRow.appendChild(bookCell)
    }
    return bookRow;
}



// container.appendChild(createRow());
function newTable() {
    container.innerHTML = ''
    for (let i = 0; i < myLibrary.length; i++) {
        newRow = createRow(myLibrary[i])
        container.appendChild(newRow);
    }
}

function addBookToLibrary() {
    let title = prompt("Book title?")
    let author = prompt("Book author?")
    let pages = prompt('Page count?')
    let read = confirm('Have you read it? OK for yes, Cancel for No')
    myLibrary[myLibrary.length] = new book(title, author, pages, read)
    newTable();
}

let addButton = document.querySelector('.addButton');
addButton.addEventListener('click', () => {
    addBookToLibrary()
})

newTable()