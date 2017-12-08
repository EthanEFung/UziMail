/**
 * @param {string} providerName
 * @param {} payload //credentials to create account
 * @return {Promise}
 *
 * skeleton:
 * 1: parse to see which provider the account is for
 * 2: run the proper Promise
 */
function createAccount(providerName, payload) {
  if (providerName === "SparkPost") return createSparkPostAccount(payload);
  if (providerName === "SendGrid") return createSendGridAccount(payload);
  else throw "provider, " + providerName + " is not supported";
}

/**
 * @param {} payload must contain an email attribute
 * @return {Promise}
 */
function createSparkPostAccount(payload) {
  const { email } = payload;
  const SparkPost = require("sparkpost");
  const client = new SparkPost();
  const subaccount = {
    name: email,
    key_label: `${email} API_KEY`,
    key_grants: ["smtp/inject", "transmissions/modify"]
  };
  return new Promise((resolve, reject) => {
    client.subaccounts
      .create(subaccount)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

/**
 * @param {} payload must contain an email attribute
 * @return {Promise}
 */
function createSendGridAccount(payload) {
  return new Promise((resolve, reject) => {});
}

module.exports = createAccount;
