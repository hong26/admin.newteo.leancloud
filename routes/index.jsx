import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from '../views/app'
import Login from '../views/Login'
import Case from '../views/Case'

module.exports = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Login} />
      <Route path='/admin' component={App}>
        <Route path='/admin/case' component={Case} />
      </Route>
    </Router>
  )
}
