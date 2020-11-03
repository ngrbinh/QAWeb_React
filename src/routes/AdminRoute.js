import React, { Component } from 'react'
import { Route } from 'react-router-dom';

export default class AdminRoute extends Component {
  render() {
    const {component: MyComponent, ...remainProps} = this.props;
    return (
      <Route
        {...remainProps}
        render={routeProps => {
          return (<MyComponent {...routeProps}/>)
        }}
      />
    )
  }
}
