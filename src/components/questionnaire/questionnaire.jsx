import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import "./questionnaire.scss";
import { Link } from "react-router-dom";

export default class Questionnaire extends Component {
  state = { id: "", quizObject: {}, selection: "", ...this.props };
  db = firebase.firestore();

  updateSelection = (event, selection) => {
    event.preventDefault();
    this.db
      .collection("users")
      .doc(this.props.userInfo.uid)
      .update({ selection });
    this.setState({ selection });
  };

  exitFromQuiz = () => {
    this.db
      .collection("users")
      .doc(this.props.userInfo.uid)
      .update({ isParticipant: false, selection: "" });
  };

  componentDidMount() {
    this.db.collection("display-question").onSnapshot((snapshot) => {
      this.setState({
        quizObject: snapshot.docChanges()[0].doc.data(),
        id: snapshot.docChanges()[0].doc.id,
        selection: "",
      });
    });
  }

  render() {
    return (
      <main className="main-container">
        {this.state.quizObject &&
        this.state.quizObject.question &&
        this.state.quizObject.question.length > 0 ? (
          <div className={this.state.id}>
            <div className="question">
              Question :- {this.state.quizObject.question}
            </div>
            <div className="answer">
              {this.state.quizObject.options.map((option) => (
                <button
                  className={
                    this.state.selection === option ? "option-selected" : ""
                  }
                  key={option}
                  onClick={(event) => this.updateSelection(event, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Please wait till the next question is loaded.</p>
        )}
        <p>Click on End quiz to finish the quiz</p>
        <Link to="/">
          <button onClick={this.exitFromQuiz}>End Quiz</button>
        </Link>
      </main>
    );
  }
}
