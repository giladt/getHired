import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class Questions extends Component<any> {
  constructor(props:any) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:4000/questions')).data;
    this.setState({
      questions,
    });
  }

  render() {
    const state:any = this.state;
    return (
      <div className="container">
        <div className="row">
          {state.questions === null && <p>Loading questions...</p>}
          {state.questions && state.questions.map((question:any) => {
              return(
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/questions/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Answers: {question.answers}</div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Questions);
