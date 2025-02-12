
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

            const trashCanSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>`;
            const trashCan = document.createElement('div');
            trashCan.innerHTML = trashCanSVG;
            trashCan.classList.add('trashCan');
            trashCan.firstChild.classList.add('trashCanSVG');
            trashCan.firstChild.setAttribute('data-index', index);

            cardArray[index].innerHTML = `<p><span class="taskSpan1">TASK: </span> <span class="taskSpan2">${listItem.item}</span> <br> <span class="descSpan1">DESCRIPTION: </span> <span class="descSpan2">${listItem.description}</span></p>`;
            cardArray[index].append(trashCan);
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



window.onload = (e) => {
    pageSet.getNameInp().focus();
}

submitBtn.addEventListener('click', () => {
    let itemName = pageSet.getNameInp().value;
    let itemDescription = pageSet.getDescInp().value;

    const item = pageSet.toDoItem(itemName, itemDescription);
    item.add(); 

    pageSet.content.innerHTML = '';
    pageSet.createCard();
    pageSet.display();
    pageSet.getNameInp().focus();
});


document.addEventListener('click', (e) => {
    const card = e.target.closest('.displayCard');
    if (card) {
        console.log(card);
      card.classList.toggle('show');
    }
  });



//   function updateYPosition() {
//     const screenHeight = window.innerHeight; // Get the current screen height
//     const fullHeight = 1080; // Define the original height you want to normalize with (in pixels, or use vh equivalent)
//     const ratio = screenHeight / fullHeight; // Calculate the ratio of current height to original height
  
//     document.documentElement.style.setProperty('--screen-ratio', ratio);
//   }
  
//   window.addEventListener('resize', updateYPosition);
  
//   updateYPosition();
  