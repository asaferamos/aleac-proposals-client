import React, { Component } from 'react';
import axios from 'axios';
import { Container, Grid, Card } from 'semantic-ui-react'
import { Link } from "react-router-dom";
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
			url   : `${process.env.REACT_APP_URL_API}/proposal`,
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
						<Grid columns={3}>
						{
							this.state.favoritos.map((fav,key) => {
								return(
									<Grid.Column key={key}>
									<Link to={`/buscar/${fav.ext_id}`}>
										<Card
											header={fav.title}
											meta={fav.status}
											description={fav.description}
										/>
									</Link>
									</Grid.Column>
								)
							})
						}
						</Grid>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default Projetos;
