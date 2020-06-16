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

let dune = myLibrary[0] = new book('Dune', 'Frank Herbert', 412, true)

for (let i = 0; i < localStorage.length; i++) {
    let test = myLibrary[i] = JSON.parse(localStorage.getItem(i));
}

window.localStorage.setItem(0, JSON.stringify(dune));

function createRow(newBook) {
    let bookRow = document.createElement('div');
    bookRow.className = 'bookrow';
    let values = Object.values(newBook);
    console.log("values" + values)
    for (const prop of values) {
        let bookCell = document.createElement('div');
        console.log(prop + ": " + typeof(prop))
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



function newTable() {
    container.textContent = ''
    let headerRow = document.createElement('div')
    headerRow.className = 'bookrow header';
    let values = ['Title', 'Author', 'Pages', 'Read', 'Delete']

    for (let i = 0; i < values.length; i++) {
        let cell = document.createElement('div')
        cell.textContent = values[i]
        cell.className = 'bookcell'
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
    let author = prompt("Book author?")
    let pages = Number(prompt('Page count?'))
    let read = confirm('Have you read it? OK for yes, Cancel for No')
    let len = myLibrary.length;
    let storageObject = myLibrary[myLibrary.length] = new book(title, author, pages, read);
    delete storageObject.toggleRead;
    window.localStorage.setItem(len, JSON.stringify(storageObject));
    newTable();
}

newTable()

let addButton = document.querySelector('.addButton');
addButton.addEventListener('click', () => {
    addBookToLibrary()
})
