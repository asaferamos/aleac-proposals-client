import React from "react";
import { Redirect, Route, Link } from "react-router-dom";

import {
    Icon,
    Menu
  } from 'semantic-ui-react'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props =>
                localStorage.getItem('token') ? (
                    <div>
                        <Menu fixed='top' inverted>
                            <Menu.Item header>
                                <Icon name='legal' size='big' />
                                ALEAC Meus Projetos Favoritos
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Link to="/projetos">
                                    <Icon name='favorite' size='small' />
                                    Favoritos
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/buscar">
                                    <Icon name='search' size='small' />
                                    Buscar
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/logout">
                                    <Icon name='sign-out' />
                                </Link>
                            </Menu.Item>
                        </Menu>
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: props.location}
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute;