import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button as button,
  ChoiceList,
  Tabs,
  TabPanel,
  TextField,
} from "@cmsgov/design-system-core";

import PageInfo from "../../layout/PageInfo";
import Data from "./backend-json-section-3.json";
import FormNavigation from "../../layout/FormNavigation";
import FormActions from "../../layout/FormNavigation";
import Questions3AApi from "./questions/Questions3AApi";

import { selectSectionByOrdinal } from "../../../store/selectors/selectSection";

class Section3AApi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const subsectionData = this.props.Data
      ? this.props.Data.section.subsections[0] // 3A
      : null;

    return subsectionData ? (
      <div className="section-1 ds-l-col--9 content">
        <div className="main">
          <PageInfo />
          <div className="print-only">
            <h3>{subsectionData.title}</h3>
          </div>
          <div className="section-content">
            <Tabs>
              <TabPanel id="tab-form" tab={subsectionData.title}>
                <Questions3AApi previousEntry="false" />
                <FormNavigation
                  nextUrl="/section3/3c"
                  previousUrl="/section2/2b"
                />
              </TabPanel>

              <TabPanel
                id="tab-lastyear"
                tab={`FY${this.props.year - 1} answers`}
              >
                <div className="print-only ly_header">
                  <PageInfo />
                  <h3>{subsectionData.title}</h3>
                </div>
                <div disabled>
                  <Questions3AApi previousEntry="true" />
                </div>
              </TabPanel>
            </Tabs>
            <FormActions />
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  Data: selectSectionByOrdinal(state, 3),
  name: state.stateUser.name,
  year: state.stateUser.formYear,
  programType: state.stateUser.programType,
});

export default connect(mapStateToProps)(Section3AApi);
