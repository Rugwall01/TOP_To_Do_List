
import "./styles.css";



const pageSet = (function () {
    
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

    const cardArray = [];

    const createCard = () => TD_Library.forEach((listItem) => {
        const index = TD_Library.indexOf(listItem);
        const displayCard = document.createElement('div');
        displayCard.classList.add('displayCard');
        displayCard.id = `dC${index + 1}`;
        cardArray.push(displayCard);

    })


    const display = () => {
        TD_Library.forEach((listItem) => {
            const index = TD_Library.indexOf(listItem);
            cardArray[index].innerHTML = `Task: ${listItem.item} <br> Description: ${listItem.description}`;
            content.append(cardArray[index]);
    });
    }


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


    const getPage = () => page;
    const getControls = () => controls;
    const getContent = () => content;
    const getNameInp = () => nameInput;
    const getDescInp = () => descInput;


    controls.append(nameInput, descInput, submitBtn);
    page.append(controls, content);

    return { content, getPage, getContent, getControls, getNameInp, getDescInp, createCard, display, toDoItem }


})();





submitBtn.addEventListener('click', () => {
    let itemName = pageSet.getNameInp().value;
    let itemDescription = pageSet.getDescInp().value;

    const item = pageSet.toDoItem(itemName, itemDescription);
    item.add(); 

    pageSet.content.innerHTML = '';
    pageSet.createCard();
    pageSet.display();
});