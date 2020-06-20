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
      <main className="main-container">
        {this.state.quizObject ? (
          <div className={this.state.id}>
            <div className="question">
              Question :- {this.state.quizObject.question}
            </div>
            <div className="answer">
              {this.state.quizObject.options.map((option) => (
                <button key={option}>{option}</button>
              ))}
            </div>
          </div>
        ) : (
          <p>Oops!! Sorry, no questions at the moment</p>
        )}
      </main>
    );
  }
}
