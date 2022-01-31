import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações corretas do pokémon', () => {
    renderWithRouter(<App />);
    // Verifica as informações de nome, tipo, peso e imagem do Pokémon
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pekomonImage = screen.getByAltText('Pikachu sprite');
    // E se elas possuem os dados referentes ao Pokémon Pikachu
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight');
    expect(pekomonImage).toBeInTheDocument();
    expect(pekomonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica se o card contém link para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Verifica se ao clicar no link redireciona para página de detalhes', () => {
    renderWithRouter(<App />);
    // Verifica se clicando no link vai abrir mais detalhes sobre o Pokémon
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const detailsPage = screen.getByText(/summary/i); // Esse é o texto que aparece quando se clica em mais detalhes
    expect(detailsPage).toBeInTheDocument(); // Se aparece o texto Summary na página, é porque clicou em details.
  });

  test('Verifica se a URL exibida no navegador muda para /pokemon/<id>', () => {
    // onde <id> é o id do Pokémon cujos detalhes se deseja ver
    const { history } = renderWithRouter(<App />);
    // Verifica se ao clicar no link "more details", levará para a página /pokemons/25
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    // Verifica o checkbox que determina se o Pokémon é favorito ou não
    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck); // Ao clicar no checkbox o Pokémon será enviado para lista de favoritos.
    history.push('/favorites');
    // Verifica se o Pokémon é favorito ou não
    const favoritedPokemon = screen.getByAltText(/is marked as favorite/i);
    // Se for favorito terá o texto "NOME is marked as favorite"
    expect(favoritedPokemon).toBeInTheDocument();
    // Além do nome, terá o atributo imagem de estrela.
    expect(favoritedPokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
