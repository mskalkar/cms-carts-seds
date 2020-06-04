import React, { Component, Fragment } from "react";
import { TextField, ChoiceList, DateField } from "@cmsgov/design-system-core";
class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal_numerator_digit: 0,
      goal_denominator_digit: 0,
      percentage: 0,
      shouldCalculate: true,
    };
    this.percentageCalculator = this.percentageCalculator.bind(this);
    this.addDivisors = this.addDivisors.bind(this);
  }

  // Validate the input before returning calculated percentage
  percentageCalculator(numerator, denominator) {
    let quotient;
    if (
      numerator !== "" &&
      numerator > 0 &&
      denominator !== "" &&
      denominator > 0 &&
      this.state.shouldCalculate === true
    ) {
      quotient = (numerator * 100) / denominator;
      return quotient;
    }
    // default value
    return "--";
  }

  // Validate the input and set the state
  addDivisors(evt) {
    let num;
    let denom;
    // If the input includes letters, give the box an error message
    if (
      isNaN(parseInt(evt.target.value)) ||
      /^\d+$/.test(evt.target.value) === false
    ) {
      this.setState({
        [`${evt.target.name}Err`]: "This input takes numbers only",
        shouldCalculate: false,
      });
      return;
    } else {
      // Calculate without waiting for the input to be added to state
      if (evt.target.name === "goal_numerator_digit") {
        num = evt.target.value;
        denom = this.state.goal_denominator_digit || 0;
      } else if (evt.target.name === "goal_denominator_digit") {
        num = this.state.goal_numerator_digit || 0;
        denom = evt.target.value;
      }

      this.setState({
        [evt.target.name]: evt.target.value,
        [`${evt.target.name}Err`]: false,
        shouldCalculate: true,
        percentage: this.percentageCalculator(num, denom),
      });
    }
  }

  render() {
    return (
      <Fragment>
        <h2> Goal {this.props.goalCount}: </h2>
        <div className="question-container">
          <TextField
            label="Briefly describe your goal"
            hint="For example: Our goal is to enroll 75% of CHIP-eligible children with family income below 247% of the federal poverty level"
            multiline
            name="goal_description"
          />
        </div>

        <div className="question-container">
          <ChoiceList
            choices={[
              { label: "New goal", value: "new" },
              { label: "Continuing goal", value: "continuing" },
              { label: "Discontinued goal", value: "discontinued" },
            ]}
            label="What type of goal is it?"
            name="goal_type"
          />
        </div>

        <div className="question-container">
          <TextField
            label="What measurement will you use to track this goal?"
            hint="For example: We'll measure the percent of eligible children who enrolled in CHIP"
            multiline
            name="goal_measurement"
          />
        </div>

        <div className="question-container">
          <h3 className="question"> Define the numerator you're measuring</h3>

          <TextField
            label="How do you define this population?"
            hint="For example: The number of children below 247% of the FPL who enrolled in CHIP in the last federal fiscal year."
            multiline
            name="goal_numerator_definition"
          />

          <TextField
            label="Numerator"
            hint="Total number"
            name="goal_numerator_digit"
            size="medium"
            errorMessage={this.state.goal_numerator_digitErr}
            onChange={this.addDivisors}
          />
          <h4> Define the denominator you're measuring</h4>
          <TextField
            label="How do you define this population?"
            hint="For example: The total number of children below 247% of the FPL in the last federal fiscal year."
            multiline
            name="goal_denominator_definition"
          />

          <TextField
            label="Denominator"
            hint="Total number"
            name="goal_denominator_digit"
            size="medium"
            errorMessage={this.state.goal_denominator_digitErr}
            onChange={this.addDivisors}
          />
        </div>

        <div className="ds-u-border--2">
          <form>
            <div className="ds-1-container">
              <div className="ds-1-row">
                <div className="ds-l--auto">
                  <h3>Percentage</h3>
                  <h4>Auto-calculated</h4>
                  <TextField
                    label="Numerator"
                    name="goal_numerator_digit"
                    size="small"
                    value={this.state.goal_numerator_digit}
                    className="ds-l--auto"
                  />
                </div>
                <div className="ds-l--auto">
                  <span>&divide;</span>
                  <TextField
                    label="Denominator"
                    name="goal_denominator_digit"
                    size="small"
                    value={this.state.goal_denominator_digit}
                    className="ds-l--auto"
                  />
                </div>
                <div className="ds-l--auto">
                  <span> &#61; </span>
                  <TextField
                    label="Percentage"
                    name="goal_percentage"
                    size="small"
                    value={`${this.state.percentage}%`}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="question-container">
          <h4> What is the date range for your data?</h4>
          <div className="date-range">
            <DateField label="Start" hint={"From mm/yyyy to mm/yyyy"} />

            <DateField label="End" hint={"From mm/yyyy to mm/yyyy"} />
          </div>
        </div>

        <ChoiceList
          choices={[
            {
              label: "Eligibility or enrollment data",
              value: "enrollment_data",
            },
            { label: "Survey data", value: "survey_data" },
            { label: "Another data source", value: "other_data" },
          ]}
          className="ds-u-margin-top--5"
          label="Which data source did you use?"
          name="data_source"
        />
        <div className="question-container">
          <TextField
            label="How did your progress last year compare to your previous year's progress towards your goal?"
            multiline
            name="progress_comparison"
            className="ds-u-margin-top--0"
          />
        </div>

        <div className="question-container">
          <TextField
            label="What are you doing to continually make progress towards your goal?"
            multiline
            name="progress_action"
            className="ds-u-margin-top--0"
          />
        </div>

        <div className="question-container">
          <TextField
            label="Anything else you'd like to tell us about this goal?"
            multiline
            name="additional_information"
            className="ds-u-margin-top--0"
          />
        </div>

        <div className="question-container">
          <TextField
            label="Do you have any supporting documentation?"
            hint="Optional"
            name="supporting_documentation"
            className="ds-u-margin-top--0"
            button="YYYYYYY"
          />
          <button className="ds-c-button">Browse</button>
        </div>
      </Fragment>
    );
  }
}

export default Goal;
