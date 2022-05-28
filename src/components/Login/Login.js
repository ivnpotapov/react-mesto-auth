import React from 'react';
import { withRouter } from 'react-router-dom';
import auth from '../../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = props.handleLogin;
    this.loggedIn = props.loggedIn;

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signIn(this.state.email, this.state.password)
      .then((res) => {
        this.handleLogin();
        localStorage.setItem('token', res.token);
      })
      .catch((err) => {
        this.props.openAuthPopup();
        console.log(err);
      });
  };

  render() {
    return (
      <section className={'popup popup_name_auth'}>
        <div className='popup__container popup__container_name_auth'>
          <h2 className='popup__title popup__title_name_auth'>Вход</h2>
          <form
            className='popup__form popup__form_name_auth'
            name={this.props.name}
            onSubmit={this.handleSubmit}>
            <input
              required
              placeholder={'Email'}
              className='popup__input popup__input_name_auth'
              name='email'
              type='email'
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              required
              placeholder={'Пароль'}
              className='popup__input popup__input_name_auth'
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button
              type='submit'
              className='popup__button popup__button_name_auth'
              aria-label='Войти'>
              Войти
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
