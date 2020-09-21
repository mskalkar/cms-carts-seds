import React, { Component } from "react";
import QuestionComponent from "../fields/QuestionComponent";
import { selectQuestionsForPart, selectQuestion } from "../../store/selectors";

class CMSRepeatable extends Component {
 constructor (props) {
  super(props);
   this.state = {};
 }

 render () {
  return (
   {this.props.data.map((question, index) => (
    <QuestionComponent
     subquestion={true}
     setAnswer={this.props.setAnswer}
     data={question.questions}
    />
   ))}
  )
 }
 

}

const mapStateToProps = (state, { data, partId }) => ({
 data: data || selectQuestionsForPart(state, partId),
 store: state,
});

const mapDispatchToProps = {
 setAnswer: setAnswerEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSRepeatable);