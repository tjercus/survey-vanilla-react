import React, { Component } from "react";
import PropTypes from "prop-types";

class QuestionComponent extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onAnswerClick: PropTypes.func.isRequired,
  };

  render() {
    const q = this.props.question;
    return (
      <section id="App-question">
        <h2>{q.text}</h2>
        <ul>
          {q.answers.map(answer => (
            <li key={answer.uuid} className="App-answer">
              <input
                type="radio"
                name={q.uuid}
                value={answer.uuid}
                onClick={this.props.onAnswerClick}
              />
              {answer.text}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default QuestionComponent;
