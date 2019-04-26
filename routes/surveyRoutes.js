const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    // console.log(req.body);
    // res.send({});
    // const events = req.body.map(event => {
    //   const pathname = new URL(event.url).pathname;
    //   const p = new Path("/api/surveys/:surveyId/:choice");
    //   // console.log(p.test(pathname));
    //   const match = p.test(pathname);
    //   if (match) {
    //     return {
    //       email: event.email,
    //       surveyId: match.surveyId,
    //       choice: match.choice
    //     };
    //   }
    // });
    // // console.log(events)
    // // return only defined events
    // const compactEvents = _.compact(events);
    // // remove duplications
    // const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    // console.log(uniqueEvents);

    // uniqueEvents.forEach(event => {
    //   Survey.updateOne(
    //     {
    //       _id: event.surveyId,
    //       recipients: {
    //         $elemMatch: { email: event.email, responded: false }
    //       }
    //     },
    //     {
    //       $inc: { [event.choice]: 1 },
    //       $set: { "recipients.$.responded": true }
    //     }
    //   ).exec();
    // });

    // steve's code

    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL (url).pathname);
        if (match) {
           return { email, surveyId: match.surveyId, choice: match.choice };
         }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }
        }
      ).exec();
      })
      .value();
    res.send({});
  });

  //   res.send({});
  // });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
