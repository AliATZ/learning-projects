'use strict';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
///////////////////////////////////////
// Modal window



const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});





btnScroll.addEventListener('click', function () {
    // const scrols = section1.getBoundingClientRect();
    // console.log(scrols);
    // console.log(e.target.getBoundingClientRect());
    //
    //
    // window.scrollTo({
    //     left: scrols.left + window.pageXOffset,
    //     top: scrols.top + window.pageYOffset,
    //     behavior: 'smooth'
    // });
    section1.scrollIntoView({behavior: 'smooth'});
})

// document.querySelectorAll('.nav__link').forEach(function (element) {
//     element.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     })
// })

document.querySelector('.nav__link').addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('.nav__link')) {
        const id =e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
})


tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked){return}

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

//fade animation

function handleHover(e , opacity){
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link){
                el.style.opacity = opacity;

            }
            logo.style.opacity =opacity;
        })
    }
}

nav.addEventListener('mouseover', function (e) {
    handleHover(e , 0.5)
})

nav.addEventListener('mouseout', function (e) {
    handleHover(e , 1)
})
// sticky nav
// const initialCords= section1.getBoundingClientRect()
//
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCords.top){
//         nav.classList.add('sticky');
//     }else nav.classList.remove('sticky');
// })

// function observerCallback(entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// }
// const obsOptions = {
//     root: null,
//     threshold: 0.1,
//
// }
// const observer =  new IntersectionObserver(observerCallback , obsOptions);
// observer.observe(section1)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries){
    const [entry] = entries;
    if (!entry.isIntersecting){
        nav.classList.add('sticky');
    }
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav , {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,

})
headerObserver.observe(header)

//reveal sections
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer){
    const [entry] = entries;
    if (!entry.isIntersecting) {return;}
        entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection , {
    root: null,
    threshold: 0.15,

})

allSections.forEach(function (section){
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})


//lazy load

const imgTarget = document.querySelectorAll('img[data-src]');

function loadImg (entries, observer){

    const [entry] = entries;

    if (!entry.isIntersecting){return;}

    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
}



const imgObserver = new IntersectionObserver(loadImg , {
    root: null,
    threshold: 0,
    rootMargin: '200px',


})

imgTarget.forEach(img => imgObserver.observe(img));


//slider
function slider () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    function createDots() {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    }

    function activateDot(slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    }

    function goToSlide(slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    }

    // Next slide
    function nextSlide() {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    }

    function prevSlide() {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    }

    function init () {
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();


    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {

            curSlide = Number(e.target.dataset.slide);
            goToSlide(curSlide);
            activateDot(curSlide);
        }
    });
}
slider();