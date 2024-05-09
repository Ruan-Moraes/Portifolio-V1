'use strict';

async function getTheCurrentYear() {
  const currentYear = document.querySelector('#currentYear');

  try {
    const currentYearJson = await fetch(
      'http://worldtimeapi.org/api/timezone/America/Sao_Paulo'
    )
      .then((response) => response.json())
      .then((date) => date.datetime.slice(0, 4));

    currentYear.textContent = currentYearJson;
  } catch (error) {
    console.log(
      `Não foi possivel obter o ano atual através da Internet. Erro: ${error}`
    );

    const currentYear = new Date().getFullYear();
    currentYear.textContent = currentYear;
  }
}

export default getTheCurrentYear;
