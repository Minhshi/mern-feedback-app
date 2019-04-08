const keys = require("../../config/keys");

module.exports = survey => {
  // return "<div>" + survey.body + "</div>";
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We need your input</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
