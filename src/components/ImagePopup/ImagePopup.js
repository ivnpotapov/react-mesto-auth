import React, { Component } from 'react'

class ImagePopup extends Component {
  render() {
    return (
      <section className={`popup popup_name_${this.props.name} ${this.props.card.isOpen ? 'popup_opened' : ''}`}>
        <figure className='popup__img-container'>
          <button
            type='button'
            className='popup__close-icon'
            aria-label='Закрыть'
            onClick={this.props.onClose}></button>
          <img className='popup__img' src={this.props.card.link} alt={this.props.card.name} />
          <figcaption className='popup__img-label'>{this.props.card.name}</figcaption>
        </figure>
      </section>
    )
  }
}

export default ImagePopup
