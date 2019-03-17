import React, { Component } from 'react';
import { Container, Segment, Label , Feed, Button, Grid, Dimmer, Image, Loader, Icon } from 'semantic-ui-react'
import axios from 'axios';

class Buscar extends Component {
	constructor(props){
		super(props);

		this.state = {
			loading: true,
			proposta: {
				authors: []
			}
		}
	}

	componentDidMount () {
		const { ext_id } = this.props.match.params

		axios({
			method: 'GET',
			url   : `${process.env.REACT_APP_URL_API}/proposal/${ext_id}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => {
			this.setState({
				loading:  false,
				proposta: res.data
			})
		}).catch(err => {
			if(err.response.status == 401)
				localStorage.clear()

			if(err.response.status == 500){
				window.location.replace('/buscar')
			}
		})
	}

	formatDate(date){
		date = date.split("-")
		return `${date[2]}/${date[1]}/${date[0]}`
	}

	favProposta(){

		this.setState({
			loading: true
		})

		if(this.state.proposta.saved){
			var method = 'DELETE'
			var saved  = false
		}else{
			var method = 'POST'
			var saved  = true
		}

		axios({
			method: method,
			url   : `${process.env.REACT_APP_URL_API}/proposal/${this.state.proposta.ext_id}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => {
			let proposta = this.state.proposta
			proposta.saved = saved

			this.setState({
				loading:  false,
				proposta: proposta
			})
		}).catch(err => {
			if(err.response.status == 401)
				localStorage.clear()
		})
	}

	render() {
		if(!this.state.loading){

			return (
				<Container>
					<Segment.Group>
						<Segment>
							<Grid columns={2}>
								<Grid.Column>
									<h3>
										{this.state.proposta.kind} nº {this.state.proposta.number} de {this.state.proposta.year}
									</h3>
									<Label color='violet' horizontal>
										Status: {this.state.proposta.status}
									</Label>
								</Grid.Column>
								<Grid.Column>
									<Button
										toggle
										content={this.state.proposta.saved ? 'Desfavoritar' : 'Favoritar'}
										icon='favorite'
										labelPosition='left'
										active={!this.state.proposta.saved}
										onClick={this.favProposta.bind(this)}
										id="favoritar"
									/>
								</Grid.Column>
							</Grid>
							<Segment.Group>
								<Segment>{this.state.proposta.description}</Segment>
								<Segment>
									Autores: <b>{
										this.state.proposta.authors.map((author, key) => {
											return(author)
										})
									}</b>
									<br/>
									Data de Apresentação: <b>{this.formatDate(this.state.proposta.introduction_date)}</b>
								</Segment>
								<Segment>
									<a href={this.state.proposta.link} target="_blank">
										<Icon name='file pdf' size='big' />
										Proposta na Íntegra
									</a>
								</Segment>
								<Segment>
									<h4>Tramitação:</h4>
									<Feed>
										{
											this.state.proposta.steps.map((step, key) => {
												return(
													<Feed.Event key={key}>
														<Feed.Label icon='copy outline' />
														<Feed.Content>
															<Feed.Summary>
																{step[2]}
																<Feed.Date>{this.formatDate(step[0])}</Feed.Date>
															</Feed.Summary>
															<Feed.Meta>
																<Feed.Like>
																	Local: {step[1]}
																</Feed.Like>
															</Feed.Meta>
														</Feed.Content>
													</Feed.Event>
												)
											})
										}
									</Feed>
								</Segment>
							</Segment.Group>
						</Segment>
					</Segment.Group>
				</Container>
			);
		}else{
			return (
				<Container>
					<Segment.Group>
						<Segment>
							<Dimmer active>
							<Loader />
							</Dimmer>

							<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
						</Segment>
					</Segment.Group>
				</Container>
			)
		}
  }
}

export default Buscar;
