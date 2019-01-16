import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import Firebase from './firebase';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

// const Register = Loadable({
//   loader: () => import('./views/Pages/Register'),
//   loading
// });

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  firebase = new Firebase();

  state = {
    isAuthenticated: false,
  };

  componentDidMount() {
    this.removeListener = this.firebase.checkAuthState(user => {
      this.setState({
        isAuthenticated: Boolean(user),
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleSignIn = (email, password) => {
    return this.firebase.signInWithEmailAndPassword(email, password);
  };

  handleSignOut = () => {
    this.firebase.signOut();
  }

  render() {
    const { history, location } = this.props;
    const { isAuthenticated } = this.state;
    if (location.pathname === '/login' && isAuthenticated) { //TODO 404 500?
      history.push('/');
    }
    return (
      <Switch>
        <Route exact path="/login" name="Login Page" component={props => <Login {...props} onLogin={this.handleSignIn} />} />
        {/*<Route exact path="/register" name="Register Page" component={Register} />*/}
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/" name="Home" component={props => <DefaultLayout {...props} onSignOut={this.handleSignOut} />} />
      </Switch>
    );
  }
}

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default withRouter(App);
