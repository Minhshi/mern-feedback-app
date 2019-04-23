import React from "react";

class SurveyField extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <label>{this.props.label}</label>
        <input {...this.props.input} />
      </div>
    );
  }
}

export default SurveyField;
