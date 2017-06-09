import React, { Component } from "react";
// import survey_logo_64 from './survey_logo_64.svg';
import "./App.css";
import DataService from "./DataService";
import QuestionComponent from "./QuestionComponent";

class App extends Component {
  static state = {
    currentQuestion: {},
  };

  constructor(props) {
    super(props);
    this.dataService = DataService();
  }

  componentWillMount() {
    this.setState({ currentQuestion: this.dataService.firstQuestion() });
  }

  handlePreviousClick = evt => {
    if (this.state.currentQuestion && this.state.currentQuestion.prevUuid) {
      this.setState({
        currentQuestion: this.dataService.findQuestion(this.state.currentQuestion.prevUuid),
      });
    }
  };

  handleAnswerClick = evt => {
    const aUuid = evt.currentTarget.value;
    const cq = this.state.currentQuestion;
    cq.selectedAnswer = aUuid;
    this.dataService.setAnswer(cq, aUuid);
    this.setState({
      currentQuestion: this.dataService.findNextQuestion(cq),
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Survey App with vanilla React</h2>
        </header>
        <article className="App-content">
          <QuestionComponent
            question={this.state.currentQuestion}
            onAnswerClick={this.handleAnswerClick}
          />
          <button className="btn orange" onClick={this.handlePreviousClick}>
            <span>previous</span>
          </button>
        </article>
      </div>
    );
  }
}

export default App;
