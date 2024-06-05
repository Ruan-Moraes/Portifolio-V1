'use strict';

import { getSelectedOptionLocalStorage } from './others.mjs';

export default function customSelect() {
  const selectsDOM = document.querySelectorAll('select');

  selectsDOM.forEach((selectionElementDOM) => {
    hideTheSelectionElement(selectionElementDOM);

    const parentElementOfTheSelectionDOM =
      selectTheParentElement(selectionElementDOM);
    const listOfOptionsDOM = createListOfOptions(
      parentElementOfTheSelectionDOM
    );

    addOptions(selectionElementDOM, listOfOptionsDOM);
    addShowOrHideEventInOptions(parentElementOfTheSelectionDOM);
  });

  const selectedOptions = getSelectedOptionLocalStorage();

  if (selectedOptions) {
    showSelectedOption(selectsDOM, selectedOptions);
  }

  if (!selectedOptions) {
    showDefaultOption(selectsDOM);
  }

  changeSelectionOption();

  addColorsToTheOptions();
  addEventToCloseSelect();
}

function hideTheSelectionElement(selectionElementDOM) {
  selectionElementDOM.classList.add('selectHidden');
}

function selectTheParentElement(selectionElementDOM) {
  return selectionElementDOM.parentElement;
}

function createListOfOptions(parentElementOfTheSelectionDOM) {
  const listOfOptionsDOM = document.createElement('ul');
  listOfOptionsDOM.classList.add('listOfOptions');

  parentElementOfTheSelectionDOM.appendChild(listOfOptionsDOM);

  return listOfOptionsDOM;
}

function addOptions(selectionElementDOM, listOfOptionsDOM) {
  Array.from(selectionElementDOM.children).forEach((option) => {
    const optionItemDOM = document.createElement('li');
    optionItemDOM.setAttribute('tabindex', '0');
    optionItemDOM.textContent = option.textContent;

    listOfOptionsDOM.appendChild(optionItemDOM);
  });
}

function addShowOrHideEventInOptions(parentElementOfTheSelectionDOM) {
  parentElementOfTheSelectionDOM.addEventListener('click', () => {
    parentElementOfTheSelectionDOM.children[1].classList.toggle('show');
  });

  parentElementOfTheSelectionDOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      parentElementOfTheSelectionDOM.children[1].classList.toggle('show');
    }
  });
}

function showSelectedOption(selectsDOM, selectedOptions) {
  for (let i = 0; i < selectsDOM.length; i++) {
    const optionSelectedDOM = document.createElement('div');
    optionSelectedDOM.classList.add('selectedItem');
    optionSelectedDOM.textContent = selectedOptions[i];

    selectsDOM[i].parentElement.appendChild(optionSelectedDOM);
  }
}

function showDefaultOption(selectsDOM) {
  for (let i = 0; i < selectsDOM.length; i++) {
    const optionSelectedDOM = document.createElement('div');
    optionSelectedDOM.classList.add('selectedItem');
    optionSelectedDOM.textContent = selectsDOM[i].children[0].textContent;

    selectsDOM[i].parentElement.appendChild(optionSelectedDOM);
  }
}

function changeSelectionOption() {
  const optionsDOM = document.querySelectorAll('.listOfOptions > li');

  optionsDOM.forEach((option) => {
    const selectedItem = option.parentElement.parentElement.children[2];

    option.addEventListener('click', () => {
      const selectedOption = option.textContent;

      selectedItem.textContent = selectedOption;
    });
  });

  optionsDOM.forEach((option) => {
    const selectedItem = option.parentElement.parentElement.children[2];

    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const selectedOption = option.textContent;

        selectedItem.textContent = selectedOption;
      }
    });
  });
}

// TODO: REFATORA ESSAS DUAS FUNÇÕES ABAIXO

function addColorsToTheOptions() {
  const optionsDOM = document.querySelectorAll('.listOfOptions > li');

  optionsDOM.forEach((option) => {
    const optionText = option.textContent;
    const optionColor = optionText.match(/#[0-9A-Fa-f]{6}/g);

    option.style.color = optionColor;
  });
}

function addEventToCloseSelect() {
  const hiddenSelectionsDOM = document.querySelectorAll('.selectHidden');

  document.addEventListener('click', (event) => {
    hiddenSelectionsDOM.forEach((select) => {
      const selectParent = select.parentElement;
      const selectOptions = selectParent.children[1];

      if (
        selectOptions.classList.contains('show') &&
        !selectParent.contains(event.target)
      ) {
        selectOptions.classList.remove('show');
      }
    });
  });
}
