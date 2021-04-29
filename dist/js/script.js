'use strict';

const primaryMenuMobileLink = document.getElementById('primaryMenuMobile');
const background = document.getElementById('background');
const backgroundNav = document.getElementById('background-nav');
const primaryMenu = document.querySelector('.header__navbar');
const primaryMenuList = document.querySelector('.main-nav__list');
const primaryMenuIcon = document.querySelector('.nav-icon ');
const subMenuList = document.querySelectorAll('.main-submenu__list');
const backLink = document.getElementById('mainNavBackLink');
const backLinkDiv = document.querySelector('.main-nav__back-link');

const DESKTOP_WIDTH = 1440;

function toggleClassMenu(e) {
  e = e || window.event;
  e.stopPropagation();
  background.classList.toggle('active-background');

  if (!primaryMenu.classList.contains('header__navbar--visible')) {
    primaryMenu.classList.add('header__navbar--visible');
    primaryMenuIcon.classList.add('nav-icon--active');
    setHeaderTitle('Menu');
  } else {
    primaryMenu.classList.remove('header__navbar--visible');
    primaryMenuIcon.classList.remove('nav-icon--active');
    cleanOnCloseMenu();
    setHeaderTitle();
  }
}

function toggleSubMenu(e) {
  e = e || window.event;

  if (e.target.classList.contains('main-submenu__link')) {
    e.stopPropagation();
    return;
  }

  if (e.target.nodeName === 'A') {
    e.stopPropagation();

    const subMenu = e.target.nextElementSibling;
    // console.log('subMenu : ', subMenu.outerHTML);
    const menuNode = `<li class="main-submenu__item main-submenu__item-parent">${e.target.innerText}</li>`;
    subMenu.insertAdjacentHTML('afterbegin', menuNode);

    if (window.innerWidth >= DESKTOP_WIDTH) {
      const desktopSubMenu = document.querySelector('#desktopSubmenu');
      desktopSubMenu.classList.toggle('active-background');
      desktopSubMenu.firstElementChild.childNodes.forEach((element) =>
        element.remove()
      );

      desktopSubMenu.firstElementChild.insertAdjacentHTML(
        'afterbegin',
        subMenu.innerHTML
      );
      background.classList.toggle('active-background');
      return;
    }

    subMenu.classList.toggle('main-submenu--active');
    backgroundNav.classList.toggle('active-background');

    if (window.innerWidth < DESKTOP_WIDTH) {
      backLinkDiv.classList.add('main-nav__back-link--visible');
    }
  }
}

function goBackToMainMenu(e) {
  e = e || window.event;
  if (e.target.nodeName === 'DIV') {
    e.stopPropagation();
    cleanOnCloseMenu();
  }
}

function setHeaderTitle(value) {
  const headerTitle = document.querySelector('.header__title');
  const activeLink = document.querySelector('.main-nav__item--active');
  headerTitle.innerText =
    typeof value === 'string' ? value : activeLink.childNodes[1].innerText;
}

function cleanOnCloseMenu() {
  const subMenu = document.querySelector('.main-submenu--active');
  if (subMenu) {
    subMenu.firstElementChild.remove();
    subMenu.classList.remove('main-submenu--active');
  }
  backgroundNav.classList.remove('active-background');
  backLinkDiv.classList.remove('main-nav__back-link--visible');
}

primaryMenuMobileLink.addEventListener('click', toggleClassMenu, false);
primaryMenuList.addEventListener('click', toggleSubMenu, false);
// subMenuList.addEventListener('click', (e) => e.stopPropagation(), false);
backLink.addEventListener('click', goBackToMainMenu, false);
window.addEventListener('DOMContentLoaded', setHeaderTitle, false);
window.addEventListener(
  'click',
  () => {
    if (primaryMenu.classList.contains('header__navbar--visible')) {
      cleanOnCloseMenu();
      toggleClassMenu();
    }
  },
  false
);
