//Setup Variables
const todoApp = document.querySelector(".todo__app");
const todoInputEl = document.querySelector(".todo__input");
const todoListEl = document.querySelector(".todo__list");



/******************** ITEMS *********************/

//Create & Add Items

(function() {

    //Create Item

    let createItem = text => {

        let newItem = document.createElement("li");
        newItem.setAttribute("class", "todo__item");
        newItem.innerHTML = `
        <p class="todo__entry">${text}</p>
        <span class="todo__delete">X</span>
        <span class="todo__max"> Max Characters 80</span>
        <p class="todo__details" >.....</p>
        `;
        return newItem;
    };


    //Add Item

    todoInputEl.addEventListener("keypress", (event) => {

        if(event.keyCode == 13 && todoInputEl.value) {
            let newItem = createItem(todoInputEl.value);
            console.log(newItem);
            todoListEl.insertBefore(newItem, todoListEl.firstElementChild);
            todoInputEl.value = "";
        }
    });
})();

//Edit Items

(function(){

    //Add Contenteditable & Max Character Limit

    todoListEl.addEventListener("dblclick", (event) => {

        if(event.target.classList.contains("todo__entry")) {
            let todoEntry = event.target;
            todoEntry.setAttribute("contenteditable", true);

            let timer = setInterval(() => {
                if(todoEntry.textContent.length > 80) {
                    todoEntry.removeAttribute("contenteditable");
                    todoEntry.textContent = todoEntry.textContent.slice(0,80);
                    todoEntry.nextElementSibling.nextElementSibling.style.opacity = 1;
                }
                if(todoEntry.textContent.length <= 80 && todoEntry.hasAttribute("contenteditable")) {
                 todoEntry.nextElementSibling.nextElementSibling.style.opacity = 0;
                }
            }, 0);


            //Remove Contenteditable

            todoListEl.addEventListener("click", (event) => {

                if(!event.target.classList.contains("todo__entry")) {
                    todoEntry.removeAttribute("contenteditable");

                    if(!todoEntry.isContentEditable) {
                        clearTimeout(timer);
                    }
                }
            });

            todoEntry.addEventListener("keypress", (event) => {

                if(event.keyCode == 13 && todoEntry.isContentEditable) {
                    todoEntry.removeAttribute("contenteditable");
                }
            });
        }
    });


    //Delete Items

    todoListEl.addEventListener("click", (event) => {

        if(event.target.classList.contains("todo__delete")) {
            let todoDelete = event.target;
            todoDelete.parentElement.remove();
        }
    });
})();


/******************** Details *********************/


(function(){

    //Add Contenteditable & Max Character Limit

    todoListEl.addEventListener("dblclick", (event) => {

        if(event.target.classList.contains("todo__details")) {
            let todoDetails= event.target;
            todoDetails.setAttribute("contenteditable", true);

            let timer = setInterval(() => {
                if(todoDetails.textContent.length > 80) {
                    todoDetails.removeAttribute("contenteditable");
                    todoDetails.textContent = todoDetails.textContent.slice(0,80);
                    todoDetails.previousElementSibling.style.opacity = 1;
                    todoDetails.previousElementSibling.style.marginTop = 15 + "px";
                }
                if(todoDetails.textContent.length <= 80 && todoDetails.hasAttribute("contenteditable")) {
                    todoDetails.previousElementSibling.style.opacity = 0;
                    todoDetails.previousElementSibling.style.marginTop = 0 + "px";
                }
            }, 0);


            //Remove Contenteditable

            todoListEl.addEventListener("click", (event) => {

                if(!event.target.classList.contains("todo__details")) {
                    todoDetails.removeAttribute("contenteditable");

                    if(!todoDetails.isContentEditable) {
                        clearTimeout(timer);
                    }
                }
            });

            todoDetails.addEventListener("keypress", (event) => {

                if(event.keyCode == 13 && todoDetails.isContentEditable) {
                    todoDetails.removeAttribute("contenteditable");
                }
            });
        }
    });
})();





