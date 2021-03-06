import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Projetos from './Projetos/Projetos'
import Buscar from './Projetos/Buscar'
import BuscarPage from './Projetos/BuscarPage'
import PrivateRoute from './helpers/PrivateRoute';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/logout" exact={true} component={Logout} />
            <Route path="/cadastro" exact={true} component={Logout} />

            <PrivateRoute path="/projetos" exact={true} component={Projetos} />
            <PrivateRoute path="/buscar" exact={true} component={BuscarPage} />
            <PrivateRoute path="/buscar/:ext_id" exact={true} component={Buscar} />

            {/* <Route path="*" exact={true} component={ErrorPage} /> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
