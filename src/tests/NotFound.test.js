import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste do componente <NotFound.js />', () => {
  test('Verifica se página contém um h2 com o texto "Page requested not found"', () => {
    // Verificação de renderização através do renderWithRouter que já foi construído.
    renderWithRouter(<NotFound />);

    const headingH2 = screen.getByText(/page requested not found/i); // Verifica se o texto de erro é apresentado na tela
    expect(headingH2).toBeInTheDocument();
  });

  test('Verifica se a página contem a imagem de Not Found', () => {
    renderWithRouter(<NotFound />);
    // Source: https://testing-library.com/docs/queries/byrole/
    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toHaveAttribute('src', imageURL);
  });
});
