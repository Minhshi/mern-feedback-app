import React from "react";
import { connect } from "react-redux";

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

function mapStateToProps(state) {
  // console.log(state)
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps)(SurveyFormReview);
