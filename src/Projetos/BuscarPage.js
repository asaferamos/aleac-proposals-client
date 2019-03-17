import React, { Component } from 'react';
import { Container, Input, Icon, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'


class BuscarPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: '',
            redirect: false
        }
    }

    changeSearch = (e, { value }) => {
		this.setState({search:value})
    }
    
    search(){
        this.setState({redirect:true})
    }

	render() {
        if(!this.state.redirect){
            return (
                <Container>
                    <Grid centered columns={3}>
                        <Grid.Column>
                            <Input
                                size='big'
                                icon={<Icon name='search' inverted circular link onClick={this.search.bind(this)} />}
                                placeholder='Procurar...'
                                onChange={this.changeSearch}
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            );
        }else{
           return <Redirect to={`/buscar/${this.state.search}`}/>
        }
  }
}

export default BuscarPage;
