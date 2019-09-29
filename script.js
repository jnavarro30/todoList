



/******************** ITEMS & Details*********************/

(function() {

    //Setup Variables
    const todoApp = document.querySelector(".todo__app");
    const todoInputEl = document.querySelector(".todo__input");
    const todoListEl = document.querySelector(".todo__list");
    
    
    //Edit Item/Details & Max Character Length

    let textObj = {
        editText: (event) => {
            if(event.target.classList.contains("text")) {
                let text = event.target;
                text.setAttribute("contenteditable", true);

                text.addEventListener("keypress",(event) => {
                    if(event.keyCode == 13) {
                        text.removeAttribute("contenteditable");
                    }
                });
            }
        },
        maxLength: (event) => {
            if(event.target.classList.contains("text")) {
                let text = event.target;
                
                if(text.textContent.length > 50) {
                    text.textContent = text.textContent.slice(0,50);
                    text.removeAttribute("contenteditable");
                    let elem =text.parentElement.parentElement.lastElementChild;
                    elem.classList.add("max");
                    elem.classList.remove("delete__icon");
                    elem.textContent = "MAX!";

                    setTimeout(() => {
                        elem.classList.add("delete__icon");
                    elem.classList.remove("max");
                    elem.textContent = "X";
                    }, 2000);
                }
            }
            
        }
    };

    todoListEl.addEventListener("keypress", textObj.maxLength);
    todoListEl.addEventListener("dblclick", textObj.editText);

    //Item Settings

    let itemsObj = {
        createItem: (text) => {
            let newItem = document.createElement("li");
            newItem.setAttribute("class", "todo__item");
            newItem.innerHTML = `
            <p class="todo__entry box">
            <span class="text__entry text">${text}</span>
            </p>
            <p class="todo__details box">
            <span class="text__details text">...</span>
            </p>
            <span class="todo__delete delete__icon"><span class="todo__max icon">Ma</span>X</span>`;
            return newItem;
        },
        addItem: (event) => {
            if(event.keyCode == 13 && todoInputEl.value) {
                let newItem = itemsObj.createItem(todoInputEl.value);
                todoListEl.insertBefore(newItem, todoListEl.children[0]);
                todoInputEl.value = "";
            }
        },
        deleteItem: (event) => {
            if(event.target.classList.contains("delete__icon")) {
                let del = event.target;
                del.parentElement.remove();
            }
        }
    };

    todoInputEl.addEventListener("keypress", itemsObj.addItem);
    todoListEl.addEventListener("click", itemsObj.deleteItem);

    //Detail Settings

    let detailsObj = {
        toggleDetails: (event) => {
            if(event.target.classList.contains("todo__entry")) {
                let entry = event.target;
                entry.nextElementSibling.classList.toggle("show");
            }else if(event.target.classList.contains("text__entry")) {
                let text = event.target;
                text.parentElement.nextElementSibling.classList.toggle("show");
            }
        }
    };

    todoListEl.addEventListener("click",  detailsObj.toggleDetails);
    
})();





