import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { requestAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestAPI());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies, 'CHEGOU AQUI');
    return (
      <div>
        <input
          type="text"
          className="expensesField"
          data-testid="value-input"
          placeholder="Digite o valor de sua despesa"
        />
        <input
          type="text"
          className="expensesField"
          data-testid="description-input"
          placeholder="Adicione a descrição de sua despesa"
        />
        <input
          type="text"
          className="expensesField"
          data-testid="description-input"
          placeholder="Adicione a descrição de sua despesa"
        />
        <select data-testid="currency-input" name="currencies" id="currencies">
          { currencies.map((value, index) => (
            <option key={ index }>{value}</option>
          ))}
        </select>
        <select data-testid="method-input" name="method-input" id="method-input">
          <option value="dinheiro">Dinheiro</option>
          <option value="cartaodecredito">Cartão de crédito</option>
          <option value="cartapdedebotp">Cartão de débito</option>
        </select>
        <select data-testid="tag-input" name="currencies" id="currencies">
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
