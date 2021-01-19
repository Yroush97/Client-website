import React, { useEffect, Suspense } from 'react';
import Home from './components/HomePage/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/SignIn/SignIn';
import Account from './components/Account/Account';
import Logout from './components/Logout/Logout';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss'
import { withRouter, Redirect, HashRouter, BrowserRouter as Switch, Route } from "react-router-dom";
import * as actions from './store/actions/index';
function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  const dispatch = useDispatch();
  useEffect(() => {
    return (
      dispatch(actions.authCheckState())
    )
  }, [dispatch]);
  let route = (
    <Switch>
      <Route path='/SignUp' component={SignUp} />
      <Route path='/Login' component={Login} />
      <Route exact path='/' component={Home} />
    </Switch>
  )
  if (isAuthenticated) {
    route = (
      <Switch>
        <Route path='/Account' component={Account} />
        <Route path='/Logout' component={Logout} />
        <Route exact path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>
      </HashRouter>
    </div>
  );
}

export default withRouter(App);
