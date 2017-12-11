const { User } = require("../../../../db/models");

function fetchUserInfo(req) {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id: req.params.userId } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(`could not user ${req.body.username}'s data`);
      });
  });
}

module.exports = fetchUserInfo;
