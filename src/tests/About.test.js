import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste do componente <About.js />', () => {
  test('Verifica se a página About é renderizada', () => {
    // Verificação de renderização através do renderWithRouter que já foi construído.
    renderWithRouter(<About />);
  });

  test('Verifica se na página contém as informações sobre Pokédex', () => {
    renderWithRouter(<About />);

    const h2Title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    // Level = 2 porque o level 1 é o título "Pokédex"
    expect(h2Title).toBeInTheDocument();
  });

  test('Verifica se a página tem dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/Pokémons/i);
    // A palavra Pokémon se repete nos dois parágrafos.
    // Source: "Returns an array of all matching nodes for a query, and throws an error if no elements match".
    // https://testing-library.com/docs/queries/about/
    expect(paragraphs).toHaveLength(2);
  });

  test('Verifica se a página contem a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    // Source: https://testing-library.com/docs/queries/byrole/
    const image = screen.getByRole('img', { name: 'Pokédex' });
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // Verifica tanto se a imagem tem o nome Pokédex quanto a URL desejada.
    expect(image).toHaveAttribute('src', imageURL);
  });
});
