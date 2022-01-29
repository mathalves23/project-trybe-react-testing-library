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

    userEvent.click(homeLink);
    const { pathname } = history.location; // Source: Trybe Course
    expect(pathname).toBe('/');
  });

  test('Verifica se o link About leva para sua página referente no site', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o link Favorites leva para sua página referente no site', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesLink).toBeInTheDocument();

    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se há uma página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/'); // Source: Trybe Course

    const notFoundTitle = screen.getByRole('heading',
      { name: 'Page requested not found' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
