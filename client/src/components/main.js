import React, { Component } from 'react';
import {
  withRouter,
  Route
} from "react-router-dom";

// Components
import Content from './Root/';
import RootPage from './Root/root';

class Main extends Component {

  render(){
    return(
      <div>
        <Route exact path={`/`} component={RootPage} />

        <Route path={`/:page?/:user`}>
          <Content google={this.props.google} />
        </Route>
      </div>
    );
  }
}

export default withRouter(Main);
