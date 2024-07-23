'use strict';

export default async function changeEachTextToPortuguese() {
  await changeHeaderText();
  await changeFooterNavigationLinksText();
  await changeFooterContactsText();
  await changeFooterCopyText();

  try {
    await changeTextIndex();
  } catch (error) {}

  try {
    await changeMyHistoryText();
  } catch (error) {}

  try {
    await changeCertificatesText();
  } catch (error) {}

  function changeHeaderText() {
    document.querySelector('.header__title > h1 > a').textContent =
      '< Portfólio />';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(1)'
    ).textContent = 'História';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(2)'
    ).textContent = 'Certificados';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(3)'
    ).textContent = 'Projetos';
    document.querySelector('.header__navigationTitle > h2').textContent =
      'Mais Sobre Mim';
    document.querySelector('.header__contactsTitle > h2').textContent =
      'Meus Contatos';
  }

  function changeFooterNavigationLinksText() {
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__title h2'
    ).textContent = 'Links de Navegação';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(1)'
    ).textContent = 'História';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(2)'
    ).textContent = 'Certificados';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(3)'
    ).textContent = 'Projetos';
  }

  function changeFooterContactsText() {
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__title h2'
    ).textContent = 'Informações de Contatos';
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__tel > h3'
    ).textContent = 'Telefone';
  }

  function changeFooterCopyText() {
    document.querySelector(
      '.footer > .container > .footer__copy > .footer__title h2 span'
    ).innerHTML = 'Portfólio de';
    document.querySelector(
      '.footer > .container > .footer__copy > div:nth-child(2) > p > span:nth-child(1)'
    ).textContent = 'Todos os direitos reservados';
  }

  // * Função para mudar o texto para cada página

  async function changeTextIndex() {
    await changeApresentationText();
    await changeAboutMeText();
    await changeProjectsText();
    await changeServicesText();

    function changeApresentationText() {
      document.querySelector('.apresentation > h2 > span').textContent =
        'Olá, eu sou um futuro';
      document.querySelector('.apresentation > h2 > strong').textContent =
        'Desenvolvedor Full-Stack';

      document.querySelector(
        '.apresentation > p > span:nth-child(1)'
      ).textContent = 'Buscando minha primeira oportunidade como';
      document.querySelector(
        '.apresentation > p > strong:nth-child(2)'
      ).textContent = 'estagiário,';
      document.querySelector(
        '.apresentation > p > span:nth-child(3)'
      ).textContent = 'ou até mesmo como';
      document.querySelector(
        '.apresentation > p > strong:nth-child(4)'
      ).textContent = 'desenvolvedor full-stack,';
      document.querySelector(
        '.apresentation > p > span:nth-child(5)'
      ).textContent = 'meu foco está em me especializar em';
      document.querySelector(
        '.apresentation > p > strong:nth-child(6)'
      ).textContent = 'desenvolvimento web';
      document.querySelector(
        '.apresentation > p > span:nth-child(7)'
      ).textContent = 'e';
      document.querySelector(
        '.apresentation > p > strong:nth-child(8)'
      ).textContent = ' mobile,';
      document.querySelector(
        '.apresentation > p > span:nth-child(9)'
      ).textContent = ' além de adquirir conhecimentos em';
      document.querySelector(
        '.apresentation > p > strong:nth-child(10)'
      ).textContent = 'cibersegurança.';

      document.querySelector('.apresentation > a').textContent = 'Baixar CV';
    }

    function changeAboutMeText() {
      document
        .querySelectorAll('.aboutMe__lines > span > span')
        .forEach((element) => {
          element.textContent = 'Linha';
        });
      document.querySelector(
        '.aboutMe__content > div:nth-child(1) > h2'
      ).textContent = 'minhaPessoa';
      document.querySelector(
        '.aboutMe__content > p:nth-child(2) > span:nth-child(1)'
      ).textContent = 'nome:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(3) > span:nth-child(1)'
      ).textContent = 'anoDeNascimento:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(4) > span:nth-child(1)'
      ).textContent = 'disponivelParaTrabalho:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(5) > span:nth-child(1)'
      ).textContent = 'tecnologias:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(6) > span:nth-child(1)'
      ).textContent = 'ferramentas:';
    }

    function changeProjectsText() {
      document.querySelector(
        '.main__projects > .container > .sectionTitle > h2'
      ).textContent = 'Meus Projetos';

      document.querySelector(
        '.main__projects > .container > .projects > .projects__pagesContainer > div > p'
      ).textContent = 'Total de projetos:';
      setTimeout(() => {
        document
          .querySelectorAll(
            '.main__projects > .container > .projects > .projects__pagination a span'
          )
          .forEach((element, index) => {
            element.textContent = `Página ${index + 1}`;
          });
      }, 1100);

      const loadingProjects = document.querySelector(
        '.main__projects > .container > .projects > .projects__loadingProjects'
      );

      if (loadingProjects) {
        setTimeout(() => {
          loadingProjects.innerHTML = `<p>Carregando Projetos...</p>`;
        }, 0);
      }
    }

    function changeServicesText() {
      document.querySelector(
        '.main__services > .container > .sectionTitle > h2'
      ).textContent = 'Meus serviços';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento Web';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento de landing pages, sites institucionais, e-commerces e etc.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20Web%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20realiza%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20estaria%20dispon%C3%ADvel%20para%20iniciar%20e%20qual%20seria%20o%20prazo%20estimado%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento Mobile';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento de aplicativos mobile para Android e IOS utilizando Flutter.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20buscando%20servi%C3%A7os%20de%20Desenvolvimento%20Mobile%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20realiza%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20estaria%20dispon%C3%ADvel%20para%20iniciar%20e%20qual%20seria%20o%20prazo%20estimado%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__header > .services__title > h3'
      ).textContent = 'Cibersegurança';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__body > .services__description p'
      ).textContent =
        'Análise de vulnerabilidades, testes de invasão e proteção de dados.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Ciberseguran%C3%A7a%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20oferece%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os%20e%20qual%20seria%20a%20abordagem%20que%20voc%C3%AA%20usaria%20no%20meu%20caso%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento e Manuntenção de API';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento e manutenção de APIs para integração com outros sistemas.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20e%20Manuten%C3%A7%C3%A3o%20de%20API%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20oferece%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os%20e%20qual%20seria%20a%20abordagem%20que%20voc%C3%AA%20usaria%20no%20meu%20caso%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__header > .services__title > h3'
      ).textContent = 'Gereciamento de Banco de Dados';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento, manuntenção e otimização de Banco de Dados relacionais (SQL) e não relacionais (NoSQL).';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20e%20Manuten%C3%A7%C3%A3o%20de%20Bancos%20de%20Dados%20Relacionais%20e%20N%C3%A3o-Relacionais.%20Voc%C3%AA%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20que%20voc%C3%AA%20oferece%20nesse%20%C3%A2mbito%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__header > .services__title > h3'
      ).textContent = 'Manutenção de Sistemas';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__body > .services__description p'
      ).textContent =
        'Realização de manutenção, refatoração / otimização, migração de tecnologias e correção de erros em vários tipos de sistemas.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20no%20servi%C3%A7o%20de%20Manuten%C3%A7%C3%A3o%20de%20Sistemas%20Web%20e%20Mobile%2C%20Corre%C3%A7%C3%A3o%20de%20Bugs%20e%20Atualiza%C3%A7%C3%B5es.%20Voc%C3%AA%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20voc%C3%AA%20lida%20com%20essas%20tarefas%20e%20qual%20%C3%A9%20o%20processo%20de%20trabalho%3F';

      document
        .querySelectorAll(
          '.main__services > .container > .services > .services__item > .services__footer > a'
        )
        .forEach((element) => {
          element.textContent = 'Solicitar Serviço';
        });
    }
  }

  async function changeMyHistoryText() {
    await changeTitleTextOfMyHistory();
    await changeSubTitleText();
    await changeContentText();

    function changeTitleTextOfMyHistory() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__header > .myHistory__title > h2'
      ).textContent = 'Um Pouco Sobre Mim';
    }

    function changeSubTitleText() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(1) > .myHistory__subTitle > h3'
      ).textContent = 'Primeiro Contato com a Tecnologia';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__subTitle > h3'
      ).textContent = 'Primeiros Passos';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__subTitle > h3'
      ).textContent =
        'Comprando meu Primeiro Computador e o Interesse por Programação';
    }

    function changeContentText() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(1) > .myHistory__text > p'
      ).innerHTML =
        'Pode-se dizer que minha jornada com a tecnologia começou com 8 a 9 anos, naquela época, meu pai tinha um computador que usava para o trabalho, mas de vez em quando eu podia mexer no computador para ver vídeos. Eu gostava muito de ver vídeos de Minecraft no YouTube. Eu assistia vídeos do VenomExtreme, Monark e etc. Foi mais ou menos nessa época que nasceu em mim uma pequena paixão não por computadores, mas por jogos.';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        'Com meus 10 anos, meus pais caíram no conto de um atendente e compraram um Positivo tunadão, com um processador Intel Celeron 1007u, 2GB de RAM e um HD de 320GB. O computador vinha com o Windows 8 pré-instalado, e o desempenho era tão ruim que levava uns 15 a 45 segundos apenas para abrir o Google Chrome. Foi aí que iniciei minha busca por formas de melhorar o computador. Tentei de tudo... baixei programas de limpeza, desfragmentei o disco, fiz alterações no regedit do Windows e até mesmo experimentei baixar uma placa de vídeo virtual (sim, baixei), mas obviamente nada consertava o que era inconsertável. Com o tempo, passando muito estresse, eu acabei aprendendo muita coisa sobre computadores, e foi aí que eu comecei a gostar de computadores.';
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        'Mais ou menos, com meus 12 anos, eu tive meu primeiro contato com programação em um curso de Python, do Gustavo Guanabara (muito brabo) que eu vi no YouTube. Fiz algumas aulas e aprendi o básico de Python, mas como as IDEs eram muito pesadas para o meu computador, eu não conseguia continuar com o curso. Depois disso, fiquei meio desinteressado com programação, ou melhor, com tecnologia em geral. Porém, na minha sala tinha um colega e depois amigo que gostava bastante de jogos, hardwares, computadores e etc, e conversando com ele, eu fui me interessando cada vez mais sobre hardware, e foi aí que eu comecei a pesquisar mais sobre e acabei descobrindo diversos canais que falavam sobre o assunto, como: MW Informática, Adrenaline, ChipArt e etc.';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        'Passando o tempo, eu fui aprendendo cada vez mais sobre computadores, comecei a formatar computadores de amigos e familiares, com isso fui adquirindo experiência. Mais ou menos na época da pandemia, os famosos Xeons começaram a aparecer no mercado de usados e eu fiquei muito interessado nesses processadores, pois eles eram muito baratos e tinham um desempenho muito bom. Foi aí que eu comecei a juntar dinheiro para comprar um computador, e na metade do terceiro ano do ensino médio, com a ajuda do meu pai, eu comprei meu primeiro computador, um computador que eu mesmo montei, com um Xeon E5-2650v2, 16GB de RAM e uma GTX 1660TI.';
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        'Passei o resto do ano de 2022 jogando, mas como estava barbado com 18 anos, eu comecei a pensar o que eu queria da vida. Aí que comecei a buscar sobre áreas que poderia trabalhar e conheci a área de programação. Confesso que entrei pelo hype de altos salários e home office, mas com o tempo fui gostando de codar mesmo, e isso se transformou em um dos meus hobbies. Programar não é a coisa mais legal que gosto de fazer, mas é algo que posso levar por boa parte da minha vida (talvez até por toda vida) sem reclamar.';
    }
  }

  async function changeCertificatesText() {}
}
