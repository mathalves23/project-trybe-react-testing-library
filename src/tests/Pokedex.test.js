import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonTypes = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('Teste do componente <Pokedex.js />', () => {
  test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Title = screen.getByRole('heading', { level: 2 });
    expect(h2Title).toBeInTheDocument(/encountered pokémons/i);
  });

  test('Verifica se é exibido o próximo Pokémon depois do clique', () => {
    renderWithRouter(<App />);
    // Verificando se existe um botão com o texto Próximo pokémon:
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i});
    expect(nextButton).toBeInTheDocument();

    // Verificando se os próximos Pokémons são mostrados, um de cada vez
    const pikachuAlt = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuAlt).toBeInTheDocument(); // Primeiro pokémon na tela é o Pikachu
    userEvent.click(nextButton); // Depois do clique no botão deve aparecer o próximo pokémon

    const charmanderAlt = screen.getByAltText(/charmander sprite/i);
    expect(charmanderAlt).toBeInTheDocument(); // O segundo pokémon na tela deve ser o Charmander
    userEvent.click(nextButton);
  });

  test('Verifica se o primeiro Pokémon da lista será mostrado após o último', () => {
    renderWithRouter(<App />);
    const LIST_LENGTH = 9; // Tamanho da lista de pokémons na tela: 9.
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i});
    for (let index = 0; index < LIST_LENGTH; index += 1) { // Estrutura que vai repetir pra cada clique de Próximo.
      userEvent.click(nextButton); // Botão que já foi criado no segundo teste
    }
    const firstPokemon = screen.getByText(/pikachu/i); // O primeiro pokémon é o Pikachu, então verifica se ele aparece depois do último.
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // Os botões possuem um filtro de tipo de Pokémon.
    const FILTER_LENGTH = 7; // São 7 tipos de pokémon, então 7 botões diferentes.
    const typeButtons = screen.getAllByTestId('pokemon-type-button'); // Pega todos os botões com este TestId
    expect(typeButtons.length).toBe(FILTER_LENGTH); // Número de botões = número de filtros
  });

  test('Verifica se após selecionar um tipo, terá somente do tipo selecionado', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByText(/fire/i);
    // Só existem 2 pokémons psíquicos na Pokédex, então o tamanho do array deve ser 2.
    for (let index = 0; index <= 2; index += 1) {
      userEvent.click(fireButton); // Verifica o clique no botão de pokémons Fire
      const fireType = screen.getAllByText(/fire/i); // Pega todos os que possuem esse tipo
      expect(fireType).toHaveLength(2); // E o tamanho será 2.
    }
  });

  test('Verifica se texto do botão corresponde ao nome do tipo', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button'); // typeButtons é um array com todos os botões;
    for (let index = 0; index < typeButtons.length; index += 1) { // percorre cada um dos tipos de botão para verificar
      expect(typeButtons[index]).toHaveTextContent(pokemonTypes[index]);
      // Verificou se cada tipo de botão tem como conteúdo o texto do array criado no início, referente aos tipos de Pokémons.
      // Texto do botão na posição 0 tem que ser igual ao tipo de pokémon na posição 0.
    }
  });

  test('Verifica se o botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i }); // Pega o botão que tenha o nome All.
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument(); // Verifica se o All está no documento.
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i }); // Pega o botão que tenha o nome All.
    expect(allButton).toBeInTheDocument(); // Verifica se o All está no documento.
    userEvent.click(allButton);
    // Verifica se ao clicar no botão, volta para o primeiro Pokémon que é o Pikachu.
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Verifica se, ao carregar a página, o filtro selecionado é o All', () => {
    renderWithRouter(<App />);
    // Teste desenvolvido com a ajuda da colega Nicole Calderari.
    // Faz a verificação se, ao carregar a página, ela contém as seguintes definições:
    // Pikachu como primeiro, botão de próximo pokémon e Charmander como próximo.
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByRole('img', { name: /charmander sprite/i });
    expect(secondPokemon).toBeInTheDocument();
  });
});
