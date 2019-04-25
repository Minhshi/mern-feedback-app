import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends React.Component {
  state = { formReview: false };

  renderContent() {
    if (this.state.formReview === true) {
      return (
        <SurveyFormReview
          onCancel={() =>
            this.setState({
              formReview: false
            })
          }
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() =>
          this.setState({
            formReview: true
          })
        }
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;
