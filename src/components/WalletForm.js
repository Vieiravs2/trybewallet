import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addExpenses, requestAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = async () => {
    const { dispatch } = this.props;
    const resultApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resultApi.json();
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const expensesAdd = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(addExpenses(expensesAdd));

    this.setState(() => ({
      id: id + 1,
      value: '',
      description: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <input
          type="number"
          className="expensesField"
          data-testid="value-input"
          name="value"
          value={ value }
          placeholder="Digite o valor de sua despesa"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          className="expensesField"
          data-testid="description-input"
          name="description"
          value={ description }
          placeholder="Adicione a descrição de sua despesa"
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          id="currency"
          onChange={ this.handleChange }
        >
          { currencies.map((element, index) => (
            <option key={ index }>{element}</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          id="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          id="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
