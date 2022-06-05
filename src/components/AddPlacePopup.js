import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose } = props;
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: place,
            link: link,
        });

        e.target.reset();
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="add" title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
        >
            <label className="form__field">
                <input id="place-input" onChange={(e) => { setPlace(e.target.value) }} type="text" name="name" placeholder="Название" className="form__input form__input_type_place" required minLength="2" maxLength="30" />
                <span className="place-input-error form__input-error"></span>
            </label>
            <label className="form__field">
                <input id="link-input" type="url" onChange={(e) => { setLink(e.target.value) }} name="link" placeholder="Ссылка на картинку" className="form__input form__input_type_link" required />
                <span className="link-input-error form__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;