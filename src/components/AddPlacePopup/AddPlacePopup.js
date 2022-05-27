import React, { Component } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

class AddPlacePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleLinkChange = (e) => {
    this.setState({
      link: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link,
    });
  };

  render() {
    return (
      <PopupWithForm
        title={'Новое место'}
        name={'add'}
        onClose={this.props.onClose}
        isOpen={this.props.isOpen}
        onSubmit={this.handleSubmit}>
        <label className='popup__label-input'>
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            type='text'
            className='popup__input'
            name='title'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='popup__error popup__title-error'></span>
        </label>
        <label className='popup__label-input'>
          <input
            value={this.state.link}
            onChange={this.handleLinkChange}
            type='url'
            className='popup__input'
            name='link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='popup__error popup__link-error'></span>
        </label>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;
