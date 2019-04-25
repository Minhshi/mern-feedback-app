import React from "react";
import { connect } from "react-redux";
import FIELDS from "./formFields";
import { submitSurvey } from "../actions";
import { withRouter } from "react-router-dom";

class SurveyFormReview extends React.Component {
  reviewFields() {
    return FIELDS.map(field => {
      return (
        <div key={field.name}>
          <div>
            <label>{field.label}</label>
            <div>{this.props.formValues[field.name]}</div>
          </div>
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
          className="yellow darken-3 white-text btn-flat"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          className="green btn-flat white-text right"
          onClick={() =>
            this.props.submitSurvey(this.props.formValues, this.props.history)
          }
        >
          Send Survey
          <i className="material-icons right">email</i>
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

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
