import React from 'react';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import { withRouter } from "react-router-dom";

// Queries
import { GET_CANDIDATE_QL } from '../../queries/queries';

// Components
import User from './User/user';
import Spinner from './spinner';
import styles from './root_static.module.css';


interface Data {
  Candidate: Array<{
    first_name: string,
    last_name: string,
    short_title: string,
    home_address: {
      _id: string,
      ref_id: string,
      street: string,
      house_no: string,
      city: string,
      state: string,
      country: string,
      postal_code: number
    }
  }>
}

interface Variables {
  id: string
}

class Root extends React.Component<any>{
  constructor(props:any){
    super(props);
    this.state = {
      page: {[props.match.params.page]: 'active'},
      user: props.match.params.user,
      employer: props.match.params.employer
    };
  }
   
  componentDidUpdate(prevProps:any, prevState:any) {
    const props:any = this.props;
    if(!prevState.page[props.match.params.page]){
      this.setState({page:{[props.match.params.page]:'active'}});  
    }
  }

  render(){
    const props:any = this.props;
    const state:any = this.state;

    if(state.user && state.employer) {

      return(
        <Query<Data,Variables> 
          query={GET_CANDIDATE_QL} 
          variables={{id: state.user}} >
        {({loading, error, data}:any):any => {
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
                document.title = `${data.Candidate[0].first_name} ${data.Candidate[0].last_name}`;

                return(
                  <User 
                    className={styles.root}
                    page={state.page} 
                    user={state.user}
                    employer={state.employer}
                    item={data.Candidate[0]}
                    google={props.google} 
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

export default withRouter(graphql<any>(GET_CANDIDATE_QL)(Root));

