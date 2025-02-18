
import '../src/styles.css';

   


    
        const toDoForm = document.querySelector('form');
        const toDoInput = document.getElementById('toDoInput');
        const toDoListUL = document.getElementById('toDoList');

        let allToDos = getToDos();
        updateToDoList();


        function updateToDoList() {
            toDoListUL.innerHTML = "";
            allToDos.forEach((toDo, toDoIndex) => {
                const toDoItem = createToDoItem(toDo, toDoIndex);
                toDoListUL.append(toDoItem);
            })
        }
            
            

        function createToDoItem(toDo, toDoIndex){

            const toDoId = "todo-" + toDoIndex;
            const toDoLI = document.createElement('li');
            const toDoObjText = toDo.text; 
            toDoLI.className = "toDoListItem";
            toDoLI.innerHTML = `
                    <li class="toDo">
                        <input type="checkbox" id="${toDoId}">
                        <label for="${toDoId}" class="customCheckbox">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                        </svg>
                        </label>
                        <label for="${toDoId}" class="toDoText">
                            ${toDoObjText}
                        </label>
                        <button class="deleteBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondaryColor)">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                        </button>
                    </li>`;

            const deleteButton = toDoLI.querySelector('.deleteBtn');
            
            deleteButton.addEventListener('click', () => {
                deleteToDoItem(toDoIndex);
            })

            const checkbox = toDoLI.querySelector('input');
            checkbox.addEventListener('change', () => {
                allToDos[toDoIndex].completed = checkbox.checked;
                saveToDos();
            })

            checkbox.checked = toDo.completed;

            return toDoLI;

        };



        function deleteToDoItem(toDoIndex) {
            allToDos = allToDos.filter((_, i) => i !== toDoIndex);
            saveToDos();
            updateToDoList();
        }

        function addToDo() {
            const toDoText = toDoInput.value.trim();
            
            if(toDoText.length > 0) {
                const toDoObject = {
                    text: toDoText,
                    completed: false,
                };
                allToDos.push(toDoObject);
                updateToDoList();
                saveToDos();
                toDoInput.value = "";
                toDoInput.focus();
            }
        };

        function saveToDos() {
            const toDosJson = JSON.stringify(allToDos);
            localStorage.setItem("to-do-list-item", toDosJson);
        }

        function getToDos() {
            const storedToDos = localStorage.getItem("to-do-list-item") || "[]";
            return JSON.parse(storedToDos);
        }

        toDoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addToDo();
            });

        




    
    // To_Do_App.toDoForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     addToDo();
    // });