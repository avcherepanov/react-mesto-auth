import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
    const { card, handleCardClick, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = isOwn ? '' : 'element__delete_hidden';
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = isLiked ? 'element__like_active' : '';

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleClick() {
        handleCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <button onClick={handleDeleteClick} className={`element__delete ${cardDeleteButtonClassName}`}></button>
            <img alt={card.name} className="element__image" src={card.link} onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" onClick={handleLikeClick} className={`element__like ${cardLikeButtonClassName}`}></button>
                    <p className="element__like-value">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;