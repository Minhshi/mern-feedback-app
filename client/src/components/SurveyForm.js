import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

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

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
