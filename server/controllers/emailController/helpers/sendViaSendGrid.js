/**
 *
 * @param userInfo
 *   @param contacts {[]}
 *   @param email {string} user email
 * @param {{}} payload map containing message contents
 *   @param html message to send
 *   @param subject subject head of message
 */
function sendViaSendGrid(userInfo, payload) {
  return new Promise((resolve, reject) => {
    const client = require("@sendgrid/client");
    client.setApiKey(process.env.SENDGRID_API_KEY);

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

    const sgRequest = {};
    sgRequest.body = data;
    sgRequest.method = "POST";
    sgRequest.url = "/v3/mail/send";

    client
      .request(sgRequest)
      .then(([response, body]) => {
        resolve([response, body]);
      })
      .catch(err => {
        console.log(err.response.body);
        reject(`error sending ${JSON.stringify(err.response.body)}`);
      });
  });
}

module.exports = sendViaSendGrid;
