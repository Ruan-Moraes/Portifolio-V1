'use strict';

export function changePageScrollingState() {
  const bodyDOM = document.querySelector('body');
  const bodyOverflow = getComputedStyle(bodyDOM).getPropertyValue('overflow-y');

  bodyOverflow === 'auto' || bodyOverflow === 'visible'
    ? (bodyDOM.style.overflowY = 'hidden')
    : (bodyDOM.style.overflowY = 'auto');
}

export function showBlurOnBody() {
  const blurOnBodyDOM = document.querySelector('.blurOnBody');

  blurOnBodyDOM.classList.toggle('blurOnBodyIsActivated');
}
