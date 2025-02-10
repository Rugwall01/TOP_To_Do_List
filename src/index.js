
const page = document.querySelector('body');

const content = document.createElement('div');
content.classList.add('content');

const logger = (state) => ({ log: () => console.log(`${state.item}:\n ${state.description}`) });
const deleter = (state) => ({ delete: () => TD_Library.splice(state, 1) });
const adder = (state) => ({ add: () => { state.itemNum = TD_Library.length + 1; TD_Library.push(state)} });
const displayer = (state) => ({ display: () => console.table(`${state.itemNum}: ${state.item}\n`, `${state.description}`) });

const TD_Library = [];


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

let itemName = "Complete Modules";
let itemDescription = "Go through The Odin Project at your current section and complete at least two modules";

const item1 = toDoItem(itemName, itemDescription);
item1.log();
item1.add();
console.log(TD_Library);
item1.display();
console.log(TD_Library);
item1.delete();
console.log(TD_Library);


const item2 = toDoItem(itemName, itemDescription);
const item3 = toDoItem(itemName, itemDescription);
const item4 = toDoItem(itemName, itemDescription);

item2.add();
console.log(TD_Library);
console.log(JSON.stringify(TD_Library));
console.log(structuredClone(TD_Library));
item3.add();
console.log(TD_Library);

TD_Library.forEach((listItem) => content.append(JSON.stringify(listItem)));

page.append(content);
