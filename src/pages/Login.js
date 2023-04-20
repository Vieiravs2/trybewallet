import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import addUser from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  verifyEmail = (validateEmail) => {
    const verifyEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return verifyEmail.test(validateEmail);
  };

  verifyPassword = (validatePassword) => {
    const MIN = 6;
    return (validatePassword.length >= MIN);
  };

  render() {
    const { email, password } = this.state;
    const { dispatch } = this.props;

    return (
      <section>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
            placeholder="Senha"
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ !this.verifyEmail(email) || !this.verifyPassword(password) }
              onClick={ () => dispatch(addUser(email)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
