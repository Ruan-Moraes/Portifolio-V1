'use strict';

export function changePageScrollingState() {
  const bodyHTML = document.querySelector('body');
  const bodyOverflow =
    getComputedStyle(bodyHTML).getPropertyValue('overflow-y');

  bodyOverflow === 'auto' || bodyOverflow === 'visible'
    ? (bodyHTML.style.overflowY = 'hidden')
    : (bodyHTML.style.overflowY = 'auto');
}
