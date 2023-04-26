import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

const emailString = 'teste@teste.com';
const stringValueInput = 'value-input';
const newMock = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '5',
        currency: 'USD',
        description: '',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '6',
        currency: 'USD',
        description: '',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 2,
    priceTotal: '54.21',
    object: {
      value: '0',
    },
  },
};

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  it('Testa se o Componente Login está sendo renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(buttonLogin).toBeDefined();
  });

  it('Testa se o botão de login está desativado quando a página é renderizada', () => {
    renderWithRouterAndRedux(<App />);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    expect(buttonLogin).toHaveAttribute('disabled');
  });

  it('Testa se o botão é habilitado caso possua um formato de email e senha correto', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, emailString);
    userEvent.type(inputPassword, '123456789');
    expect(buttonLogin).not.toHaveAttribute('disabled');
  });

  it('Testa se o botão é desabilitado caso possua um formato de email incorreto', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, 'testandosemoformatocorreto');
    userEvent.type(inputPassword, '1234');
    expect(buttonLogin).toHaveAttribute('disabled');
  });

  it('Testa se quando o login é efeutado o usuário vai para o /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, emailString);
    userEvent.type(inputPassword, 'teste12345');
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });

  it('Testa se os inputs estão sendo renderizados corretamente na carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, emailString);
    userEvent.type(inputPassword, 'teste12345');
    userEvent.click(buttonLogin);
    const headerName = screen.getByText(/teste@teste\.com/i);
    expect(history.location.pathname).toBe('/carteira');
    expect(headerName).toBeDefined();
  });

  it('Testa se o WalletForm renderiza', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId(stringValueInput);
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '1000');
    expect(valueInput.value).toBe('1000');
  });

  it('Testa se o WalletForm é renderizado', async () => {
    const { store } = renderWithRouterAndRedux(<WalletForm />);
    const valueInput = screen.getByTestId(stringValueInput);
    userEvent.type(valueInput, '1000');
    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    act(() => userEvent.click(addBtn));
    await waitFor(() => {
      const globalState = store.getState();
      expect(globalState.wallet.expenses[0].value).toBe('1000');
    });
  });

  it('Testando se o preço total de despezas diminui', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: newMock });

    const inputValue = screen.getByTestId(stringValueInput);
    const expenseAdd = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(inputValue).toBeInTheDocument();
    expect(expenseAdd).toBeInTheDocument();

    userEvent.type(inputValue, '5');
    userEvent.click(expenseAdd);

    userEvent.type(inputValue, '6');
    userEvent.click(expenseAdd);

    const expenseDel = await screen.findAllByRole('button', { name: /excluir/i });

    expect(expenseDel).toHaveLength(2);
    userEvent.click(expenseDel[1]);
    const priceTotal = await screen.findByTestId('total-field');

    expect(Number(priceTotal.innerHTML)).toBeCloseTo(23.77);
  });
});
