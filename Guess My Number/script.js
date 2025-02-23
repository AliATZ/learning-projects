'use strict';

let randomnum = Math.trunc(Math.random() * 20) + 1
let score = 20;
let highscore = 0;

function guess() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    if (!guess) {
        document.querySelector('.message').textContent = 'no valid guess.';
    }
    //win
    else if (guess === randomnum) {
        document.querySelector('.message').textContent = 'correct guess.';
        document.querySelector('.number').textContent = randomnum;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        if (highscore < score) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        } //else if (guess !== randomnum) {
        //     if (score > 1) {
        //         document.querySelector('.message').textContent = guess > randomnum ? 'too high' : 'too low';
        //         score--
        //         document.querySelector('.score').textContent = score;
        //     } else {
        //         document.querySelector('.message').textContent = 'you lost the game.';
        //         document.querySelector('.score').textContent = score - 1;
        //         document.querySelector('body').style.backgroundColor = 'red';
        //     }
        // }


        //     //too high
        // } else if (guess > randomnum){
        //     if (score >1){
        //         document.querySelector('.message').textContent = 'too high.';
        //         score--;
        //         document.querySelector('.score').textContent = score;
        //     }
        //     //lose
        //     else {
        //         document.querySelector('.message').textContent = 'you lost the game.';
        //         document.querySelector('.score').textContent = score-1;
        //         document.querySelector('body').style.backgroundColor = 'red';
        //     }
        //
        //
        //     //too low
        // } else if (guess < randomnum){
        //     if (score >1){
        //         document.querySelector('.message').textContent = 'too low.';
        //         score--;
        //         document.querySelector('.score').textContent = score;
        //     }
        //     //lose
        //     else {
        //         document.querySelector('.message').textContent = 'you lost the game.';
        //         document.querySelector('.score').textContent = score-1;
        //         document.querySelector('body').style.backgroundColor = 'red';
        //     }
        // }
    } else if (guess !== randomnum) {
        if (score > 1) {
            document.querySelector('.message').textContent = guess > randomnum ? 'too high' : 'too low';
            score--
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'you lost the game.';
            document.querySelector('.score').textContent = score - 1;
            document.querySelector('body').style.backgroundColor = 'red';
        }
    }
    }


    document.querySelector('.check').addEventListener('click', guess);
    document.querySelector('.again').addEventListener('click', reset);

    function reset() {
        score = 20;
        document.querySelector('.score').textContent = score;
        randomnum = Math.trunc(Math.random() * 20) + 1
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').style.width = '15rem';
        document.querySelector('.message').textContent = 'Start guessing...';
        document.querySelector('.number').textContent = '?';
        document.querySelector('.guess').value = '';
    }
