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
let dune = myLibrary[0]
delete dune.toggleRead;

// populate list from localstorage, to be drawn from when creating table. 
for (let i = 0; i < localStorage.length; i++) {
    myLibrary[i] = JSON.parse(localStorage.getItem(i));
}

// if there are no entries in the library, create Dune row. 
window.localStorage.setItem(0, JSON.stringify(dune));

function createRow(newBook) {
    let bookRow = document.createElement('div');
    bookRow.className = 'bookrow';
    let values = Object.values(newBook);
    delete values.toggleRead;
    for (const prop of values) {
        let bookCell = document.createElement('div');
        let bookCellPar = document.createElement('p')
        // If it's the read status
        if (typeof(prop) === 'boolean') {
            let readingCheckBox = document.createElement('input')
            readingCheckBox.type = 'checkbox'
            readingCheckBox.className = 'readbox'
            readingCheckBox.value = 'readit'
            if (prop === true) {
                readingCheckBox.setAttribute('checked', true)
            }            
            bookCell.appendChild(readingCheckBox)
        } else {
            bookCellPar.textContent = prop;
            bookCell.appendChild(bookCellPar)
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
        for (let i = 0; i < myLibrary.length; i++) {
            let currBuk = myLibrary[i]
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

// Reload table with updated data
function newTable() {
    container.textContent = ''
    let headerRow = document.createElement('div')
    headerRow.className = 'bookrow header';
    let values = ['Title', 'Author', 'Pages', 'Read', 'Delete']

    for (let i = 0; i < values.length; i++) {
        let cell = document.createElement('div')
        cell.textContent = values[i]
        cell.className = 'headercell'
        headerRow.appendChild(cell)
    }
    container.appendChild(headerRow)

    for (let i = 0; i < myLibrary.length; i++) {
        newRow = createRow(myLibrary[i])
        window.localStorage.setItem(i, JSON.stringify(myLibrary[i]))
        container.appendChild(newRow);
    }
    for (let i = myLibrary.length; i < window.localStorage.length; i++) {
        localStorage.removeItem(i);
    }
}


function addBookToLibrary() {
    let title = prompt("Book title?")
    if (title === null || title === '') {
        return
    }
    let author = prompt("Book author?")
    if (author === null || author === '') {
        return
    }
    let pages = prompt('Page count?')
    if (pages === null || pages === '') {
        return
    }
    pages = Number(pages)
    let read = confirm('Have you read it? OK for yes, Cancel for No')
    let len = myLibrary.length;
    let storageObject = new book(title, author, pages, read);
    myLibrary[len] = storageObject
    delete storageObject.toggleRead;
    window.localStorage.setItem(len, JSON.stringify(storageObject));
    newTable();
}

// Initialize whole thing
newTable()

let readboxes = document.querySelectorAll('.readbox')
readboxes.forEach((readbox) => {
    readbox.addEventListener('click', () => {

        let title = readbox.parentNode.parentNode.firstChild.firstChild.textContent;
        if (readbox.checked === true) {
            for (let i = 0; i < localStorage.length; i++) {
                let entry = localStorage[i]
                entry = JSON.parse(entry)
                if (title === entry.title) {
                    myLibrary[i].read = true;
                    localStorage.setItem(i, JSON.stringify(myLibrary[i]));
                }   
            }
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let entry = localStorage[i]
                entry = JSON.parse(entry)
                if (title === entry.title) {
                    myLibrary[i].read = false;
                    localStorage.setItem(i, JSON.stringify(myLibrary[i]));
                }   
            }
        }
    })
})

let addButton = document.querySelector('.addButton');
addButton.addEventListener('click', () => {
    addBookToLibrary()
})
