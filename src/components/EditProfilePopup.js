import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const { isOpen, onClose } = props;
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (

        <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
        >
            <label className="form__field">
                <input id="name-input" name="name"
                    value={name || ''}
                    onChange={(e) => { setName(e.target.value) }}
                    type="text" placeholder="Имя"
                    className="form__input form__input_type_name"
                    required minLength="2" maxLength="40" />
                <span className="name-input-error form__input-error"></span>
            </label>
            <label className="form__field">
                <input id="job-input" name="about"
                    value={description || ''}
                    onChange={(e) => { setDescription(e.target.value) }}
                    type="text" placeholder="О себе"
                    className="form__input form__input_type_job"
                    required minLength="2" maxLength="200" />
                <span className="job-input-error form__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;