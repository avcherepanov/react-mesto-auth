import React from 'react';

function InfoTooltip(props) {
    const { onClose } = props;
    const isOpen = props.isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type_info ${isOpen}`} >
            <div className="popup__container">
                {props.children}
                <button type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;