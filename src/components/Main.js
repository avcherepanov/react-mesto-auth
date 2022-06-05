import React from 'react';
import Card from './Card';
import btnAvatar from '../images/pen.svg';
import btnUser from '../images/edit-button.svg';
import btnCard from '../images/add-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div onClick={props.onEditAvatar} className="profile__container-avatar">
                        <div className="profile__edit-photo-container">
                            <img src={btnAvatar} className="profile__edit-photo" />
                        </div>
                        <img alt="Фото профиля" src={currentUser.avatar} className="profile__avatar" />
                    </div>

                    <div className="profile__info">
                        <div className="profile__info-container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                <img src={btnUser} alt="Кнопка редактировать профиль" className="profile__edit-button-img" />
                            </button>
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                    <img src={btnCard} alt="Кнопка добавить карточку" className="profile__add-button-img" />
                </button>
            </section>

            <section className="elements">
                {props.cards.map((item) => (
                    <Card
                        card={item}
                        key={item._id}
                        handleCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );


}

export default Main;