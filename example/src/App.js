import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import { Install } from 'react-enhanced'

import Loading from './components/Loading.jsx'

import apiManage from 'api-manage'

@Install(['AsyncComponent'])
export default class App extends Component {
    render() {
        const { AsyncComponent } = this.props
        return (
            <div>
                <p>
                    <Link to="/">home</Link>
                </p>
                <p>
                    <Link to="/list">list</Link>
                </p>

                <Route
                    render={({ location }) => {
                        return (
                            <Switch>
                                <Route
                                    component={AsyncComponent(
                                        {
                                            component: () => import('@containers/Home' /* webpackChunkName : 'home'*/),
                                            model: () => import('@models/home')
                                        },
                                        {}
                                    )}
                                    exact
                                    path="/"
                                />
                                <Route
                                    component={AsyncComponent(
                                        {
                                            component: () => import('@containers/List' /* webpackChunkName : 'list'*/),
                                            model: () => import('@models/list')
                                        },
                                        {}
                                    )}
                                    exact
                                    path="/list"
                                />
                            </Switch>
                        )
                    }}
                />
            </div>
        )
    }
}
