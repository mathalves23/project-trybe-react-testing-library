import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente <PokemonDetails.js />', () => {
  test('Verifica se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails); // Verificação após o clique no link de detalhes

    // A verificação é feita com base nos detalhes do Pokémon PIKACHU
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const summaryHeader = screen.getByRole('heading', { name: /summary/i });
    const description = screen.getByText(/this intelligent Pokémon/i);
    const locationHeader = screen.getByRole('heading', { name: /game locations of/i });

    expect(pokemonDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument(); // Espera-se que o link de detalhes não esteja na página porque já esteja nele.
    expect(summaryHeader).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(locationHeader).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os mapas de localização', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails); // Verificação após o clique no link de detalhes

    const pokemonLocation = screen.getAllByAltText('Pikachu location');
    const locationDescription0 = screen.getByText(/Kanto Viridian Forest/i);
    const locationDescription1 = screen.getByText(/Kanto Power Plant/i);

    // São duas Game Locations diferentes, a primeira será chamada de pokemonLocation[0] e a segunda de pokemonLocation[1]
    // Verifica a primeira localização do Pikachu e sua imagem
    expect(pokemonLocation[0]).toBeInTheDocument();
    expect(pokemonLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationDescription0).toBeInTheDocument();

    // Verifica a segunda localização do Pikachu e sua imagem
    expect(pokemonLocation[1]).toBeInTheDocument();
    expect(pokemonLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationDescription1).toBeInTheDocument();
  });

  test('Verifica se pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails); // Verificação após o clique no link de detalhes

    const isFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(isFavorite); // Verificação se o Pikachu está selecionado como favorito ou não
    const favorited = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    // Caso seja favorito, tem o checkbox marcado e a estrela do lado da imagem
    expect(favorited).toBeInTheDocument();

    // Caso clique no checkbox de um Pokémon já favorito, irá desmarcar o checkbox
    userEvent.click(isFavorite);
    expect(favorited).not.toBeInTheDocument();
    // Verifica se o favorito passa a ficar desmarcado
  });
});
