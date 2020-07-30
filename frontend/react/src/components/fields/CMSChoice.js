import React, { Component, Fragment } from "react";
import { Choice, TextField } from "@cmsgov/design-system-core";

class CMSChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiChoices: [],
      childFields: [],
    };
  }

  componentDidMount() {
    // console.log("multi prop??", typeof this.props.multiArr);
    // let parsed = JSON.parse(this.props.multiArr);
    // console.log("what about now?? multiarr type:", typeof parsed);
    // console.log("what about now?? multiarr", parsed);
    // switch (this.props.type) {
    //   case "money":
    //     return 1
    //   case "multi":
    //     return (

    //     )
    // }

    let nestedQuestions;
    if (this.props.type === "multi") {
      nestedQuestions = this.props.multiArr.map((value) => (
        <Choice
          label={"testoooo"}
          class="ds-c-choice"
          name={this.props.name}
          value={value}
          type="radio"
          checked={this.props.answer === value ? "checked" : null}
          checkedChildren={
            this.props.conditional === value
              ? this.props.children.map((element) => <CMSChoice />)
              : null
          }
        >
          {value}
        </Choice>
      ));
    }

    console.log("nested questions??? type:", Array.isArray(nestedQuestions));

    this.setState({
      multiChoices: [nestedQuestions],
    });
  }

  render() {
    // Determine if choice is checked
    // const isChecked = props.answer === props.value ? "checked" : null;

    // Create children
    // if (props.conditional === props.value && props.children) {
    //   props.children.map((item) => {
    //     switch (item.answer_type) {
    //       case "money":
    //         childFields.push(
    //           <TextField
    //             className="fpl-input"
    //             label={item.text}
    //             inputMode="currency"
    //             mask="currency"
    //             pattern="[0-9]*"
    //           />
    //         );
    //         break;
    //       case "multi":
    //         // "skip_text": "This question doesn’t apply to your state since you answered NO to Question 2.",
    //         // "text": "Are your premium fees tiered by Federal Poverty Level (FPL)?",
    //         // "answer_type": "multi",
    //         // "answer_values": ["yes", "no"],
    //         // "answer": null
    //         //   childFields += item.answer_values.length;
    //         childFields = item.answer_values.map((answer) => (
    //           // <fieldset className="ds-c-fieldset">
    //           //   <legend className="ds-c-label">{item.text}</legend>
    //           <Choice className="fpl-input" name={item.id} value={answer}>
    //             {answer}
    //           </Choice>
    //           // </fieldset>
    //         ));
    //     }
    //   });
    // }

    return (
      <Fragment>
        {this.state.multiChoices.map((element) => (
          <>{element}</>
        ))}
      </Fragment>
    );
  }
}

export default CMSChoice;
