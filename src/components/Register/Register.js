import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth from '../../utils/auth';

class Register extends React.Component {
  constructor(props) {
    super(props);
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
      .signUp(this.state.email, this.state.password)
      .then((res) => {
        this.props.handleRegistration();
        this.props.history.push('/sign-in');
        this.props.openAuthPopup();
      })
      .catch((err) => {
        this.props.openAuthPopup();
        console.log(err);
      });
  };

  render() {
    return (
      <section className={'popup popup_name_auth popup_opened'}>
        <div className='popup__container popup__container_name_auth'>
          <h2 className='popup__title popup__title_name_auth'>Регистрация</h2>
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
              aria-label='Зарегистрироваться'>
              Зарегистрироваться
            </button>
          </form>

          <div className='popup__text-container'>
            <p className='popup__text'>Уже зарегистрированы?</p>
            <Link to='sign-in' className='popup__text-link'>
              Войти
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Register);
