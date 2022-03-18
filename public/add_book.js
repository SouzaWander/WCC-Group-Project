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
    console.log(authors)
    const sel_auth = document.getElementById("select_author");
    for (let i = 0; i < authors.length;  i ++) {
        const author_option = document.createElement("option");
        author_option.value = authors[i].name;
        console.log(authors[i].name)
        author_option.innerText = author_option.value 
        sel_auth.append(author_option);
    }
}

function extraAuthorSelect() {
    const extra_author = document.createElement("select");
    extra_author.setAttribute("id", "select_author");
    document.body.appendChild(extra_author);
    const author_options = document.createElement("option");

}

function submit_new_book () {
    document.getElementById("add_book_button").addEventListener("click", addNewBook);
}

function addNewBook() {
    document.getElementById("add_book_form").submit();

}

window.onload = () => {
    hinde_submenus()
    getCategoriesSelect()
    getAuthorsSelect()
}
