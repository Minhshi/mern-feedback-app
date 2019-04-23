import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField"

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div>
        <Field
        type="text"
        name="title"
        component={SurveyField}
        />
      </div>
      )
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
      )
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
