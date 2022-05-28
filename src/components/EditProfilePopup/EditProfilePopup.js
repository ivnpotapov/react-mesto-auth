import React, { Component } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class EditProfilePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
    };
  }
  static contextType = CurrentUserContext;

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen && this.context.name) {
      this.setState({
        username: this.context.name,
        description: this.context.about,
      });
    }
  }

  handleNameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateUser({
      name: this.state.username,
      about: this.state.description,
    });
  };

  render() {
    return (
      <PopupWithForm
        title={'Редактировать профиль'}
        name={'profile'}
        onClose={this.props.onClose}
        isOpen={this.props.isOpen}
        onSubmit={this.handleSubmit}>
        <label className='popup__label-input'>
          <input
            value={this.state.username}
            onChange={this.handleNameChange}
            type='text'
            className='popup__input'
            name='username'
            minLength='2'
            maxLength='40'
            required
          />
          <span className='popup__error popup__username-error'></span>
        </label>
        <label className='popup__label-input'>
          <input
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            type='text'
            className='popup__input'
            name='about'
            minLength='2'
            maxLength='200'
            required
          />
          <span className='popup__error popup__about-error'></span>
        </label>
      </PopupWithForm>
    );
  }
}

export default EditProfilePopup;
