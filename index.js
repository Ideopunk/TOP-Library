let myLibrary = [];
let container = document.querySelector('#container');

function book(title, author, pages, read, info) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

myLibrary[0] = new book('Dune', 'Frank Herbert', 412, true)


function createRow(newBook) {
    let bookRow = document.createElement('div');
    bookRow.className = 'bookrow'
    if (newBook === undefined) {
        newBook = book;
    } 
    for (const prop in newBook) {
        let bookCell = document.createElement('div');
        bookCell.textContent = newBook[prop];
        bookCell.className = 'bookcell'
        bookRow.appendChild(bookCell)
    }
    let deletionCell = document.createElement('div')
    deletionCell.className = 'bookcell'
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'x';
    deleteButton.className = 'deletionButton'
    deleteButton.id = 'deletionButton'
    deletionCell.appendChild(deleteButton)
    bookRow.appendChild(deletionCell)
    return bookRow;
}


function newTable() {
    container.textContent = ''
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

newTable()

let addButton = document.querySelector('.addButton');
addButton.addEventListener('click', () => {
    addBookToLibrary()
})
console.log(addButton)

let deletionButtons = document.querySelectorAll('.deletionButton');
console.log(deletionButton)
deletionButtons.forEach((button) => {
    console.log(button);
    deletionButton.addEventListener('click', () => {
        
        
        alert('yo')
        // remove this one from library
        let rowToDelete = button.parentNode;
        let offendingTitle = rowToDelete.firstChild.textContent;
        for (let i = 0; i < myLibrary.length; i++) {
            console.log("offendingTitle: " + offendingTitle + "Current title in loop: " + myLibrary[i].title)
            if (offendingTitle = myLibrary[i].title) {
                myLibrary.splice(i, 1);
            }
        }

        // then make a new table
        newTable()
    })
})

