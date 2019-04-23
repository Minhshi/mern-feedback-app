import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" }
];

class SurveyForm extends React.Component {
  renderFields() {
    return FIELDS.map(field => {
      return (
        <div key={field.name}>
          <Field
            component={SurveyField}
            label={field.label}
            name={field.name}
            type="text"
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {/*<Field
        type="text"
        name="surveyTitle"
        component="input"
      />*/}

          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // if (!values.title) {
  //   errors.title = "Please provide a title";
  // }

  FIELDS.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = "Please provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
