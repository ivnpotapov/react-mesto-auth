import React, { Component } from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

class Main extends Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className='main'>
        <section className='profile'>
          <div
            className='profile__avatar-wrap'
            onClick={this.props.onEditAvatar}>
            <img
              src={`${this.context.avatar}`}
              alt={`${this.context.name}`}
              className='profile__avatar'
            />
          </div>
          <div className='profile__info'>
            <div className='profile__name'>
              <h1 className='profile__name-text'>{this.context.name}</h1>
              <button
                type='button'
                className='profile__button-edit'
                aria-label='Редактировать'
                onClick={this.props.onEditProfile}></button>
            </div>
            <p className='profile__job'>{this.context.about}</p>
          </div>
          <button
            type='button'
            className='profile__button-plus'
            aria-label='добавить'
            onClick={this.props.onAddPlace}></button>
        </section>

        <section className='elements'>
          {this.props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={this.props.onCardClick}
                // onDelete={this.props.onDelete}
                onCardLike={this.props.onCardLike}
                onCardDelete={this.props.onCardDelete}
              />
            );
          })}
        </section>
      </main>
    );
  }
}

export default Main;
