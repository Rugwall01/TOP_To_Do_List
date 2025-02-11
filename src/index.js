
import "./styles.css";


const page = document.querySelector('body');

const controls = document.createElement('div');
controls.classList.add('inputControls');

const content = document.createElement('div');
content.classList.add('content');

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = "Name your task here...";
nameInput.id = 'itemName';
nameInput.name = 'itemNameInp';


const descInput = document.createElement('textarea');
descInput.placeholder = "Write your task here...";
descInput.id = 'itemDesc';
descInput.name = 'itemDescInp';


const submitBtn = document.createElement('button');
submitBtn.id = 'submitBtn';
submitBtn.name = 'subBtn';




const logger = (state) => ({ log: () => console.log(`${state.item}:\n ${state.description}`) });
const deleter = (state) => ({ delete: () => TD_Library.splice(state, 1) });
const adder = (state) => ({ add: () => { state.itemNum = TD_Library.length + 1; TD_Library.push(state)} });
const displayer = (state) => ({ display: () => console.table(`${state.itemNum}: ${state.item}\n`, `${state.description}`) });

const TD_Library = [];


const display = () => TD_Library.forEach((listItem) => content.append(JSON.stringify(listItem)));


const toDoItem = (item, description) => {
    let state = {
        item,
        description,
        itemNum: 0,
    }

    return Object.assign(
        {},
        logger(state),
        deleter(state),
        adder(state),
        displayer(state),
    )
} 


submitBtn.addEventListener('click', () => {
    let itemName = nameInput.value;
    let itemDescription = descInput.value;

    const item = toDoItem(itemName, itemDescription);
    item.add(); 

    content.innerHTML = '';
    display();
});



controls.append(nameInput, descInput, submitBtn);
page.append(controls, content);