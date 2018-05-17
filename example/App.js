import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Install } from 'react-enhanced'

@Install(['AsyncComponent'])
export default class App extends Component {
    render() {
        const { AsyncComponent } = this.props
        return (
            <div>
                <Route
                    render={({ location }) => {
                        return (
                            <Switch>
                                <Route
                                    component={AsyncComponent({
                                        component: () =>
                                            import('@containers/Home' /* webpackChunkName: 'home' */),
                                        model: () => import('@models/home')
                                    })}
                                    exact
                                    path="/"
                                />
                            </Switch>
                        )
                    }}
                />
            </div>
        )
    }
}
