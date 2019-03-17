import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Card } from 'semantic-ui-react'
import './Projetos.css';


class Projetos extends Component {
	componentDidMount(){
		axios({
			method: 'GET',
			url   : 'http://localhost:3000/proposal',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => {

		}).catch(err => {
			if(err.response.status == 401)
				localStorage.clear()
		})
	}

	render() {
		return (
			<Container>
				<Grid>
					<Grid.Row>
						<div id="top-name">
							Olá {localStorage.getItem('name')},<br/>
							<span>você tem 0 projetos salvos!</span>
						</div>
					</Grid.Row>

					<Grid.Row>
						<Card.Group>
							<Card
								href='#card-example-link-card'
								header='Elliot Baker'
								meta='Friend'
								description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
							/>
							<Card
								href='#card-example-link-card'
								header='Elliot Baker'
								meta='Friend'
								description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
							/>
						</Card.Group>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default Projetos;
