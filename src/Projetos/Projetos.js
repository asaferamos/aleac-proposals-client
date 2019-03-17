import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Card } from 'semantic-ui-react'
import './Projetos.css';


class Projetos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			favoritos: []
		};
	}

	componentDidMount(){
		axios({
			method: 'GET',
			url   : 'http://localhost:3000/proposal',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => {
			this.setState({favoritos: res.data})
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
							<span>você tem {this.state.favoritos.length} projetos salvos!</span>
						</div>
					</Grid.Row>

					<Grid.Row>
						<Card.Group>
							{
								this.state.favoritos.map((fav,key) => {
									return(
										<Card
											header={fav.title}
											meta={fav.status}
											description={fav.description}
											key={key}
										/>
									)
								})
							}
						</Card.Group>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default Projetos;
