import React, { Component } from "react";
import { connect } from "react-redux";
import CMSChoice from "./CMSChoice";
import CMSLegend from "./CMSLegend";
import { TextField, ChoiceList } from "@cmsgov/design-system-core";
import DateRange from "../layout/DateRange";
import CMSRanges from "./CMSRanges";
import { setAnswerEntry } from "../../actions/initial";
import { selectQuestionsForPart, selectQuestion } from "../../store/selectors";

class QuestionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeArray = this.handleChangeArray.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.validatePercentage = this.validatePercentage.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleCheckboxFlag = this.handleCheckboxFlag.bind(this);
    this.handleIntegerChange = this.handleIntegerChange.bind(this);
    this.updateLocalStateOnly = this.updateLocalStateOnly.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.buildSynthesizedValue = this.buildSynthesizedValue.bind(this);
  }

  validatePercentage(evt) {
    // Regex to allow only numbers and decimals
    const regex = new RegExp(
      "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:.[0-9]{0,30})?$"
    );
    let error;
    // If content has been entered
    if (evt.target.value.length > 0) {
      // Test returns boolean
      if (!regex.test(evt.target.value)) {
        error = "Please enter only numbers and decimals";
      } else {
        error = null;
      }
    }

    // Write to local state
    this.setState({
      [evt.target.name + "Err"]: error,
    });
  }

  // For input that will be validated onBlur but need to update state onChange
  updateLocalStateOnly(evt) {
    this.setState({
      [evt.target.name]: evt.target.value ? evt.target.value : null,
      [evt.target.name + "Mod"]: true,
    });
  }

  handleIntegerChange(evt) {
    const validNumberRegex = RegExp(/^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/);

    if (evt.target.value.length > 0) {
      if (validNumberRegex.test(evt.target.value)) {
        let formattedNum = evt.target.value.replace(/[ ,]/g, "");
        this.props.setAnswer(evt.target.name, formattedNum);
        this.setState({
          [evt.target.name]: evt.target.value ? evt.target.value : null,

          [evt.target.name + "Err"]: validNumberRegex.test(evt.target.value),
        });
      } else {
        this.setState({
          [evt.target.name + "Err"]: validNumberRegex.test(evt.target.value),
        });
      }
    }
  }

  validateEmail(evt) {
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    if (evt.target.value.length > 0) {
      if (validEmailRegex.test(evt.target.value)) {
        this.setState({
          [evt.target.name]: evt.target.value ? evt.target.value : null,
          [evt.target.name + "Mod"]: true,
          [evt.target.name + "Err"]: !validEmailRegex.test(evt.target.value),
        });
      } else {
        this.setState({
          [evt.target.name + "Err"]: !validEmailRegex.test(evt.target.value),
        });
      }
    }
  }

  // Limit to 10 digits or throw error
  validatePhone(evt) {
    // Remove hyphens
    let digits = evt.target.value.replace(/-/g, "");

    let errorMessage;
    if (digits.length > 10) {
      errorMessage = "Please limit to 10 digits";
    } else {
      errorMessage = null;
    }

    this.setState({
      [evt.target.name + "Err"]: errorMessage,
    });
  }

  handleCheckboxFlag(evt) {
    //this.props.sectionContext([evt.target.name, evt.target.checked]);
  }

  handleChange(evt) {
    this.props.setAnswer(evt.target.name, evt.target.value);
  }

  handleChangeArray(evtArray) {
    this.props.setAnswer(evtArray[0], evtArray[1]);
    this.setState({
      [evtArray[0]]: evtArray[1] ? evtArray[1] : null,
      [evtArray[0] + "Mod"]: true,
    });
  }

  handleFileUpload = (event) => {
    this.setState({
      selectedFiles: event.target.files,
    });
  };

  buildSynthesizedValue = (question) => {
    const numerator = selectQuestion(
      this.props.data,
      question.fieldset_info.targets[0].split("'")[1]
    );
    const denominator = selectQuestion(
      this.props.data,
      question.fieldset_info.targets[1].split("'")[1]
    );
    console.log("numerator", numerator);
    console.log("denominator", denominator);
    return "";
  };

  render() {
    return (
      <>
        {this.props.data.map((question, index) => (
          <div className="question" key={index}>
            <fieldset className="ds-c-fieldset">
              {/* Generating question label */}
              <legend className="ds-c-label">
                <CMSLegend id={question.id} label={question.label} />
              </legend>
              {question.type === "radio"
                ? question.answer.options.map(({ label, value }, index) => {
                    return (
                      <CMSChoice
                        name={question.id}
                        value={value}
                        label={label}
                        type={question.type}
                        answer={question.answer.entry}
                        conditional={question.conditional}
                        children={question.questions}
                        valueFromParent={this.state[question.id]}
                        onChange={this.handleChangeArray}
                        key={index}
                        setAnswer={this.props.setAnswer}
                        disabled={question.answer.readonly}
                        disabledFromParent={question.answer.readonly}
                      />
                    );
                  })
                : null}

              {question.type === "checkbox"
                ? question.answer.options.map(({ label, value }, index) => {
                    return (
                      <CMSChoice
                        name={question.id}
                        value={value}
                        label={label}
                        type={question.type}
                        answer={question.answer.entry}
                        conditional={question.conditional}
                        children={question.questions}
                        valueFromParent={this.state[question.id]}
                        onChange={this.handleCheckboxInput}
                        key={index}
                        setAnswer={this.props.setAnswer}
                        disabled={question.answer.readonly}
                      />
                    );
                  })
                : null}

              {/* If textarea */}
              {question.type === "text" ? (
                <TextField
                  multiple
                  name={question.id}
                  value={question.answer.entry || ""}
                  type="text"
                  onChange={this.handleChange}
                  label=""
                  disabled={question.answer.readonly}
                />
              ) : null}

              {/* Email  */}
              {question.type === "email" ? (
                <TextField
                  name={question.id}
                  value={
                    this.state[question.id] || this.state[question.id + "Mod"]
                      ? this.state[question.id]
                      : question.answer.entry
                  }
                  type="text"
                  label=""
                  onBlur={this.validateEmail}
                  onChange={this.updateLocalStateOnly}
                  errorMessage={
                    this.state[question.id + "Err"]
                      ? "Please enter a valid email address"
                      : false
                  }
                  disabled={question.answer.readonly}
                />
              ) : null}

              {/* If small textarea */}
              {question.type === "text_small" ? (
                <TextField
                  className="ds-c-input"
                  name={question.id}
                  value={question.answer.entry || ""}
                  disabled={question.answer.readonly}
                />
              ) : null}

              {/* If medium textarea */}
              {question.type === "text_medium" ? (
                <div>
                  <TextField
                    className="ds-c-input"
                    multiline
                    name={question.id}
                    value={question.answer.entry || null}
                    type="text"
                    value={question.answer.entry || ""}
                    disabled={question.answer.readonly}
                  />
                </div>
              ) : null}

              {/* If large textarea */}
              {question.type === "text_multiline" ||
              question.type === "mailing_address" ? (
                <div>
                  <TextField
                    className="ds-c-input"
                    label=""
                    multiline
                    name={question.id}
                    onChange={this.handleChange}
                    rows={6}
                    type="text"
                    value={question.answer.entry || ""}
                    disabled={question.answer.readonly}
                  />
                </div>
              ) : null}

              {/* If FPL Range */}
              {question.type === "ranges" ? (
                <CMSRanges item={question} />
              ) : null}

              {/* If integer*/}
              {question.type === "integer" ? (
                <>
                  {console.log(question.id, question.answer.entry)}
                  <TextField
                    name={question.id}
                    className="ds-c-input"
                    label=""
                    value={
                      this.state[question.id] || this.state[question.id + "Mod"]
                        ? this.state[question.id]
                        : question.answer.entry
                    }
                    onChange={this.handleIntegerChange}
                  />
                </>
              ) : null}

              {/* If file upload */}
              {question.type === "file_upload" ? (
                <div>
                  <TextField
                    // label={question.label}
                    className="file_upload"
                    onChange={this.handleFileUpload}
                    name="fileUpload"
                    type="file"
                    multiple
                    label=""
                  />
                </div>
              ) : null}

              {/* If money */}
              {question.type === "money" ? (
                <>
                  <TextField
                    className="money"
                    label=""
                    inputMode="currency"
                    mask="currency"
                    pattern="[0-9]*"
                    value={question.answer.entry || ""}
                    disabled={question.answer.readonly}
                  />
                </>
              ) : null}

              {/* If Date range */}
              {question.type === "daterange" ? (
                <DateRange
                  question={question}
                  onChange={this.props.handleChangeArray}
                />
              ) : null}

              {question.type === "phone_number" ? (
                <TextField
                  className="phone_number"
                  label=""
                  numeric={true}
                  mask="phone"
                  pattern="[0-9]*"
                  value={question.answer.entry}
                  name={question.id}
                  onBlur={this.validatePhone}
                  errorMessage={
                    this.state[question.id + "Err"]
                      ? this.state[question.id + "Err"]
                      : null
                  }
                  label=""
                  mask="phone"
                  name={question.id}
                  numeric={true}
                  onBlur={this.validatePhone}
                  pattern="[0-9]*"
                  value={question.answer.entry || ""}
                  disabled={question.answer.readonly}
                />
              ) : null}

              {question.type === "percentage" ? (
                <>
                  <TextField
                    className="percentage"
                    inputMode="percentage"
                    pattern="[0-9]*"
                    numeric={true}
                    name={question.id}
                    value={
                      this.state[question.id]
                        ? this.state[question.id]
                        : question.answer.entry
                    }
                    errorMessage={
                      this.state[question.id + "Err"]
                        ? this.state[question.id + "Err"]
                        : null
                    }
                    onChange={(this.handleChange, this.validatePercentage)}
                    label=""
                    name={question.id}
                    numeric={true}
                    onChange={this.validatePercentage}
                    pattern="[0-9]*"
                    value={question.answer.entry || ""}
                    disabled={question.answer.readonly}
                  />
                  <>%</>
                </>
              ) : null}

              {question.type === "checkbox_flag" ? (
                <ChoiceList
                  name={question.id}
                  choices={[
                    {
                      label: "Select",
                      defaultChecked: question.answer.entry,
                      value: "",
                    },
                  ]}
                  type="checkbox"
                  answer={question.answer.entry}
                  onChange={this.handleCheckboxFlag}
                  label=""
                />
              ) : null}
              {/*Children of radio and checkboxes are handled in their respective sections (above)*/}
              {question.questions &&
              question.type !== "fieldset" &&
              question.type !== "radio" &&
              question.type !== "checkbox" ? (
                <QuestionComponent
                  subquestion={true}
                  setAnswer={this.props.setAnswer}
                  data={question.questions} //Array of subquestions to map through
                />
              ) : null}

              {/*Children of radio and checkboxes are handled in their respective sections (above)*/}

              {question.type === "fieldset" &&
              question.fieldset_type === "noninteractive_table" ? (
                <table className="ds-c-table" width="100%">
                  <thead>
                    <tr>
                      {question.fieldset_info.headers.map(function (value) {
                        return (
                          <th
                            width={`${
                              100 / question.fieldset_info.headers.length
                            }%`}
                            name={`${value}`}
                          >
                            {value}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  {question.fieldset_info.rows.map((value) => {
                    return (
                      <tr>
                        {value.map((value) => {
                          return (
                            <td
                              width={`${
                                100 / question.fieldset_info.headers.length
                              }%`}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </table>
              ) : null}

              {question.type === "fieldset" &&
              question.fieldset_type === "synthesized_value" ? (
                <>
                  {console.log(
                    "selectQuestion",
                    selectQuestion(
                      this.props.data,
                      question.fieldset_info.targets[0].split("'")[1]
                    )
                  )}
                  <TextField
                    name={question.id}
                    className="ds-c-input"
                    label="Calculated field from #"
                    value={this.buildSynthesizedValue(question)}
                  />
                </>
              ) : null}

              {question.questions && question.type === "fieldset" ? (
                <div className="cmsfieldset">
                  {
                    (console.log("data to QC", question.questions),
                    (
                      <QuestionComponent
                        data={question.questions} //Array of subquestions to map through
                        setAnswer={this.props.setAnswer}
                      />
                    ))
                  }
                </div>
              ) : null}
            </fieldset>
          </div>
        ))}
      </>
    );
  }
}

// anticipated question types

// "checkbox",[x]
// "file_upload",[x]
// "integer",[x]
// "money",[x]
// "percentage",  [x] [BOUND]
// "radio",[x]
// "ranges",[x]
// "text",[x] [BOUND] multiline not working?
// "text_medium",[x] [BOUND]
// "text_multiline",[x] [BOUND]
// "text_small"   [x] [BOUND]
// "phone_number", [x] [BOUND]
// "email", [x] [BOUND]
// "daterange", [x] [BOUND]
// "mailing_address",[x] [BOUND] [??? is this several fields?? is this a component???, just a multiline textbox ]

//TO-DO
// "checkbox_flag", [kindof like a 'accept terms and conditions' checkbox, just accepts an input]

const mapStateToProps = (state, { data, partId }) => ({
  data: data || selectQuestionsForPart(state, partId),
});

const mapDispatchToProps = {
  setAnswer: setAnswerEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
