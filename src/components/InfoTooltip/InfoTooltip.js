import React, { Component } from 'react';
import authSuccessImg from '../../images/auth-success.svg';
import authFailImg from '../../images/auth-fail.svg';

class InfoTooltip extends Component {
  constructor(props) {
    super(props);
    this.authSuccessText = 'Вы успешно зарегистрировались!';
    this.authFailText = 'Что-то пошло не так! Попробуйте ещё раз.';
  }

  render() {
    return (
      <section
        className={`popup popup_name_${this.props.name} ${
          this.props.isOpen ? 'popup_opened' : ''
        }`}>
        <div className='popup__container'>
          <button
            type='button'
            className='popup__close-icon'
            aria-label='Закрыть'
            onClick={this.props.onClose}></button>
          <figure className='popup__img-container'>
            <img
              className='popup__auth-img'
              src={this.props.isRegistered ? authSuccessImg : authFailImg}
              alt={this.props.isRegistered ? 'галочка' : 'крестик'}
            />
            <figcaption className='popup__auth-label'>
              {this.props.isRegistered
                ? this.authSuccessText
                : this.authFailText}
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }
}

export default InfoTooltip;
