let myLibrary = [];
let container = document.querySelector('#container');

function book(title, author, pages, read, info) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.toggleRead = function() {
        if (read === true) {
            read = false;
        } else {
            read = true;
        }
    } 
}

myLibrary[0] = new book('Dune', 'Frank Herbert', 412, true)


function createRow(newBook) {
    let bookRow = document.createElement('div');
    bookRow.className = 'bookrow';
    let values = Object.values(newBook);
    values.pop();
    for (const prop of values) {
        let bookCell = document.createElement('div');

        // If it's the read status
        if (typeof(prop) === 'boolean') {
            let readingCheckBox = document.createElement('input')
            readingCheckBox.type = 'checkbox'
            if (prop === true) {
                readingCheckBox.setAttribute('checked', true)
            }            
            bookCell.appendChild(readingCheckBox)
        } else {
            bookCell.textContent = prop;
        }
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
                myLibrary.splice(i, 1);
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
