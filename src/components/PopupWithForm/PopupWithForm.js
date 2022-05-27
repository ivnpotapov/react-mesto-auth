import React, { Component } from 'react';

class PopupWithForm extends Component {
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
          <h2 className='popup__title'>{this.props.title}</h2>
          <form
            className='popup__form'
            name={this.props.name}
            onSubmit={this.props.onSubmit}>
            {this.props.children}

            <button
              type='submit'
              className='popup__button'
              aria-label='сохранить'>
              Сохранить
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default PopupWithForm;
