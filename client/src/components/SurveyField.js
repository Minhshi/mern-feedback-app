import React from "react";

class SurveyField extends React.Component {
  render() {
    // console.log(this.props);
    // console.log(this.props.meta);
    const {
      label,
      input,
      meta: { touched, error }
    } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
        {touched && error}
      </div>
    );
  }
}

export default SurveyField;
