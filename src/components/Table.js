import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpenses } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = (index) => {
    const { expenses, dispatch } = this.props;
    const idFilter = expenses.filter((element, indexMap) => indexMap !== index);
    dispatch(delExpenses(idFilter));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((element, index) => {
              const rate = Number(element.exchangeRates[element.currency].ask);
              const converted = rate * Number(element.value);
              return (
                <tr key={ index }>
                  <td>{ element.description }</td>
                  <td>{ element.tag }</td>
                  <td>{ element.method }</td>
                  <td>{ Number(element.value).toFixed(2) }</td>
                  <td>{ element.exchangeRates[element.currency].name }</td>
                  <td>{ rate.toFixed(2) }</td>
                  <td>{ converted.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(index) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Table);
