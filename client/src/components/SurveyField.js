import React from "react";

class SurveyField extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <input {...this.props.input} />
      </div>
    );
  }
}

export default SurveyField;
