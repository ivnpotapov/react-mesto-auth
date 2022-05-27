import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import Login from './Login/Login';
import Register from './Register/Register';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isRegistered: false,
      userEmail: '',
      cards: [],
      currentUser: {},
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePopupOpen: false,
      isAuthPopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.tokenCheck();

    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([resUser, resCard]) => {
        this.setState({
          currentUser: resUser,
          cards: resCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      auth
        .checkUser(jwt)
        .then((res) => {
          this.setState(
            {
              userEmail: res.data.email,
              loggedIn: true,
            },
            () => {
              this.props.history.push('/');
            },
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleLogin = () => {
    if (this.state.loggedIn) {
      this.setState(
        {
          loggedIn: false,
        },
        () => {
          localStorage.removeItem('token');
          this.props.history.push('/sign-in');
        },
      );
    } else {
      this.setState(
        {
          loggedIn: true,
        },
        () => {
          this.tokenCheck();
        },
      );
    }
  };

  openAuthPopup = () => {
    this.setState({ isAuthPopupOpen: true });
  };

  handleRegistration = () => {
    this.setState({ isRegistered: true });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleDeleteClick = () => {
    this.setState({ isDeletePopupOpen: true });
  };

  handleUpdateUser = (inputsValue) => {
    api
      .setUserInfoApi(inputsValue)
      .then((res) => {
        this.setState({
          currentUser: res,
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdateAvatar = (inputsValue) => {
    api
      .setAvatarApi(inputsValue)
      .then((res) => {
        this.setState({
          currentUser: res,
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddPlace = (inputsValue) => {
    api
      .addNewCardApi(inputsValue)
      .then((res) => {
        this.setState({
          cards: [res, ...this.state.cards],
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (like) => like._id === this.state.currentUser._id,
    );
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const stateWithNewCard = this.state.cards.map((stateCard) =>
          stateCard._id === card._id ? newCard : stateCard,
        );
        this.setState({
          cards: stateWithNewCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardDelete = (card) => {
    api
      .deleteCardApi(card._id)
      .then((res) => {
        const stateWithoutCard = this.state.cards.filter((stateCard) => {
          return !(stateCard._id === card._id);
        });
        this.setState({
          cards: stateWithoutCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardClick = (card) => {
    this.setState({
      selectedCard: {
        isOpen: true,
        link: card.link,
        name: card.name,
      },
    });
  };

  closeAllPopups = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePopupOpen: false,
      isAuthPopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '',
        name: '',
      },
    });
  };

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className='page__container'>
          <Switch>
            <Route path='/sign-in'>
              <Header headerLink={'/sign-in'} />
              <Login
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
              />
            </Route>

            <Route path='/sign-up'>
              <Header headerLink={'/sign-up'} />
              <Register
                handleRegistration={this.handleRegistration}
                openAuthPopup={this.openAuthPopup}
                loggedIn={this.state.loggedIn}
              />
            </Route>

            <ProtectedRoute
              path='*'
              loggedIn={this.state.loggedIn}
              userEmail={this.state.userEmail}
              handleLogin={this.handleLogin}
              componentHeader={Header}
              componentFooter={Footer}
              component={Main}
              cards={this.state.cards}
              onCardLike={this.handleCardLike}
              onCardDelete={this.handleCardDelete}
              onEditAvatar={this.handleEditAvatarClick}
              onEditProfile={this.handleEditProfileClick}
              onAddPlace={this.handleAddPlaceClick}
              onCardClick={this.handleCardClick}
              onDelete={this.handleDeleteClick}
              headerLink={''}
            />
          </Switch>

          {/*  popups */}
          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />

          <AddPlacePopup
            onClose={this.closeAllPopups}
            isOpen={this.state.isAddPlacePopupOpen}
            onAddPlace={this.handleAddPlace}
          />

          <PopupWithForm
            title={'Вы уверены?'}
            name={'delete'}
            onClose={this.closeAllPopups}
            isOpen={this.state.isDeletePopupOpen}></PopupWithForm>

          <ImagePopup
            name={'img'}
            onClose={this.closeAllPopups}
            card={this.state.selectedCard}
          />

          <InfoTooltip
            name={'infotooltip'}
            onClose={this.closeAllPopups}
            isOpen={this.state.isAuthPopupOpen}
            isRegistered={this.state.isRegistered}
          />
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default withRouter(App);
