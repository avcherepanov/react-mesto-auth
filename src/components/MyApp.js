import { useEffect, useState } from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { useHistory } from 'react-router-dom';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function MyApp(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(user) {
        api.setUserInfo(user)
            .then((item) => setCurrentUser(item))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.setAvatar(avatar)
            .then((item) => setCurrentUser(item))
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => card._id !== item._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }

    useEffect(() => {
        if (localStorage.jwt) {
            api.getUserInfo()
                .then((item) => {
                    setCurrentUser(item);
                })
                .catch((err) => {
                    console.log(err);
                });

            api.getInitialsCard()
                .then((item) => {
                    setCards(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header>
                <div className="header__menu">
                    <p className="header__email">{props.email}</p>
                    <button onClick={signOut} className="header__link header__link_type_signout">Выйти</button>
                </div>
            </Header>
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
            <Footer />

            <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups} />

            <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups} />

            <AddPlacePopup
                onAddPlace={handleAddPlaceSubmit}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups} />

            <PopupWithForm name="delete" title="Вы уверены?" />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default MyApp;
