import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'

export default class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/admin/ui/buttons" component={Buttons} />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
            <Route path="/order/detail" component={Login} />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
