import React from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";

class SurveyFormReview extends React.Component {
  reviewFields() {
    return FIELDS.map(field => {
      return (
        <div>
          <label>{field.label}</label>
          <div>{this.props.formValues[field.name]}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.reviewFields()}
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
