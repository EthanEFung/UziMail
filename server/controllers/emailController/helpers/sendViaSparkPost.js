/**
 *
 * @param {*} userInfo user's identification
 *   @param contacts
 *   @param email
 *   @param username
 * @param {*} contacts list of contacts to send
 * @param {*} payload payload with data on the message being sent
 *   @param html message to send
 *   @param subject subject head of message
 */
function sendViaSparkPost(userInfo, payload) {
  const SparkPost = require("sparkpost");
  const client = new SparkPost(process.env.SPARKPOST_API_KEY);

  const recipients = formatSparkPostRecipientData(userInfo.contacts);
  return new Promise((resolve, reject) => {
    client.transmissions
      .send({
        options: {
          //delete "sandbox" attribute once purchasing and configuring
          //sending dns
          sandbox: true
        },
        content: {
          //change "from" attribute to users email --> userInfo.email
          //once domain is purchased and configured
          from: "testing@sparkpostbox.com",
          subject: payload.subject,
          html: payload.html
        },
        recipients: recipients
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function formatSparkPostRecipientData(contacts) {
  return contacts.map(contact => {
    return { address: contact.email };
  });
}

module.exports = sendViaSparkPost;
