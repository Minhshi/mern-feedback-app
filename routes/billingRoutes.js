const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // app.post("/api/stripe", (req, res) => {
  //   console.log(req.body)
  // })

  app.post("/api/stripe", requireLogin, async (req, res) => {
    // if (!req.user) {
    //   return res.status(401).send({
    //     error: "You must log in!"
    //   });
    // }

    // console.log(req.body)
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 Feedback Credits",
      source: req.body.id
    });
    // console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
