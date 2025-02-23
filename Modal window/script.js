'use strict';


// Function to simplify querySelector
function query(selector) {
    return document.querySelector(selector);
}
function queryall(selector) {
    return document.querySelectorAll(selector);
}
function openModal(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function closeModal(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

const modal = query('.modal');
const overlay = query('.overlay');
const btnclose = query('.close-modal');
const btnopen = queryall('.show-modal');


for (let i = 0; i < btnopen.length; i++) {
    btnopen[i].addEventListener('click' ,openModal)
}

btnclose.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
document.addEventListener('keydown', function (e){
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})

