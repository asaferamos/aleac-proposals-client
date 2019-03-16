import React, { Component } from 'react';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

import './App.css';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
	componentDidMount(){
		if(localStorage.getItem('token')){
			this.props.history.push("/");
		}
	}
  render() {
    return (
		<Switch>
			<Route path="/" component={Login} />
			<Route path="/buscar" component={Logout} />
		</Switch>
    );
  }
}

export const ErrorPage = () => (
	<div>
		<h1>Página não encontrada</h1>
	</div>
)

export default { App, ErrorPage };
