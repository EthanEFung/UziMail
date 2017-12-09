module.exports = (attr, obj) => {
  if (obj[attr] !== null) return obj[attr];
  return "default";
};
