import React, { Component } from 'react';

class App extends Component {
	render() {
		return (
			<div></div>
		);
	}
}

export const ErrorPage = () => (
	<div>
		<h1>Página não encontrada</h1>
	</div>
)

export default { App, ErrorPage };