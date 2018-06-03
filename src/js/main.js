'use strict'

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