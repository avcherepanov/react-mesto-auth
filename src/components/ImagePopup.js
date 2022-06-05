import React from 'react';

function ImagePopup(props) {
    const { card, onClose } = props;
    const isOpen = Object.keys(card).length ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type_card ${isOpen}`}>
            <div className="popup__container-card">
                <img className="popup__image" alt={card.name} src={card.link} />
                <p className="popup__place">{card.name}</p>
                <button type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;