import React from "react";
import ReportItem from "./ReportItem";
import { DownloadDrawer } from "./DownloadDrawer";

const Homepage = () => (
  <div className="homepage">
    <div className="ds-l-container">
      <div className="ds-l-row ds-u-padding-left--2">
        <h1 className="page-title ds-u-margin-bottom--0">
          CHIP Annual Report Template System (CARTS)
        </h1>
      </div>
      <DownloadDrawer show={false} />
      <div className="ds-l-row">
        <div className="reports ds-l-col--12">
          <div className="carts-report preview__grid">
            <div className="ds-l-row">
              <legend className="ds-u-padding--2 ds-h3">All Reports</legend>
            </div>
            <div className="report-header ds-l-row">
              <div className="name ds-l-col--1">Year</div>
              <div className="status ds-l-col--2">Status</div>
              <div className="actions ds-l-col--3">Actions</div>
            </div>

            <ReportItem
              name="2020"
              lastEditedTime="1:32pm"
              lastEditedDate="9/21/20"
              link1URL="/sections/2020/00"
              link1Text="Edit"
              link2URL="#"
              link2Text={null}
              statusText="In Progress"
              editor="karen.dalton@state.gov"
            />
          </div>
        </div>
      </div>
      <div className="ds-l-row">
        <div className="omb-info ds-l-col--12">
          <p>
            The OMB control number for this information is OMB 0938-1148. The
            time required to complete this information collection is estimated
            to 40 hours per response, including the time to review instructions,
            search existing data resources, gather data, and review and submit
            the information.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Homepage;
