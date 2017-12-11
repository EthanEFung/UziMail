const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

/**
 *
 * @param {*} userInfo user's identification
 *   @param contacts {[]} a collection of objects tha contain receipient data
 *   @param email {string} user's email
 *   @param username {string} user's handle
 * @param {*} payload payload with data on the message being sent
 *   @param html message to send
 *   @param subject subject head of message
 */
function sendViaSparkPost(userInfo, payload) {
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
        recipients: formatSparkPostRecipientData(userInfo.contacts)
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
