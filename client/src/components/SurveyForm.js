import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import FIELDS from "./formFields";
// import validateEmails from "../utils/validateEmails";

// const FIELDS = [
//   { label: "Survey Title", name: "title" },
//   { label: "Subject Line", name: "subject" },
//   { label: "Email Body", name: "body" },
//   { label: "Recipient List", name: "emails" }
// ];

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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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

//  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// function emails() {
//   const emailsArray = emails
//                       .split(",")
//                       .map(email => email.trim())
//                       .filter(email => re.test(email) === false)
// }

function validateEmails(emailList) {
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const invalidEmails = emailList
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
}

function validate(values) {
  const errors = {};

  // if (!values.title) {
  //   errors.title = "Please provide a title";
  // }

  errors.emails = validateEmails(values.emails || "");
  // errors.emails = validateEmails(values.emails || "");

  FIELDS.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = "Please provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
