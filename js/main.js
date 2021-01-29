//INPUT
const inputTodo = document.querySelector(".new-item-container__input");
const todoElement = document.querySelector(".items");
const clearBtn = document.querySelector(".clear-btn");
const itemsCounter = document.querySelector(".items-left");
const activeBtn = document.querySelector(".active-btn");
const completedBtn = document.querySelector(".completed-btn");
const showAllBtn = document.querySelector(".show-all-btn");

class Item {
    constructor(content, status) {
        this.content = content;
        this.status = status;
    }

    getFragment() {
        const item = document.createElement("DIV");
        const fragment = document.createDocumentFragment();

        item.classList.add("item");
        
        let textChecked;
        if ( this.status.includes("status-checked") ) textChecked = "text-checked";
        else textChecked = "";

        item.innerHTML = `
                    ${this.status}
                    <p class="item__content ${textChecked} "> ${this.content} </p>
                    <img src="images/icon-cross.svg" alt="" class="item__delete-btn">`;
        fragment.appendChild(item);
        return fragment;
    }
}

class Todo {
    add(item) {
        todoElement.appendChild(item.getFragment());
        this.updateNumberOfItems();
    }

    _delete(item) {
        item.parentElement.remove();
        this.updateNumberOfItems();
    }

    markAsCompleted(item) {
        item.parentNode.children[0].classList.toggle("status-checked");
        item.parentNode.children[0].innerHTML = `<img src="images/icon-check.svg" alt="check">`;
        item.parentElement.children[1].classList.toggle("text-checked");

    }

    markAsUncompleted(item) {
        item.parentNode.children[0].classList.toggle("status-checked");
        item.parentNode.children[0].innerHTML = null;
        item.parentElement.children[1].classList.toggle("text-checked");
    }

    clear() {
        const items = Array.from(todoElement.children);

        for (let i = 0; i < items.length; i++) {
            if (items[i].children[0].classList.contains("status-checked"))
                items[i].remove();
        }

        this.updateNumberOfItems();
    }

    updateNumberOfItems() {
        const size = todoElement.children.length;
        itemsCounter.innerHTML = size + " items left";
    }

    showActiveItems() {
        const items = todoElement.children;
        this.showAllItems();

        for (const item of items) {
            if (item.children[0].classList.contains("status-checked")) {
                item.classList.add("hidden");
            }
        }
    }

    showCompletedItems() {
        const items = todoElement.children;
        this.showAllItems();

        for (const item of items) {
            if (!item.children[0].classList.contains("status-checked")) {
                item.classList.add("hidden");
            }
        }
    }

    showAllItems() {
        const items = todoElement.children;
        for (const item of items) {
            item.classList.remove("hidden");
        }
    }

    turnOnBtn(e) {
        completedBtn.classList.remove("view-options__option-active");
        activeBtn.classList.remove("view-options__option-active");
        showAllBtn.classList.remove("view-options__option-active");

        e.classList.add("view-options__option-active");
    }
}

// EVENTS
const todo = new Todo();

inputTodo.addEventListener("keydown", function (e) {
 
    if (e.key === "Enter" && this.value != "") {
        const item = new Item(this.value, this.parentElement.children[0].outerHTML);
        todo.add(item);

        // Cliean
        inputTodo.value = null;
        this.classList.remove("text-checked");
        this.parentElement.children[0].classList.remove("status-checked");
        this.parentElement.children[0].innerHTML = "";
        
    }
});

inputTodo.parentElement.addEventListener("click", function (e) {
    console.log(e.target)
    if (e.target.classList.contains("item__status") === true ||
        e.target.parentElement.classList.contains("item__status") === true
        
    ) {
        if (e.target.parentElement.classList.contains("status-checked") === true)
            todo.markAsUncompleted(e.target.parentElement);
        else if (e.target.classList.contains("status-checked") === false)
            todo.markAsCompleted(e.target);

        
    }
});

todoElement.addEventListener("click", function (e) {
    if (e.target.classList.contains("item__delete-btn") === true) {
        todo._delete(e.target);
    } else if (
        e.target.classList.contains("item__status") === true ||
        e.target.parentElement.classList.contains("item__status") === true
    ) {

        if (e.target.parentElement.classList.contains("status-checked") === true)
            todo.markAsUncompleted(e.target.parentElement);
        else if (e.target.classList.contains("status-checked") === false)
            todo.markAsCompleted(e.target);
    } else {
        // console.log(e.target)
    }
});

clearBtn.addEventListener("click", () => {
    todo.clear();
});

activeBtn.addEventListener("click", (e) => {
    todo.turnOnBtn(e.target);
    todo.showActiveItems();
});

completedBtn.addEventListener("click", (e) => {
    todo.turnOnBtn(e.target);
    todo.showCompletedItems();
});

showAllBtn.addEventListener("click", (e) => {
    todo.turnOnBtn(e.target);
    todo.showAllItems();
});
