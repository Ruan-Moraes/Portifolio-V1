'use strict';

function customSelect() {
  const selectsDOM = document.querySelectorAll('select');

  selectsDOM.forEach((selectionElementDOM) => {
    hideTheSelectionElement(selectionElementDOM);

    const parentElementOfTheSelectionDOM =
      selectTheParentElement(selectionElementDOM);
    const listOfOptionsDOM = createListOfOptions(
      parentElementOfTheSelectionDOM
    );

    addOptions(listOfOptionsDOM, selectionElementDOM);
    AddShowOrHideEventInTheOptions(selectionElementDOM);

    showFirstSelectedOption(
      selectionElementDOM,
      parentElementOfTheSelectionDOM
    );

    addOptionSelectionEvent(listOfOptionsDOM);
  });

  addColorsToTheOptions();
  addEventToCloseSelect();
}

function hideTheSelectionElement(selectionElementDOM) {
  selectionElementDOM.classList.add('selectHidden');
}

function selectTheParentElement(selectionElementDOM) {
  const parentElementOfTheSelectionDOM = selectionElementDOM.parentElement;
  parentElementOfTheSelectionDOM.setAttribute('tabindex', '0');

  // TODO - Adicionar a função de acessibilidade para o teclado

  return parentElementOfTheSelectionDOM;
}

function createListOfOptions(parentElementOfTheSelectionDOM) {
  const listOfOptionDOM = document.createElement('ul');
  listOfOptionDOM.classList.add('listOfOptions');

  parentElementOfTheSelectionDOM.appendChild(listOfOptionDOM);

  return listOfOptionDOM;
}

function showFirstSelectedOption(
  selectionElementDOM,
  parentElementOfTheSelectionDOM
) {
  const firstOptionSelectedDOM = document.createElement('div');
  firstOptionSelectedDOM.classList.add('selectedItem');
  firstOptionSelectedDOM.textContent =
    selectionElementDOM.children[0].textContent;

  parentElementOfTheSelectionDOM.appendChild(firstOptionSelectedDOM);
}

function addOptions(listOfOptionsDOM, selectionElementDOM) {
  const totalNumberOfOptions = selectionElementDOM.children.length;

  for (let i = 0; i < totalNumberOfOptions; i++) {
    const optionItemDOM = document.createElement('li');
    optionItemDOM.textContent = selectionElementDOM.children[i].textContent;
    optionItemDOM.setAttribute('tabindex', '0');

    listOfOptionsDOM.appendChild(optionItemDOM);
  }
}

function AddShowOrHideEventInTheOptions(selectionElementDOM) {
  selectionElementDOM.parentElement.addEventListener('click', () => {
    selectionElementDOM.parentElement.children[1].classList.toggle('show');
  });

  // TODO - Adicionar a função de acessibilidade para o teclado

  selectionElementDOM.parentElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      selectionElementDOM.parentElement.children[1].classList.toggle('show');
    }
  });
}

function addOptionSelectionEvent() {
  const optionsDOM = document.querySelectorAll('.listOfOptions > li');

  optionsDOM.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedItem = option.parentElement.parentElement.children[2];
      const selectedOption = option.textContent;

      selectedItem.textContent = selectedOption;
    });
  });

  optionsDOM.forEach((option) => {
    option.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const selectedItem = option.parentElement.parentElement.children[2];
        const selectedOption = option.textContent;

        selectedItem.textContent = selectedOption;
      }
    });
  });
}

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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
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
      }
    });
  });
}

// * Exportando a função customSelect

export default customSelect;
