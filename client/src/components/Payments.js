import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { fetchUser, handleToken } from "../actions";

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Feedback App"
        description="$5 for 5 Feedback Credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { fetchUser, handleToken }
)(Payments);
