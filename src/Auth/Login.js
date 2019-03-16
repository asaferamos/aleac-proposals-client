import React, { Component } from 'react';
import { Form , Container, Grid, Button } from 'semantic-ui-react'
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			email: '',
			senha: ''
		};

		if(localStorage.getItem('token')){
			this.props.history.push('/projetos')
		}
	}

	handleChange = (e, { value }) => {
		if(e.currentTarget.type == 'text')
			this.setState({ email: value })

		if(e.currentTarget.type == 'password')
			this.setState({ senha: value })
	}

	handleSubmit = () => {
		axios({
			method: 'POST',
			url: 'http://localhost:3000/auth/login',
			data: {
				email:this.state.email,
				password:this.state.senha
			}
		})
		.then(res => {
			localStorage.setItem('token',res.data.token);
			this.props.history.push('/projetos')
		}).catch(err => {
				console.log(err)
			}
		)
	}
	render() {
		return (
			<Container>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group widths='equal'>
							<Form.Input
								fluid
								id='login-email'
								label='Email'
								placeholder='Email'
								onChange={this.handleChange}
								key="email"
							/>
							<Form.Input
								fluid
								type='password'
								id='login-senha'
								label='Senha'
								placeholder='Senha'
								onChange={this.handleChange}
								key="senha"
							/>
							</Form.Group>
							<Form.Field control={Button}>Entrar</Form.Field>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Container>
			);
	}
}

export default Login;
