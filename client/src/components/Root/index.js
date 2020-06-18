import React from 'react';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import { withRouter} from "react-router-dom";

// Queries
import { GET_CANDIDATE_QL } from '../../queries/queries';

// Components
import User from './User';
import Spinner from './spinner';
import styles from './styles.module.css';

//import styles from './styles.module.css';

class Root extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: {[this.props.match.params.page]: 'active'}
    };
  }
   
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.page[this.props.match.params.page]){
      this.setState({page:{[this.props.match.params.page]:'active'}});  
    }
    
  }

  render(){
    if(this.props && this.props.match && this.props.match.params.user) {

      return(
        <Query query={GET_CANDIDATE_QL} variables={{id: this.props.match.params.user}} >
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
                    user={this.props.match.params.user} 
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

