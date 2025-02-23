'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);
//
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


function formatMovementDate (date, locale){
    function calcDaysPassed(date1 , date2){
        return  Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
    }

    const daysPassed = calcDaysPassed(new Date(), date)

    if (daysPassed === 0) {
        return 'today'
    }
    if (daysPassed === 1) {
        return 'yesterday'
    }
    if (daysPassed <= 7) {
        return `${daysPassed} days ago`
    }else {
        // const day = `${date.getDate()}`.padStart(2 , '0');
        // const month = `${date.getMonth() + 1}`.padStart(2 , '0').padStart(2, '0');
        // const year = date.getFullYear();
        // return  labelDate.textContent = `${day}/${month}/${year},`;
        console.log(date)
        return new Intl.DateTimeFormat(locale).format(date);

    }


}
function curencyFormat(value,locale,currency){
    return new Intl.NumberFormat(locale,{
        style: 'currency',
        currency: currency,
    }).format(value)
}


const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const combinedMovsDates = acc.movements.map((mov, i) => ({
        movement: mov,
        movementDate: acc.movementsDates.at(i),
    }));

    if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

    combinedMovsDates.forEach(function (obj, i) {
        const { movement, movementDate } = obj;
        const type = movement > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(movementDate);
        const displayDate = formatMovementDate(date, acc.locale);

        const formattedMov = curencyFormat(movement, acc.locale, acc.currency);

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

// const calcDisplayBalance = function (acc) {
//     acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//     labelBalance.textContent = curencyFormat(acc.balance, acc.locale, acc.currency);
// };

function calcBalance(acc){
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

    /*const balance = acc.reduce(function (acc, cur){
        return acc + cur;
    },0)*/
    labelBalance.textContent = curencyFormat(acc.balance, acc.locale, acc.currency );
}



function calcSummary(input){
    const income = input.movements.filter(mov => mov >0).reduce((acc, cur) => acc + cur ,0)
    labelSumIn.textContent=curencyFormat(income, input.locale, input.currency )

    const outcome = input.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur ,0)
    labelSumOut.textContent=curencyFormat(Math.abs(outcome), input.locale, input.currency )


    const interest = input.movements.filter(function (move){return move > 0}).map(deposit => (deposit * input.interestRate) /100).filter((int) => int>=1).reduce((acc, cur) => acc + cur ,0);
    labelSumInterest.textContent= curencyFormat(interest, input.locale, input.currency )


}


function createUserName(accs){
    accs.forEach(function (acc){
        acc.username = acc.owner.toLowerCase().split(' ')
            .map(function (name){
                return name[0]
            }).join('')
    })

}
createUserName(accounts)

let currentAccount, timer;




function updateUI(acc){
    displayMovements(acc)
    calcBalance(acc)
    calcSummary(acc)
}

function startLogOutTimer(){
    function tick (){
        const min = String(Math.trunc(time/60)).padStart(2 , '0');
        const sec =String( time%60).padStart(2 , '0');
        //print remaining time
        labelTimer.textContent = `${min}:${sec}`;

        //stop timer
        if (time ===0 ){
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }

        time--;

    }


    //set time out to 5min

    let time = 100;

    //call timer every second
    tick();
    const timer =setInterval(tick, 1000)
    return timer;

}

// function loginInfo(e){
//
// }

btnLogin.addEventListener('click', function (e){
    e.preventDefault()

    currentAccount= accounts.find( acc => acc.username === inputLoginUsername.value);
    if (currentAccount?.pin === Number(inputLoginPin.value )){
        labelWelcome.textContent = `welcome ${currentAccount.owner}`;
        containerApp.style.opacity = 100;
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur()
        if (timer){
            clearInterval(timer)
        }
        timer =startLogOutTimer()
        updateUI(currentAccount)
        const date = new Date();
        const options ={
            hour : 'numeric',
            minute : 'numeric',
            day : 'numeric',
            month : 'numeric',
            year : 'numeric',
            // weekDay : 'long',
        }
        // const local = navigator.language;
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(date);


        // const hour = `${date.getHours()}`.padStart(2, '0');
        // const minute = `${ date.getMinutes()}`.padStart(2, '0');
        // const day = `${date.getDate()}`.padStart(2 , '0');
        // const month = `${date.getMonth() + 1}`.padStart(2 , '0');
        // const year = date.getFullYear();
        // labelDate.textContent = `${day}/${month}/${year},${hour}:${minute} `;

    }

})

btnTransfer.addEventListener('click', function (e){
    e.preventDefault()
    const amount = Number(inputTransferAmount.value);
    const receiver = accounts.find(acc => acc.username=== inputTransferTo.value) ;
    inputTransferAmount.value =inputTransferTo.value =''

    if (amount > 0 && receiver && currentAccount.balance >= amount && receiver?.username !== currentAccount.username){
        currentAccount.movements.push(-amount);
        receiver.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiver.movementsDates.push(new Date().toISOString());


        updateUI(currentAccount)

        clearInterval(timer);
        timer = startLogOutTimer();
    }
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);


        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = `Log in to get started`;
});
 btnLoan.addEventListener('click', function (e){
     e.preventDefault()

     const amount = Math.floor(inputLoanAmount.value);


     if (amount>0 && currentAccount.movements.some(mov =>mov >= amount/10)){
         setTimeout(function ()
         {currentAccount.movements.push(amount);
             currentAccount.movementsDates.push(new Date().toISOString());

         updateUI(currentAccount);

         },2500)
     }
     inputLoanAmount.value = '';
 })
let sorted = false;

btnSort.addEventListener('click', function (e){
    e.preventDefault()
    displayMovements(currentAccount, !sorted)
    sorted = !sorted;
})
