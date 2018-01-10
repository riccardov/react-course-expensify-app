import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest //contiene tutte le props tranne isAuthenticated e component
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // true if auth, false if not auth
});

export default connect(mapStateToProps)(PublicRoute);