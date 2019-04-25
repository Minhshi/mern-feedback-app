import React from "react";

class SurveyFormReview extends React.Component {
  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        <button
          className="yellow darken-3 btn-flat"
          onClick={this.props.onCancel}
        >
          Back
        </button>
      </div>
    );
  }
}

export default SurveyFormReview;
