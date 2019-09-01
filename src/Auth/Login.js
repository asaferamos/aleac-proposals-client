import React, { Component } from 'react';
import { Form , Container, Grid, Button, Icon, Message } from 'semantic-ui-react'
import axios from 'axios';

import './Auth.css';

class Login extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			email: '',
			senha: '',
			nome : '',
			cadastro: false,
			message: {
				hidden: true,
				type  : true,
				title : '',
				body  : ''
			}
		};

		if(localStorage.getItem('token')){
			this.props.history.push('/projetos')
		}
	}

	cadastro = () => {
		if(this.state.cadastro){
			if(this.state.email === '' || this.state.senha === '' || this.state.nome === ''){
				this.setState({
					message:{
						hidden: false,
						type  : false,
						title : 'Erro ao realizar o cadastro.',
						body  : 'Preencha todos os campos.'
					}
				})
			}else{
				axios({
					method: 'POST',
					url   : `${process.env.REACT_APP_URL_API}/users`,
					data: {
						email   : this.state.email,
						password: this.state.senha,
						name    : this.state.nome
					}
				})
				.then(res => {
					this.setState({
						cadastro:false,
						message:{
							hidden: false,
							type  : true,
							title : 'Cadastro realizado com sucesso.',
							body  : 'Faça seu login.'
						}
					})
				}).catch(err => {
					let errmsg = ''
					if(err.response.status === 409)
						errmsg = 'Já existe um cadastro com este email'

					this.setState({
						message:{
							hidden: false,
							type  : false,
							title : 'Erro ao realizar o cadastro.',
							body  : errmsg
						}
					})
				})
			}
		}

		this.setState({
			cadastro:true
		})
	}

	handleChange = (e, { value }) => {
		if(e.currentTarget.id === 'login-email')
			this.setState({ email: value })

		if(e.currentTarget.id === 'login-senha')
			this.setState({ senha: value })

		if(e.currentTarget.id === 'login-nome')
			this.setState({ nome: value })
	}

	handleSubmit = () => {
		axios({
			method: 'POST',
			url   : `${process.env.REACT_APP_URL_API}/auth/login`,
			data: {
				email   : this.state.email,
				password: this.state.senha
			}
		})
		.then(res => {
			localStorage.setItem('token',res.data.token);
			localStorage.setItem('name',res.data.name);
			this.props.history.push('/projetos')
		}).catch(err => {
			this.setState({
				message:{
					hidden: false,
					type  : false,
					title : 'Erro ao realizar o login.',
					body  : 'Login ou senha não conferem.'
				}
			})
		})
	}
	render() {
		return (
			<Container>
				<Grid centered columns={2}>
					<Grid.Column>
						<Grid.Row id="title-login">
							<Icon name='legal' size='huge' /><br/>
							<div>ALEAC Meus Projetos Favoritos</div>
						</Grid.Row>
						<Form>
							<Message
								positive={this.state.message.type}
								negative={!this.state.message.type}
								hidden={this.state.message.hidden}>
									<Message.Header>{this.state.message.title}</Message.Header>
									{this.state.message.body}
							</Message>

							{this.state.cadastro ? (
								<Form.Group widths='equal'>
									<Form.Input
										fluid
										id='login-nome'
										label='Nome'
										placeholder='Nome'
										onChange={this.handleChange}
										key="nome"
									/>
								</Form.Group>
							) : ('') }
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
							<Form.Group widths='equal'>
								{!this.state.cadastro ? (
								<Form.Field>
									<Button positive onClick={this.handleSubmit}>
										<Icon name='sign-in' />
										Entrar
									</Button>
								</Form.Field>
								) : ('') }
								<Form.Field>
									<Button secondary id="bt-signup" onClick={this.cadastro}>
										<Icon name='signup' />
										Cadastrar
									</Button>
								</Form.Field>
							</Form.Group>
						</Form>
					</Grid.Column>
				</Grid>
			</Container>
			);
	}
}

export default Login;
