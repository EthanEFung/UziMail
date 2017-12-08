module.exports = (attr, obj) => {
  if (obj[attr]) return obj[attr];
  return "default";
};
