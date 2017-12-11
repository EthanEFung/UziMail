const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @param {{}} userInfo object containing information on the current user
 *   @param {[]} contacts list of contacts associated with the group that has been specified by the user
 *   @param {string} email user email
 * @param {{}} payload map containing message contents
 *   @param {string} payload.html message to send
 *   @param {string} payload.subject subject head of message
 */
function sendViaSendGrid(userInfo, payload) {
  const data = {
    content: [{ type: "text/html", value: payload.html }],
    from: { email: userInfo.email, name: userInfo.username },
    personalizations: [{ subject: payload.subject, to: userInfo.contacts }],
    reply_to: { email: userInfo.email, name: userInfo.username },
    subject: payload.subject
  };

  return new Promise((resolve, reject) => {
    const sgRequest = { body: data, method: "POST", url: "/v3/mail/send" };

    client
      .request(sgRequest)
      .then(([response, body]) => {
        resolve([response, body]);
      })
      .catch(err => {
        reject(`error sending ${JSON.stringify(err.response.body)}`);
      });
  });
}

module.exports = sendViaSendGrid;
