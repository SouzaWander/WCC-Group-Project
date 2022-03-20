function menu_interaction(i){
    const m = document.getElementsByClassName("submenu")
    const aux = m[i].style.display
    hinde_submenus()
    
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

function getCategoriesSelect(){
    fetch('/api/categories')
    .then(data => data.json())
    .then(categories => {populateCategorySelect(categories)})
}

function populateCategorySelect(categories){
    const cat_select = document.getElementById("cat_select");
    for (let i = 0; i < categories.length;  i ++) {
        const cat_option = document.createElement("option");
        cat_option.value = categories[i].category;
        cat_option.innerText = cat_option.value 
        cat_select.append(cat_option);
    }
}

function getAuthorsSelect() {
    fetch('/api/authors')
    .then(data => data.json())
    .then(authors => {populateAuthorSelect(authors)})
}

function populateAuthorSelect(authors) {
    const sel_auth = document.getElementById("select_author");
    for (let i = 0; i < authors.length;  i ++) {
        const author_option = document.createElement("option");
        author_option.value = authors[i].name;
        author_option.innerText = author_option.value 
        sel_auth.append(author_option);
    }
}

function getAuthorsSelectSecond() {
    fetch('/api/authors')
    .then(data => data.json())
    .then(authors => {extraAuthorSelect(authors)})
}

function extraAuthorSelect(authors) {
    const sel_but = document.getElementById("fieldset_authors");
    const extra_author = document.createElement("select");
    extra_author.setAttribute("id", "select_author");
    sel_but.append(extra_author);

    for (let i = 0; i < authors.length;  i ++) {
        const author_option = document.createElement("option");
        author_option.value = authors[i].name;
        author_option.innerText = author_option.value 
        extra_author.append(author_option);
    }
}

function bookToAdd () {
    const book_id = 100
    const book_title = document.getElementById("book_title").value
    const book_image = document.getElementById("book_image").value
    const book_rating = document.getElementById("book_rating").value
    const book_nr_ratings = document.getElementById("book_nr_ratings").value
    const book_cat_box = document.getElementById("new_category").value
    const book_category = document.getElementById("cat_select").value
    //const book_author = document.getElementById("select_author").value
    const book_author = document.getElementById("fieldset_authors").getElementsByTagName("select") 
    const list_authors = []
    for (i=0; i < book_author.length; i++) {
        list_authors.push(book_author[i].value);
    } 

    let book_cat_to_add;
    if (book_cat_box.length == 0) {
        book_cat_to_add = book_category
    } else {
        book_cat_to_add = book_cat_box
    }

    const book_to_add = {
        id: book_id,
        title: book_title,
        image: book_image,
        rating: book_rating,
        numberrating: book_nr_ratings,
        category: book_cat_to_add,
        authors: list_authors
    }
    submitNewBook(book_to_add)
}

function submitNewBook(book_to_add) {
    fetch("/api/books", {
        method: "POST",
        headers: {
            'content-type':'application/json;charset=utf-8'
        },
        body: JSON.stringify(book_to_add)
    })
    window.location.href="index.html"
}

window.onload = () => {
    hinde_submenus()
    getCategoriesSelect()
    getAuthorsSelect()
}
