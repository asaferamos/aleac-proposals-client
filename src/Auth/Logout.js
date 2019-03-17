import React, { Component } from 'react';

class Logout extends Component {
	constructor(props) {
		super(props);

		if(localStorage.getItem('token')){
			localStorage.clear();
			this.props.history.push('/');
		}
	}
	render() {
		return (
			<div>
			</div>
		);
	}
}

export default Logout;
