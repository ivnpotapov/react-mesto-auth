import React, { Component } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class EditAvatarPopup extends Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef();
  }

  static contextType = CurrentUserContext;

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateAvatar({
      avatar: this.avatarRef.current.value,
    });
  };

  render() {
    return (
      <PopupWithForm
        title={'Обновить аватар'}
        name={'avatar'}
        onClose={this.props.onClose}
        isOpen={this.props.isOpen}
        onSubmit={this.handleSubmit}>
        <label className='popup__label-input'>
          <input
            ref={this.avatarRef}
            type='url'
            className='popup__input'
            defaultValue=''
            name='avatar'
            placeholder='Ссылка на аватар'
            required
          />
          <span className='popup__error popup__avatar-error'></span>
        </label>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;
