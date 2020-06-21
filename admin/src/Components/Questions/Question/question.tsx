import React, {Component} from 'react';
import axios from 'axios';

class Question extends Component {
  constructor(props:any) {
    super(props);
    this.state = {
      question: null,
    };
  }

  async componentDidMount() {
    const props:any = this.props;
    const { match: { params } } = props;
    const question = (await axios.get(`http://localhost:4000/questions/${params.questionId}`)).data;
    console.log("Question:",question);
    this.setState({
      question: question
    });
  }

  render() {
    const state:any = this.state;
    const props:any = this.props;
    const { match: { params } } = props;
    const {question} = state;

    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <p>Answers:</p>
            {
              question.answers.map((answer:any, idx:any) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Question;
