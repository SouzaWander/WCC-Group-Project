// This is the code for the client application
// This does not contain the solution to the second assignment 

function createBookBox(book) {
    const li = document.createElement("LI")
    const div1 =document.createElement("div")

    
    const img =document.createElement("img")
    img.src = book.image
    li.appendChild(div1)
    div1.appendChild(img)

    const div2 =document.createElement("div")
    const title = document.createElement("h2")
    title.innerText = book.title
    const author = document.createElement("h3")
    author.innerText = book.authors
    div2.appendChild(title)
    div2.appendChild(author)
    div1.appendChild(div2)

    const div3 =document.createElement("div")

    //stars
    for(let i = 0; i < book.rating; i++){
        const star =document.createElement("span")
        star.innerText="★"
        star.className="star yellowstar"
        div3.appendChild(star)
        console.log("here")
    }

    for(let i = 0; i < 5-book.rating; i++){
        const star =document.createElement("span")
        star.innerText="★"
        star.className="star"
        div3.appendChild(star)
    }

    const n_ratings =document.createElement("span")
    n_ratings.innerText = "("+book.numberrating+")" 

    div3.appendChild(n_ratings)
    
    div1.appendChild(div3)
    
    //button to add book to the wishlist
    const button_add =document.createElement("button")
    button_add.id = "add_btn"
    button_add.innerText = "Add to wishlist"

    button_add.onclick = function(){add_wish_list(book.title)}
    
    
    div1.appendChild(button_add)

    
    return li
}

function add_wish_list(book){
    const wishlist = document.getElementById("wish_list")
    const a = document.createElement("a")
    const p= document.createElement("p")
    p.innerText=book
    a.appendChild(p)

    //remove button
    const rm_b = document.createElement("button")
    rm_b.id = "rm_btn"
    rm_b.onclick = function(){wishlist.removeChild(a)}
    rm_b.innerText = "Remove from wishlist"
    a.appendChild(rm_b)
    wishlist.appendChild(a)
}


function fillBooks(books) {
    console.log(books)
    const lista = document.getElementById("listofbooks")
    for (const idx in books) {
        const li = createBookBox(books[idx])
        li.id = "book" + idx
        lista.append(li)
    }
}

function search_book(){
    let input,filter, ul, li, title, i, textValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    ul = document.getElementById('listofbooks');
    li = ul.getElementsByTagName('li')

    for(i=0; i < li.length;i++){
        title = document.getElementById("book"+i).getElementsByTagName("h2")[0];
        textValue = title.innerText
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
    }
}

function menu_interaction(i){
    const m = document.getElementsByClassName("submenu")
    const aux = m[i].style.display
    console.log(aux)
    hinde_submenus()
    
    console.log(m[i])
    if(aux==="none"){
        m[i].style.display=""
    }
}


function hinde_submenus(){
    
    const menuitemlist = document.getElementById("menuitemlist");
    li = menuitemlist.getElementsByClassName("submenu");
    for(let i=0; i < li.length; i++){
        li[i].style.display='none'
    }
}

function loadAndFillBooks() {

    fetch('./books.json')
    .then(data => data.json())
    .then(books => { fillBooks(books) })
}

function addNewBook() {
    fetch("/api/books", {
        method: "POST",
        headers: {
            'content-type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({title:"Bla"})
    })
}

function installOtherEventHandlers() {
    // Events to open and close menus
    
    // Events to call loadAndFillBooks with a new search value
}

window.onload = () => {
    hinde_submenus()
    loadAndFillBooks() // If no parameter is given, search is undefined
    installOtherEventHandlers()
}

