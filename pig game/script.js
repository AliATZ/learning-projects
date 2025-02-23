'use strict';
//functions

let currentscore,activeplayer,scores,playing;
const diceEl = selectquery('.dice')

function reset(){
    currentscore=0;
    activeplayer=0;
    scores=[0,0];
    playing=true;
    selectquery('#score--0').textContent= 0;
    selectquery('#score--1').textContent= 0;
    selectelement('current--0').textContent=0;
    selectelement('current--1').textContent= 0;
    diceEl.classList.add('hidden');
    selectquery(`.player--0`).classList.remove('player--winner');
    selectquery(`.player--1`).classList.remove('player--winner');
    selectquery(`.player--0`).classList.add('player--active');
    selectquery(`.player--1`).classList.remove('player--active');

}

reset()
function selectquery(selector) {
    return document.querySelector(selector);
}

function selectelement(selector) {
    return document.getElementById(selector);
}

function switchplayer(){
    selectelement(`current--${activeplayer}`).textContent = 0;
    currentscore= 0;
    activeplayer= activeplayer === 0 ? 1 : 0;
    selectquery('.player--0').classList.toggle('player--active');
    selectquery('.player--1').classList.toggle('player--active');

}

function randomDice(){
    if (playing) {
        //random number
        const dice = Math.trunc(Math.random() * 6) + 1;
        //show dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //dice roll
        if (dice !== 1) {
            currentscore += dice;
            selectelement(`current--${activeplayer}`).textContent = currentscore;

        } else {
            switchplayer()

        }
    }
}

function holdbtn(){
    if (playing) {
        scores[activeplayer] += currentscore;
        selectelement(`score--${activeplayer}`).textContent = scores[activeplayer];

        if (scores[activeplayer] >= 100) {
            diceEl.classList.add('hidden');
            playing = false;
            selectquery(`.player--${activeplayer}`).classList.add('player--winner');
            selectquery(`.player--${activeplayer}`).classList.remove('player--active');
        } else {
            switchplayer()
        }
    }
}


//starting
selectquery('#score--0').textContent= '0';
selectquery('#score--1').textContent= '0';

diceEl.classList.add('hidden');


selectquery('.btn--new').addEventListener('click',reset )
selectquery('.btn--roll').addEventListener('click',randomDice)
selectquery('.btn--hold').addEventListener('click',holdbtn )

