import React, { Component } from 'react';
import headerLogo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    // this.handleLogin = props.handleLogin;
    this.userEmail = props.userEmail;
    this.state = {
      isHeaderLink: false,
    };
  }

  handleBurgerClick = () => {
    this.setState((state) => {
      return { isHeaderLink: !state.isHeaderLink };
    });
  };

  render() {
    let header;

    switch (this.props.headerLink) {
      case '/sign-in':
        header = (
          <Link to='sign-up' className='header__link'>
            Регистрация
          </Link>
        );
        break;
      case '/sign-up':
        header = (
          <Link to='sign-in' className='header__link'>
            Войти
          </Link>
        );
        break;
      default:
        header = (
          <>
            <div
              className={`header__auth-container ${
                this.state.isHeaderLink ? 'header__auth-container_active' : ''
              }`}>
              <p className='header__auth-email'>{this.userEmail}</p>
              <p className='header__auth-link' onClick={this.props.handleLogin}>
                Выйти
              </p>
            </div>
            {this.state.isHeaderLink ? (
              <span
                className='popup__close-icon popup__close-icon_name_auth'
                onClick={this.handleBurgerClick}></span>
            ) : (
              <div className='header__burger' onClick={this.handleBurgerClick}>
                <div className='header__burger-item'></div>
                <div className='header__burger-item'></div>
                <div className='header__burger-item'></div>
              </div>
            )}
          </>
        );
    }

    return (
      <header className='header'>
        <img src={headerLogo} alt='логотип Место' className='header__logo' />
        {header}
      </header>
    );
  }
}

export default Header;
