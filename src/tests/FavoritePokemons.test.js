import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente <FavoritePokemons.js />', () => {
  test('Verifica se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    // Verificação de renderização através do renderWithRouter que já foi construído.
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite pokemon found/i);
    // Caso não tenha nenhum pokemon favoritado, essa imagem deve aparecer
    expect(notFound).toBeInTheDocument();
  });

  test('Verifica se são exibidos todos os cards de Pokémons favoritados.', () => {
    renderWithRouter(<App />); // Verificação na página Home

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details); // Verifica se possui o link More Details no App, caso haja pokémons favoritados.

    const isFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(isFavorite);

    const favorited = screen.getByText(/favorite pokémons/i);
    userEvent.click(favorited);

    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i }); // Verifica a imagem pelo ALT.
    expect(pikachu).toBeInTheDocument();
  });
});
