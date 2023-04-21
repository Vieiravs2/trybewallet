import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          className="expensesField"
          data-testid="value-input"
          placeholder="Digite o valor de sua despesa"
        />
      </div>
    );
  }
}

export default WalletForm;
