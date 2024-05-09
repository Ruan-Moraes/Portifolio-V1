'use strict';

const selects = document.querySelectorAll('select');

function customSelect() {
  selects.forEach((selectionElement) => {
    hideTheSelectionElement(selectionElement);

    const parentElementOfTheSelection =
      selectTheParentElement(selectionElement);
    const listOfOptions = createListOfOptions(parentElementOfTheSelection);

    addOptions(listOfOptions, selectionElement);
    AddShowOrHideEventInTheOptions(selectionElement);

    showFirstSelectedOption(selectionElement, parentElementOfTheSelection);

    addOptionSelectionEvent(listOfOptions);
  });

  addColorsToTheOptions();
  addEventToCloseSelect();
}

function hideTheSelectionElement(selectionElement) {
  selectionElement.classList.add('selectHidden');
}

function selectTheParentElement(selectionElement) {
  const parentElementOfTheSelectionDOM = selectionElement.parentElement;
  parentElementOfTheSelectionDOM.setAttribute('tabindex', '0');

  // TODO - Adicionar a função de acessibilidade para o teclado

  return parentElementOfTheSelectionDOM;
}

function createListOfOptions(parentElementOfTheSelection) {
  const listOfOption = document.createElement('ul');
  listOfOption.classList.add('listOfOptions');

  parentElementOfTheSelection.appendChild(listOfOption);

  return listOfOption;
}

function showFirstSelectedOption(
  selectionElement,
  parentElementOfTheSelection
) {
  const firstOptionSelected = document.createElement('div');
  firstOptionSelected.classList.add('selectedItem');
  firstOptionSelected.textContent = selectionElement.children[0].textContent;

  parentElementOfTheSelection.appendChild(firstOptionSelected);
}

function addOptions(listOfOptions, selectionElement) {
  const totalNumberOfOptions = selectionElement.children.length;

  for (let i = 0; i < totalNumberOfOptions; i++) {
    const optionItem = document.createElement('li');
    optionItem.textContent = selectionElement.children[i].textContent;
    optionItem.setAttribute('tabindex', '0');

    listOfOptions.appendChild(optionItem);
  }
}

function AddShowOrHideEventInTheOptions(selectionElement) {
  selectionElement.parentElement.addEventListener('click', () => {
    selectionElement.parentElement.children[1].classList.toggle('show');
  });

  // TODO - Adicionar a função de acessibilidade para o teclado

  selectionElement.parentElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      selectionElement.parentElement.children[1].classList.toggle('show');
    }
  });
}

function addOptionSelectionEvent() {
  const options = document.querySelectorAll('.listOfOptions > li');

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedItem = option.parentElement.parentElement.children[2];
      const selectedOption = option.textContent;

      selectedItem.textContent = selectedOption;
    });
  });

  options.forEach((option) => {
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
  const options = document.querySelectorAll('.listOfOptions > li');

  options.forEach((option) => {
    const optionText = option.textContent;
    const optionColor = optionText.match(/#[0-9A-Fa-f]{6}/g);

    option.style.color = optionColor;
  });
}

function addEventToCloseSelect() {
  const selects = document.querySelectorAll('.selectHidden');

  document.addEventListener('click', (event) => {
    selects.forEach((select) => {
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
        selects.forEach((select) => {
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

export default customSelect;
