const person ={ 
    firstName : 'me',
    lastName: 'dont given a fuck',
    hobbies: ['music', 'nothing', 'nothing'],
    address: {
        street: 'main str',
        city: 'schlaraffenland'
    }
}
//console.log(person);
//console.log(person.hobbies[1]);
//const {firstName, lastName, address:{ city}} = person;
//console.log(address.city)

const todos = [
    {
        id: 1,
        text: 'make homescreen',
        isCompleted: true
    },
    {
        id: 2,
        text: 'learn new things',
        isCompleted: true
    },
    {
        id: 3,
        text: 'dentist appt',
        isCompleted: false
    }
];
/*
console.log(todos.lenghts);
const todoJSON = JSON.stringify(todos);
console.log(todoJSON)


for(let i=0; i< 5; i++){
    just for completion
}

for(let todo of todos)
{
    console.log(todo.text)
}


todos.forEach(function(todo) {
    console.log(todo.text)
});

const todoText = todos.map(function(todo) {
    return todo.text;
});
console.log(todoText)

const todoCompleted = todos.filter(function(todo) {
    return todo.isCompleted==true;
});
console.log(todoCompleted)

chain them



const todoCompleted = todos.filter(function(todo) {
    return todo.isCompleted==true;
}).map(function(todo){
    return todo.text;
});
console.log(todoCompleted)

*/

// const x=10;
// if(x === 10){
//     console.log('triple equal checks for datatype too')
// } else if(x==true || x ===true){
//     console.log(' use && and || ')
// }

// const color = x <10 ? 'turnary' : 'operator';

// switch(color){
//     case 'red':
//         console.log('look its switch case');
//         break;
//     default:
//         console.log('even a default')
// }

// function twoNumbers(num1 = 3, num2 = 5){
//     console.log('default values rule');
//     return num1 + num2;
// }

// //error function
// const addNums = (num1 = 3, num2 = 5)=>{
//     console.log('default values rule');
//     return num1 + num2;}

// const addNumsShort = (num1 = 3, num2 = 5)=> num1 + num2;

// console.log(addNumsShort(4,5));
//use in forEach
//todos.forEach((todo) => console.log(todo.id))


//some objects
// function Person(firstName, lastName,dob){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob);
// }
// // console.log(person1.getName())
// //even add functions after initiazing
// Person.prototype.getName = function(){
//     return `${this.firstName} ${this.lastName}`;
// }
//the same as above but prettier
// class Person{
//     constructor(firstName, lastName,dob){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob);
//     }
//     getName(){
//         return `${this.firstName} ${this.lastName}`;
//     }
// }


// const person1 = new Person('Jesus', 'Mustermensch', '12.24.0000');

// console.log(person1)

// //single element selectors
// const myForm = document.getElementById('my-form');
// const container = document.querySelector('.container');

// //multiple element selector
// const items = document.querySelectorAll('.item');
// // items.forEach((item) => console.log(item));

// const ul = document.querySelector('.items');
// // ul.remove();
// ul.firstElementChild.textContent = 'changed';
// ul.children[1].innerText = 'spoiled';
// ul.lastElementChild.innerHTML = '<h1>Hello</h1>'


// const btn = document.querySelector('.btn');

// btn.addEventListener('click', (e)=> {
//     e.preventDefault();
//     console.log('click');
//     document.querySelector('#my-form').style.background = '#ccc';
// });

const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();
    if(nameInput.value === '' || emailInput.value===''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}`));
        userList.appendChild(li);

        //clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}