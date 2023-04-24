import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.reduce((sum, { value, exchangeRates, currency }) => {
      sum += (Number(value) * Number(exchangeRates[currency].ask));
      return sum;
    }, 0).toFixed(2);
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ totalField }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
