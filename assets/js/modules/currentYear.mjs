'use strict';

export default async function getTheCurrentYear() {
  const currentYearDOM = document.querySelector('#currentYear');

  try {
    const currentYearJson = await fetch(
      'https://worldtimeapi.org/api/timezone/America/Sao_Paulo'
    )
      .then((response) => response.json())
      .then((date) => date.datetime.slice(0, 4));

    currentYearDOM.textContent = currentYearJson;
  } catch (error) {
    console.error(
      `Ocorreu um erro ao tentar puxar o ano atual através da API do World Time! ERROR: ${error}`
    );

    currentYearDOM.textContent = new Date().getFullYear();
  }
}
