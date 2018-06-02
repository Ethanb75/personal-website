// TweenLite.to(logo, 2, {left:"300px", onUpdate:updateHandler, 
// onComplete:completeHandler, 
// onCompleteParams:["animation complete!"]});


'use strict'

// function addRoutes() {
//   let aboutEl = document.querySelector('[data-location="about"]');
//   let projEl = document.querySelector('[data-location="projects"]');
//   let contactEl = document.querySelector('[data-location="contact"]');

//   // page.base('/');

//   page('/', () => {
//     // remove all active
//     let active = document.querySelector('.active');
//     if (active) {
//       active.classList.remove('active');
//       active.setAttribute('style', 'transform: matrix(1, 0, 0, 1, 0, 0)');
//     }
//   });

//   page('/about', () => {
//     aboutEl.classList.add('active');
//     aboutEl.setAttribute('style', 'transform: matrix(1, 0, 0, 1, 0, 0) translateY(calc(-100vw + 15rem))')
//   });
//   page('/projects', () => {
//     projEl.classList.add('active');
//   });
//   page('/contact', () => {
//     contactEl.classList.add('active')
//   });
//   page();
// }

function addCloseListener(el) {
  el.addEventListener('click', ev => {
    let parent = ev.target.parentElement.parentElement;
    let possibleOpenMenu = document.querySelector('.navTransition.active');
    if (!parent.classList.contains('active')) {
      if (possibleOpenMenu) possibleOpenMenu.classList.remove('active');
    }
    parent.classList.toggle('active');
  })
}

function addNavEventListeners(buttonArr) {
  Array.from(buttonArr).forEach(el => {
    addCloseListener(el)
  })
}

(function () {
  let loader = document.querySelector('.loader');
  let title = document.querySelector('.title');
  let subTitle = document.querySelector('.subTitle');
  let nav = document.querySelector('nav');
  let buttonArr = document.querySelectorAll('.button');
  let closeBtnArr = document.querySelectorAll('.closeSection > button')
  let t1 = new TimelineLite();


  //init nav listeners
  addNavEventListeners(buttonArr);
  addNavEventListeners(closeBtnArr);

  window.addEventListener('load', () => {
    //asset checks here before running 
    //below is development code for fake load time

    setTimeout(() => {
      t1.add(TweenMax.staggerTo(loader.children, 1, { x: '100%', ease: Expo.easeOut }, .1));
      t1.set(loader, { zIndex: -1 });
      t1.set(title, { className: 'title title__shadow' });
      t1.add(TweenMax.staggerTo(nav.children, 1, { x: '0', ease: Expo.easeOut }, .1));
      t1.call(() => {
        Array.from(nav.children).forEach(el => {
          el.classList.add('navTransition');
        });
      });
    }, 1000);

  });
}());