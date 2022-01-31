import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações corretas do pokémon', () => {
    renderWithRouter(<App />);

    // Verifica a renderização, se os elementos estão na página
    const title = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(title).toBeInTheDocument();
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const isFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(isFavorite);
    const favorited = screen.getByText(/favorite pokémons/i);
    userEvent.click(favorited);

    // Verifica se o nome correto do Pokémon está sendo mostrado na tela
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    // Verifica se o tipo correto do Pokémon está sendo mostrado na tela
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    // Verifica se o peso médio do pokémon deve ser exibido com um texto no formato Average weight:
    // <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso
    // médio do pokémon e sua unidade de medida.
    const pokemonWeight = screen.getByTestId('pokemon-weight'); // campo peso
    expect(pokemonWeight).toHaveTextContent(/average weight/i); // peso
    expect(pokemonWeight).toHaveTextContent(/kg/i); // unidade de medida

    // Verifica se imagem do Pokémon está sendo exibida.
    // Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto
    // <name> sprite, onde <name> é o nome do pokémon;
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'; // endereço da imagem
    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' }); // pega o Alt da imagem
    expect(pokemonImage).toHaveAttribute('src', imageSrc);
  });

  test('Verifica se o card contém link para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
  });
});
