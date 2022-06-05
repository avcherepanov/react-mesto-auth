import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.authorize(password, email);
    }

    return (
        <>
            <Header>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Header>
            <form onSubmit={handleSubmit} className="form form_theme_dark">
                <h2 className="form__title form__title_theme_dark">Вход</h2>
                <label className="form__field">
                    <input value={email || ''} onChange={(e) => { setEmail(e.target.value) }}
                        id="name-input" name="name"
                        type="email" placeholder="Email"
                        className="form__input form__input_type_name form__input_theme_dark"
                        required minLength="2" maxLength="40" />
                    <span className="name-input-error form__input-error"></span>
                </label>
                <label className="form__field">
                    <input value={password || ''} onChange={(e) => { setPassword(e.target.value) }}
                        id="job-input" name="about"
                        type="password" placeholder="Пароль"
                        className="form__input form__input_type_job form__input_theme_dark"
                        required minLength="2" maxLength="200" />
                    <span className="job-input-error form__input-error"></span>
                </label>
                <button type="submit" className="form__button form__button_theme_dark">Войти</button>
            </form>
        </>
    );
}

export default Login;