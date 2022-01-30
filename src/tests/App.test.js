import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Verifica se o link Home leva para a página inicial do site', () => {
    const { history } = renderWithRouter(<App />); // Source: Trybe Course
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink); // Clique do botão home
    const { pathname } = history.location; // Source: Trybe Course
    expect(pathname).toBe('/'); // Verifica se a localização da página home está no endereço /.
  });

  test('Verifica se o link About leva para sua página referente no site', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink); // Clique do botão about
    const { pathname } = history.location;
    expect(pathname).toBe('/about'); // Verifica se a localização da página about está no endereço /about.
  });

  test('Verifica se o link Favorites leva para sua página referente no site', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLink).toBeInTheDocument();

    userEvent.click(favoritesLink); // Clique do botão favorites
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites'); // Verifica se a localização da página favorites está no endereço /favorites.
  });

  test('Verifica se há uma página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/biruleibe'); // Utiliza uma endereço aleatório que não contém nos componentes. Source: Trybe Course

    const notFoundTitle = screen.getByText('Page requested not found');
    expect(notFoundTitle).toBeInTheDocument();
  });
});
