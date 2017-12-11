const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

/**
 *
 * @param userInfo {{ contacts, email }} object containing information on the current user
 *   @param contacts {[]} list of contacts associated with the group that has been specified by the user
 *   @param email {string} user email
 * @param {{ html, subject }} payload map containing message contents
 *   @param html message to send
 *   @param subject subject head of message
 */
function sendViaSendGrid(userInfo, payload) {
  return new Promise((resolve, reject) => {
    const data = {
      content: [
        {
          type: "text/html",
          value: payload.html
        }
      ],
      from: {
        email: userInfo.email,
        name: userInfo.username
      },
      personalizations: [
        {
          subject: payload.subject,
          to: userInfo.contacts
        }
      ],
      reply_to: {
        email: userInfo.email,
        name: userInfo.username
      },
      subject: payload.subject
    };

    const sgRequest = {
      body: data,
      method: "POST",
      url: "/v3/mail/send"
    };

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
