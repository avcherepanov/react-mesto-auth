import React from 'react';
import MyApp from './MyApp';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/Auth.js';
import success from '../images/success.svg';
import unSuccess from '../images/unsuccess.svg';

function App() {
  const [loggedIn, SetloggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [infoToolTip, setInfoToolTip] = React.useState({
    src: unSuccess,
    text: 'Что-то пошло не так! Попробуйте ещё раз.'});
  const history = useHistory();

  function authorize(password, email) {
    Auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLogin();
          history.push('/');
        } else {
          handleInfoTooltip(true);
        }
      })
      .catch(err => console.log(err));
  }

  function register(password, email) {
    Auth.register(password, email)
      .then(() => {
        setInfoToolTip({
          src: success,
          text: 'Вы успешно зарегистрировались!'
        });
        handleInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch(err => console.log(err));
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }
  function handleInfoTooltip(state) {
    setIsInfoTooltipOpen(state);
  }

  function handleLogin() {
    SetloggedIn(true);
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.checkToken(jwt)
        .then(() => {
          handleLogin();
          history.push('/');
        });
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <>
      <Switch>
        <Route path="/sign-in">
          <Login authorize={authorize} />
        </Route>
        <Route path="/sign-up">
          <Register register={register} />
        </Route>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={MyApp}
          email={email}
        />
        <Route exact path="/">
          {loggedIn ?
            <Redirect to="/" /> :
            <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip}>
        <img src={infoToolTip.src} className="form__infoTooltip" />
        <h2 className="form__title form__title_type_infoTooltip">{infoToolTip.text}</h2>
      </InfoTooltip>
    </>
  );
}

export default App;
