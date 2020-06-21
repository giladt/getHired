import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './auth';

class Callback extends Component<any> {
  
  async componentDidMount() {
    const props:any = this.props;

    await auth0Client.handleAuthentication();
    props.history.replace('/questions');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);