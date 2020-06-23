import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button as button,
  ChoiceList,
  Tabs,
  TabPanel,
  TextField,
} from "@cmsgov/design-system-core";
import Sidebar from "../../layout/Sidebar";
import PageInfo from "../../layout/PageInfo";
import FillForm from "../../layout/FillForm";
import NavigationButton from "../../layout/NavigationButtons";
import { textAreaCopy, textFieldCopy } from "../../Utils/formDummyData";

class Section3c extends Component {
  constructor() {
    super();

    this.loadLastYearsAnswers = this.loadLastYearsAnswers.bind(this);
    // this.setConditional = this.setConditional.bind(this);
    this.userSelection = this.userSelection.bind(this);
    // this.selectInput = this.selectInput.bind(this);
    // this.setConditionalFromToggle = this.setConditionalFromToggle.bind(this);

    this.state = {
      // p1_q1: "no",
      // p1_q1__a: "",
      // p1_q1__a_1: "",
      // p1_q1__a_2: "",

      p1_q1__a_dropdown: false,
      p1_q1__a_dropdown_PREV: false,
      p1_q1__a: "",
      p1_q1__a_PREV: [],

      p1_q1__b: "",
      p1_q1__b_PREV: [],

      p1_q1__c: "",
      p1_q1__c_PREV: [],

      p1_q1__d: "",
      p1_q1__d_PREV: [],

      p1_q1__e: "",
      p1_q1__e_PREV: [],

      p1_q2__a: "",
      p1_q2__b: "",
      p1_q2__c: "",
      p1_q2__d: "",
      p1_q2__e: "",
      p1_q3: "",
      p1_q4: "",
      p1_q5: "",
      p2_q1: "",
      p2_q2: "",
      p2_q3: "",
      p2_q4: "",
      p2_q5: "",
      p2_q6: "",
      fillFormTitle: "Same as last year",
      questionsWithDropDownConditionals: { p1_q1__a: "yes" },
    };
  }

  // button has p1_q1
  // want to update   PREV_p1_q1__b, p1_q1__c, p1_q1__d

  //1 loop through and edit anything starting with p1_q1 to be their 'PREV' value
  // 2 give each section a grouping
  // let GROUPp1_q1 = [p1_q1__a, p1_q2__b, p1_q2__c, p1_q2__d, p1_q2__e]

  componentDidMount() {
    // before the component loads, provide the state with each question's previous data
    // this.setState({
    //   p1_q1__a_PREV: "yes",
    //   p1_q1__a_dropdown_PREV: true,
    //   p1_q1__b_PREV: textAreaCopy,
    //   p1_q1__c_PREV: textAreaCopy,
    //   p1_q1__d_PREV: textFieldCopy,
    //   p1_q1__e_PREV: textFieldCopy,
    // });

    this.setState({
      p1_q1__a_PREV: ["radial", "yes"],
      p1_q1__a_dropdown_PREV: ["boolean", true],
      p1_q1__b_PREV: ["text", textAreaCopy],
      p1_q1__c_PREV: ["text", textAreaCopy],
      p1_q1__d_PREV: ["text", textFieldCopy],
      p1_q1__e_PREV: ["text", textFieldCopy],
    });
  }

  userSelection(el) {
    // an array of all the questions with a dropdown option
    let someNum = 0;
    let dropDowns = Object.keys(this.state.questionsWithDropDownConditionals);

    // if this is a question with a dropdown, set the dropdown boolean
    // also set the value of the user's selection
    if (dropDowns.includes(el.target.name)) {
      console.log("DING DONG");
      let dropDownCondition = this.state.questionsWithDropDownConditionals[
        el.target.name
      ];
      let booleanSelection =
        el.target.value === dropDownCondition ? true : false;
      this.setState({
        [`${el.target.name}_dropdown`]: booleanSelection,
        [el.target.name]: el.target.value,
      });
    } else {
      // the vast majority of the time there will be no dropdown
      this.setState({
        [el.target.name]: el.target.value,
      });
    }
    //name: p1_q1__a
    //value: "yes" or "no"
    // }
    // set conditional is strictly used to set the state for choice lists,
    // it takes in the name of the choicelist and gives the state the value of that choicelist
    // setConditional(el) {
    //   let booleanValue = el.target.value === "yes" ? true: false

    //   this.setState({
    //     [el.target.name + "_conditional"]: this.state[
    //       el.target.name + "_conditional"
    //     ]
    //       ? false
    //       : true,
    //   })
    //   // el.target.defaultChecked = true;
    // }

    // selectInput(id, choice, active) {
    //   let choiceListOptions = document
    //     .getElementById(id)
    //     .getElementsByTagName("input");

    //   if (active) {
    //     choiceListOptions[choice].checked = true;
    //   } else {
    //     for (let input of choiceListOptions) {
    //       input.checked = false;
    //     }
    //   }

    // let toCheck = choiceListOptions
    //   .map(function (e) {
    //     return e.value;
    //   })
    //   .indexOf(choice);

    // console.log("WHAT IS THIS BEAST", choiceListOptions);
    // console.log("no clue if this will work", toCheck);
    // if (active) {
    //   selection[option].checked = true;
    // } else {
    //   for (let input of selection) {
    //     input.checked = false;
    //   }
    // }
  }

  loadLastYearsAnswers(button) {
    // update p1_q1 conditional *
    // update values on state to be read by all text fields
    // update values on state to be read by choice list

    let previousAnswerGroups = {
      p1_q1: [
        "p1_q1__a",
        "p1_q1__a_dropdown",
        "p1_q1__b",
        "p1_q1__c",
        "p1_q1__d",
        "p1_q1__e",
      ],
    };

    let selectedGroup = previousAnswerGroups[button.target.name];

    // console.log("WHAT BUTTON WAS CLICKED?", button.target.name);
    // console.log("WHO AM I FILLING IN??", selectedGroup);

    // loop through this group and set their state values to be their PREV values
    let updateObject = {};
    for (let i = 0; i <= selectedGroup.length - 1; i++) {
      let questionElement = selectedGroup[i];
      let copyValue;
      let inputType = this.state[`${questionElement}_PREV`][0];
      if (this.state.fillFormTitle === "Same as last year") {
        copyValue = this.state[`${questionElement}_PREV`][1];

        if (inputType === "radial") {
          // if its a radial, the value cannot be directly set so we'll grab the HTML element
          let choiceListOptions = document
            .getElementById(button.target.name)
            .getElementsByTagName("input");

          for (let input of choiceListOptions) {
            if (input.value === copyValue) {
              input.checked = true;
            }
          }
        }
      } else {
        // On Undo
        copyValue = "";

        if (inputType === "radial") {
          // if its a radial, the value cannot be directly set so we'll grab the HTML element
          let choiceListOptions = document
            .getElementById(button.target.name)
            .getElementsByTagName("input");

          for (let input of choiceListOptions) {
            input.checked = null;
          }
        }
      }

      updateObject[questionElement] = copyValue;
      // we're getting three props
      // name (p1_q1)
      // title (undo, fill from last year)
      // onclick (loadAnswers)

      // this.setState({
      //   p1_q1__b: PREV_p1_q1__b,
      //  p1_q1__b: ""
      // });
    }
    console.log("SHOW ME WHATS GOING ON STATE", updateObject);

    this.setState(updateObject);
    this.setState({
      fillFormTitle:
        this.state.fillFormTitle === "Undo" ? "Same as last year" : "Undo",
    });
  }

  render() {
    return (
      <div className="section-3c">
        <div className="ds-l-container">
          <div className="ds-l-row">
            <div className="sidebar ds-l-col--3">
              <Sidebar />
            </div>

            <div className="main ds-l-col--9">
              <PageInfo />
              <div className="section-content">
                <Tabs>
                  <TabPanel id="tab-form" tab="Section 3C: Eligibility">
                    <form>
                      <div>
                        <h3 className="part-header">
                          Part 1: Eligibility Renewal and Retention
                        </h3>
                        <div className="question-container">
                          <FillForm
                            name="p1_q1"
                            title={this.state.fillFormTitle}
                            onClick={this.loadLastYearsAnswers}
                          />
                          <div className="question">
                            1. Do you have authority in your CHIP state plan to
                            provide for presumptive eligibility, and have you
                            implemented this?
                          </div>
                          <div id="p1_q1">
                            <ChoiceList
                              choices={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                  defaultChecked:
                                    this.state.p1_q1__a === "yes"
                                      ? true
                                      : false,
                                },
                                {
                                  label: "No",
                                  value: "no",
                                },
                              ]}
                              // className="p1_q1__a"
                              label=""
                              name="p1_q1__a"
                              onChange={this.userSelection}
                              hint="Note: This question may not apply to Medicaid Expansion states."
                            />
                            {this.state.p1_q1__a_dropdown === true ? (
                              <div className="conditional">
                                <TextField
                                  label="What percentage of children are presumptively enrolled in CHIP pending a full eligibility determination?"
                                  multiline
                                  name="p1_q1__b"
                                  rows="6"
                                  value={this.state.p1_q1__b}
                                  onChange={this.userSelection}
                                />
                                <TextField
                                  hint="Maximum 7,500 characters"
                                  label="Of those children who are presumptively enrolled, what percentage are determined fully eligible and enrolled in the program?"
                                  multiline
                                  name="p1_q1__c"
                                  rows="6"
                                  value={this.state.p1_q1__c}
                                  onChange={this.userSelection}
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="question-container">
                        <FillForm
                          name="p1_q2"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        /> */}

                      {/* <div className="question">
                          2. Tell us how your state simplifies the eligibility
                          renewal process for families in order to retain more
                          children in CHIP.
                        </div>
                        <div className="sub-questions">
                          <div id="p1_q2__a">
                            <ChoiceList
                              choices={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                  checked: this.state.p1_q2__a_1,
                                },
                                {
                                  label: "No",
                                  value: "no",
                                  checked: this.state.p1_q2__a_2,
                                },
                              ]}
                              label="a. Do you conduct follow-up communication with families through caseworkers and outreach workers?"
                              name="p1_q2__a"
                            />
                          </div> */}
                      {/* <div id="p1_q2__b">
                            <ChoiceList
                              choices={[
                                {
                                  label: "Yes",
                                  value: "yes",
                                  checked: this.state.p1_q2__b_1,
                                },
                                {
                                  label: "No",
                                  value: "no",
                                  checked: this.state.p1_q2__b_2,
                                },
                              ]}
                              label="b. Do you send renewal reminder notices to all families?"
                              name="p1_q2__b"
                            />
                          </div>
                          <TextField
                            label="c. How many notices do you send to families before disenrolling a child from the program?"
                            labelClassName="p1_q1__c"
                            name="p1_q2__c"
                            value={this.state.p1_q2__c}
                          />
                          <TextField
                            label="d. How many notices do you send to families before disenrolling a child from the program?"
                            labelClassName="p1_q1__d"
                            name="p1_q2__d"
                            value={this.state.p1_q2__d}
                          />
                          <TextField
                            label="e. What else do you do to simplify the eligibility renewal process for families in order to increase retention?"
                            labelClassName="p1_q1__e"
                            name="p1_q2__e"
                            value={this.state.p1_q2__e}
                          />
                        </div>
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p1_q3"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <div className="question">
                          3. Which retention strategies have been most effective
                          in your state?
                        </div>
                        <TextField
                          hint="Maximum 7,500 characters"
                          label=""
                          multiline
                          rows="6"
                          name="p1_q3"
                          value={this.state.p1_q3}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p1_q4"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <div className="question">
                          4. How have you evaluated the effectiveness of your
                          strategies?
                        </div>
                        <TextField
                          hint="Maximum 7,500 characters"
                          label=""
                          multiline
                          rows="6"
                          name="p1_q4"
                          value={this.state.p1_q4}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p1_q5"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <div className="question">
                          5. What data sources and methodology do you use for
                          tracking effectiveness?
                        </div>
                        <TextField
                          hint="Maximum 7,500 characters"
                          label=""
                          multiline
                          rows="6"
                          name="p1_q5"
                          value={this.state.p1_q5}
                        />
                      </div> */}
                      {/* <h3 className="part-header">Part 2: Eligibility Data</h3> */}
                      {/* <div className="question-container">
                        <FillForm
                          name="p2_q1"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <div className="question">
                          A. Denials of Title XXI Coverage in FFY 2019
                          <div className="hint">
                            Enter your data below and the percentages will be
                            automatically calculated in the final report.
                          </div>
                        </div>
                        <TextField
                          hint="This only includes denials for Title XXI at the time of initial application, not redetermination"
                          label="1. How many applicants were denied Title XXI coverage?"
                          labelClassName="p2_q1"
                          name="p2_q1"
                          value={this.state.p2_q1}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p2_q2"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <TextField
                          hint="For example: an incomplete application, missing documentation, missing enrollment fee, etc."
                          label="2. How many applications were denied Title XXI coverage for procedural denials?"
                          labelClassName="p2_q2"
                          name="p2_q2"
                          value={this.state.p2_q2}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p2_q3"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <TextField
                          hint="For example: income was too high, income was too low, they were determined Medicaid eligible instead, they had other coverage instead, etc."
                          label="3. How many applicants were denied Title XXI coverage for eligibility denials?"
                          labelClassName="p2_q3"
                          name="p2_q3"
                          value={this.state.p2_q3}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p2_q4"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <TextField
                          label="4. How many applicants were denied Title XXI coverage and determined eligible for Title XIX instead?"
                          labelClassName="p2_q4"
                          name="p2_q4"
                          value={this.state.p2_q4}
                        />
                      </div>
                      <div className="question-container">
                        <FillForm
                          name="p2_q5"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <TextField
                          label="5. How many applicants were denied Title XXI coverage for other reasons?"
                          labelClassName="p2_q5"
                          name="p2_q5"
                          value={this.state.p2_q5}
                        />
                      </div> */}
                      {/* <div className="question-container">
                        <FillForm
                          name="p2_q6"
                          title={this.state.fillFormTitle}
                          onClick={this.loadAnswers}
                        />
                        <TextField
                          hint="(Maximum 7,500 characters)"
                          label="6. Did you run into any limitations when collecting data? Anything else you'd like to add about this section that wasn't already covered?"
                          labelClassName="p2_q6"
                          multiline
                          name="p2_q6"
                          rows="6"
                          value={this.state.p2_q6}
                        />
                      </div> */}
                      {/* <div className="form-options">
                        <button
                          type="submit"
                          className="ds-c-button ds-c-button--disabled"
                        >
                          Saved
                        </button>
                        <a href="#export" id="export">
                          Export
                        </a>
                      </div> */}
                    </form>
                  </TabPanel>
                  <TabPanel id="tab-lastyear" tab="FY2019 answers"></TabPanel>
                </Tabs>
              </div>

              <div className="nav-buttons">
                <NavigationButton direction="Previous" destination="/2b" />

                <NavigationButton direction="Next" destination="#" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
});

export default connect(mapStateToProps)(Section3c);
