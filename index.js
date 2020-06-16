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
    
    deleteButton.addEventListener('click', () => {
        
        // remove this one from library
        let checkTitle = bookRow.firstChild.textContent;
        console.log(checkTitle)
        for (let i = 0; i < myLibrary.length; i++) {
            let currBuk = myLibrary[i]
            console.log(currBuk.title + 'currbuk title')
            if (checkTitle === currBuk.title) {
                myLibrary.splice(i, 1) // RETURN TO THIS. IT'S NOT EDITING THE LIBRARY IN THE RIGHT ORDER OF FUNCTIONS!
                newTable();
            }
        }
    })
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
