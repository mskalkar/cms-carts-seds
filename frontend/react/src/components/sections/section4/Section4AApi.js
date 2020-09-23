import React, { Component } from "react";
import { connect } from "react-redux";
import Questions4AApi from "./questions/Questions4AApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PageInfo from "../../layout/PageInfo";
import FormNavigation from "../../layout/FormNavigation";
import FormActions from "../../layout/FormActions";
import {
  selectSectionByOrdinal,
  generateSubsectionLabel,
} from "../../../store/formData";

import {
  Button as button,
  ChoiceList,
  Tabs,
  TabPanel,
  TextField,
} from "@cmsgov/design-system-core";

class Section4AApi extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // This variable narrows it down to a subsection
    const subsectionData = this.props.Data
      ? this.props.Data.subsections[0] // 4A JSON Data
      : null;

    const sectionTitle = this.props.Data
      ? generateSubsectionLabel(subsectionData.id) // Section 2b title
      : null;
    return subsectionData ? (
      <div className="section-1 ds-l-col--9 content">
        <div className="main">
          <PageInfo />
          <div className="print-only">
            <h3>{sectionTitle}</h3>
          </div>
          <div className="section-content">
            <Tabs>
              <TabPanel
                id="tab-form"
                tab={`Section 4A:${subsectionData.title}`}
              >
                <Questions4AApi subsectionA={subsectionData} />
              </TabPanel>

              <TabPanel
                id="tab-lastyear"
                tab={`FY${subsectionData.id.split("-")[0] - 1} answers`}
              >
                <div className="print-only ly_header">
                  <PageInfo />
                  <h3>{sectionTitle}</h3>
                </div>
              </TabPanel>
            </Tabs>

            <FormNavigation />

            <FormActions />
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  Data: selectSectionByOrdinal(state, 4),
  name: state.stateUser.name,
  programType: state.stateUser.programType,
  year: state.global.formYear,
});

export default connect(mapStateToProps)(Section4AApi);