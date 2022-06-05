import React from 'react';

function PopupWithForm(props) {
    const { onSubmit } = props;
    const isOpen = props.isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type_${props.name} ${isOpen}`}>
            <div className="popup__container">
                <form onSubmit={onSubmit} className={`form form_type_${props.name}`} name={props.name}>
                    <h2 className="form__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="form__button" onClick={props.onClose}>Сохранить</button>
                </form>
                <button type="button" className="popup__close" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;