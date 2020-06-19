import React from 'react';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import { withRouter } from "react-router-dom";

// Queries
import { GET_CANDIDATE_QL } from '../../queries/queries';

// Components
import User from './User/user.jsx';
import Spinner from './spinner.jsx';
import styles from './root_static.module.css';

class Root extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: {[this.props.match.params.page]: 'active'},
      employer: this.props.employer
    };
  }
   
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.page[this.props.match.params.page]){
      this.setState({page:{[this.props.match.params.page]:'active'}});  
    }
  }

  render(){

    if(this.props && this.props.user && this.props.user) {

      return(
        <Query query={GET_CANDIDATE_QL} variables={{id: this.props.user}} >
        {
          ({loading, err, data}) => {
            // Data fetching in progress - Loading page
            if(loading){
              return(
                <Spinner />
              )
            }

            // Data fetching done - Show page content
            if(!loading){

              // User exsists
              if(data && data.Candidate && data.Candidate[0]) {
                // let pos = this.getAddr();
                return(
                  <User 
                    page={this.state.page} 
                    user={this.props.user}
                    employer={this.props.employer}
                    item={data.Candidate[0]}
                    google={this.props.google} 
                  />
                )
              } else 
              // No user found
              {
                return (
                  <h1 className={styles.h1}>Oops! This profile was not found!</h1>
                )
              }
            }
          }
        }
        </Query>      
      )
    }
  }
}

export default withRouter(graphql(GET_CANDIDATE_QL)(Root));

