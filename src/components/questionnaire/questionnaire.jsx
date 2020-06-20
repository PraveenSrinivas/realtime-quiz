import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import "./questionnaire.scss";

export default class Questionnaire extends Component {
  state = { ...this.props };

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("display-question").onSnapshot((snapshot) => {
      this.setState({
        quizObject: snapshot.docChanges()[0].doc.data(),
        id: snapshot.docChanges()[0].doc.id,
      });
      console.log(snapshot.docChanges());
    });
  }

  render() {
    return (
      <main className="main-container questionnaire-page">
        {this.state.quizObject &&
        this.state.quizObject.question &&
        this.state.quizObject.question.length > 0 ? (
          <div className={this.state.id}>
            <h2 className="question">
              Question :- {this.state.quizObject.question}
            </h2>
            <div className="options">
              {this.state.quizObject.options.map((option) => (
                <button
                  className={`option  ${
                    this.state.selection === option ? "option-selected" : ""
                  }`}
                  key={option}
                  onClick={(event) => this.updateSelection(event, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Oops!! Sorry, no questions at the moment</p>
        )}
        <div className="endquiz-wrapper">
          <p className="endquiz-title">
            Click on End quiz to finish the quiz
          </p>
          <Link to="/">
            <button className="endquiz-button" onClick={this.exitFromQuiz}>End Quiz</button>
          </Link>
        </div>
      </main>
    );
  }
}
