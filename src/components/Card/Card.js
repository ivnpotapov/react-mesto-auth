import React, { Component } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class Card extends Component {
  static contextType = CurrentUserContext;

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  };
  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  };

  render() {
    const isOwn = this.props.card.owner === this.context._id;
    const cardDeleteButtonClassName = `element__trash ${
      isOwn ? '' : 'element__trash_hidden'
    }`;

    const isLiked = this.props.card.likes.some((i) => i === this.context._id);

    const cardLikeButtonClassName = `element__button-like ${
      isLiked ? 'element__button-like_active' : ''
    }`;

    return (
      <article className='element'>
        <img
          className='element__image'
          src={this.props.card.link}
          alt={this.props.card.name}
          onClick={this.handleClick}
        />
        <button
          type='button'
          className={cardDeleteButtonClassName}
          aria-label='Удалить'
          onClick={this.handleDeleteClick}></button>
        <div className='element__caption-area'>
          <h2 className='element__name'>{this.props.card.name}</h2>
          <div className='element__likes'>
            <button
              type='button'
              className={cardLikeButtonClassName}
              aria-label='лайк'
              onClick={this.handleLikeClick}></button>
            <span className='element__like-counter'>
              {this.props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
    );
  }
}

export default Card;
